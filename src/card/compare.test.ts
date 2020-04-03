import { Face, Suit } from './constants';
import { isSameCard } from './compare';

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
});
