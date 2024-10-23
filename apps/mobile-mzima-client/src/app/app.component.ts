import { Component, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE_KEYS } from '@constants';
import { AlertController, IonRouterOutlet, Platform } from '@ionic/angular';
import { CollectionsService, MediaService, PostsService, SurveysService } from '@mzima-client/sdk';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DatabaseService, NetworkService, ListenerService, ToastService } from '@services';
import {
  Subject,
  concatMap,
  delay,
  distinctUntilChanged,
  filter,
  firstValueFrom,
  from,
  forkJoin,
  tap,
} from 'rxjs';
import { BaseComponent } from './base.component';
import { UploadFileHelper } from './post/helpers';
import { Location } from '@angular/common';
import { fieldAppMessages } from '@helpers';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent {
  private toastMessage$ = new Subject<string>();
  // public fieldAppMessages = fieldAppMessages; <No es necesario porque está en BaseComponent>

  constructor(
    override router: Router,
    override platform: Platform,
    override toastService: ToastService,
    override alertCtrl: AlertController,
    override networkService: NetworkService,
    override location: Location,
    private dataBaseService: DatabaseService,
    private mediaService: MediaService,
    private postsService: PostsService,
    private collectionsService: CollectionsService,
    private surveysService: SurveysService,
    private listenerService: ListenerService,
    @Optional() override routerOutlet?: IonRouterOutlet,
  ) {
    super(router, platform, toastService, alertCtrl, networkService, routerOutlet, location);
    this.initToastMessageListener();
    this.initNetworkListener();
    this.listenerService.changeDeploymentListener();
    this.loadInitialData();
  }

  private initToastMessageListener() {
    this.toastMessage$.pipe(untilDestroyed(this)).subscribe((message) => {
      this.toastService.presentToast({ message });
    });
  }

  private loadInitialData() {
    this.getSurveys(false).subscribe();
    this.getCollections(false).subscribe();
  }

  private initNetworkListener() {
    this.networkService.networkStatus$
      .pipe(
        distinctUntilChanged(),
        filter((value) => value === true),
        untilDestroyed(this),
        concatMap(() => this.getCollections().pipe(delay(2000))),
        concatMap(() => this.getSurveys().pipe(delay(2000))),
        concatMap(() => from(this.checkPendingPosts()).pipe(delay(2000))),
      )
      .subscribe(async (result) => {
        if (result) await this.uploadPendingPosts();
      });
    this.networkService.networkStatus$
      .pipe(
        distinctUntilChanged(),
        filter((value) => value === true),
        untilDestroyed(this),
        concatMap(() => from(this.checkPendingCollections()).pipe(delay(2000))),
      )
      .subscribe(async (result) => {
        if (result) await this.uploadPendingCollections();
      });
  }

  private getCollections(isToast = true) {
    let params: any = new Map();
    params = {
      orderby: 'created',
      order: 'desc',
      q: '',
    };

    return this.collectionsService.getCollections(params).pipe(
      tap(async (response) => {
        await this.dataBaseService.set(STORAGE_KEYS.COLLECTIONS, response);
        if (isToast)
          this.toastMessage$.next(fieldAppMessages('app_component_get_collections_text'));
      }),
    );
  }

  private getSurveys(isToast = true) {
    return this.surveysService
      .getSurveys('', {
        page: 1,
        order: 'asc',
        limit: 0,
      })
      .pipe(
        tap(async (response) => {
          await this.dataBaseService.set(STORAGE_KEYS.SURVEYS, response.results);
          if (isToast) this.toastMessage$.next(fieldAppMessages('app_component_get_surveys_text'));
        }),
      );
  }

  async checkPendingPosts(): Promise<boolean> {
    const posts: any[] = await this.dataBaseService.get(STORAGE_KEYS.PENDING_POST_KEY);
    if (posts?.length)
      this.toastMessage$.next(fieldAppMessages('app_component_check_pending_posts_text'));
    return !!posts?.length;
  }

  async uploadPendingPosts() {
    const posts: any[] = await this.dataBaseService.get(STORAGE_KEYS.PENDING_POST_KEY);
    for (let post of posts) {
      if (post?.file?.upload)
        post = await new UploadFileHelper(this.mediaService).uploadFile(post, post.file);
      await firstValueFrom(this.postsService.post(post));
    }
    this.toastMessage$.next(fieldAppMessages('app_component_upload_pending_posts_text'));
    await this.dataBaseService.set(STORAGE_KEYS.PENDING_POST_KEY, []);
  }

  async checkPendingCollections(): Promise<boolean> {
    const coll: any[] = await this.dataBaseService.get(STORAGE_KEYS.PENDING_COLLECTIONS);
    if (coll?.length)
      this.toastMessage$.next(fieldAppMessages('app_component_check_pending_collections_text'));
    return !!coll?.length;
  }

  async uploadPendingCollections() {
    const pendingCollections: any[] = await this.dataBaseService.get(
      STORAGE_KEYS.PENDING_COLLECTIONS,
    );
    const observables = [...pendingCollections].map((item) => {
      if (item.action === 'add') {
        return this.collectionsService.addToCollection(item.collectionId, item.postId);
      } else {
        return this.collectionsService.removeFromCollection(item.collectionId, item.postId);
      }
    });
    forkJoin(observables).subscribe({
      next: async () => {
        this.toastMessage$.next(fieldAppMessages('app_component_upload_pending_collections_text'));
        await this.dataBaseService.set(STORAGE_KEYS.PENDING_COLLECTIONS, []);
      },
      error: ({ error }) => {
        console.error(error);
      },
    });
  }
}
