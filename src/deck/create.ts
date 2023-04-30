import { FACES, SUITS } from "../card/constants.js";

import type { Card, Cards, Suit } from "../card/types.js";

/**
 * Creates a 52 card deck without Jokers, sorted by suite and face.
 * Index 0 represents the top of a face down deck
 */
export function createDeck({ order = "ndo" }: CreateDeckOptions = {}) {
	switch (order) {
		case "ndo":
			return createDeckNdo();
		case "value":
			return createDeckValue();
		default:
			throw new Error(`Unknown deck order ${String(order)}`);
	}
}

export type DeckOrder = "ndo" | "value";

export type CreateDeckOptions = { order?: DeckOrder };

function createDeckValue(): Cards {
	return SUITS.flatMap(createSuit);
}

function createDeckNdo(): Cards {
	return [
		...createSuit("h"),
		...createSuit("c"),
		...createSuit("d").reverse(),
		...createSuit("s").reverse(),
	];
}

function createSuit(suit: Suit) {
	return FACES.map((face): Card => [face, suit]);
}
