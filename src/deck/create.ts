import { Suit, Face } from '../card/constants';

import type { Card, Cards } from '../card/types';

export type DeckOrder = 'ndo' | 'value';

export interface CreateDeckOptions {
  order?: DeckOrder;
}

/**
 * Creates a 52 card deck without Jokers, sorted by suite and face.
 * Index 0 represents the top of a face down deck
 */
export const createDeck = ({
  order = 'ndo',
}: CreateDeckOptions = {}): Cards => {
  switch (order) {
    case 'ndo':
      return createDeckNdo();
    case 'value':
      return createDeckValue();
    default:
      throw new Error(`Unknown deck order ${String(order)}`);
  }
};

const createDeckValue = (): Cards => Object.values(Suit).flatMap(createSuit);

const createDeckNdo = (): Cards => [
  ...createSuit(Suit.Hearts),
  ...createSuit(Suit.Clubs),
  ...createSuit(Suit.Diamonds).reverse(),
  ...createSuit(Suit.Spades).reverse(),
];

const createSuit = (suit: Suit): Card[] =>
  Object.values(Face).map((face) => [face, suit]);
