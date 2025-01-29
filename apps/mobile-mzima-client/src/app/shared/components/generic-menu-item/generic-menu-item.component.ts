import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { genericMenu } from '@constants';
import { LocalStorageManager } from '@helpers';

@Component({
  selector: 'app-generic-menu-item',
  templateUrl: './generic-menu-item.component.html',
  styleUrls: ['./generic-menu-item.component.scss'],
})
export class GenericMenuItemComponent {
  @Input() menuItem: genericMenu.GenericMenuItem;
  @Output() action = new EventEmitter<genericMenu.GenericMenuActions>();
  public LocalStorageManager = LocalStorageManager;

  constructor(private router: Router) {}

  public handleClick(): void {
    const action = this.menuItem.action;
    if (action) {
      this.action.emit(action);
    } else {
      // window.open('https://pao-andalu.com/', '_blank').focus();
      window.open(this.menuItem.url, '_blank');
      // this.router.navigate([this.menuItem.route]);
    }
  }
}
