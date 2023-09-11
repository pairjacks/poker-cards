import { compareCards } from "../card/compare.js";
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
export function extractHand({ pocketCards, communityCards }: HandCandidate) {
	const sortedCards = [...pocketCards, ...communityCards].sort(compareCards);

	for (const extractor of rankedExtractors) {
		const result = extractor(sortedCards);

		if (result) return result;
	}

	return extractHighCard(sortedCards);
}

const rankedExtractors = [
	extractRoyalFlush,
	extractStraightFlush,
	extractFourOfAKind,
	extractFullHouse,
	extractFlush,
	extractStraight,
	extractThreeOfAKind,
	extractTwoPair,
	extractPair,
] as const;
