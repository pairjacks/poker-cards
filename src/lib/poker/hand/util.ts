import { groupBy, differenceWith, memoize, pipe } from 'lodash/fp';

import { Card, isSameCard } from '~/lib/cards';

import { PokerHandRank } from '../types';
import { compareCards, compareFaces, compareSuits } from '../card';
import { Hand } from './types';

export const extractInPreferenceOrder = (
  extractors: RankExtractor[],
  fallback: RankExtractor<RankExtractorResult>,
) => (hand: Hand): RankExtractorResult =>
  pipe(...extractors.map(pipeableExtractor(hand)))(null) || fallback(hand);

const pipeableExtractor = (hand: Hand) => (extractor: RankExtractor) => (
  previousResult: RankExtractorResult | null,
) => (previousResult ? previousResult : extractor(hand));

export const createExtractorResult = (
  rank: PokerHandRank,
  rankCards: readonly Card[],
  hand: Hand,
): RankExtractorResult => ({
  rank,
  rankCards,
  // Kickers are determined from a 5 card slice of the full hand
  kickers: omitAndSort(hand, rankCards).slice(
    0,
    Math.max(0, 5 - rankCards.length),
  ),
});

export const getSortedCards = memoize(
  (hand: Hand | readonly Card[]): readonly Card[] =>
    [...flattenHand(hand)].sort(compareCards),
);

export const getSortedFaceGroups = memoize(
  (hand: Hand | readonly Card[]): readonly Card[][] =>
    Object.entries(groupBy('face', getSortedCards(hand)))
      .filter(([_, cards]) => cards?.length > 1)
      .map(([_, cards]) => cards),
);

export const getSortedSuitGroups = memoize(
  (hand: Hand | readonly Card[]): readonly Card[][] =>
    Object.entries(groupBy('suit', getSortedCards(hand)))
      .filter(([_, cards]) => cards?.length > 1)
      .map(([_, cards]) => cards)
      .sort((a, b) => compareSuits(a[0], b[0])),
);

export const getSortedConsequtiveFaceGroups = memoize(
  (hand: Hand | readonly Card[]): readonly Card[][] =>
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

const flattenHand = (hand: Hand | readonly Card[]): readonly Card[] =>
  isHand(hand) ? [...hand.pocket, ...hand.community] : hand;

export const omitAndSort = (
  hand: Hand | readonly Card[],
  cards: readonly Card[],
) => getSortedCards(differenceWith(isSameCard, flattenHand(hand), cards));

const isHand = (value: unknown): value is Hand =>
  Array.isArray((value as Hand).pocket) &&
  Array.isArray((value as Hand).community);

export interface RankExtractorResult {
  rank: PokerHandRank;
  rankCards: readonly Card[];
  kickers: readonly Card[];
}

export type RankExtractor<T = RankExtractorResult | null> = (hand: Hand) => T;
