import { groupBy, chunkPreviousWith, omit } from "../util/array.js";
import { compareCards } from "../card/compare.js";
import { getCardFace, getCardSuit } from "../card/value.js";
import { HAND_RANK_VALUE } from "./constants.js";

import type { Card } from "../card/types.js";
import type { Hand, HandRank } from "./types.js";

export function getHandRankValue(rank: HandRank) {
	return HAND_RANK_VALUE[rank];
}

export function createExtractorResult(
	rank: HandRank,
	rankCards: readonly Card[],
	sortedCards: readonly Card[],
): Hand {
	return {
		rank,
		rankCards,
		// Kickers are determined from a 5 card slice of the full hand
		kickerCards: omit(sortedCards, rankCards).slice(
			0,
			Math.max(0, 5 - rankCards.length),
		),
	};
}

export function getFaceGroups(sortedCards: readonly Card[]): Card[][] {
	return chunkPreviousWith(isSameFace, sortedCards).filter(
		(chunk) => chunk.length > 1,
	);
}

export function getConsecutiveGroups(sortedCards: readonly Card[]): Card[][] {
	return chunkPreviousWith(isConsecutive, sortedCards).filter(
		(chunk) => chunk.length > 1,
	);
}

export function getSuitGroups(sortedCards: readonly Card[]): Card[][] {
	return Object.entries(groupBy((card) => getCardSuit(card), sortedCards))
		.filter(([, groupedCards]) => groupedCards.length > 1)
		.map(([, groupedCards]) => groupedCards);
}

function isSameFace(a: Card, b: Card) {
	return getCardFace(a) === getCardFace(b);
}

function isConsecutive(a: Card, b: Card) {
	const comparison = compareCards(a, b);

	return comparison === 0 || comparison === 1;
}
