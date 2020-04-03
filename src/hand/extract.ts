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
  extractPair,
  extractHighCard,
} from './hand-extractors';

export const extractHand = extractInPreferenceOrder(
  [
    extractRoyalFlush,
    extractStraightFlush,
    extractFourOfAKind,
    extractFullHouse,
    extractFlush,
    extractStraight,
    extractThreeOfAKind,
    extractTwoPair,
    extractPair,
  ],
  extractHighCard,
);
