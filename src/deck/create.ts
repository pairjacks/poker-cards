import { Suit, Face } from '../card/constants';
import { Cards } from '../card/types'; // import type

/**
 * Creates a 52 card deck without Jokers, sorted by suite and face.
 */
export const createDeck = (): Cards =>
  Object.values(Suit).flatMap((suit) =>
    Object.values(Face).map((face) => [face, suit]),
  );
