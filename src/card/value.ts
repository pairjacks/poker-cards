import { Suit, Face } from './constants';
import { Card } from './types'; // import type

/**
 * Returns a face value for a card
 * @param card - Card
 */
export const getFaceValue = ([face]: Card): number =>
  Object.values(Face).indexOf(face) + 1;

/**
 * Returns a suit value for a card
 * @param card - Card
 */
export const getSuitValue = ([, suit]: Card): number =>
  Object.values(Suit).indexOf(suit) + 1;
