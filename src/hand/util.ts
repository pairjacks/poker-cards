import {
	isSameCard,
	compareCards,
	compareFaces,
	compareSuits,
} from "../card/compare.ts";
import { groupBy, differenceWith, chunkPreviousWith } from "../util/array.ts";
import { memoize } from "../util/function.ts";
import { isInRangeInclusive } from "../util/number.ts";

import { HandRank } from "./constants.ts";

import type { Cards } from "../card/types.ts";
import type { HandCandidate, Hand, HandExtractor } from "./types.ts";

export function getHandRankValue(rank: HandRank) {
	return Object.values(HandRank).indexOf(rank) + 1;
}

export const getSortedCards = memoize(
	(cards: Cards): Cards => [...cards].sort(compareCards),
);

export function omitAndSort(from: Cards, cards: Cards) {
	return getSortedCards(differenceWith(isSameCard, from, cards));
}

export function extractInPreferenceOrder(
	extractors: HandExtractor[],
	fallbackExtractor: HandExtractor<Hand>,
) {
	return function extract({ pocketCards, communityCards }: HandCandidate) {
		const cards: Cards = [...pocketCards, ...communityCards];

		return (
			extractors.reduce<Hand | null>(
				(result, extractor) => result ?? extractor(cards),
				null,
			) ?? fallbackExtractor(cards)
		);
	};
}

export function createExtractorResult(
	rank: HandRank,
	rankCards: Cards,
	cards: Cards,
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

export const getSortedFaceGroups = memoize((cards: Cards): readonly Cards[] => {
	return Object.entries(groupBy(([face]) => face, getSortedCards(cards)))
		.filter(([, groupedCards]) => groupedCards.length > 1)
		.map(([, groupedCards]) => groupedCards);
});

export const getSortedSuitGroups = memoize((cards: Cards): readonly Cards[] => {
	return Object.entries(groupBy(([, suit]) => suit, getSortedCards(cards)))
		.filter(([, groupedCards]) => groupedCards.length > 1)
		.map(([, groupedCards]) => groupedCards)
		.sort(([a], [b]) => (a && b ? compareSuits(a, b) : 0));
});

export const getSortedConsequtiveFaceGroups = memoize(
	(cards: Cards): readonly Cards[] => {
		return chunkPreviousWith(
			(curr, prev) => isInRangeInclusive(0, 1, compareFaces(curr, prev)),
			getSortedCards(cards),
		);
	},
);
