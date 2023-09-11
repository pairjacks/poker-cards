import { FACE, SUIT } from "./constants.js";

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

const FACE_VALUE: { [key in Face]: number } = {
	[FACE.Two]: 1,
	[FACE.Three]: 2,
	[FACE.Four]: 3,
	[FACE.Five]: 4,
	[FACE.Six]: 5,
	[FACE.Seven]: 6,
	[FACE.Eight]: 7,
	[FACE.Nine]: 8,
	[FACE.Ten]: 9,
	[FACE.Jack]: 10,
	[FACE.Queen]: 11,
	[FACE.King]: 12,
	[FACE.Ace]: 13,
};

const SUIT_VALUE: { [key in Suit]: number } = {
	[SUIT.Diamonds]: 1,
	[SUIT.Clubs]: 1,
	[SUIT.Hearts]: 1,
	[SUIT.Spades]: 1,
};
