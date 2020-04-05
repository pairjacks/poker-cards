import { HandRank } from './constants';
import { Cards } from '../card/types'; // import type

/** Represents a collection of cards that can be used to create a 5 card hand */
export interface HandCandidate {
  /** A player's pocket cards */
  readonly pocketCards: Cards;
  /** Community cards available to all players */
  readonly communityCards: Cards;
}

/** Represents a hand derived from a HandCandidate */
export interface Hand {
  readonly rank: HandRank;
  /** Cards included in the ranking combination */
  readonly rankCards: Cards;
  /** Cards included in the hand but not in the ranking combination */
  readonly kickerCards: Cards;
}

/** Finds a hand pattern from the given array of cards */
export type HandExtractor<T = Hand | null> = (cards: Cards) => T;

/** Represents an item in the result of comparing hands */
export interface HandComparisonResult {
  readonly hand: Hand;
  /** The original HandCandidate */
  readonly candidate: HandCandidate;
  /** The index of the original HandCandidate in the comparison array */
  readonly candidateIndex: number;
}
