import { isFiniteNumber } from "../util/predicate.js";
import { getCardValue } from "../card/value.js";

import type { HandRank, HandComparisonResult } from "./types.js";
import type { Cards } from "../card/types.js";

/*
 * Tie breakers try to resolve ties between hands, given the same rank for all
 * all hands. They return the index of the highest hand, or -1 if the highest
 * cannot be determined
 */

const highestKicker: TieBreaker = (results) => {
	return indecesWithHighestValue(results.map(({ hand }) => hand.kickerCards));
};

const highestRankCard: TieBreaker = (results) => {
	return indecesWithHighestValue(results.map(({ hand }) => hand.rankCards));
};

const highestRankCardThenHighestKicker: TieBreaker = (results) => {
	const rankResult = highestRankCard(results);

	return rankResult.length === results.length
		? highestKicker(results)
		: rankResult;
};

const alwaysTied: TieBreaker = (results) => {
	return results.map((_, index) => index);
};

export const tieBreakers: { [key in HandRank]: TieBreaker } = {
	highCard: highestKicker,
	pair: highestRankCardThenHighestKicker,
	twoPair: highestRankCardThenHighestKicker,
	// It should be impossible for two hands to have the same
	// value three of a kind, so a natural higher hand should
	// be determined by high rank card.
	threeOfAKind: highestRankCard,
	// No kickers in a straight.
	straight: highestRankCard,
	// No kickers in a flush.
	flush: highestRankCard,
	// No kickers in a full house.
	fullHouse: highestRankCard,
	// It should be impossible for two hands to contain equal value
	// four-of-a-kinds, so there should always be a natural better hand
	// on highest rank card.
	fourOfAKind: highestRankCard,
	// No kickers in a straight.
	straightFlush: highestRankCard,
	// Straight flushes always draw since high card is the same and they
	// have no kickers.
	royalFlush: alwaysTied,
};

// Assumes xs are sorted highest first
function indecesWithHighestNumber(xss: readonly (readonly number[])[]) {
	const maxLength = Math.min(...xss.map((xs) => xs.length));
	let itr = 0;

	while (itr < maxLength) {
		const topVals = xss.map((xs) => xs[itr]).filter(isFiniteNumber);
		const maxTopVal = Math.max(...topVals);
		const indeces = topVals.reduce<number[]>((acc, curr, index) => {
			if (curr === maxTopVal) acc.push(index);

			return acc;
		}, []);

		if (indeces.length < xss.length) return indeces;

		itr++;
	}

	return xss.map((_, index) => index);
}

function indecesWithHighestValue(cardChunks: readonly Cards[]) {
	return indecesWithHighestNumber(
		cardChunks.map((cards) => cards.map(getCardValue)),
	);
}

type TieBreaker = (results: readonly HandComparisonResult[]) => number[];
