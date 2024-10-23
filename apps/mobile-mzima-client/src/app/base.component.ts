import { Optional } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet, Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';
import { Dialog } from '@capacitor/dialog';
import { NativeSettings, IOSSettings } from 'capacitor-native-settings';

import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged } from 'rxjs';
import { NetworkService, ToastService } from '@services';
import { Location } from '@angular/common';
import { fieldAppMessages } from '@helpers';

export class BaseComponent {
  public fieldAppMessages = fieldAppMessages;
  tap = 0;

  constructor(
    protected router: Router,
    protected platform: Platform,
    protected toastService: ToastService,
    protected alertCtrl: AlertController,
    protected networkService: NetworkService,
    @Optional() protected routerOutlet?: IonRouterOutlet,
    @Optional() protected location?: Location,
  ) {
    this.platform.ready().then(async () => {
      if (this.platform.is('hybrid')) {
        this.listenToNetworkStatus();
        this.exitAppOnDoubleTap();
      }
      this.logDeviceInfo();
    });

    if (this.platform.is('capacitor')) {
      StatusBar.setOverlaysWebView({ overlay: true });

      const mediaDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
      this.setStatusBarColor(mediaDarkMode.matches);
      mediaDarkMode.addEventListener('change', (ev) => {
        this.setStatusBarColor(ev.matches);
      });
    }
  }

  private setStatusBarColor(isDark: boolean): void {
    StatusBar.setStyle({ style: isDark ? Style.Dark : Style.Light });
  }

  private async logDeviceInfo() {
    const info = await Device.getInfo();

    const showConfirm = async () => {
      const { value } = await Dialog.confirm({
        title: fieldAppMessages('base_components_confirm_dialog_title'),
        message: fieldAppMessages('base_components_confirm_dialog_message'),
      });

      if (value) {
        NativeSettings.openIOS({
          option: IOSSettings.SoftwareUpdate,
        });
      }
    };

    const osArray = info.osVersion.split('.');
    const intOSVersion = parseInt(`${osArray[0]}0${osArray[1]}`);

    if (info.platform === 'ios' && intOSVersion < 1605) {
      await showConfirm();
    }
  }

  async listenToNetworkStatus() {
    this.networkService.networkStatus$
      .pipe(distinctUntilChanged(), untilDestroyed(this))
      .subscribe({
        next: async (value) => {
          await this.showConnectionInfo(
            value
              ? fieldAppMessages('base_components_network_status_text_1')
              : fieldAppMessages('base_components_network_status_text_2'),
          );
        },
      });
  }

  async showConnectionInfo(message: string) {
    await this.toastService.presentToast({
      message,
      duration: 0,
      icon: 'globe',
    });
  }

  exitAppOnDoubleTap() {
    const urls = ['/', '/deployment'];
    if (Capacitor.getPlatform() === 'android') {
      this.platform.backButton.subscribeWithPriority(10, async () => {
        if (urls.includes(this.router.url)) {
          if (!this.routerOutlet?.canGoBack()) {
            this.tap++;
            if (this.tap === 2) await App.exitApp();
            else this.doubleTapExistToast();
          }
        } else {
          this.location?.back();
        }
      });
    }
  }

  async doubleTapExistToast() {
    const result = await this.toastService.presentToast({
      message: fieldAppMessages('base_components_double_tap_toast_message'),
      buttons: [],
    });
    if (result) {
      this.tap = 0;
    }
  }
}
