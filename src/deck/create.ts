import { Suit, Face } from '../card/constants';

import type { Card, Cards } from '../card/types';

/**
 * Creates a 52 card deck without Jokers, sorted by suite and face.
 * Index 0 represents the top of a face down deck
 */
export function createDeck({ order = 'ndo' }: CreateDeckOptions = {}) {
  switch (order) {
    case 'ndo':
      return createDeckNdo();
    case 'value':
      return createDeckValue();
    default:
      throw new Error(`Unknown deck order ${String(order)}`);
  }
}

export type DeckOrder = 'ndo' | 'value';

export interface CreateDeckOptions {
  order?: DeckOrder;
}

function createDeckValue(): Cards {
  return Object.values(Suit).flatMap(createSuit);
}

function createDeckNdo(): Cards {
  return [
    ...createSuit(Suit.Hearts),
    ...createSuit(Suit.Clubs),
    ...createSuit(Suit.Diamonds).reverse(),
    ...createSuit(Suit.Spades).reverse(),
  ];
}

function createSuit(suit: Suit) {
  return Object.values(Face).map((face): Card => [face, suit]);
}
