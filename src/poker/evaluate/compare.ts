import { groupBy } from '../../util/array';
import type { Hand } from '../types';
import { evaluateHand } from './evaluate-hand';
import { RankExtractorResult } from './types';

export interface HighestHandResult {
  readonly hand: Hand;
  readonly rankData: RankExtractorResult;
}

export const findHighestHand = (hands: readonly Hand[]): HighestHandResult => {
  const evaluated = hands
    .map((hand) => ({ hand, rankData: evaluateHand(hand) }))
    .sort((a, b) => b.rankData.rankValue - a.rankData.rankValue);
  const maxRankValue = evaluated[0].rankData.rankValue;
  const hasMaxRankValue = evaluated.filter(
    ({ rankData }) => rankData.rankValue === maxRankValue,
  );

  if (hasMaxRankValue.length === 1) return hasMaxRankValue[0];

  const rankGroups = groupBy(({ rankData }) => rankData.rank, evaluated);
};
