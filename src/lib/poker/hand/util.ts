import { groupBy, differenceWith, memoize, pipe } from 'lodash/fp';

import { Card, isSameCard } from '~/lib/cards';

import { PokerHandRank } from '../types';
import { compareCards, compareFaces, compareSuites } from '../card';
import { Hand } from './types';

export const extractInPreferenceOrder = (
  extractors: RankExtractor[],
  fallback: RankExtractor<RankExtractorResult>,
) => (hand: Hand): RankExtractorResult =>
  pipe(...extractors.map(pipeableExtractor(hand)))(null) || fallback(hand);

const pipeableExtractor = (hand: Hand) => (extractor: RankExtractor) => (
  previousResult: RankExtractorResult | null,
) => (previousResult ? previousResult : extractor(hand));

export const getSortedCards = memoize((hand: Hand): readonly Card[] =>
  [...hand].sort(compareCards),
);

export const getSortedFaceGroups = memoize((hand: Hand): readonly Card[][] =>
  Object.entries(groupBy('face', getSortedCards(hand)))
    .filter(([_, cards]) => cards?.length > 1)
    .map(([_, cards]) => cards),
);

export const getSortedSuiteGroups = memoize((hand: Hand): readonly Card[][] =>
  Object.entries(groupBy('suite', getSortedCards(hand)))
    .filter(([_, cards]) => cards?.length > 1)
    .map(([_, cards]) => cards)
    .sort((a, b) => compareSuites(a[0], b[0])),
);

export const getSortedConsequtiveFaceGroups = memoize(
  (hand: Hand): readonly Card[][] =>
    getSortedCards(hand).reduce((groups: Card[][], card) => {
      if (!groups.length) return [[card]];

      const currentGroup = groups[groups.length - 1];
      const previousCard = currentGroup[currentGroup.length - 1];
      const diff = compareFaces(card, previousCard);

      if (diff === 0 || diff === 1) currentGroup.push(card);
      else groups.push([card]);

      return groups;
    }, []),
);

export const omitAndSort: (
  hand: Hand,
  cards: readonly Card[],
) => readonly Card[] = pipe(differenceWith(isSameCard), getSortedCards);

export interface RankExtractorResult {
  rank: PokerHandRank;
  rankCards: readonly Card[];
  kickers: readonly Card[];
}

export type RankExtractor<T = RankExtractorResult | null> = (hand: Hand) => T;
