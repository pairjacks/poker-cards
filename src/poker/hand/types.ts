import { Cards } from '../../cards';
import { HandRank } from '../types';

export type Hand = Readonly<{
  pocket: Cards;
  community: Cards;
}>;

export interface RankExtractorResult {
  rank: HandRank;
  rankCards: Cards;
  kickers: Cards;
}

export type RankExtractor<T = RankExtractorResult | null> = (cards: Cards) => T;
