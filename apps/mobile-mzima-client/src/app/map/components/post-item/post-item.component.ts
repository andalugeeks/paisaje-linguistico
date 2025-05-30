import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MediaService, PostResult, PostStatus, PostsService } from '@mzima-client/sdk';
import {
  getPostItemActions,
  PostItemActionType,
  PostItemActionTypeUserRole,
  postStatusChangedHeader,
  postStatusChangedMessage,
} from '@constants';
import { ActionSheetButton, ModalController, ActionSheetController } from '@ionic/angular';
import {
  AlertService,
  DeploymentService,
  NetworkService,
  SessionService,
  ShareService,
  ToastService,
} from '@services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { cloneDeep } from 'lodash';
import { CollectionsModalComponent } from '../../../shared/components';
import { Router } from '@angular/router';
import { fieldAppMessages, LocalStorageManager } from '@helpers';

@UntilDestroy()
@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit {
  @Input() public post: PostResult;
  @Input() public checkbox = false;
  @Input() public isProfile?: boolean;
  @Output() public postUpdated = new EventEmitter<{ post: PostResult }>();
  @Output() public postDeleted = new EventEmitter<{ post: PostResult }>();
  @Output() selected = new EventEmitter<boolean>();
  public backendUrl: string;
  public mediaUrl: string;
  public media: any;
  public mediaId?: number;
  public isMediaLoading: boolean;
  public actionSheetButtons?: ActionSheetButton[] = getPostItemActions();
  public isConnection = true;
  public fieldAppMessages = fieldAppMessages;
  public LocalStorageManager = LocalStorageManager;

  constructor(
    private networkService: NetworkService,
    private mediaService: MediaService,
    protected sessionService: SessionService,
    private alertService: AlertService,
    private toastService: ToastService,
    private postsService: PostsService,
    private shareService: ShareService,
    private deploymentService: DeploymentService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private router: Router,
  ) {
    this.backendUrl = this.mediaService.backendUrl;
  }

  async ionViewWillEnter() {
    await this.checkNetwork();
  }

  ngOnInit(): void {
    this.sessionService.currentUserData$.pipe(untilDestroyed(this)).subscribe({
      next: ({ role, userId }) => {
        if (role === 'admin') {
          this.actionSheetButtons = getPostItemActions(
            PostItemActionTypeUserRole.ADMIN,
            this.post.status,
          );
        } else if (String(userId) === String(this.post.user_id)) {
          this.actionSheetButtons = getPostItemActions(
            PostItemActionTypeUserRole.AUTHOR,
            this.post.status,
          );
        } else if (role === 'member') {
          this.actionSheetButtons = getPostItemActions(
            PostItemActionTypeUserRole.USER,
            this.post.status,
          );
        } else {
          this.actionSheetButtons = [];
        }
      },
    });

    if (this.isConnection) {
      this.getMedia();
    }
  }

  private getMedia() {
    this.mediaId = this.post.post_content
      ?.flatMap((c) => c.fields)
      .find((f) => f.input === 'upload')?.value?.value;

    this.mediaUrl = this.post.post_content
      ?.flatMap((c) => c.fields)
      .find((f) => f.input === 'upload')?.value?.mediaSrc;
  }

  private async checkNetwork() {
    this.isConnection = await this.networkService.checkNetworkStatus();
  }

  public makeAction(ev: any) {
    const role = ev.detail.role;
    if (role === 'cancel' || !ev.detail.data) return;
    const action: PostItemActionType = ev.detail.data.action;

    const actions: Record<PostItemActionType, () => void> = {
      [PostItemActionType.SHARE]: () =>
        this.shareService.share({
          title: this.post.title,
          text: this.post.title,
          url: `https://${this.deploymentService.getDeployment()!.fqdn}/feed/${
            this.post.id
          }/view?mode=ID`,
          dialogTitle: fieldAppMessages('post_items_components_dialog_title'),
        }),
      [PostItemActionType.EDIT]: () => this.editPost(),
      [PostItemActionType.ADD_TO_COLLECTION]: () => this.addToCollection(),
      [PostItemActionType.PUBLISH]: () => this.setPostStatus(PostStatus.Published),
      [PostItemActionType.PUT_UNDER_REVIEW]: () => this.setPostStatus(PostStatus.Draft),
      [PostItemActionType.ARCHIVE]: () => this.setPostStatus(PostStatus.Archived),
      [PostItemActionType.DELETE]: () => this.deletePost(),
    };

    actions[action]();
  }

  private editPost(): void {
    this.router.navigate([this.post.id, 'edit'], { queryParams: { profile: this.isProfile } });
  }

  private async addToCollection(): Promise<void> {
    const modal = await this.modalController.create({
      component: CollectionsModalComponent,
      componentProps: {
        postId: this.post.id,
        selectedCollections: new Set(this.post.sets ?? []),
      },
    });
    modal.onWillDismiss().then(({ data }) => {
      const { collections, changed } = data ?? {};
      if (changed) {
        this.post.sets = collections;
        this.postUpdated.emit({ post: this.post });
        this.toastService.presentToast({
          header: fieldAppMessages('post_items_components_add_to_collection_header'),
          message: `${fieldAppMessages(
            'post_items_components_add_to_collection_message_part_1',
          )} “${this.post.title}” ${fieldAppMessages(
            'post_items_components_add_to_collection_message_part_2',
          )} ${
            collections?.length
              ? `${fieldAppMessages('post_items_components_add_to_collection_message_part_3_a')} ${
                  collections.length
                } ${fieldAppMessages('post_items_components_add_to_collection_message_part_4_a')}`
              : fieldAppMessages('post_items_components_add_to_collection_message_part_3_b')
          }.`,
          buttons: [],
        });
      }
    });
    modal.present();
  }

  private setPostStatus(status: PostStatus): void {
    this.postsService.updateStatus(this.post.id, status).subscribe((res) => {
      this.post = res.result;
      this.postUpdated.emit({ post: this.post });
      this.toastService.presentToast({
        header: postStatusChangedHeader[status][LocalStorageManager.getStoredSpellingProposalId()],
        message: postStatusChangedMessage(status, this.post.title),
        buttons: [],
      });
    });
  }

  private async deletePost(): Promise<void> {
    const result = await this.alertService.presentAlert({
      header: fieldAppMessages('post_items_components_delete_post_header'),
      message: fieldAppMessages('post_items_components_delete_post_message'),
      buttons: [
        {
          text: fieldAppMessages('post_items_components_delete_post_cancel'),
          role: 'cancel',
        },
        {
          text: fieldAppMessages('post_items_components_delete_post_remove'),
          role: 'confirm',
          cssClass: 'danger',
        },
      ],
    });

    if (result.role === 'confirm') {
      const post = cloneDeep(this.post);
      this.postsService.delete(this.post.id).subscribe({
        next: () => {
          this.postDeleted.emit({ post });
          this.toastService.presentToast({
            message: fieldAppMessages('post_items_components_post_deleted_message'),
          });
        },
      });
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      header: fieldAppMessages('post_items_components_present_action_sheet_message'),
      buttons: this.actionSheetButtons!,
    });
    actionSheet.onWillDismiss().then((event) => {
      this.makeAction({ detail: event });
    });
    await actionSheet.present();
  }

  public showOptions(ev: Event): void {
    ev.preventDefault();
    ev.stopPropagation();
    this.presentActionSheet();
  }

  public preventClick(ev: Event): void {
    ev.stopPropagation();
  }

  public getLoggedInStatus() {
    return this.sessionService.isLogged();
  }
}
