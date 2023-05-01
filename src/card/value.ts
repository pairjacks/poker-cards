import { FACE_VALUE, SUIT_VALUE } from "./constants.js";

import type { Card, Face, Suit } from "./types.js";

/**
 * Returns a card face
 * @param card - Card
 */
export function getCardFace(card: Card) {
	const face = card.charAt(0) as Face;

	assertFace(face);

	return face;
}

/**
 * Returns a card suit
 * @param card - Card
 */
export function getCardSuit(card: Card) {
	const suit = card.charAt(1);

	assertSuit(suit);

	return suit;
}

/**
 * Returns a ranking value for a card
 * @param card - Card
 */
export function getCardValue(card: Card) {
	return FACE_VALUE[getCardFace(card)];
}

function assertFace(char: string): asserts char is Face {
	if (!(char in FACE_VALUE)) throw new Error(`invalid face ${char}`);
}

function assertSuit(char: string): asserts char is Suit {
	if (!(char in SUIT_VALUE)) throw new Error(`invalid suit ${char}`);
}
