import type { Card, Suit } from "../card/types.js";

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

function createDeckValue(): Card[] {
	return [
		...createSuit("d"),
		...createSuit("c"),
		...createSuit("h"),
		...createSuit("s"),
	];
}

function createDeckNdo(): Card[] {
	return [
		...createSuit("h"),
		...createSuit("c"),
		...createSuit("d").reverse(),
		...createSuit("s").reverse(),
	];
}

function createSuit(suit: Suit): Card[] {
	return [
		`a${suit}`,
		`2${suit}`,
		`3${suit}`,
		`4${suit}`,
		`5${suit}`,
		`6${suit}`,
		`7${suit}`,
		`8${suit}`,
		`9${suit}`,
		`t${suit}`,
		`j${suit}`,
		`q${suit}`,
		`k${suit}`,
	];
}
