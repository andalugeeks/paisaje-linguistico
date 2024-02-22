import { Component } from '@angular/core';

@Component({
  selector: 'app-offline-notification',
  template: `
    <p class="offline-notification">Êtte contenío no êttá dîpponible pa çêh biçualiçao</p>
  `,
  styles: [
    '.offline-notification { padding: 5px; font-size: 12px; color: var(--color-primary-40);}',
  ],
})
export class OfflineNotificationComponent {}
