import { Suit, Face } from "./constants.js";

import type { Card } from "./types.js";

/**
 * Returns a face value for a card
 * @param card - Card
 */
export function getFaceValue([face]: Card) {
	return rankedFaces.indexOf(face) + 1;
}

/**
 * Returns a suit value for a card
 * @param card - Card
 */
export function getSuitValue([, suit]: Card) {
	return Object.values(Suit).indexOf(suit) + 1;
}

const rankedFaces = [...Object.values(Face).slice(1), Face.Ace];
