import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverMenuComponent } from '../popover-menu/popover-menu.component';
import { PopoverNotificationComponent } from '../popover-notification/popover-notification.component';
import { MainService } from "../../../modules/main/main.service";
import { UserProfile } from "../../../models/user.model";
import { IsPILoadedAction } from "../../../modules/main/main.actions";
import { environment } from "../../../../environments/environment";
import { Store } from "@ngrx/store";
import { MainState } from "../../../modules/main/main.reducer";

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent {

  public profileInfo: UserProfile = null;

  constructor(public popoverCtrl: PopoverController,
              private mainService: MainService,
              private store: Store<MainState>) 
  {
    this.mainService.getProfile().subscribe(response => {
      this.profileInfo = response.user;

      if(this.profileInfo.profilePhoto.url == null) {
        this.profileInfo.profilePhoto.url = `${environment.baseUrl}/api/account/profile/avatar.png?email=${this.profileInfo.userName}&size=420`;
      }

      this.store.dispatch(new IsPILoadedAction({ isPILoadedAction: true }));
    });
  
  }


  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverMenuComponent,
      event
    });
    await popover.present();
  }

  async notificationPopover() {

    const popover = await this.popoverCtrl.create({
      component: PopoverNotificationComponent,
      cssClass: "notification-popover",
      showBackdrop: false,
      animated: false
      });
    await popover.present();
  }
}
