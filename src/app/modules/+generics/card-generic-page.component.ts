import { MainService } from '../main/main.service';
import { Store } from '@ngrx/store';
import { MainState } from '../main/main.reducer';
import { CardAction } from '../main/main.actions';

export abstract class CardGenericPageComponent {
  constructor(private mainService: MainService, private store: Store<MainState>) { 
    this.mainService.getCards().subscribe(response => {
      this.store.dispatch(new CardAction({ cards: response }));
    });
  }

  ngOnInit(): void { }
}
