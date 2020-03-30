import { Comparator } from '~/lib/cards';

import { extractInPreferenceOrder } from './util';
import {
  extractRoyalFlush,
  extractStraightFlush,
  extractFourOfAKind,
  extractFullHouse,
  extractFlush,
  extractStraight,
  extractThreeOfAKind,
  extractTwoPair,
  extractOnePair,
  extractHighCard,
} from './extractors';
import { PokerHandRank } from '../types';
import { Hand } from './types';

export * from './types';

export const comparePokerHands: Comparator<Hand> = (a, b) => {
  const { rank: aRank } = evaluatePokerHand(a);
  const { rank: bRank } = evaluatePokerHand(b);

  return rankValueMap[bRank] - rankValueMap[aRank];
};

export const evaluatePokerHand = extractInPreferenceOrder(
  [
    extractRoyalFlush,
    extractStraightFlush,
    extractFourOfAKind,
    extractFullHouse,
    extractFlush,
    extractStraight,
    extractThreeOfAKind,
    extractTwoPair,
    extractOnePair,
  ],
  extractHighCard,
);

const rankValueMap = {
  [PokerHandRank.RoyalFlush]: 10,
  [PokerHandRank.StraightFlush]: 9,
  [PokerHandRank.FourOfAKind]: 8,
  [PokerHandRank.FullHouse]: 7,
  [PokerHandRank.Flush]: 6,
  [PokerHandRank.Straight]: 5,
  [PokerHandRank.ThreeOfAKind]: 4,
  [PokerHandRank.TwoPair]: 3,
  [PokerHandRank.OnePair]: 2,
  [PokerHandRank.HighCard]: 1,
} as const;
