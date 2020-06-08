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

/**
 * Extracts the highest possible hand from a candidate hand
 * @param candidate - a HandCandidate to evaluate
 */
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
