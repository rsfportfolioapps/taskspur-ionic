import { Action } from "@ngrx/store";
import { Board } from "../../models/board.model";
import { Card } from "primeng/primeng";

export enum MainActionTypes {
  isPILoadedAction = "[main] isPILoadedAction",
  selectedMenuAction = "[main] selectedMenu",
  cardsAction = "[main] cardMenu", /** <-- need to check if this  */
  boardsAction = "[main] boardsList"
}

export class IsPILoadedAction implements Action {
  readonly type = MainActionTypes.isPILoadedAction;

  constructor(public payload: { isPILoadedAction: boolean }) { }
}

export class SelectedMenuAction implements Action {
  readonly type = MainActionTypes.selectedMenuAction;

  constructor(public payload: { selectedMenuAction: string }) { }
}

export class CardAction implements Action {
  readonly type = MainActionTypes.cardsAction;

  constructor(public payload: { cards: Card[] }) { }
}

export class BoardsAction implements Action {
  readonly type = MainActionTypes.boardsAction;

  constructor(public payload: { boards: Board[] }) { }
}

export type MainActions = IsPILoadedAction | SelectedMenuAction | CardAction | BoardsAction;
