import { memoizeWeakMap } from '../../core/util/function';
import { isInRangeInclusive } from '../../core/util/number';
import {
  groupBy,
  differenceWith,
  chunkPreviousWith,
} from '../../core/util/array';
import { isSameCard } from '../../core/card';
import { HandRank } from '../constants';
import { compareCards, compareFaces, compareSuits } from '../card';
import { Cards } from '../../core/types'; // type
import { HandCandidate } from '../types'; // type
import { HandExtractor, Hand } from './types'; // type

export const getHandRankValue = (rank: HandRank) =>
  Object.values(HandRank).indexOf(rank) + 1;

export const getSortedCards = memoizeWeakMap(
  (cards: Cards): Cards => [...cards].sort(compareCards),
);

export const omitAndSort = (from: Cards, cards: Cards) =>
  getSortedCards(differenceWith(isSameCard, from, cards));

export const extractInPreferenceOrder = (
  extractors: HandExtractor[],
  fallbackExtractor: HandExtractor<Hand>,
) => ({ pocket, community }: HandCandidate) => {
  const cards: Cards = [...pocket, ...community];

  return (
    extractors.reduce(
      (result, extractor) => result || extractor(cards),
      null as Hand | null,
    ) || fallbackExtractor(cards)
  );
};

export const createExtractorResult = (
  rank: HandRank,
  rankCards: Cards,
  cards: Cards,
): Hand => ({
  rank,
  rankCards,
  // Kickers are determined from a 5 card slice of the full hand
  kickers: omitAndSort(cards, rankCards).slice(
    0,
    Math.max(0, 5 - rankCards.length),
  ),
  rankValue: getHandRankValue(rank),
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
    chunkPreviousWith(
      (curr, prev) => isInRangeInclusive(0, 1, compareFaces(curr, prev)),
      getSortedCards(cards),
    ),
);
