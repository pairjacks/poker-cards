import type { Card, Face } from "./types.js";

/**
 * Returns a face value for a card
 * @param card - Card
 */
export function getCardValue([face]: Card) {
	return faceValues[face];
}

const faceValues = {
	2: 1,
	3: 2,
	4: 3,
	5: 4,
	6: 5,
	7: 6,
	8: 7,
	9: 8,
	t: 9,
	j: 10,
	q: 11,
	k: 12,
	a: 13,
} satisfies { [key in Face]: number };
