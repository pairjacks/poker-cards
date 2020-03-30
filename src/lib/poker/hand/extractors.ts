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
    ? {
        rankCards,
        rank: PokerHandRank.StraightFlush,
        kickers: omitAndSort(hand, rankCards),
      }
    : null;
};

export const extractFourOfAKind: RankExtractor = (hand) => {
  const rankCards = getSortedFaceGroups(hand)
    .find((p) => p.length > 3)
    ?.slice(0, 4);

  return rankCards
    ? {
        rankCards,
        rank: PokerHandRank.FourOfAKind,
        kickers: omitAndSort(hand, rankCards),
      }
    : null;
};

export const extractFullHouse: RankExtractor = (hand) => {
  const { rankCards: tok, kickers: tokKickers } = extractThreeOfAKind(hand) || {
    rankCards: null,
    kickers: [],
  };
  const { rankCards: pair } = extractOnePair(tokKickers) || { rankCards: null };

  if (!(tok && pair)) return null;

  const rankCards = [...tok, ...pair];

  return {
    rankCards,
    rank: PokerHandRank.FullHouse,
    kickers: omitAndSort(hand, rankCards),
  };
};

export const extractFlush: RankExtractor = (hand) => {
  const rankCards = getSortedSuiteGroups(hand)
    .find((g) => g.length > 4)
    ?.slice(0, 5);

  return rankCards
    ? {
        rankCards,
        rank: PokerHandRank.Flush,
        kickers: omitAndSort(hand, rankCards),
      }
    : null;
};

export const extractStraight: RankExtractor = (hand) => {
  const rankCards = getSortedConsequtiveFaceGroups(hand)
    .map(uniqBy(({ face }) => face))
    .find((g) => g.length > 4)
    ?.slice(-5);

  return rankCards?.length === 5
    ? {
        rankCards,
        rank: PokerHandRank.Straight,
        kickers: omitAndSort(hand, rankCards),
      }
    : null;
};

export const extractThreeOfAKind: RankExtractor = (hand) => {
  const rankCards = getSortedFaceGroups(hand)
    .find((p) => p.length > 2)
    ?.slice(0, 3);

  return rankCards
    ? {
        rankCards,
        rank: PokerHandRank.ThreeOfAKind,
        kickers: omitAndSort(hand, rankCards),
      }
    : null;
};

export const extractTwoPair: RankExtractor = (hand) => {
  const rankCards = getSortedFaceGroups(hand)
    .slice(0, 2)
    .flatMap((cards) => cards.slice(0, 2));

  return rankCards.length === 4
    ? {
        rankCards,
        rank: PokerHandRank.TwoPair,
        kickers: omitAndSort(hand, rankCards),
      }
    : null;
};

export const extractOnePair: RankExtractor = (hand) => {
  const rankCards = getSortedFaceGroups(hand)[0]?.slice(0, 2);

  return rankCards
    ? {
        rankCards,
        rank: PokerHandRank.OnePair,
        kickers: omitAndSort(hand, rankCards),
      }
    : null;
};

export const extractHighCard: RankExtractor<RankExtractorResult> = (hand) => {
  const [highestCard, ...kickers] = getSortedCards(hand);

  return {
    kickers,
    rank: PokerHandRank.HighCard,
    rankCards: [highestCard],
  };
};
