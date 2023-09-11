import {
	extractRoyalFlush,
	extractStraightFlush,
	extractFourOfAKind,
	extractFullHouse,
	extractFlush,
	extractStraight,
	extractThreeOfAKind,
	extractTwoPair,
	extractPair,
	extractHighCard,
} from "./hand-extractors.ts";
import { extractInPreferenceOrder } from "./util.ts";

import type { HandCandidate } from "./types.ts";

/**
 * Extracts the highest possible hand from a candidate hand
 * @param candidate - a HandCandidate to evaluate
 */
export function extractHand(candidate: HandCandidate) {
	return extractInPreferenceOrder(
		[
			extractRoyalFlush,
			extractStraightFlush,
			extractFourOfAKind,
			extractFullHouse,
			extractFlush,
			extractStraight,
			extractThreeOfAKind,
			extractTwoPair,
			extractPair,
		],
		extractHighCard,
		candidate,
	);
}
