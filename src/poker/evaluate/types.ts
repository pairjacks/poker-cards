import { HandRank } from '../constants';
import type { Cards } from '../../core/types';

export interface RankExtractorResult {
  rank: HandRank;
  rankValue: number;
  rankCards: Cards;
  kickers: Cards;
}

export type RankExtractor<T = RankExtractorResult | null> = (cards: Cards) => T;
