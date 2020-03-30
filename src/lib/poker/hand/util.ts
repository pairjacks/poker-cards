import { groupBy, differenceWith, memoize, pipe } from 'lodash/fp';

import { Card, isSameCard, Cards } from '~/lib/cards';

import { HandRank } from '../types';
import { compareCards, compareFaces, compareSuits } from '../card';
import { Hand } from './types';

const flattenHand = ({ pocket, community }: Hand): Cards => [
  ...pocket,
  ...community,
];

export const extractInPreferenceOrder = (
  extractors: RankExtractor[],
  fallback: RankExtractor<RankExtractorResult>,
) => (hand: Hand): RankExtractorResult => {
  const cards = flattenHand(hand);

  return (
    pipe(...extractors.map(pipeableExtractor(cards)))(null) || fallback(cards)
  );
};

const pipeableExtractor = (cards: Cards) => (extractor: RankExtractor) => (
  previousResult: RankExtractorResult | null,
) => (previousResult ? previousResult : extractor(cards));

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

export const getSortedCards = memoize(
  (cards: Cards): Cards => [...cards].sort(compareCards),
);

export const getSortedFaceGroups = memoize((cards: Cards): readonly Cards[] =>
  Object.entries(groupBy('face', getSortedCards(cards)))
    .filter(([_, cards]) => cards?.length > 1)
    .map(([_, cards]) => cards),
);

export const getSortedSuitGroups = memoize((cards: Cards): readonly Cards[] =>
  Object.entries(groupBy('suit', getSortedCards(cards)))
    .filter(([_, cards]) => cards?.length > 1)
    .map(([_, cards]) => cards)
    .sort((a, b) => compareSuits(a[0], b[0])),
);

export const getSortedConsequtiveFaceGroups = memoize(
  (cards: Cards): readonly Cards[] =>
    getSortedCards(cards).reduce((groups: Card[][], card) => {
      if (!groups.length) return [[card]];

      const currentGroup = groups[groups.length - 1];
      const previousCard = currentGroup[currentGroup.length - 1];
      const diff = compareFaces(card, previousCard);

      if (diff === 0 || diff === 1) currentGroup.push(card);
      else groups.push([card]);

      return groups;
    }, []),
);

export const omitAndSort = (from: Cards, cards: Cards) =>
  getSortedCards(differenceWith(isSameCard, from, cards));

export interface RankExtractorResult {
  rank: HandRank;
  rankCards: readonly Card[];
  kickers: readonly Card[];
}

export type RankExtractor<T = RankExtractorResult | null> = (cards: Cards) => T;
