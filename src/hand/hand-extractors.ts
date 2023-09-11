import { uniqBy, omit } from "../util/array.js";
import {
	getConsecutiveGroups,
	getFaceGroups,
	getSuitGroups,
	createExtractorResult,
} from "./util.js";
import { FACE } from "../card/constants.js";

import type { Hand, HandExtractor } from "./types.js";

/*
 * Hand extractors try to find particular hand patterns from an array of cards.
 * They return a Hand if a match is found, otherwise null.
 * NOTE: All extractors expect cards pre-sorted by face value
 * See https://www.cardschat.com/poker-hands/ for poker hands
 */

export const extractHighCard: HandExtractor<Hand> = (sortedCards) => {
	const [highestCard, ...kickers] = sortedCards;

	return {
		rank: "highCard",
		rankCards: highestCard ? [highestCard] : [],
		kickerCards: kickers.slice(0, 4),
	};
};

export const extractPair: HandExtractor = (sortedCards) => {
	const rankCards = getFaceGroups(sortedCards)[0]?.slice(0, 2);

	return rankCards
		? createExtractorResult("pair", rankCards, sortedCards)
		: null;
};

export const extractTwoPair: HandExtractor = (sortedCards) => {
	const rankCards = getFaceGroups(sortedCards)
		.slice(0, 2)
		.flatMap((cards) => cards.slice(0, 2));

	return rankCards.length === 4
		? createExtractorResult("twoPair", rankCards, sortedCards)
		: null;
};

export const extractThreeOfAKind: HandExtractor = (sortedCards) => {
	const rankCards = getFaceGroups(sortedCards)
		.find((p) => p.length > 2)
		?.slice(0, 3);

	return rankCards
		? createExtractorResult("threeOfAKind", rankCards, sortedCards)
		: null;
};

export const extractStraight: HandExtractor = (sortedCards) => {
	const candidate = getConsecutiveGroups(sortedCards)
		.map((group) => uniqBy(([face]) => face, group))
		.find((group) => group.length > 3)
		?.slice(0, 5);

	if (!candidate) return null;

	// Ace highs should be part of 5 card candidates since they sort high
	if (candidate.length === 5) {
		return createExtractorResult("straight", candidate, sortedCards);
	}

	// Only consider ace low if lowest card in candidate is two,
	// otherwise we end up with a disjointed straight
	if (candidate[candidate.length - 1]?.[0] !== FACE.Two) return null;

	const ace = sortedCards.find(([face]) => face === FACE.Ace);

	return ace
		? createExtractorResult("straight", [...candidate, ace], sortedCards)
		: null;
};

export const extractFlush: HandExtractor = (sortedCards) => {
	const rankCards = getSuitGroups(sortedCards)
		.find((g) => g.length > 4)
		?.slice(0, 5);

	return rankCards
		? createExtractorResult("flush", rankCards, sortedCards)
		: null;
};

export const extractFullHouse: HandExtractor = (sortedCards) => {
	const { rankCards } = extractThreeOfAKind(sortedCards) ?? {
		rankCards: null,
	};

	const pair = getFaceGroups(omit(sortedCards, rankCards ?? []))[0]?.slice(
		0,
		2,
	);

	return rankCards && pair
		? createExtractorResult("fullHouse", [...rankCards, ...pair], sortedCards)
		: null;
};

export const extractFourOfAKind: HandExtractor = (cards) => {
	const rankCards = getFaceGroups(cards)
		.find((p) => p.length > 3)
		?.slice(0, 4);

	return rankCards
		? createExtractorResult("fourOfAKind", rankCards, cards)
		: null;
};

export const extractStraightFlush: HandExtractor = (sortedCards) => {
	const candidate = getSuitGroups(
		getConsecutiveGroups(sortedCards).find((group) => group.length > 3) ?? [],
	)
		.find((group) => group.length > 3)
		?.slice(0, 5);

	if (!candidate) return null;

	// Ace highs should be part of 5 card candidates since they sort high
	if (candidate.length === 5) {
		return createExtractorResult("straightFlush", candidate, sortedCards);
	}

	// Only consider ace low if lowest card in candidate is two,
	// otherwise we end up with a disjointed straight
	if (candidate[candidate.length - 1]?.[0] !== FACE.Two) return null;

	const ace = sortedCards.find(
		([face, suit]) => face === FACE.Ace && suit === candidate[0]?.[1],
	);

	return ace
		? createExtractorResult("straightFlush", [...candidate, ace], sortedCards)
		: null;
};

export const extractRoyalFlush: HandExtractor = (sortedCards) => {
	const straightFlush = extractStraightFlush(sortedCards);

	if (!straightFlush) return null;

	const { rankCards, kickerCards } = straightFlush;

	return rankCards[0]?.charAt(0) === FACE.Ace
		? { rankCards, kickerCards, rank: "royalFlush" }
		: null;
};
