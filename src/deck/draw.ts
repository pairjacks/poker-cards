import { clamp } from '../util/number';
import { Cards } from '../card/types'; // type

export type DeckDrawResult = Readonly<{ cards: Cards; deck: Cards }>;

// index 0 represents 'top' of a deck
export const drawCardsFromDeck = (deck: Cards, count = 1): DeckDrawResult => {
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
