import { uniqBy } from 'lodash/fp';

import { Face } from '../../cards';
import { HandRank } from '../types';
import {
  omitAndSort,
  getSortedConsequtiveFaceGroups,
  getSortedFaceGroups,
  getSortedCards,
  getSortedSuitGroups,
  createExtractorResult,
} from './util';
import { RankExtractor, RankExtractorResult } from './types';

// https://www.cardschat.com/poker-hands/

export const extractRoyalFlush: RankExtractor = (cards) => {
  const { rankCards, kickers } = extractStraightFlush(cards) || {
    rankCards: null,
    kickers: [],
  };

  return rankCards?.[0]?.face === Face.Ace
    ? {
        rankCards,
        kickers,
        rank: HandRank.RoyalFlush,
      }
    : null;
};

export const extractStraightFlush: RankExtractor = (cards) => {
  const rankCards = getSortedSuitGroups(
    getSortedConsequtiveFaceGroups(cards).find((group) => group.length > 4) ||
      [],
  )
    .find((group) => group.length > 4)
    ?.slice(0, 5);

  return rankCards
    ? createExtractorResult(HandRank.StraightFlush, rankCards, cards)
    : null;
};

export const extractFourOfAKind: RankExtractor = (cards) => {
  const rankCards = getSortedFaceGroups(cards)
    .find((p) => p.length > 3)
    ?.slice(0, 4);

  return rankCards
    ? createExtractorResult(HandRank.FourOfAKind, rankCards, cards)
    : null;
};

export const extractFullHouse: RankExtractor = (cards) => {
  const { rankCards: tok } = extractThreeOfAKind(cards) || {
    rankCards: null,
  };

  const pair = getSortedFaceGroups(omitAndSort(cards, tok || []))[0]?.slice(
    0,
    2,
  );

  return tok && pair
    ? createExtractorResult(HandRank.FullHouse, [...tok, ...pair], cards)
    : null;
};

export const extractFlush: RankExtractor = (cards) => {
  const rankCards = getSortedSuitGroups(cards)
    .find((g) => g.length > 4)
    ?.slice(0, 5);

  return rankCards
    ? createExtractorResult(HandRank.Flush, rankCards, cards)
    : null;
};

export const extractStraight: RankExtractor = (cards) => {
  const rankCards = getSortedConsequtiveFaceGroups(cards)
    .map(uniqBy(({ face }) => face))
    .find((g) => g.length > 4)
    ?.slice(-5);

  return rankCards?.length === 5
    ? createExtractorResult(HandRank.Straight, rankCards, cards)
    : null;
};

export const extractThreeOfAKind: RankExtractor = (cards) => {
  const rankCards = getSortedFaceGroups(cards)
    .find((p) => p.length > 2)
    ?.slice(0, 3);

  return rankCards
    ? createExtractorResult(HandRank.ThreeOfAKind, rankCards, cards)
    : null;
};

export const extractTwoPair: RankExtractor = (cards) => {
  const rankCards = getSortedFaceGroups(cards)
    .slice(0, 2)
    .flatMap((cards) => cards.slice(0, 2));

  return rankCards.length === 4
    ? createExtractorResult(HandRank.TwoPair, rankCards, cards)
    : null;
};

export const extractOnePair: RankExtractor = (cards) => {
  const rankCards = getSortedFaceGroups(cards)[0]?.slice(0, 2);

  return rankCards
    ? createExtractorResult(HandRank.OnePair, rankCards, cards)
    : null;
};

export const extractHighCard: RankExtractor<RankExtractorResult> = (cards) => {
  const [highestCard, ...kickers] = getSortedCards(cards);

  return {
    rank: HandRank.HighCard,
    rankCards: [highestCard],
    kickers: kickers.slice(0, 4),
  };
};
