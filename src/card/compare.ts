import { getCardValue } from "./value.js";

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
 * Compares values of cards
 * Returns 0 if values are the same
 * Returns less than 0 if a is higher than b
 * Returns greater than 0 if b is higher than a
 * @param a - Card
 * @param b - Card
 */
export function compareCards(a: Card, b: Card) {
	return getCardValue(b) - getCardValue(a);
}
