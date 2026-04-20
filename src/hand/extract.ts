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

import type { Hand, HandCandidate } from "./types.ts";

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
