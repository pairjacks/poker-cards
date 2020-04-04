import { Face, Suit } from './constants';
import { isSameCard, compareCards } from './compare';

describe('compare', () => {
  describe('isSameCard', () => {
    it('determines if two cards are the same', () => {
      expect(
        isSameCard([Face.Four, Suit.Diamonds], [Face.Four, Suit.Diamonds]),
      ).toBe(true);

      expect(
        isSameCard([Face.Three, Suit.Diamonds], [Face.Four, Suit.Diamonds]),
      ).toBe(false);

      expect(
        isSameCard([Face.Four, Suit.Diamonds], [Face.Four, Suit.Clubs]),
      ).toBe(false);
    });
  });

  describe('compareCards', () => {
    it('compares card values', () => {
      expect(compareCards([Face.Two, Suit.Clubs], [Face.Two, Suit.Clubs])).toBe(
        0,
      );

      expect(
        compareCards([Face.Two, Suit.Clubs], [Face.Three, Suit.Clubs]),
      ).toBeGreaterThan(0);

      expect(
        compareCards([Face.Two, Suit.Clubs], [Face.Two, Suit.Hearts]),
      ).toBeGreaterThan(0);

      expect(
        compareCards([Face.Three, Suit.Clubs], [Face.Two, Suit.Diamonds]),
      ).toBeLessThan(0);

      expect(
        compareCards([Face.Ten, Suit.Diamonds], [Face.Nine, Suit.Spades]),
      ).toBeLessThan(0);
    });
  });
});
