import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from '@services';
import { fieldAppMessages } from '@helpers';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.scss'],
})
export class ProfilePhotoComponent {
  @Input() photo: string;
  @Output() deletePhoto = new EventEmitter();
  @Output() changePhoto = new EventEmitter();
  public fieldAppMessages = fieldAppMessages;

  constructor(private alertService: AlertService) {}

  public uploadNewPhoto(): void {
    console.log('uploadNewPhoto');
    this.changePhoto.emit();
  }

  public async deletePhotoHandle(): Promise<void> {
    const result = await this.alertService.presentAlert({
      header: fieldAppMessages('profile_photo_component_delete_photo_alert_header'),
      message: fieldAppMessages('profile_photo_component_delete_photo_alert_message'),
      buttons: [
        {
          text: fieldAppMessages('profile_photo_component_delete_photo_alert_cancel_text'),
          role: 'cancel',
        },
        {
          text: fieldAppMessages('profile_photo_component_delete_photo_alert_confirm_text'),
          role: 'confirm',
          cssClass: 'danger',
        },
      ],
    });

    if (result.role === 'confirm') {
      this.deletePhoto.emit();
    }
  }
}
