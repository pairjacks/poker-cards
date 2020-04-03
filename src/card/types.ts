import { Suit, Face } from './constants'; // import type

export interface Card {
  readonly suit: Suit;
  readonly face: Face;
}

export type Cards = readonly Card[];
