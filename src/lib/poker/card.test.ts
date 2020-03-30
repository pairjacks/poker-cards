import { Face, Suit } from '~/lib/cards';

import { compareCards } from './card';

describe('poker/card', () => {
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
