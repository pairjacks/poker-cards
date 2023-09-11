import { extractInPreferenceOrder } from "./util.js";
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
} from "./hand-extractors.js";

import type { HandCandidate } from "./types.js";

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
