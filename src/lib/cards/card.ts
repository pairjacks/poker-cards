import { Card } from './types';

export const isSameCard = (a: Card, b: Card) =>
  a.face === b.face && a.suit === b.suit;
