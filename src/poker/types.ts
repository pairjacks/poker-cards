import type { Cards } from '../core/types';

export type Hand = Readonly<{
  pocket: Cards;
  community: Cards;
}>;
