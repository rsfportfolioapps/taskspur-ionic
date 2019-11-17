import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: [ './breadcrumbs.component.scss' ]
})
export class BreadcrumbsComponent implements OnInit {
  @Input() breadcrumbs: any[] = [];
  
  private dtTime: any;
  public currDateTime: string = moment().format('h:mm:ss a');

  constructor(private router: Router) {}

  ngOnInit(): void {
    moment.locale();
    this.dtTime = interval(1000)
    .subscribe((val) => { this.currDateTime = moment().format('h:mm:ss a')});
  }
  
  public goToBreadcrumb(path: string) {
    this.router.navigate([path]);
  }
}
