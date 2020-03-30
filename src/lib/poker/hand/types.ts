import { Cards } from '~/lib/cards';

export type Hand = Readonly<{
  pocket: Cards;
  community: Cards;
}>;
