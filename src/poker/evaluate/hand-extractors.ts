import { uniqBy } from '../../util/array';
import { Face } from '../../core/constants';
import { HandRank } from '../constants';
import {
  omitAndSort,
  getSortedConsequtiveFaceGroups,
  getSortedFaceGroups,
  getSortedCards,
  getSortedSuitGroups,
  createExtractorResult,
  getHandRankValue,
} from './util';
import { HandExtractor, Hand } from './types'; // type

// https://www.cardschat.com/poker-hands/

export const extractHighCard: HandExtractor<Hand> = (cards) => {
  const [highestCard, ...kickers] = getSortedCards(cards);

  return {
    rank: HandRank.HighCard,
    rankValue: getHandRankValue(HandRank.HighCard),
    rankCards: [highestCard],
    kickers: kickers.slice(0, 4),
  };
};

export const extractOnePair: HandExtractor = (cards) => {
  const rankCards = getSortedFaceGroups(cards)[0]?.slice(0, 2);

  return rankCards
    ? createExtractorResult(HandRank.OnePair, rankCards, cards)
    : null;
};

export const extractTwoPair: HandExtractor = (cards) => {
  const rankCards = getSortedFaceGroups(cards)
    .slice(0, 2)
    .flatMap((cards) => cards.slice(0, 2));

  return rankCards.length === 4
    ? createExtractorResult(HandRank.TwoPair, rankCards, cards)
    : null;
};

export const extractThreeOfAKind: HandExtractor = (cards) => {
  const rankCards = getSortedFaceGroups(cards)
    .find((p) => p.length > 2)
    ?.slice(0, 3);

  return rankCards
    ? createExtractorResult(HandRank.ThreeOfAKind, rankCards, cards)
    : null;
};

export const extractStraight: HandExtractor = (cards) => {
  const candidate = getSortedConsequtiveFaceGroups(cards)
    .map((group) => uniqBy(({ face }) => face, group))
    .find((group) => group.length > 3)
    ?.slice(-5);

  if (!candidate) return null;

  if (candidate.length === 5) {
    return createExtractorResult(HandRank.Straight, candidate, cards);
  }

  const ace = getSortedCards(cards).find(({ face }) => face === Face.Ace);

  return ace
    ? createExtractorResult(HandRank.Straight, [...candidate, ace], cards)
    : null;
};

export const extractFlush: HandExtractor = (cards) => {
  const rankCards = getSortedSuitGroups(cards)
    .find((g) => g.length > 4)
    ?.slice(0, 5);

  return rankCards
    ? createExtractorResult(HandRank.Flush, rankCards, cards)
    : null;
};

export const extractFullHouse: HandExtractor = (cards) => {
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

export const extractFourOfAKind: HandExtractor = (cards) => {
  const rankCards = getSortedFaceGroups(cards)
    .find((p) => p.length > 3)
    ?.slice(0, 4);

  return rankCards
    ? createExtractorResult(HandRank.FourOfAKind, rankCards, cards)
    : null;
};

export const extractStraightFlush: HandExtractor = (cards) => {
  const candidate = getSortedSuitGroups(
    getSortedConsequtiveFaceGroups(cards).find((group) => group.length > 3) ||
      [],
  )
    .find((group) => group.length > 3)
    ?.slice(0, 5);

  if (!candidate) return null;

  if (candidate.length === 5) {
    return createExtractorResult(HandRank.StraightFlush, candidate, cards);
  }

  const ace = getSortedCards(cards).find(({ face }) => face === Face.Ace);

  return ace
    ? createExtractorResult(HandRank.StraightFlush, [...candidate, ace], cards)
    : null;
};

export const extractRoyalFlush: HandExtractor = (cards) => {
  const { rankCards, kickers } = extractStraightFlush(cards) || {
    rankCards: null,
    kickers: [],
  };

  return rankCards?.[0]?.face === Face.Ace
    ? {
        kickers,
        rankCards,
        rank: HandRank.RoyalFlush,
        rankValue: getHandRankValue(HandRank.RoyalFlush),
      }
    : null;
};
