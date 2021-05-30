import { memoizeWeakMap } from '../util/function';
import { isInRangeInclusive } from '../util/number';
import { groupBy, differenceWith, chunkPreviousWith } from '../util/array';
import {
  isSameCard,
  compareCards,
  compareFaces,
  compareSuits,
} from '../card/compare';
import { HandRank } from './constants';
import { Cards } from '../card/types'; // import type
import { HandCandidate, Hand, HandExtractor } from './types'; // import type

export const getHandRankValue = (rank: HandRank): number =>
  Object.values(HandRank).indexOf(rank) + 1;

export const getSortedCards = memoizeWeakMap(
  (cards: Cards): Cards => [...cards].sort(compareCards),
);

export const omitAndSort = (from: Cards, cards: Cards): Cards =>
  getSortedCards(differenceWith(isSameCard, from, cards));

export const extractInPreferenceOrder =
  (extractors: HandExtractor[], fallbackExtractor: HandExtractor<Hand>) =>
  ({ pocketCards, communityCards }: HandCandidate): Hand => {
    const cards: Cards = [...pocketCards, ...communityCards];

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
  kickerCards: omitAndSort(cards, rankCards).slice(
    0,
    Math.max(0, 5 - rankCards.length),
  ),
});

export const getSortedFaceGroups = memoizeWeakMap(
  (cards: Cards): readonly Cards[] =>
    Object.entries(groupBy(([face]) => face, getSortedCards(cards)))
      .filter(([, cards]) => cards?.length > 1)
      .map(([, cards]) => cards),
);

export const getSortedSuitGroups = memoizeWeakMap(
  (cards: Cards): readonly Cards[] =>
    Object.entries(groupBy(([, suit]) => suit, getSortedCards(cards)))
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
