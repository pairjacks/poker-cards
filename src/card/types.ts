import { Suit, Face } from './constants'; // import type

export type Card = readonly [Face, Suit];

export type Cards = readonly Card[];
