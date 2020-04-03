import { getFaceValue, getSuitValue } from './value';
import { Card } from './types'; // import type

export const isSameCard = (a: Card, b: Card) =>
  a.face === b.face && a.suit === b.suit;

export const compareFaces = (a: Card, b: Card) =>
  getFaceValue(b) - getFaceValue(a);

export const compareSuits = (a: Card, b: Card) =>
  getSuitValue(b) - getSuitValue(a);

export const compareCards = (a: Card, b: Card) =>
  compareFaces(a, b) || compareSuits(a, b);
