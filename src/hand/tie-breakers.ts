import { getFaceValue } from '../card/value';
import { HandRank } from './constants';
import { Cards } from '../card/types'; // import type
import { HandComparisonResult } from './types'; // import type

/*
 * Tie breakers try to resolve ties between hands, given the same rank for all
 * all hands. They return the index of the highest hand, or -1 if the highest
 * cannot be determined
 */
type TieBreaker = (results: readonly HandComparisonResult[]) => number[];

// Assumes xs are sorted highest first
const indecesWithHighestNumber = (xss: readonly (readonly number[])[]) => {
  const maxLength = Math.min(...xss.map((xs) => xs.length));
  let itr = 0;

  while (itr < maxLength) {
    const topVals = xss.map((xs) => xs[itr]);
    const maxTopVal = Math.max(...topVals);
    const indeces = topVals.reduce((acc, curr, index) => {
      if (curr === maxTopVal) acc.push(index);

      return acc;
    }, [] as number[]);

    if (indeces.length < xss.length) return indeces;

    itr += 1;
  }

  return xss.map((_, index) => index);
};

const indecesWithHighestFace = (cardChunks: readonly Cards[]) =>
  indecesWithHighestNumber(cardChunks.map((cards) => cards.map(getFaceValue)));

const highestKicker: TieBreaker = (results) =>
  indecesWithHighestFace(results.map(({ hand }) => hand.kickerCards));

const highestRankCard: TieBreaker = (results) =>
  indecesWithHighestFace(results.map(({ hand }) => hand.rankCards));

const highestRankCardThenHighestKicker: TieBreaker = (results) => {
  const rankResult = highestRankCard(results);

  return rankResult.length === results.length
    ? highestKicker(results)
    : rankResult;
};

const alwaysTied: TieBreaker = (results) => results.map((_, index) => index);

export const tieBreakers: { [key in HandRank]: TieBreaker } = {
  [HandRank.HighCard]: highestKicker,
  [HandRank.Pair]: highestRankCardThenHighestKicker,
  [HandRank.TwoPair]: highestRankCardThenHighestKicker,
  // It should be impossible for two hands to have the same
  // value three of a kind, so a natural higher hand should
  // be determined by high rank card.
  [HandRank.ThreeOfAKind]: highestRankCard,
  // No kickers in a straight.
  [HandRank.Straight]: highestRankCard,
  // No kickers in a flush.
  [HandRank.Flush]: highestRankCard,
  // No kickers in a full house.
  [HandRank.FullHouse]: highestRankCard,
  // It should be impossible for two hands to contain equal value
  // four-of-a-kinds, so there should always be a natural better hand
  // on highest rank card.
  [HandRank.FourOfAKind]: highestRankCard,
  // No kickers in a straight.
  [HandRank.StraightFlush]: highestRankCard,
  // Straight flushes always draw since high card is the same and they
  // have no kickers.
  [HandRank.RoyalFlush]: alwaysTied,
};
