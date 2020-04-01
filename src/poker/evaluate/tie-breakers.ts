import { uniqBy } from '../../util/array';
import { HandRank } from '../constants';
import { getFaceValue } from '../card';
import type { Cards } from '../../core/types';
import type { HighestHandResult } from './types';

// Assumes all hands have the same number of cards

type TieBreaker = (results: readonly HighestHandResult[]) => number;

const highestNumberIndex = (xs: readonly number[]) => {
  if (xs.length > 1 && uniqBy((x) => x, xs).length === 1) return -1;

  return xs.indexOf(Math.max(...xs));
};

// Assumes xs are sorted highest first
const withHighestNumberIndex = (xss: readonly (readonly number[])[]) => {
  const maxLength = Math.min(...xss.map((xs) => xs.length));
  let index = 0;

  while (index < maxLength) {
    const highestIndex = highestNumberIndex(xss.map((xs) => xs[index]));

    if (highestIndex !== -1) return highestIndex;

    index += 1;
  }

  return -1;
};

const withHighestFaceIndex = (cardChunks: readonly Cards[]) =>
  withHighestNumberIndex(cardChunks.map((cards) => cards.map(getFaceValue)));

const withHighestKickerIndex = (results: readonly HighestHandResult[]) =>
  withHighestFaceIndex(results.map(({ rankData }) => rankData.kickers));

const withHighestRankCardIndex = (results: readonly HighestHandResult[]) =>
  withHighestFaceIndex(results.map(({ rankData }) => rankData.rankCards));

const tieBreakerHighestHand: TieBreaker = withHighestKickerIndex;

const tieBreakerOnePair: TieBreaker = (results) => {
  const pairValueResult = withHighestRankCardIndex(results);

  return pairValueResult === -1
    ? withHighestKickerIndex(results)
    : pairValueResult;
};

const tieBreakerTwoPair: TieBreaker = () => -1;

const tieBreakerThreeOfAKind: TieBreaker = () => -1;

const tieBreakerStraight: TieBreaker = () => -1;

const tieBreakerFlush: TieBreaker = () => -1;

const tieBreakerFullHouse: TieBreaker = () => -1;

const tieBreakerFourOfAKind: TieBreaker = () => -1;

const tieBreakerStraightFlush: TieBreaker = () => -1;

// Royal flushes will always tie
const tieBreakerRoyalFlush: TieBreaker = () => -1;

export const tieBreakers: { [key in HandRank]: TieBreaker } = {
  [HandRank.HighCard]: tieBreakerHighestHand,
  [HandRank.OnePair]: tieBreakerOnePair,
  [HandRank.TwoPair]: tieBreakerTwoPair,
  [HandRank.ThreeOfAKind]: tieBreakerThreeOfAKind,
  [HandRank.Straight]: tieBreakerStraight,
  [HandRank.Flush]: tieBreakerFlush,
  [HandRank.FullHouse]: tieBreakerFullHouse,
  [HandRank.FourOfAKind]: tieBreakerFourOfAKind,
  [HandRank.StraightFlush]: tieBreakerStraightFlush,
  [HandRank.RoyalFlush]: tieBreakerRoyalFlush,
};
