import { getCardValue } from "./value.ts";

import type { Card } from "./types.ts";

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
