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

import type { Hand, HandCandidate } from './types';

/**
 * Extracts the highest possible hand from a candidate hand
 * @param candidate - a HandCandidate to evaluate
 */
export const extractHand: (candidate: HandCandidate) => Hand =
  extractInPreferenceOrder(
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
