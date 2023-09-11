import { memoize } from "../util/function.js";
import { groupBy, differenceWith, chunkPreviousWith } from "../util/array.js";
import { compareCards } from "../card/compare.js";
import { getCardFace, getCardSuit } from "../card/value.js";
import { HAND_RANK_VALUE } from "./constants.js";

import type { Card } from "../card/types.js";
import type { HandCandidate, Hand, HandExtractor, HandRank } from "./types.js";

export function getHandRankValue(rank: HandRank) {
	return HAND_RANK_VALUE[rank];
}

export const getSortedCards = memoize((cards: readonly Card[]): Card[] => {
	return [...cards].sort(compareCards);
});

export function omitAndSort(from: readonly Card[], cards: readonly Card[]) {
	return getSortedCards(differenceWith((a, b) => a === b, from, cards));
}

export function extractInPreferenceOrder(
	extractors: HandExtractor[],
	fallbackExtractor: HandExtractor<Hand>,
	{ pocketCards, communityCards }: HandCandidate,
) {
	const cards = [...pocketCards, ...communityCards];

	for (const extractor of extractors) {
		const result = extractor(cards);

		if (result) return result;
	}

	return fallbackExtractor(cards);
}

export function createExtractorResult(
	rank: HandRank,
	rankCards: readonly Card[],
	cards: readonly Card[],
): Hand {
	return {
		rank,
		rankCards,
		// Kickers are determined from a 5 card slice of the full hand
		kickerCards: omitAndSort(cards, rankCards).slice(
			0,
			Math.max(0, 5 - rankCards.length),
		),
	};
}

export const getSortedFaceGroups = memoize(
	(cards: readonly Card[]): Card[][] => {
		return chunkPreviousWith(isSameFace, getSortedCards(cards)).filter(
			(chunk) => chunk.length > 1,
		);
	},
);

export const getSortedConsecutiveGroups = memoize(
	(cards: readonly Card[]): Card[][] => {
		return chunkPreviousWith(isConsecutive, getSortedCards(cards)).filter(
			(chunk) => chunk.length > 1,
		);
	},
);

export const getSuitGroups = memoize((cards: readonly Card[]): Card[][] => {
	return Object.entries(
		groupBy((card) => getCardSuit(card), getSortedCards(cards)),
	)
		.filter(([, groupedCards]) => groupedCards.length > 1)
		.map(([, groupedCards]) => groupedCards);
});

function isSameFace(curr: Card, prev: Card) {
	return getCardFace(curr) === getCardFace(prev);
}

function isConsecutive(curr: Card, prev: Card) {
	const comparison = compareCards(curr, prev);

	return comparison === 0 || comparison === 1;
}
