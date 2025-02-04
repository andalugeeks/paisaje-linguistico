import { Component } from '@angular/core';
import { fieldAppMessages } from '@helpers';

@Component({
  selector: 'app-offline-notification',
  template: `
    <p class="offline-notification">
      {{ fieldAppMessages('offline_notification_component_instructions') }}
    </p>
  `,
  styles: [
    '.offline-notification { padding: 5px; font-size: 12px; color: var(--color-primary-40);}',
  ],
})
export class OfflineNotificationComponent {
  public fieldAppMessages = fieldAppMessages;
}
