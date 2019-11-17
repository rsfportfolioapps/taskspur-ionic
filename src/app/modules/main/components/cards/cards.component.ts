import { Component, OnInit } from '@angular/core';
import { Card, CardStatus } from '../../../../models/card.model';
import { MainService } from '../../main.service';
import * as _ from 'lodash';
import { CardGenericPageComponent } from '../../../+generics/card-generic-page.component';
import { Store, select } from '@ngrx/store';
import { MainState } from '../../main.reducer';
import { cardListSelector, cardBoardListSelector } from '../../main.selector';
import { Board } from '../../../../models/board.model';
import { getCardStatus } from '../../../../shared/functions/card-status.func';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent extends CardGenericPageComponent implements OnInit {
  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: '/dashboard'
    },
    {
      text: 'Cards',
      path: ''
    }
  ];

  public selectedItemsLabel = "{0} Boards selected";
  public filterPlaceHolder = "Search Board";
  public defaultLabel = "Select Board";
  public newBoardDisplay: boolean = false;
  public newCardDisplay: boolean = false;
  public collapsed: boolean = false;
  public cards: Card[];
  public initialCards: Card[] = [];
  public filterBoards: any = [];
  public boardFilters: any = [];
  public boards: Board[];
  public cardStatus: any[] = getCardStatus();

  constructor(mainService: MainService, store: Store<MainState>,
    private _store: Store<MainState>) {
    super(mainService, store);
  }

  ngOnInit(): void {
    this._store.pipe(select(cardBoardListSelector)).subscribe(response => {
      if (response.cards) {
        this.cards = response.cards;
        this.initialCards = response.cards;
      }

      if (response.boards) {
        this.boards = response.boards;

        this.boardFilters = [];
        this.boards.forEach(board => {
          this.boardFilters.push({ label: board.name, value: board.id });
        });
      }
    })
  }

  public getStatusByCards(cards: Card[], status: number): Card[] {
    return cards.filter(s => s.status === status);
  }

  public onSearch(searchTerm: string): void {
    this.initialCards = _.filter(this.cards, (card) => {
      return card.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  public onFilterCardByBoards(event: any): void {
    this.initialCards = _.filter(this.cards, (v) => _.includes(event.value, v.boardId));
    this.initialCards = event.value.length === 0 ? this.cards : this.initialCards;
  }

  public getStatusCards(status: number): Card[] {
    return this.initialCards.filter(s => s.status === status);
  }

  public onDisplayNewBoard(): void {
    this.newBoardDisplay = !this.newBoardDisplay;
  }

  public onDisplayNewCard(): void {
    this.newCardDisplay = !this.newCardDisplay;
  }
}

