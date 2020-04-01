import { uniqBy } from '../../util/array';
import { identity } from '../../util/function';
import { evaluateHand } from './evaluate-hand';
import { tieBreakers } from './tie-breakers';
import type { Hand } from '../types';
import type { HighestHandResult } from './types';

const tieBreak = (hands: readonly HighestHandResult[]) => {
  if (hands.length < 2) {
    throw new Error(
      `Expected two or more hands in tie break, got ${hands.length}`,
    );
  }

  const uniqueRanks = uniqBy(
    identity,
    hands.map(({ ranked }) => ranked.rank),
  );

  if (uniqueRanks.length > 1) {
    throw new Error(
      `Expected same rank for hands in tie break, got ${uniqueRanks}`,
    );
  }

  const highestHandIndex = tieBreakers[uniqueRanks[0]](hands);

  return highestHandIndex === -1 ? hands : [hands[highestHandIndex]];
};

// finds highest value hands, multiple hand means they are tied
export const findHighestHands = (
  hands: readonly Hand[],
): readonly HighestHandResult[] => {
  const evaluated = hands
    .map((hand): HighestHandResult => ({ hand, ranked: evaluateHand(hand) }))
    .sort((a, b) => b.ranked.rankValue - a.ranked.rankValue);
  const maxRankValue = evaluated[0].ranked.rankValue;
  const hasMaxRankValue = evaluated.filter(
    ({ ranked }) => ranked.rankValue === maxRankValue,
  );

  if (hasMaxRankValue.length === 1) return hasMaxRankValue;

  return tieBreak(hasMaxRankValue);
};
