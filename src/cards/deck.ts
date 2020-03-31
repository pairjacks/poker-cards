import randomNumberCsprng from 'random-number-csprng';
import { clamp, range } from 'lodash/fp';

import { Suit, Face, Cards } from './types';

export const generateDeck = ({
  jokers = false,
}: { jokers?: boolean } = {}): Deck => {
  const suits = Object.values(Suit).filter((suit) => suit !== Suit.Joker);
  const faces = Object.values(Face).filter((face) => face !== Face.Joker);

  return suits
    .flatMap((suit) => faces.map((face) => ({ face, suit })))
    .concat(
      jokers
        ? range(0, 4).map(() => ({ face: Face.Joker, suit: Suit.Joker }))
        : [],
    );
};

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

export const shuffleDeck = (
  deck: Deck,
  shuffleFn: Shuffler = shuffleFisherYatesStack,
): Promise<Deck> => shuffleFn(deck);

export type DeckDrawResult = Readonly<{ cards: Cards; deck: Deck }>;

export type Deck = Cards;

type Shuffler = <T>(arr: readonly T[]) => Promise<readonly T[]>;
