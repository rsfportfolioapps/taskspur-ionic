import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output()
  public showSidebarEmitter = new EventEmitter<boolean>();

  public menus = [
    {
      text: "Dashboard",
      route: "/dashboard"
    },
    {
      text: "Calendar",
      route: "/calendar"
    },
    {
      text: "Cards",
      icon: "far fa-credit-card",
      route: "/cards"
    },
    {
      text: "Boards",
      icon: "far fa-clipboard-check",
      route: "/boards"
    },
    {
      text: "Finance",
      route: "/finance"
    },
    {
      text: "Support",
      route: "/support-tickets"
    },
    {
      text: "Help",
      route: "/help"
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void { }

  public navigate(route: string): void {
    this.router.navigateByUrl(route);
  }

  public gotoRoute(event: any, link: any): void {
    event.preventDefault();
    
    let links = Array.from(document.querySelectorAll(".router-link-item"));

    links.forEach(link => {
      link.classList.remove('active');
    });

    event.target.classList.add('active');
    this.router.navigateByUrl(link.route);
  }

  public toggleSidebar(): void {
    this.showSidebarEmitter.emit();
  }
}
