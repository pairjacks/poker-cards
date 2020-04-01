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
    hands.map(({ rankData }) => rankData.rank),
  );

  if (uniqueRanks.length > 1) {
    throw new Error(
      `Expected same rank for hands in tie break, got ${uniqueRanks}`,
    );
  }

  const highestHandIndex = tieBreakers[uniqueRanks[0]](hands);

  return highestHandIndex === -1 ? null : hands[highestHandIndex];
};

// finds highest value hand, null means draw
export const findHighestHand = (
  hands: readonly Hand[],
): HighestHandResult | null => {
  const evaluated = hands
    .map((hand) => ({ hand, rankData: evaluateHand(hand) }))
    .sort((a, b) => b.rankData.rankValue - a.rankData.rankValue);
  const maxRankValue = evaluated[0].rankData.rankValue;
  const hasMaxRankValue = evaluated.filter(
    ({ rankData }) => rankData.rankValue === maxRankValue,
  );

  if (hasMaxRankValue.length === 1) return hasMaxRankValue[0];

  return tieBreak(hasMaxRankValue);
};
