import { Suit, Face } from './constants'; // type

export interface Card {
  readonly suit: Suit;
  readonly face: Face;
}

export type Cards = readonly Card[];
