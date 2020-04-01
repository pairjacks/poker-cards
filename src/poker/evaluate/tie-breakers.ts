import { uniqBy } from '../../util/array';
import { HandRank } from '../constants';
import { getFaceValue } from '../card';
import type { Cards } from '../../core/types';
import type { HandComparisonResult } from './types';

type TieBreaker = (results: readonly HandComparisonResult[]) => number;

const highestNumberIndex = (xs: readonly number[]) => {
  if (xs.length > 1 && uniqBy((x) => x, xs).length === 1) return -1;

  return xs.indexOf(Math.max(...xs));
};

// Assumes xs are sorted highest first
const withHighestNumberIndex = (xss: readonly (readonly number[])[]) => {
  const maxLength = Math.min(...xss.map((xs) => xs.length));

  if (maxLength === 0) return -1;

  let index = 0;

  while (index < maxLength) {
    const highestIndex = highestNumberIndex(xss.map((xs) => xs[index]));

    if (highestIndex !== -1) return highestIndex;

    index += 1;
  }

  return -1;
};

const alwaysTied = () => -1;

const withHighestFaceIndex = (cardChunks: readonly Cards[]) =>
  withHighestNumberIndex(cardChunks.map((cards) => cards.map(getFaceValue)));

const highestKicker: TieBreaker = (results) =>
  withHighestFaceIndex(results.map(({ hand }) => hand.kickers));

const highestRankCard: TieBreaker = (results) =>
  withHighestFaceIndex(results.map(({ hand }) => hand.rankCards));

const highestRankCardThenHighestKicker: TieBreaker = (results) => {
  const rankResult = highestRankCard(results);

  return rankResult === -1 ? highestKicker(results) : rankResult;
};

export const tieBreakers: { [key in HandRank]: TieBreaker } = {
  [HandRank.HighCard]: highestKicker,
  [HandRank.OnePair]: highestRankCardThenHighestKicker,
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
