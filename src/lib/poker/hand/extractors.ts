import { uniqBy } from 'lodash/fp';

import { Face } from '~/lib/cards';

import { PokerHandRank } from '../types';
import {
  omitAndSort,
  getSortedConsequtiveFaceGroups,
  getSortedFaceGroups,
  getSortedCards,
  getSortedSuiteGroups,
  RankExtractor,
  RankExtractorResult,
  createExtractorResult,
} from './util';

// https://www.cardschat.com/poker-hands/

export const extractRoyalFlush: RankExtractor = (hand) => {
  const { rankCards, kickers } = extractStraightFlush(hand) || {
    rankCards: null,
    kickers: [],
  };

  return rankCards?.[0]?.face === Face.Ace
    ? {
        rankCards,
        kickers,
        rank: PokerHandRank.RoyalFlush,
      }
    : null;
};

export const extractStraightFlush: RankExtractor = (hand) => {
  const rankCards = getSortedSuiteGroups(
    getSortedConsequtiveFaceGroups(hand).find((group) => group.length > 4) ||
      [],
  )
    .find((group) => group.length > 4)
    ?.slice(0, 5);

  return rankCards
    ? createExtractorResult(PokerHandRank.StraightFlush, rankCards, hand)
    : null;
};

export const extractFourOfAKind: RankExtractor = (hand) => {
  const rankCards = getSortedFaceGroups(hand)
    .find((p) => p.length > 3)
    ?.slice(0, 4);

  return rankCards
    ? createExtractorResult(PokerHandRank.FourOfAKind, rankCards, hand)
    : null;
};

export const extractFullHouse: RankExtractor = (hand) => {
  const { rankCards: tok } = extractThreeOfAKind(hand) || {
    rankCards: null,
  };
  const { rankCards: pair } = extractOnePair(omitAndSort(hand, tok || [])) || {
    rankCards: null,
  };

  return tok && pair
    ? createExtractorResult(PokerHandRank.FullHouse, [...tok, ...pair], hand)
    : null;
};

export const extractFlush: RankExtractor = (hand) => {
  const rankCards = getSortedSuiteGroups(hand)
    .find((g) => g.length > 4)
    ?.slice(0, 5);

  return rankCards
    ? createExtractorResult(PokerHandRank.Flush, rankCards, hand)
    : null;
};

export const extractStraight: RankExtractor = (hand) => {
  const rankCards = getSortedConsequtiveFaceGroups(hand)
    .map(uniqBy(({ face }) => face))
    .find((g) => g.length > 4)
    ?.slice(-5);

  return rankCards?.length === 5
    ? createExtractorResult(PokerHandRank.Straight, rankCards, hand)
    : null;
};

export const extractThreeOfAKind: RankExtractor = (hand) => {
  const rankCards = getSortedFaceGroups(hand)
    .find((p) => p.length > 2)
    ?.slice(0, 3);

  return rankCards
    ? createExtractorResult(PokerHandRank.ThreeOfAKind, rankCards, hand)
    : null;
};

export const extractTwoPair: RankExtractor = (hand) => {
  const rankCards = getSortedFaceGroups(hand)
    .slice(0, 2)
    .flatMap((cards) => cards.slice(0, 2));

  return rankCards.length === 4
    ? createExtractorResult(PokerHandRank.TwoPair, rankCards, hand)
    : null;
};

export const extractOnePair: RankExtractor = (hand) => {
  const rankCards = getSortedFaceGroups(hand)[0]?.slice(0, 2);

  return rankCards
    ? createExtractorResult(PokerHandRank.OnePair, rankCards, hand)
    : null;
};

export const extractHighCard: RankExtractor<RankExtractorResult> = (hand) => {
  const [highestCard, ...kickers] = getSortedCards(hand);

  return {
    rank: PokerHandRank.HighCard,
    rankCards: [highestCard],
    kickers: kickers.slice(0, 4),
  };
};
