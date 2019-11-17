import { createSelector } from "@ngrx/store";

export const mainSelectorState = (state) => state.main;

export const profileInfoSelector = createSelector(
  mainSelectorState,
  profileInfo => profileInfo,
  user => user
);

export const cardBoardListSelector = createSelector(
  mainSelectorState,
  boards => boards,
  cards => cards
)

export const cardListSelector = createSelector(
  mainSelectorState,
  state => state.cards
)

export const boardListSelector = createSelector(
  mainSelectorState,
  state => state.boards
)
