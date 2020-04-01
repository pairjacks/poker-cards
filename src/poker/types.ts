import type { Cards } from '../core/types';

export type HandCandidate = Readonly<{
  pocket: Cards;
  community: Cards;
}>;
