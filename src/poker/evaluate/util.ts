import { pipe, memoizeWeakMap } from '../../util/function';
import { differenceBy, groupBy, chunkWithPreviousBy } from '../../util/array';
import { isSameCard } from '../../core/card';
import { HandRank } from '../constants';
import { compareCards, compareFaces, compareSuits } from '../card';
import type { Cards } from '../../core/types';
import type { Hand } from '../types';
import type { RankExtractor, RankExtractorResult } from './types';
import { isInRangeInclusive } from '../../util/number';

const flattenHand = ({ pocket, community }: Hand): Cards => [
  ...pocket,
  ...community,
];

const pipeableExtractor = (cards: Cards) => (extractor: RankExtractor) => (
  previousResult: RankExtractorResult | null,
) => (previousResult ? previousResult : extractor(cards));

export const getSortedCards = memoizeWeakMap(
  (cards: Cards): Cards => [...cards].sort(compareCards),
);

export const omitAndSort = (from: Cards, cards: Cards) =>
  getSortedCards(differenceBy(isSameCard, from, cards));

export const extractInPreferenceOrder = (
  extractors: RankExtractor[],
  fallback: RankExtractor<RankExtractorResult>,
) => (hand: Hand): RankExtractorResult => {
  const cards = flattenHand(hand);
  const [e, ...es] = extractors.map(pipeableExtractor(cards));

  return pipe<RankExtractorResult | null>(e, ...es)(null) || fallback(cards);
};

export const createExtractorResult = (
  rank: HandRank,
  rankCards: Cards,
  cards: Cards,
): RankExtractorResult => ({
  rank,
  rankCards,
  // Kickers are determined from a 5 card slice of the full hand
  kickers: omitAndSort(cards, rankCards).slice(
    0,
    Math.max(0, 5 - rankCards.length),
  ),
});

export const getSortedFaceGroups = memoizeWeakMap(
  (cards: Cards): readonly Cards[] =>
    Object.entries(groupBy(({ face }) => face, getSortedCards(cards)))
      .filter(([, cards]) => cards?.length > 1)
      .map(([, cards]) => cards),
);

export const getSortedSuitGroups = memoizeWeakMap(
  (cards: Cards): readonly Cards[] =>
    Object.entries(groupBy(({ suit }) => suit, getSortedCards(cards)))
      .filter(([, cards]) => cards?.length > 1)
      .map(([, cards]) => cards)
      .sort((a, b) => compareSuits(a[0], b[0])),
);

export const getSortedConsequtiveFaceGroups = memoizeWeakMap(
  (cards: Cards): readonly Cards[] =>
    chunkWithPreviousBy(
      (curr, prev) => isInRangeInclusive(0, 1, compareFaces(curr, prev)),
      getSortedCards(cards),
    ),
);
