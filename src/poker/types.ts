import { Cards } from '../core/types'; // type

export type HandCandidate = Readonly<{
  pocket: Cards;
  community: Cards;
}>;
