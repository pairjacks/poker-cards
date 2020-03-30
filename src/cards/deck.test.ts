import { difference } from 'lodash/fp';

import { Suit, Face } from './types';
import { generateDeck, drawCardsFromDeck, Deck, shuffleDeck } from './deck';

describe('lib/cards/deck', () => {
  describe('generateDeck', () => {
    it('generates a deck', () => {
      expect(generateDeck()).toEqual(fullDeck);
      expect(generateDeck({ jokers: true })).toEqual(fullDeckWithJokers);
    });
  });

  describe('drawCardsFromDeck', () => {
    it('does not modify deck if no cards to be drawn', () => {
      const emptyDeck: Deck = [];
      const initialDeck: Deck = [{ suit: Suit.Diamonds, face: Face.Two }];

      let drawResult = drawCardsFromDeck(emptyDeck, 1);

      expect(drawResult.cards).toEqual([]);
      expect(drawResult.deck).toBe(emptyDeck);

      drawResult = drawCardsFromDeck(initialDeck, 0);

      expect(drawResult.cards).toEqual([]);
      expect(drawResult.deck).toBe(initialDeck);

      drawResult = drawCardsFromDeck(initialDeck, -1);

      expect(drawResult.cards).toEqual([]);
      expect(drawResult.deck).toBe(initialDeck);
    });

    it('immutably draws cards from "top" of deck', () => {
      const initialDeck = [
        { suit: Suit.Hearts, face: Face.Jack },
        { suit: Suit.Diamonds, face: Face.Six },
        { suit: Suit.Spades, face: Face.Nine },
        { suit: Suit.Clubs, face: Face.Ten },
      ];

      let drawResult = drawCardsFromDeck(initialDeck);

      expect(drawResult).toEqual({
        cards: [{ suit: Suit.Hearts, face: Face.Jack }],
        deck: [
          { suit: Suit.Diamonds, face: Face.Six },
          { suit: Suit.Spades, face: Face.Nine },
          { suit: Suit.Clubs, face: Face.Ten },
        ],
      });

      expect(drawResult.deck).not.toBe(initialDeck);
      expect(initialDeck).toHaveLength(4);

      drawResult = drawCardsFromDeck(initialDeck, 6);

      expect(drawResult).toEqual({
        cards: [
          { suit: Suit.Clubs, face: Face.Ten },
          { suit: Suit.Spades, face: Face.Nine },
          { suit: Suit.Diamonds, face: Face.Six },
          { suit: Suit.Hearts, face: Face.Jack },
        ],
        deck: [],
      });
      expect(drawResult.deck).not.toBe(initialDeck);
      expect(initialDeck).toHaveLength(4);
    });
  });

  describe('shuffleDeck', () => {
    it('asynchronously shuffles a deck', async () => {
      const deck = fullDeck;
      const shuffled = await shuffleDeck(deck);

      expect(shuffled).not.toBe(deck);
      expect(shuffled).not.toEqual(deck);
      expect(difference(deck, shuffled)).toHaveLength(0);
    });

    it('uses passed in shuffle function', async () => {
      const deck = fullDeck;
      const shuffled = await shuffleDeck(deck, async (d) => {
        const result = [...d];

        result.reverse();

        return result;
      });

      expect(shuffled).not.toBe(deck);
      expect(shuffled).not.toEqual(deck);
      expect(shuffled[0]).toEqual(deck[deck.length - 1]);
      expect(shuffled[shuffled.length - 1]).toEqual(deck[0]);
    });
  });
});

const fullDeck = [
  { suit: Suit.Diamonds, face: Face.Two },
  { suit: Suit.Diamonds, face: Face.Three },
  { suit: Suit.Diamonds, face: Face.Four },
  { suit: Suit.Diamonds, face: Face.Five },
  { suit: Suit.Diamonds, face: Face.Six },
  { suit: Suit.Diamonds, face: Face.Seven },
  { suit: Suit.Diamonds, face: Face.Eight },
  { suit: Suit.Diamonds, face: Face.Nine },
  { suit: Suit.Diamonds, face: Face.Ten },
  { suit: Suit.Diamonds, face: Face.Jack },
  { suit: Suit.Diamonds, face: Face.Queen },
  { suit: Suit.Diamonds, face: Face.King },
  { suit: Suit.Diamonds, face: Face.Ace },
  { suit: Suit.Clubs, face: Face.Two },
  { suit: Suit.Clubs, face: Face.Three },
  { suit: Suit.Clubs, face: Face.Four },
  { suit: Suit.Clubs, face: Face.Five },
  { suit: Suit.Clubs, face: Face.Six },
  { suit: Suit.Clubs, face: Face.Seven },
  { suit: Suit.Clubs, face: Face.Eight },
  { suit: Suit.Clubs, face: Face.Nine },
  { suit: Suit.Clubs, face: Face.Ten },
  { suit: Suit.Clubs, face: Face.Jack },
  { suit: Suit.Clubs, face: Face.Queen },
  { suit: Suit.Clubs, face: Face.King },
  { suit: Suit.Clubs, face: Face.Ace },
  { suit: Suit.Hearts, face: Face.Two },
  { suit: Suit.Hearts, face: Face.Three },
  { suit: Suit.Hearts, face: Face.Four },
  { suit: Suit.Hearts, face: Face.Five },
  { suit: Suit.Hearts, face: Face.Six },
  { suit: Suit.Hearts, face: Face.Seven },
  { suit: Suit.Hearts, face: Face.Eight },
  { suit: Suit.Hearts, face: Face.Nine },
  { suit: Suit.Hearts, face: Face.Ten },
  { suit: Suit.Hearts, face: Face.Jack },
  { suit: Suit.Hearts, face: Face.Queen },
  { suit: Suit.Hearts, face: Face.King },
  { suit: Suit.Hearts, face: Face.Ace },
  { suit: Suit.Spades, face: Face.Two },
  { suit: Suit.Spades, face: Face.Three },
  { suit: Suit.Spades, face: Face.Four },
  { suit: Suit.Spades, face: Face.Five },
  { suit: Suit.Spades, face: Face.Six },
  { suit: Suit.Spades, face: Face.Seven },
  { suit: Suit.Spades, face: Face.Eight },
  { suit: Suit.Spades, face: Face.Nine },
  { suit: Suit.Spades, face: Face.Ten },
  { suit: Suit.Spades, face: Face.Jack },
  { suit: Suit.Spades, face: Face.Queen },
  { suit: Suit.Spades, face: Face.King },
  { suit: Suit.Spades, face: Face.Ace },
] as const;

const fullDeckWithJokers = [
  ...fullDeck,
  { suit: Suit.Joker, face: Face.Joker },
  { suit: Suit.Joker, face: Face.Joker },
  { suit: Suit.Joker, face: Face.Joker },
  { suit: Suit.Joker, face: Face.Joker },
] as const;
