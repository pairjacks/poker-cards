import { Face, Suite } from '~/lib/cards';

import { compareCards } from './card';

describe('poker/card', () => {
  describe('compareCards', () => {
    it('compares card values', () => {
      expect(
        compareCards(
          { face: Face.Two, suite: Suite.Clubs },
          { face: Face.Two, suite: Suite.Clubs },
        ),
      ).toBe(0);

      expect(
        compareCards(
          { face: Face.Two, suite: Suite.Clubs },
          { face: Face.Three, suite: Suite.Clubs },
        ),
      ).toBeGreaterThan(0);

      expect(
        compareCards(
          { face: Face.Two, suite: Suite.Clubs },
          { face: Face.Two, suite: Suite.Hearts },
        ),
      ).toBeGreaterThan(0);

      expect(
        compareCards(
          { face: Face.Three, suite: Suite.Clubs },
          { face: Face.Two, suite: Suite.Diamonds },
        ),
      ).toBeLessThan(0);

      expect(
        compareCards(
          { face: Face.Ten, suite: Suite.Diamonds },
          { face: Face.Nine, suite: Suite.Spades },
        ),
      ).toBeLessThan(0);
    });
  });
});
