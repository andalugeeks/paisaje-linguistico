import { Injectable } from '@angular/core';
import { PostResult, PostsService, SurveysService, UserInterface } from '@mzima-client/sdk';
import { lastValueFrom, take } from 'rxjs';
import { moderationTexts } from '../constants/moderation';
import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import { EnvService } from './env.service';
import { SessionService } from './session.service';
import { ToastService } from './toast.service';

type ModerationRequestKind = 'DENUNCIA' | 'BLOQUEO' | 'BORRADO DE CUENTA';

/**
 * Paisaje-Linguistico: content reports, user blocking and account deletion requests
 * (App Store Review Guidelines 1.2 and 5.1.1(v)).
 *
 * Ushahidi does not let users delete themselves, so every request is stored as a post in a
 * private survey (env.json `moderation_survey_id`, require_approval on) that only admins see.
 * Blocking is per device: the blocked user's posts are hidden locally and admins are notified.
 */
@Injectable({
  providedIn: 'root',
})
export class ModerationService {
  private readonly blockedUsersKey = 'blocked_users';

  constructor(
    private surveysService: SurveysService,
    private postsService: PostsService,
    private sessionService: SessionService,
    private authService: AuthService,
    private alertService: AlertService,
    private toastService: ToastService,
  ) {}

  public get moderationSurveyId(): number | null {
    return EnvService.ENV?.moderation_survey_id ?? null;
  }

  public isModerationSurvey(survey: { id?: number | string }): boolean {
    return this.moderationSurveyId !== null && Number(survey.id) === this.moderationSurveyId;
  }

  public getBlockedUserIds(): string[] {
    try {
      const key = this.sessionService.getLocalStorageNameMapper(this.blockedUsersKey);
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch {
      return [];
    }
  }

  public isBlocked(post: PostResult): boolean {
    return !!post.user_id && this.getBlockedUserIds().includes(String(post.user_id));
  }

  public canBlock(post: PostResult, currentUserId?: string | number): boolean {
    return !!post.user_id && !!currentUserId && String(post.user_id) !== String(currentUserId);
  }

  public async reportPost(post: PostResult): Promise<void> {
    const result = await this.alertService.presentAlert({
      header: moderationTexts.reportAction,
      message: moderationTexts.reportMessage,
      inputs: moderationTexts.reasons.map((reason, i) => ({
        type: 'radio',
        label: reason.label,
        value: reason.value,
        checked: i === 0,
      })),
      buttons: [
        { text: moderationTexts.cancel, role: 'cancel' },
        { text: moderationTexts.reportConfirm, role: 'confirm', cssClass: 'danger' },
      ],
    });
    if (result.role !== 'confirm') return;

    const sent = await this.sendRequest('DENUNCIA', `Publicación #${post.id}`, [
      `Motivo: ${result.data?.values}`,
      `Publicación: #${post.id} "${post.title}"`,
    ]);
    if (sent) await this.toastService.presentToast({ message: moderationTexts.reportDone });
  }

  /** Returns true when the user was blocked. */
  public async blockUser(post: PostResult): Promise<boolean> {
    const result = await this.alertService.presentAlert({
      header: moderationTexts.blockHeader,
      message: moderationTexts.blockMessage,
      buttons: [
        { text: moderationTexts.cancel, role: 'cancel' },
        { text: moderationTexts.blockConfirm, role: 'confirm', cssClass: 'danger' },
      ],
    });
    if (result.role !== 'confirm' || !post.user_id) return false;

    const blocked = new Set(this.getBlockedUserIds());
    blocked.add(String(post.user_id));
    localStorage.setItem(
      this.sessionService.getLocalStorageNameMapper(this.blockedUsersKey),
      JSON.stringify([...blocked]),
    );
    // Blocking works even if the notification to the admins fails.
    this.sendRequest('BLOQUEO', `Usuario #${post.user_id}`, [
      `Usuario bloqueado: #${post.user_id}`,
      `Desde la publicación: #${post.id} "${post.title}"`,
    ]);
    await this.toastService.presentToast({ message: moderationTexts.blockDone });
    return true;
  }

  public async requestAccountDeletion(): Promise<void> {
    const user = await this.currentUser();
    if (!user.userId) return;

    const result = await this.alertService.presentAlert({
      header: moderationTexts.deleteHeader,
      message: moderationTexts.deleteMessage,
      inputs: [
        {
          type: 'radio',
          label: moderationTexts.deleteKeepPosts,
          value: 'Conservar sus publicaciones de forma anónima',
          checked: true,
        },
        {
          type: 'radio',
          label: moderationTexts.deleteRemovePosts,
          value: 'Borrar también sus publicaciones',
        },
      ],
      buttons: [
        { text: moderationTexts.cancel, role: 'cancel' },
        { text: moderationTexts.deleteConfirm, role: 'confirm', cssClass: 'danger' },
      ],
    });
    if (result.role !== 'confirm') return;

    const sent = await this.sendRequest('BORRADO DE CUENTA', `Usuario #${user.userId}`, [
      `Publicaciones: ${result.data?.values}`,
      `Avisar al terminar a: ${user.email ?? '(sin email)'}`,
    ]);
    if (!sent) return;

    await this.alertService.presentAlert({
      header: moderationTexts.deleteDoneHeader,
      message: moderationTexts.deleteDone,
    });
    this.authService.logout();
  }

  private async currentUser(): Promise<UserInterface> {
    return lastValueFrom(this.sessionService.getCurrentUserData().pipe(take(1)));
  }

  private async sendRequest(
    kind: ModerationRequestKind,
    subject: string,
    lines: string[],
  ): Promise<boolean> {
    try {
      const surveyId = this.moderationSurveyId;
      if (surveyId === null) throw new Error('moderation_survey_id is not configured');

      const user = await this.currentUser();
      const title = `[${kind}] ${subject}`;
      const content = [
        ...lines,
        `Enviado por: ${user.userId ? `usuario #${user.userId} (${user.email})` : 'anónimo'}`,
      ].join('\n');

      const survey = (await lastValueFrom(this.surveysService.getSurveyById(surveyId))).result;
      const tasks = (survey.tasks ?? []).map((task: any) => ({
        ...task,
        fields: (task.fields ?? []).map((field: any) => ({
          ...field,
          value: {
            value: field.type === 'title' ? title : field.type === 'description' ? content : null,
          },
        })),
      }));

      await lastValueFrom(
        this.postsService.post({
          base_language: 'es',
          completed_stages: tasks.map((task: any) => task.id),
          content,
          description: '',
          enabled_languages: {},
          form_id: surveyId,
          locale: 'es_ES',
          post_content: tasks,
          published_to: [],
          title,
          type: 'report',
        }),
      );
      return true;
    } catch (err) {
      console.error('Moderation request failed', err);
      await this.toastService.presentToast({ message: moderationTexts.sendError });
      return false;
    }
  }
}
