import { Card } from '~/lib/cards';

export type Hand = Readonly<{
  pocket: readonly Card[];
  community: readonly Card[];
}>;
