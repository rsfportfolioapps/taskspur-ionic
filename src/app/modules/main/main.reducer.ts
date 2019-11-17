
import { MainActions, MainActionTypes } from './main.actions';
import { Board } from '../../models/board.model';

export interface MainState {
  IsProfileInfoLoaded?: Boolean,
  SelectedMenuAction?: string,
  boards?: Board[]
  cards?: any[]
}

export const initialMainState: MainState = {
  IsProfileInfoLoaded: false,
  SelectedMenuAction: undefined,
  cards: undefined,
  boards: undefined
};

export function mainReducer(state = initialMainState, action: MainActions): MainState {
  switch (action.type) {
    case MainActionTypes.isPILoadedAction:
      return { IsProfileInfoLoaded: action.payload.isPILoadedAction };

    case MainActionTypes.selectedMenuAction:
      return { SelectedMenuAction: action.payload.selectedMenuAction };

    case MainActionTypes.cardsAction:
      return Object.assign({}, state, {
        cards: action.payload.cards
      });

    case MainActionTypes.boardsAction:
      return Object.assign({}, state, {
        boards: action.payload.boards
      });

    default:
      return state;
  }
}
