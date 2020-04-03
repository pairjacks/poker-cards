import { Suit, Face } from './constants';
import { Card } from './types'; // import type

export const getSuitValue = ({ suit }: Card) =>
  Object.values(Suit).indexOf(suit) + 1;

export const getFaceValue = ({ face }: Card) =>
  Object.values(Face).indexOf(face) + 1;
