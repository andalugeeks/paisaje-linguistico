import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';
import { PostResult, PostStatus, PostsService, postHelpers } from '@mzima-client/sdk';
import { PostItemActionType, getPostStatusActions, postStatusChangedHeader } from '@constants';
import { forkJoin } from 'rxjs';
import { AlertService, DeploymentService, ShareService, ToastService } from '@services';
import { CollectionsModalComponent } from '../collections-modal/collections-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-controls',
  templateUrl: './post-controls.component.html',
  styleUrls: ['./post-controls.component.scss'],
})
export class PostControlsComponent {
  @Input() posts: PostResult[] = [];
  @Input() permissions: string[] = [];
  @Input() isProfile?: boolean;
  @Output() postChanged = new EventEmitter();
  @Output() postDeleted = new EventEmitter();

  public statusOptionsButtons?: ActionSheetButton[] = getPostStatusActions();

  constructor(
    private postsService: PostsService,
    private toastService: ToastService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private shareService: ShareService,
    private deploymentService: DeploymentService,
    private alertService: AlertService,
    private router: Router,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['posts']?.currentValue?.length > 0) {
      this.statusOptionsButtons = getPostStatusActions(this.posts[0].status);
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      header: 'Post Actions',
      buttons: this.statusOptionsButtons!,
    });
    actionSheet.onWillDismiss().then((event) => {
      this.setStatus({ detail: event });
    });
    await actionSheet.present();
  }

  public setStatus(ev: any): void {
    const role = ev.detail.role;
    if (role === 'cancel' || !ev.detail.data) return;
    const action: PostItemActionType = ev.detail.data.action;
    const actions: Partial<Record<PostItemActionType, () => void>> = {
      [PostItemActionType.PUBLISH]: () => this.setPostStatus(PostStatus.Published),
      [PostItemActionType.PUT_UNDER_REVIEW]: () => this.setPostStatus(PostStatus.Draft),
      [PostItemActionType.ARCHIVE]: () => this.setPostStatus(PostStatus.Archived),
    };

    actions[action]?.();
  }

  private setPostStatus(status: PostStatus): void {
    if (!this.posts.length) return;

    if (status === PostStatus.Published) {
      const uncompletedPosts = this.posts.filter(
        (post) => !postHelpers.isAllRequiredCompleted(post),
      );

      if (uncompletedPosts.length > 0) {
        this.toastService.presentToast({
          header: 'No çe puén publicâh',
          message: `Lâ çigientê publicaçionê no an podío çêh publicâh: ${uncompletedPosts
            .map((p) => p.title)
            .join(', ')}`,
          buttons: [],
        });
        return;
      }
    }

    forkJoin(this.posts.map((p) => this.postsService.updateStatus(p.id, status))).subscribe({
      complete: () => {
        this.toastService.presentToast({
          header: postStatusChangedHeader[status],
          message: `Cambiaron de ${this.posts.length > 1 ? 'êttaô' : 'êttao'} `,
          buttons: [],
        });
        this.postChanged.emit();
      },
    });
  }

  public openStatusOptions(): void {
    this.presentActionSheet();
  }

  public async addPostToCollection(): Promise<void> {
    if (!this.posts.length) return;

    const modal = await this.modalController.create({
      component: CollectionsModalComponent,
      componentProps: {
        postId: this.posts[0].id,
        selectedCollections: new Set(this.posts[0].sets ?? []),
      },
    });
    modal.onWillDismiss().then(({ data }) => {
      const { collections, changed } = data ?? {};
      if (changed) {
        this.posts[0].sets = collections;
        this.toastService.presentToast({
          header: 'Éççito',
          message: `a Publicaçión fue ${
            collections?.length
              ? `añadía en ${collections.length} colêççionê`
              : 'borrá de toâ lâ colêççionê'
          }.`,
          buttons: [],
        });
        this.postChanged.emit();
      }
    });
    modal.present();
  }

  public sharePost(): void {
    if (!this.posts.length) return;

    const title = this.posts.map((post) => post.title).join(', ');
    const text = this.posts
      .map(
        (post) =>
          `https://${this.deploymentService.getDeployment()!.fqdn}/feed/${post.id}/view?mode=ID`,
      )
      .join(', ');
    this.shareService.share({
      title,
      text,
      dialogTitle: `Compartîh ${this.posts.length > 1 ? 'publicacionê' : 'publicaçión'}`,
    });
  }

  public async deletePost(): Promise<void> {
    const result = await this.alertService.presentAlert({
      header: `¿Çeguro que quiêh eliminâh ${
        this.posts.length > 1 ? 'êttâ publicaçionê' : 'êtta publicaçión'
      }?`,
      message: 'Êtta âççión no çe pué deçaçêh. Ándate con cuidao.',
      buttons: [
        {
          text: 'Cançelâh',
          role: 'cancel',
        },
        {
          text: 'Eliminâh',
          role: 'confirm',
          cssClass: 'danger',
        },
      ],
    });

    if (result.role === 'confirm') {
      const count = this.posts.length;
      const postIds = this.posts.map((p) => p.id);
      forkJoin(this.posts.map((p) => this.postsService.delete(p.id))).subscribe({
        complete: () => {
          this.toastService.presentToast({
            message: `${
              this.posts.length > 1 ? count + ' publicaçionê' : 'Publicaçión'
            } eliminao/ôh con éççito`,
          });
          this.postDeleted.emit(postIds);
        },
      });
    }
  }

  public editPost(): void {
    if (!this.posts || this.posts.length > 1) return;
    this.router.navigate([this.posts[0].id, 'edit'], { queryParams: { profile: this.isProfile } });
  }
}
