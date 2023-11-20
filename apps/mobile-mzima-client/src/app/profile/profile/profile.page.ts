import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE_KEYS, profileMenu } from '@constants';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
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
  public profileInformationMenu = profileMenu.profileInformationMenu;
  public isSupportModalOpen = false;
  public isSupportModalSearchView = false;
  public supportSearchQuery = '';
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
      header: 'Cerrar Sesión',
      message:
        '¿Está seguro de que desea cerrar la sesión de la aplicación? Esta acción finalizará su sesión actual y deberá volver a iniciar sesión para acceder a su cuenta.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
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
      header: 'Borrar Posts Pendientes?',
      message:
        '¿Estás seguro de que quieres borrar los mensajes pendientes? Esta acción no se puede deshacer y eliminará permanentemente todos los mensajes pendientes del sistema.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Borrar',
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
      header: '¿Limpiar datos de la App?',
      message:
        '¿Estás seguro de que quieres borrar los datos de la App? Esta acción eliminará toda la información almacenada en caché. Ten en cuenta que también se cerrará tu sesión y se borrará de tu dispositivo cualquier dato almacenado localmente, incluidos los ajustes y las preferencias. Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Limpiar',
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
