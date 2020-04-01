import { Suit, Face } from './constants'; // type

export type Deck = Cards;

export type Card = Readonly<{ suit: Suit; face: Face }>;

export type Cards = readonly Card[];

export type Comparator<T> = (a: T, b: T) => number;
