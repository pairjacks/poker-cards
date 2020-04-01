import { HandRank } from '../constants';
import type { Cards } from '../../core/types';
import type { HandCandidate } from '../types';

export interface Hand {
  rank: HandRank;
  rankValue: number;
  rankCards: Cards;
  kickers: Cards;
}

export type HandExtractor<T = Hand | null> = (cards: Cards) => T;

export interface HighestHandResult {
  readonly candidate: HandCandidate;
  readonly hand: Hand;
}
