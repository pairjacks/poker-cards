import { Card } from './types';

export const isSameCard = (a: Card, b: Card) =>
  a.face === b.face && a.suite === b.suite;
