import { difference } from 'lodash/fp';

import { Suit, Face } from './types';
import { generateDeck, drawCardsFromDeck, Deck, shuffleDeck } from './deck';
import { fullDeck, fullDeckWithJokers } from './__fixtures__/deck';

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
