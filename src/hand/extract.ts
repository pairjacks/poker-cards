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

import type { Hand, HandCandidate } from "./types.js";

/**
 * Extracts the highest possible hand from a candidate hand
 * @param candidate - a HandCandidate to evaluate
 */
export const extractHand: (candidate: HandCandidate) => Hand =
	extractInPreferenceOrder(
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
	);
