import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Board } from '../../../../models/board.model';
import { MessageService } from 'primeng/api';
import * as _ from 'lodash';
import { Store, select } from '@ngrx/store';
import { MainService } from '../../main.service';
import { Member } from '../../../../models/member.model';
import { BoardsAction } from '../../main.actions';
import { boardListSelector } from '../../main.selector';
import { Router } from '@angular/router';
import { BoardGenericPageComponent } from '../../../+generics/board-generic-page.component';
import { MainState } from '../../main.reducer';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent extends BoardGenericPageComponent implements OnInit, AfterViewInit {
  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: '/dashboard'
    },
    {
      text: "Board",
      path: ''
    }
  ];
  public boards: Board[];
  public members: Member[] = [
    {
      name: 'Jacky Walkers',
      title: 'Owner',
      lastActiveDate: 'Jan 10, 2019 6:00PM',
      imgUrl: '/assets/images/sample/m1.png'
    },
    {
      name: 'George Murphy',
      title: 'Member',
      lastActiveDate: 'Jan 10, 2019 6:00PM',
      imgUrl: '/assets/images/sample/m2.png'
    },
    {
      name: 'Richard Cramp',
      title: 'Member',
      lastActiveDate: 'Jan 10, 2019 6:00PM',
      imgUrl: '/assets/images/sample/m3.png'
    },
    {
      name: 'John Abbott',
      title: 'Member',
      lastActiveDate: 'Jan 10, 2019 6:00PM',
      imgUrl: '/assets/images/sample/m3.png'
    },
    {
      name: 'George Murphy',
      title: 'Member',
      lastActiveDate: 'Jan 10, 2019 6:00PM',
      imgUrl: '/assets/images/sample/m2.png'
    }
  ]
  public filterBoards: any = [];
  public filtered: Board[] = [];
  public selectedItemsLabel = "{0} Boards selected";
  public filterPlaceHolder = "Search Board";
  public defaultLabel = "Select Board";
  public deleteId: number;
  public membersDisplay: boolean = false;

  constructor(
    mainService: MainService,
    store: Store<MainState>,
    private router: Router,
    private _mainService: MainService,
    private _store: Store<MainService>,
    private messageService: MessageService,
    private cdRef: ChangeDetectorRef
  ) {
    super(mainService, store);
  }

  ngOnInit(): void {
    this._store.pipe(select(boardListSelector)).subscribe(response => {
      if (response) {
        this.boards = response;

        this.filterBoards = [];
        this.boards.forEach(board => {
          this.filterBoards.push({ label: board.name, value: board.name });
        });
      }
    })
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  public onFilterByBoards(event: any): void {
    if (this.boards) {
      this.filtered = _.filter(this.boards, (v) => _.includes(event.value, v.name)); //filter boards 
    }
  }

  public onDisplayMembers(): void {
    this.membersDisplay = !this.membersDisplay;
  }

  public onDisplayNewBoard() {
    this.router.navigateByUrl('/new-board');
  }
}
