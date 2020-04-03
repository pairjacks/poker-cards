import { Face, Suit } from './constants';
import { isSameCard, compareCards } from './compare';

describe('compare', () => {
  describe('isSameCard', () => {
    it('determines if two cards are the same', () => {
      expect(
        isSameCard(
          { face: Face.Four, suit: Suit.Diamonds },
          { face: Face.Four, suit: Suit.Diamonds },
        ),
      ).toBe(true);

      expect(
        isSameCard(
          { face: Face.Three, suit: Suit.Diamonds },
          { face: Face.Four, suit: Suit.Diamonds },
        ),
      ).toBe(false);

      expect(
        isSameCard(
          { face: Face.Four, suit: Suit.Diamonds },
          { face: Face.Four, suit: Suit.Clubs },
        ),
      ).toBe(false);
    });
  });

  describe('compareCards', () => {
    it('compares card values', () => {
      expect(
        compareCards(
          { face: Face.Two, suit: Suit.Clubs },
          { face: Face.Two, suit: Suit.Clubs },
        ),
      ).toBe(0);

      expect(
        compareCards(
          { face: Face.Two, suit: Suit.Clubs },
          { face: Face.Three, suit: Suit.Clubs },
        ),
      ).toBeGreaterThan(0);

      expect(
        compareCards(
          { face: Face.Two, suit: Suit.Clubs },
          { face: Face.Two, suit: Suit.Hearts },
        ),
      ).toBeGreaterThan(0);

      expect(
        compareCards(
          { face: Face.Three, suit: Suit.Clubs },
          { face: Face.Two, suit: Suit.Diamonds },
        ),
      ).toBeLessThan(0);

      expect(
        compareCards(
          { face: Face.Ten, suit: Suit.Diamonds },
          { face: Face.Nine, suit: Suit.Spades },
        ),
      ).toBeLessThan(0);
    });
  });
});
