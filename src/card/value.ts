import { Suit, Face } from './constants';
import { Card } from './types'; // import type

export const getFaceValue = ([face]: Card) =>
  Object.values(Face).indexOf(face) + 1;

export const getSuitValue = ([, suit]: Card) =>
  Object.values(Suit).indexOf(suit) + 1;
