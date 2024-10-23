import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { profileMenu } from '@constants';
import { LocalStorageManager } from '@helpers';

@Component({
  selector: 'app-profile-menu-item',
  templateUrl: './profile-menu-item.component.html',
  styleUrls: ['./profile-menu-item.component.scss'],
})
export class ProfileMenuItemComponent {
  @Input() menuItem: profileMenu.ProfileMenuItem;
  @Output() action = new EventEmitter<profileMenu.ProfileMenuActions>();
  public LocalStorageManager = LocalStorageManager;

  constructor(private router: Router) {}

  public handleClick(): void {
    const action = this.menuItem.action;
    if (action) {
      this.action.emit(action);
    } else if (this.menuItem.url != null) {
      window.open(this.menuItem.url, '_blank');
    } else {
      this.router.navigate([this.menuItem.route]);
    }
  }
}
