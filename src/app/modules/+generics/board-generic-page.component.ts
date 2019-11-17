import { MainService } from '../main/main.service';
import { Store } from '@ngrx/store';
import { MainState } from '../main/main.reducer';
import { BoardsAction } from '../main/main.actions';

export abstract class BoardGenericPageComponent {
  constructor(private mainService: MainService, private store: Store<MainState>) { 
    this.mainService.getBoards().subscribe(response => {
      this.store.dispatch(new BoardsAction({ boards: response }));
    });
  }

  ngOnInit(): void { }
}
