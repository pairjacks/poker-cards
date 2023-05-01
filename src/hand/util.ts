import { memoize } from "../util/function.js";
import { isInRangeInclusive } from "../util/number.js";
import { groupBy, differenceWith, chunkPreviousWith } from "../util/array.js";
import { isSameCard, compareCards } from "../card/compare.js";
import { getCardFace, getCardSuit } from "../card/value.js";
import { HAND_RANK_VALUE } from "./constants.js";

import type { Cards } from "../card/types.js";
import type { HandCandidate, Hand, HandExtractor, HandRank } from "./types.js";

export function getHandRankValue(rank: HandRank) {
	return HAND_RANK_VALUE[rank];
}

export const getSortedCards = memoize((cards: Cards): Cards => {
	return [...cards].sort(compareCards);
});

export function omitAndSort(from: Cards, cards: Cards) {
	return getSortedCards(differenceWith(isSameCard, from, cards));
}

export function extractInPreferenceOrder(
	extractors: HandExtractor[],
	fallbackExtractor: HandExtractor<Hand>,
) {
	return function extract({ pocketCards, communityCards }: HandCandidate) {
		const cards = [...pocketCards, ...communityCards];

		for (const extractor of extractors) {
			const result = extractor(cards);

			if (result) return result;
		}

		return fallbackExtractor(cards);
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
	return chunkPreviousWith(
		(curr, prev) => getCardFace(curr) === getCardFace(prev),
		getSortedCards(cards),
	).filter((chunk) => chunk.length > 1);
});

export const getSortedConsequtiveFaceGroups = memoize(
	(cards: Cards): readonly Cards[] => {
		return chunkPreviousWith(
			(curr, prev) => isInRangeInclusive(0, 1, compareCards(curr, prev)),
			getSortedCards(cards),
		);
	},
);

export const getSuitGroups = memoize((cards: Cards): readonly Cards[] => {
	return Object.entries(
		groupBy((card) => getCardSuit(card), getSortedCards(cards)),
	)
		.filter(([, groupedCards]) => groupedCards.length > 1)
		.map(([, groupedCards]) => groupedCards);
});
