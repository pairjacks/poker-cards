import { HandRank } from './constants';
import { Cards } from '../card/types'; // import type

export interface HandCandidate {
  readonly pocketCards: Cards;
  readonly communityCards: Cards;
}

export interface Hand {
  readonly rank: HandRank;
  readonly rankCards: Cards;
  readonly kickerCards: Cards;
}

export type HandExtractor<T = Hand | null> = (cards: Cards) => T;

export interface HandComparisonResult {
  readonly hand: Hand;
  readonly candidateIndex: number;
  readonly candidate: HandCandidate;
}
