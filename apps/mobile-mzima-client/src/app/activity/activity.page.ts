import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { fieldAppMessages } from '@helpers';

@Component({
  selector: 'app-activity',
  templateUrl: 'activity.page.html',
  styleUrls: ['activity.page.scss'],
})
export class ActivityPage {
  public fieldAppMessages = fieldAppMessages;
  constructor(private location: Location) {}

  public back(): void {
    this.location.back();
  }
}
