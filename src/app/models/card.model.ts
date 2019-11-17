export interface Card {
  id?: number;
  boardId: number;
  name: string;
  details: string;
  important: boolean;
  urgent: boolean;
  system: boolean;
  expectedCompletion: string;
  status: number;
  point: number;
  members: any[];
  cardComments: any[];
  files: any[];
}

export enum CardStatus {
  Later = 1,
  Today = 2,
  Doing = 3,
  Done = 4
}

export enum CardPoint {
  Easy = 1,
  Normal = 2,
  Complex = 3,
  Tricky = 4,
  Challenging = 5
}