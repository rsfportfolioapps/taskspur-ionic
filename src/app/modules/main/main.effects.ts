import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MainActionTypes, IsPILoadedAction, CardAction } from './main.actions';
import { tap } from 'rxjs/operators';


@Injectable()
export class MainEffects {

  constructor(private actions$: Actions) {}

  @Effect({ dispatch: false })
  public userInfo$ = this.actions$.pipe(
    ofType<IsPILoadedAction>(MainActionTypes.isPILoadedAction),
    tap(action => {
      localStorage.setItem("isProfileInfoLoaded", JSON.stringify(true))
    })
  )

  // @Effect({ dispatch: false })
  // public card$ = this.actions$.pipe(
  //   ofType<CardAction>(MainActionTypes.cardsAction),
  //   tap(action =>
  //     localStorage.setItem("cards", JSON.stringify(action.payload.cards))
  //   )
  // );
}
