import { Suit, Face } from '../card/constants';
import { drawCardsFromDeck } from './draw';

import type { Cards } from '../card/types';

describe('draw', () => {
  describe('drawCardsFromDeck', () => {
    it('does not modify deck if no cards to be drawn', () => {
      const emptyDeck: Cards = [] as const;
      const initialDeck = [[Face.Two, Suit.Diamonds]] as const;

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
        [Face.Jack, Suit.Hearts],
        [Face.Six, Suit.Diamonds],
        [Face.Nine, Suit.Spades],
        [Face.Ten, Suit.Clubs],
      ] as const;

      let drawResult = drawCardsFromDeck(initialDeck);

      expect(drawResult).toEqual({
        cards: [[Face.Jack, Suit.Hearts]],
        deck: [
          [Face.Six, Suit.Diamonds],
          [Face.Nine, Suit.Spades],
          [Face.Ten, Suit.Clubs],
        ],
      });

      expect(drawResult.deck).not.toBe(initialDeck);
      expect(initialDeck).toHaveLength(4);

      drawResult = drawCardsFromDeck(initialDeck, 6);

      expect(drawResult).toEqual({
        cards: [
          [Face.Ten, Suit.Clubs],
          [Face.Nine, Suit.Spades],
          [Face.Six, Suit.Diamonds],
          [Face.Jack, Suit.Hearts],
        ],
        deck: [],
      });
      expect(drawResult.deck).not.toBe(initialDeck);
      expect(initialDeck).toHaveLength(4);
    });
  });
});
