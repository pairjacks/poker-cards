import { fullDeck } from './__fixtures__/deck';
import { Suit, Face } from './constants';
import { generateDeck, drawCardsFromDeck } from './deck';
import { Deck } from './types'; // type

describe('lib/cards/deck', () => {
  describe('generateDeck', () => {
    it('generates a deck', () => {
      expect(generateDeck()).toEqual(fullDeck);
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
});
