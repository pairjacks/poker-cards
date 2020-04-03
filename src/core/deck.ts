import { clamp } from './util/number';
import { Suit, Face } from './constants';
import { Cards, Deck } from './types'; // type

export const generateDeck = (): Deck =>
  Object.values(Suit).flatMap((suit) =>
    Object.values(Face).map((face) => ({ face, suit })),
  );

export type DeckDrawResult = Readonly<{ cards: Cards; deck: Deck }>;

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
