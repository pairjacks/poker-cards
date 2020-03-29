import { difference } from 'lodash/fp';

import { Suite, Face } from './types';
import { generateDeck, drawCardsFromDeck, Deck, shuffleDeck } from './deck';

describe('cards', () => {
  describe('generateDeck', () => {
    it('generates a deck', () => {
      expect(generateDeck()).toEqual(fullDeck);
    });
  });

  describe('drawCardsFromDeck', () => {
    it('does not modify deck if no cards to be drawn', () => {
      const emptyDeck: Deck = [];
      const initialDeck: Deck = [{ suite: Suite.Diamonds, face: Face.Two }];

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
        { suite: Suite.Hearts, face: Face.Jack },
        { suite: Suite.Diamonds, face: Face.Six },
        { suite: Suite.Spades, face: Face.Nine },
        { suite: Suite.Clubs, face: Face.Ten },
      ];

      let drawResult = drawCardsFromDeck(initialDeck);

      expect(drawResult).toEqual({
        cards: [{ suite: Suite.Hearts, face: Face.Jack }],
        deck: [
          { suite: Suite.Diamonds, face: Face.Six },
          { suite: Suite.Spades, face: Face.Nine },
          { suite: Suite.Clubs, face: Face.Ten },
        ],
      });

      expect(drawResult.deck).not.toBe(initialDeck);
      expect(initialDeck).toHaveLength(4);

      drawResult = drawCardsFromDeck(initialDeck, 6);

      expect(drawResult).toEqual({
        cards: [
          { suite: Suite.Clubs, face: Face.Ten },
          { suite: Suite.Spades, face: Face.Nine },
          { suite: Suite.Diamonds, face: Face.Six },
          { suite: Suite.Hearts, face: Face.Jack },
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

const fullDeck: Deck = [
  { suite: Suite.Diamonds, face: Face.Two },
  { suite: Suite.Diamonds, face: Face.Three },
  { suite: Suite.Diamonds, face: Face.Four },
  { suite: Suite.Diamonds, face: Face.Five },
  { suite: Suite.Diamonds, face: Face.Six },
  { suite: Suite.Diamonds, face: Face.Seven },
  { suite: Suite.Diamonds, face: Face.Eight },
  { suite: Suite.Diamonds, face: Face.Nine },
  { suite: Suite.Diamonds, face: Face.Ten },
  { suite: Suite.Diamonds, face: Face.Jack },
  { suite: Suite.Diamonds, face: Face.Queen },
  { suite: Suite.Diamonds, face: Face.King },
  { suite: Suite.Diamonds, face: Face.Ace },
  { suite: Suite.Clubs, face: Face.Two },
  { suite: Suite.Clubs, face: Face.Three },
  { suite: Suite.Clubs, face: Face.Four },
  { suite: Suite.Clubs, face: Face.Five },
  { suite: Suite.Clubs, face: Face.Six },
  { suite: Suite.Clubs, face: Face.Seven },
  { suite: Suite.Clubs, face: Face.Eight },
  { suite: Suite.Clubs, face: Face.Nine },
  { suite: Suite.Clubs, face: Face.Ten },
  { suite: Suite.Clubs, face: Face.Jack },
  { suite: Suite.Clubs, face: Face.Queen },
  { suite: Suite.Clubs, face: Face.King },
  { suite: Suite.Clubs, face: Face.Ace },
  { suite: Suite.Hearts, face: Face.Two },
  { suite: Suite.Hearts, face: Face.Three },
  { suite: Suite.Hearts, face: Face.Four },
  { suite: Suite.Hearts, face: Face.Five },
  { suite: Suite.Hearts, face: Face.Six },
  { suite: Suite.Hearts, face: Face.Seven },
  { suite: Suite.Hearts, face: Face.Eight },
  { suite: Suite.Hearts, face: Face.Nine },
  { suite: Suite.Hearts, face: Face.Ten },
  { suite: Suite.Hearts, face: Face.Jack },
  { suite: Suite.Hearts, face: Face.Queen },
  { suite: Suite.Hearts, face: Face.King },
  { suite: Suite.Hearts, face: Face.Ace },
  { suite: Suite.Spades, face: Face.Two },
  { suite: Suite.Spades, face: Face.Three },
  { suite: Suite.Spades, face: Face.Four },
  { suite: Suite.Spades, face: Face.Five },
  { suite: Suite.Spades, face: Face.Six },
  { suite: Suite.Spades, face: Face.Seven },
  { suite: Suite.Spades, face: Face.Eight },
  { suite: Suite.Spades, face: Face.Nine },
  { suite: Suite.Spades, face: Face.Ten },
  { suite: Suite.Spades, face: Face.Jack },
  { suite: Suite.Spades, face: Face.Queen },
  { suite: Suite.Spades, face: Face.King },
  { suite: Suite.Spades, face: Face.Ace },
];
