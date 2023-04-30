import { uniqBy } from "../util/array.js";
import {
	omitAndSort,
	getSortedConsequtiveFaceGroups,
	getSortedFaceGroups,
	getSortedCards,
	getSuitGroups,
	createExtractorResult,
} from "./util.js";

import type { Hand, HandExtractor } from "./types.js";

/*
 * Hand extractors try to find particular hand patterns from an array of cards.
 * They return a Hand if a match is found, otherwise null.
 * See https://www.cardschat.com/poker-hands/ for poker hands
 */

export const extractHighCard: HandExtractor<Hand> = (cards) => {
	const [highestCard, ...kickers] = getSortedCards(cards);

	return {
		rank: "highCard",
		rankCards: highestCard ? [highestCard] : [],
		kickerCards: kickers.slice(0, 4),
	};
};

export const extractPair: HandExtractor = (cards) => {
	const rankCards = getSortedFaceGroups(cards)[0]?.slice(0, 2);

	return rankCards ? createExtractorResult("pair", rankCards, cards) : null;
};

export const extractTwoPair: HandExtractor = (cards) => {
	const rankCards = getSortedFaceGroups(cards)
		.slice(0, 2)
		.flatMap((sortedCards) => sortedCards.slice(0, 2));

	return rankCards.length === 4
		? createExtractorResult("twoPair", rankCards, cards)
		: null;
};

export const extractThreeOfAKind: HandExtractor = (cards) => {
	const rankCards = getSortedFaceGroups(cards)
		.find((p) => p.length > 2)
		?.slice(0, 3);

	return rankCards
		? createExtractorResult("threeOfAKind", rankCards, cards)
		: null;
};

export const extractStraight: HandExtractor = (cards) => {
	const candidate = getSortedConsequtiveFaceGroups(cards)
		.map((group) => uniqBy(([face]) => face, group))
		.find((group) => group.length > 3)
		?.slice(0, 5);

	if (!candidate) return null;

	// Ace highs should be part of 5 card candidates since they sort high
	if (candidate.length === 5) {
		return createExtractorResult("straight", candidate, cards);
	}

	// Only consider ace low if lowest card in candidate is two,
	// otherwise we end up with a disjointed straight
	if (candidate[candidate.length - 1]?.[0] !== "2") return null;

	const ace = getSortedCards(cards).find(([face]) => face === "a");

	return ace
		? createExtractorResult("straight", [...candidate, ace], cards)
		: null;
};

export const extractFlush: HandExtractor = (cards) => {
	const rankCards = getSuitGroups(cards)
		.find((g) => g.length > 4)
		?.slice(0, 5);

	return rankCards ? createExtractorResult("flush", rankCards, cards) : null;
};

export const extractFullHouse: HandExtractor = (cards) => {
	const { rankCards: tok } = extractThreeOfAKind(cards) ?? {
		rankCards: null,
	};

	const pair = getSortedFaceGroups(omitAndSort(cards, tok ?? []))[0]?.slice(
		0,
		2,
	);

	return tok && pair
		? createExtractorResult("fullHouse", [...tok, ...pair], cards)
		: null;
};

export const extractFourOfAKind: HandExtractor = (cards) => {
	const rankCards = getSortedFaceGroups(cards)
		.find((p) => p.length > 3)
		?.slice(0, 4);

	return rankCards
		? createExtractorResult("fourOfAKind", rankCards, cards)
		: null;
};

export const extractStraightFlush: HandExtractor = (cards) => {
	const candidate = getSuitGroups(
		getSortedConsequtiveFaceGroups(cards).find((group) => group.length > 3) ??
			[],
	)
		.find((group) => group.length > 3)
		?.slice(0, 5);

	if (!candidate) return null;

	// Ace highs should be part of 5 card candidates since they sort high
	if (candidate.length === 5) {
		return createExtractorResult("straightFlush", candidate, cards);
	}

	// Only consider ace low if lowest card in candidate is two,
	// otherwise we end up with a disjointed straight
	if (candidate[candidate.length - 1]?.[0] !== "2") return null;

	const ace = getSortedCards(cards).find(
		([face, suit]) => face === "a" && suit === candidate[0]?.[1],
	);

	return ace
		? createExtractorResult("straightFlush", [...candidate, ace], cards)
		: null;
};

export const extractRoyalFlush: HandExtractor = (cards) => {
	const { rankCards, kickerCards: kickers } = extractStraightFlush(cards) ?? {
		rankCards: null,
		kickerCards: [],
	};

	return rankCards?.[0]?.[0] === "a"
		? {
				rankCards,
				rank: "royalFlush",
				kickerCards: kickers,
		  }
		: null;
};
