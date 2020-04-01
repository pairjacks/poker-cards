import { uniqBy } from '../../util/array';
import { HandRank } from '../constants';
import { getFaceValue } from '../card';
import type { Cards } from '../../core/types';
import type { HighestHandResult } from './types';

type TieBreaker = (results: readonly HighestHandResult[]) => number;

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
  withHighestFaceIndex(results.map(({ ranked }) => ranked.kickers));

const highestRankCard: TieBreaker = (results) =>
  withHighestFaceIndex(results.map(({ ranked }) => ranked.rankCards));

const highestRankCardThenHighestKicker: TieBreaker = (results) => {
  const rankResult = highestRankCard(results);

  return rankResult === -1 ? highestKicker(results) : rankResult;
};

// Really these could all just be highestRankCardThenHighestKicker
// TODO: single fn export?
export const tieBreakers: { [key in HandRank]: TieBreaker } = {
  [HandRank.HighCard]: highestKicker,
  [HandRank.OnePair]: highestRankCardThenHighestKicker,
  [HandRank.TwoPair]: highestRankCardThenHighestKicker,
  [HandRank.ThreeOfAKind]: highestRankCardThenHighestKicker,
  [HandRank.Straight]: highestRankCard,
  [HandRank.Flush]: highestRankCard,
  [HandRank.FullHouse]: highestRankCardThenHighestKicker,
  [HandRank.FourOfAKind]: highestRankCardThenHighestKicker,
  [HandRank.StraightFlush]: highestRankCard,
  [HandRank.RoyalFlush]: alwaysTied,
};
