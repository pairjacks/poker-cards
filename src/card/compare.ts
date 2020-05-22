import { getFaceValue, getSuitValue } from './value';
import { Card } from './types'; // import type

/**
 * Determines if two cards are identical
 * @param a - Card
 * @param b - Card
 */
export const isSameCard = (a: Card, b: Card): boolean =>
  a[0] === b[0] && a[1] === b[1];

/**
 * Compares face values of cards
 * Returns 0 if face values are the same
 * Returns less than 0 if a is higher than b
 * Returns greater than 0 if b is higher than a
 * @param a - Card
 * @param b - Card
 */
export const compareFaces = (a: Card, b: Card): number =>
  getFaceValue(b) - getFaceValue(a);

/**
 * Compares suit values of cards
 * Returns 0 if suit values are the same
 * Returns less than 0 if a is higher than b
 * Returns greater than 0 if b is higher than a
 * @param a - Card
 * @param b - Card
 */
export const compareSuits = (a: Card, b: Card): number =>
  getSuitValue(b) - getSuitValue(a);

/**
 * Compares values of cards. This checks on suit as well so that cards
 * are predicatbly ordered for tests, etc
 * Returns 0 if values are the same
 * Returns less than 0 if a is higher than b
 * Returns greater than 0 if b is higher than a
 * @param a - Card
 * @param b - Card
 */
export const compareCards = (a: Card, b: Card): number =>
  compareFaces(a, b) || compareSuits(a, b);
