import { isSameCard } from './card';
import { Face, Suite } from './types';

describe('cards/card', () => {
  describe('isSameCard', () => {
    it('determines if two cards are the same', () => {
      expect(
        isSameCard(
          { face: Face.Four, suite: Suite.Diamonds },
          { face: Face.Four, suite: Suite.Diamonds },
        ),
      ).toBe(true);

      expect(
        isSameCard(
          { face: Face.Three, suite: Suite.Diamonds },
          { face: Face.Four, suite: Suite.Diamonds },
        ),
      ).toBe(false);

      expect(
        isSameCard(
          { face: Face.Four, suite: Suite.Diamonds },
          { face: Face.Four, suite: Suite.Clubs },
        ),
      ).toBe(false);
    });
  });
});
