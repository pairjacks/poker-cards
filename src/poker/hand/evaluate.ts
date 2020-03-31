import { HandRank } from '../constants';
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
import type { Comparator } from '../../core/types';
import type { Hand } from '../types';

const rankValueMap = {
  [HandRank.RoyalFlush]: 10,
  [HandRank.StraightFlush]: 9,
  [HandRank.FourOfAKind]: 8,
  [HandRank.FullHouse]: 7,
  [HandRank.Flush]: 6,
  [HandRank.Straight]: 5,
  [HandRank.ThreeOfAKind]: 4,
  [HandRank.TwoPair]: 3,
  [HandRank.OnePair]: 2,
  [HandRank.HighCard]: 1,
} as const;

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

export const comparePokerHands: Comparator<Hand> = (a, b) => {
  const { rank: aRank } = evaluatePokerHand(a);
  const { rank: bRank } = evaluatePokerHand(b);

  return rankValueMap[bRank] - rankValueMap[aRank];
};
