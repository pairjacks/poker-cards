import { Suit, Face } from '../core/constants';
import { Cards } from '../core/types'; // type

export const createDeck = (): Cards =>
  Object.values(Suit).flatMap((suit) =>
    Object.values(Face).map((face) => ({ face, suit })),
  );
