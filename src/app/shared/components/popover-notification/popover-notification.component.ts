import { Component, OnInit } from '@angular/core';
import { NotificationDropdownMenuLink } from "../../../models/dropdown.model";

@Component({
  selector: 'app-popover-notification',
  templateUrl: './popover-notification.component.html',
  styleUrls: ['./popover-notification.component.scss']
})
export class PopoverNotificationComponent implements OnInit {

  public notificationDropdownMenuLink: NotificationDropdownMenuLink[] = [
    {
      text: "28 Cards to be played today",
      icon: "far fa-credit-card",
      action: "Let's Play",
      bgColor: "card-blue",
      route: "/cards"
    },
    {
      text: "You have 2 Games updates",
      icon: "fas fa-gamepad",
      action: "View Games",
      bgColor: "expenses-yellow",
      route: "/games"
    },
    {
      text: "3 New Accounts added",
      icon: "far fa-user",
      action: "View Accounts",
      bgColor: "tickets-green",
      route: "/support-tickets"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
