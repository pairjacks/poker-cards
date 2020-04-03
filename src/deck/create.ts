import { Suit, Face } from '../card/constants';
import { Cards } from '../card/types'; // type

export const createDeck = (): Cards =>
  Object.values(Suit).flatMap((suit) =>
    Object.values(Face).map((face) => ({ face, suit })),
  );
