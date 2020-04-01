import randomNumberCsprng from 'random-number-csprng';

import { clamp } from '../util/number';
import { Suit, Face } from './constants';
import type { Cards, Deck } from './types';

export const generateDeck = (): Deck =>
  Object.values(Suit).flatMap((suit) =>
    Object.values(Face).map((face) => ({ face, suit })),
  );

// Based on fisher-yates using async crypto secure pseudo random numbers
// Adapted from https://medium.com/swlh/the-javascript-shuffle-62660df19a5d
const shuffleFisherYatesStack: Shuffler = async (arr) => {
  const shuffled = [...arr];
  let count = shuffled.length;

  while (count) {
    const sampleIndex = await randomNumberCsprng(0, count);

    shuffled.push(shuffled.splice(sampleIndex, 1)[0]);
    count -= 1;
  }

  return shuffled;
};

export const shuffleDeck = (
  deck: Deck,
  shuffleFn: Shuffler = shuffleFisherYatesStack,
): Promise<Deck> => shuffleFn(deck);

// index 0 represents 'top' of a deck
export const drawCardsFromDeck = (deck: Deck, count = 1): DeckDrawResult => {
  const drawCount = clamp(0, deck.length, count);

  if (!deck.length || !drawCount) return { deck, cards: [] };

  const nextDeck = [...deck];
  // Reverse order to represent drawing cards one-by-one, as opposed to cutting
  // off a chunk of cards from the "top" of the deck, so that first drawn ends
  // up at "bottom" of drawn pile, e.g. when drawing 3:
  // initial deck: [a, b, c, d]
  // draw first card: [b, c, d] => [a]
  // then second: [c, d] => [b, a]
  // then third: [b] => [c, b, a]
  const cards = nextDeck.splice(0, drawCount).reverse();

  return { cards, deck: nextDeck };
};

export type DeckDrawResult = Readonly<{ cards: Cards; deck: Deck }>;

type Shuffler = <T>(arr: readonly T[]) => Promise<readonly T[]>;
