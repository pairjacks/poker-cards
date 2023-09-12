import { getFaceValue, getSuitValue } from "./value.js";

import type { Card } from "./types.js";

/**
 * Determines if two cards are identical
 * @param a - Card
 * @param b - Card
 */
export function isSameCard(a: Card, b: Card) {
	return a[0] === b[0] && a[1] === b[1];
}

/**
 * Compares face values of cards
 * Returns 0 if face values are the same
 * Returns less than 0 if a is higher than b
 * Returns greater than 0 if b is higher than a
 * @param a - Card
 * @param b - Card
 */
export function compareFaces(a: Card, b: Card) {
	return getFaceValue(b) - getFaceValue(a);
}

/**
 * Compares suit values of cards
 * Returns 0 if suit values are the same
 * Returns less than 0 if a is higher than b
 * Returns greater than 0 if b is higher than a
 * @param a - Card
 * @param b - Card
 */
export function compareSuits(a: Card, b: Card) {
	return getSuitValue(b) - getSuitValue(a);
}

/**
 * Compares values of cards. This checks on suit as well so that cards
 * are predicatbly ordered for tests, etc
 * Returns 0 if values are the same
 * Returns less than 0 if a is higher than b
 * Returns greater than 0 if b is higher than a
 * @param a - Card
 * @param b - Card
 */
export function compareCards(a: Card, b: Card) {
	return compareFaces(a, b) || compareSuits(a, b);
}
