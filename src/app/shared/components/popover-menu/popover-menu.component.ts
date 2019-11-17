import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../modules/auth/auth.reducer';
import { Logout } from '../../../modules/auth/auth.actions';

@Component({
  selector: 'app-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss']
})
export class PopoverMenuComponent {
  public menus = [
    {
      text: "My Profile",
      icon: "far fa-user",
      route: "/profile"
    },
    {
      text: "Settings",
      icon: "fas fa-cog",
      route: "/settings"
    }
  ];

  constructor(private router: Router, public popoverCtrl: PopoverController, private store: Store<AuthState>) {}

  public onRoute(route: string) {
    this.popoverCtrl.dismiss();
    this.router.navigateByUrl(route);
  }

  public onLogout(): void {
    this.popoverCtrl.dismiss();
    this.store.dispatch(new Logout());
  }
}
