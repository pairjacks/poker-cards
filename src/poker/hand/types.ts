import { Cards } from '~/cards';

export type Hand = Readonly<{
  pocket: Cards;
  community: Cards;
}>;
