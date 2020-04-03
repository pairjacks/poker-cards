import { Face, Suit } from '../card/constants';
import { Card } from '../card/types'; // type

const getSuitValue = ({ suit }: Card) => Object.values(Suit).indexOf(suit) + 1;

export const getFaceValue = ({ face }: Card) =>
  Object.values(Face).indexOf(face) + 1;

export const compareFaces = (a: Card, b: Card) =>
  getFaceValue(b) - getFaceValue(a);

export const compareSuits = (a: Card, b: Card) =>
  getSuitValue(b) - getSuitValue(a);

export const compareCards = (a: Card, b: Card) =>
  compareFaces(a, b) || compareSuits(a, b);
