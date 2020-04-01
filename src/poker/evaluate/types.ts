import { HandRank } from '../constants';
import { Cards } from '../../core/types'; // type
import { HandCandidate } from '../types'; // type

export interface Hand {
  rank: HandRank;
  rankValue: number;
  rankCards: Cards;
  kickers: Cards;
}

export type HandExtractor<T = Hand | null> = (cards: Cards) => T;

export interface HandComparisonResult {
  readonly candidate: HandCandidate;
  readonly hand: Hand;
}
