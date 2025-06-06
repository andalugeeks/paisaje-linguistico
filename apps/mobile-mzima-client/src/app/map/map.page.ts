import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService, SavedsearchesService } from '@mzima-client/sdk';
import { AlertService, IntercomService, NetworkService, SessionService } from '@services';
import { MainViewComponent } from './components/main-view.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { FeedViewComponent } from './components/feed-view/feed-view.component';
import { DraggableLayoutComponent } from './components/draggable-layout/draggable-layout.component';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
})
export class MapPage extends MainViewComponent implements OnDestroy {
  @ViewChild('layout') public layout: DraggableLayoutComponent;
  @ViewChild('map') public map: MapViewComponent;
  @ViewChild('feed') public feed: FeedViewComponent;
  public mode: number | 'fullscreen';
  public isConnection = true;
  private destroy$: Subject<void> = new Subject<void>();
  private getPost$: Subject<boolean> = new Subject<boolean>();
  OFFLINE_TILES = 200;

  constructor(
    protected override router: Router,
    protected override route: ActivatedRoute,
    protected override postsService: PostsService,
    protected override savedSearchesService: SavedsearchesService,
    protected override sessionService: SessionService,
    private networkService: NetworkService,
    private alertService: AlertService,
    private intercomService: IntercomService,
  ) {
    super(router, route, postsService, savedSearchesService, sessionService);
    this.route.params.subscribe(() => {
      this.initCollection();
    });
    this.$destroy.subscribe({
      next: (state: boolean) => {
        if (state) {
          this.map.destroy();
          this.feed.destroy();
        }
      },
    });

    this.getUserData();

    if (this.user) this.intercomService.registerUser(this.user);
  }

  loadData(): void {}

  override ionViewWillEnter() {
    this.layout.updateOffsetHeight();
    this.updateFilters();
    this.getPost$.next(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.initNetworkListener();
    this.initFilterListener();
    this.getPost$.pipe(debounceTime(500), takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.feed.updatePosts();
        this.map.reInitParams();
        this.map.getPostsGeoJson();
      },
    });
  }

  private initNetworkListener() {
    this.networkService.networkStatus$
      .pipe(distinctUntilChanged(), untilDestroyed(this))
      .subscribe({
        next: (value) => {
          this.isConnection = this.feed.isConnection = this.map.isConnection = value;
          if (this.isConnection) {
            this.getPost$.next(true);
          }
        },
      });
  }

  async clearStorage() {
    const result = await this.alertService.presentAlert({
      header: `Mapa Offline`,
      message: `El armaçenamiento der mobî contiene ${this.map.savedOfflineTiles} mapâ guardaô. ¿Quiêh limpiâh el armaçenamiento?`,
      buttons: [
        {
          text: 'Cançelâh',
          role: 'cancel',
        },
        {
          text: 'Limpiâh',
          role: 'confirm',
          cssClass: 'primary',
        },
      ],
    });

    if (result.role === 'confirm') {
      this.map.clearStorage();
    }
  }

  private initFilterListener() {
    this.postsService.postsFilters$.pipe(debounceTime(500), takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.getPost$.next(true);
      },
    });
  }

  public createPost() {
    this.router.navigate(['/post-edit']);
  }

  public refreshMapData() {
    // this.feed.totalPosts = 0;
    this.feed.posts = [];
    this.feed.isPostsLoading = true;
    this.postsService.postsFilters$.pipe(debounceTime(500), takeUntil(this.destroy$)).subscribe({
      next: () => {
        // this.getPost$.next(true);
        this.feed.updatePosts();
        this.map.reInitParams();
        this.map.getPostsGeoJson();
      },
    });
  }
}
