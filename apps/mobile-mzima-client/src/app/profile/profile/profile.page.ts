import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE_KEYS, profileMenu } from '@constants';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fieldAppMessages } from '@helpers';
import {
  AlertService,
  AuthService,
  DatabaseService,
  IntercomService,
  SessionService,
} from '@services';

interface SupportItem {
  title: string;
  description: string;
  action: () => NonNullable<unknown>;
}

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage {
  public profileMenu: profileMenu.ProfileMenuItem[] = profileMenu.profileMenu;
  public aboutUsMenu = profileMenu.aboutUsMenu;
  public profileInformationMenu = profileMenu.profileInformationMenu;
  public isSupportModalOpen = false;
  public isSupportModalSearchView = false;
  public supportSearchQuery = '';
  public fieldAppMessages = fieldAppMessages;
  public supportItems: SupportItem[] = [];
  public filteredSupportItems: SupportItem[] = this.supportItems;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private authService: AuthService,
    private alertService: AlertService,
    private dataBaseService: DatabaseService,
    private intercomService: IntercomService,
  ) {
    this.sessionService
      .getCurrentUserData()
      .pipe(untilDestroyed(this))
      .subscribe((userData) => {
        this.profileMenu = profileMenu.profileMenu.filter(
          (i) => i.isLoggedGuard === undefined || i.isLoggedGuard === !!userData.userId,
        );
        if (userData.userId)
          this.supportItems.push(<SupportItem>{
            title: 'Intercom',
            description: 'Contact Ushahidi staff for chat support',
            action: () => {
              this.intercomService.displayMessenger();
            },
          });
      });
  }

  public goTo(route: any[]): void {
    this.router.navigate(route);
  }

  public callAction(action: profileMenu.ProfileMenuActions): void {
    const actions: Record<profileMenu.ProfileMenuActions, () => void> = {
      [profileMenu.ProfileMenuActions.LOGOUT]: () => this.logout(),
      [profileMenu.ProfileMenuActions.SUPPORT]: () => this.showSupportModal(),
      // [profileMenu.ProfileMenuActions.RESET_DATA]: () => this.resetAppData(),
      // [profileMenu.ProfileMenuActions.CLEAR_PENDING_POSTS]: () => this.clearPosts(),
    };
    actions[action]();
  }

  private async logout(): Promise<void> {
    const result = await this.alertService.presentAlert({
      header: fieldAppMessages('profile_page_logout_alert_header'),
      message: fieldAppMessages('profile_page_logout_alert_message'),
      buttons: [
        {
          text: fieldAppMessages('profile_page_logout_cancel_button_text'),
          role: 'cancel',
        },
        {
          text: fieldAppMessages('profile_page_logout_confirm_button_text'),
          role: 'confirm',
          cssClass: 'danger',
        },
      ],
    });

    if (result.role === 'confirm') {
      this.authService.logout();
    }
  }

  private async showSupportModal(): Promise<void> {
    this.isSupportModalOpen = true;
  }

  private async clearPosts(): Promise<void> {
    const result = await this.alertService.presentAlert({
      header: fieldAppMessages('profile_page_clear_posts_alert_header'),
      message: fieldAppMessages('profile_page_clear_posts_alert_message'),
      buttons: [
        {
          text: fieldAppMessages('profile_page_clear_posts_cancel_button_text'),
          role: 'cancel',
        },
        {
          text: fieldAppMessages('profile_page_clear_posts_confirm_button_text'),
          role: 'confirm',
          cssClass: 'danger',
        },
      ],
    });

    if (result.role === 'confirm') {
      await this.dataBaseService.set(STORAGE_KEYS.PENDING_POST_KEY, []);
      this.router.navigate(['/']);
    }
  }

  private async resetAppData(): Promise<void> {
    const result = await this.alertService.presentAlert({
      header: fieldAppMessages('profile_page_reset_app_data_alert_header'),
      message: fieldAppMessages('profile_page_reset_app_data_alert_message'),
      buttons: [
        {
          text: fieldAppMessages('profile_page_reset_app_data_cancel_button_text'),
          role: 'cancel',
        },
        {
          text: fieldAppMessages('profile_page_reset_app_data_confirm_button_text'),
          role: 'confirm',
          cssClass: 'danger',
        },
      ],
    });

    if (result.role === 'confirm') {
      localStorage.clear();
      this.authService.logout();
      this.dataBaseService.clear();
      this.router.navigate(['/walkthrough']);
    }
  }

  public showSearchResults(): void {
    this.isSupportModalSearchView = true;
  }

  public hideSearchResults(): void {
    this.isSupportModalSearchView = false;
  }

  public resetSearchForm(): void {
    this.supportSearchQuery = '';
  }
}
