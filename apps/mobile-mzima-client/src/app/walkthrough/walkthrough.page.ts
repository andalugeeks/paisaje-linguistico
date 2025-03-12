import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicSlides } from '@ionic/angular';

import { STORAGE_KEYS, WalkthroughSlider } from '@constants';
import { DeploymentService, StorageService } from '@services';
import { LocalStorageManager, fieldAppMessages } from '@helpers';

import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: ['./walkthrough.page.scss'],
})
export class WalkthroughPage {
  @ViewChild('swiperContainer') swiperEl: ElementRef | undefined;
  public fieldAppMessages = fieldAppMessages;
  public swiperModules = [IonicSlides];
  public sliderData = WalkthroughSlider;
  public isLastSlide = false;
  public activeSlide = 0;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private deploymentService: DeploymentService,
  ) {
    // Añadido para que cada slider coja su traducción.
    this.sliderData = this.getWalkthroughSliderData();
  }

  public slideNext() {
    this.swiperEl?.nativeElement.swiper.slideNext();
  }

  public slideChanged() {
    this.isLastSlide = this.swiperEl?.nativeElement.swiper.isEnd;
    this.activeSlide = this.swiperEl?.nativeElement.swiper.activeIndex;
  }

  public finish() {
    this.storageService.setStorage(STORAGE_KEYS.INTRO_DONE, 'yes');
    this.deploymentService.isDeployment()
      ? this.router.navigate(['/'])
      : this.router.navigate(['/deployment']);
  }

  // Añadido para el sistema de traducción.
  public getWalkthroughSliderData(): any {
    const res = [];

    for (let i = 0; i < WalkthroughSlider?.length; i++) {
      res.push({
        img: WalkthroughSlider[i].img,
        title:
          WalkthroughSlider[i].title[
            LocalStorageManager.getStoredSpellingProposalId() == 'pao'
              ? 'pao'
              : LocalStorageManager.getStoredSpellingProposalId() == 'nota'
              ? 'nota'
              : LocalStorageManager.getStoredSpellingProposalId() == 'epa'
              ? 'epa'
              : 'cas'
          ],
        description:
          WalkthroughSlider[i].description[
            LocalStorageManager.getStoredSpellingProposalId() == 'pao'
              ? 'pao'
              : LocalStorageManager.getStoredSpellingProposalId() == 'nota'
              ? 'nota'
              : LocalStorageManager.getStoredSpellingProposalId() == 'epa'
              ? 'epa'
              : 'cas'
          ],
      });
    }

    return res;
  }
}
