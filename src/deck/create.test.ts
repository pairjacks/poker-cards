import { fullDeckValue, fullDeckNdo } from './__fixtures__/deck';
import { createDeck } from './create';

describe('create', () => {
  describe('createDeck', () => {
    it('should create a full deck ordered by new deck order', () => {
      expect(createDeck({ order: 'ndo' })).toEqual(fullDeckNdo);
    });

    it('should create a full deck ordered by value', () => {
      expect(createDeck({ order: 'value' })).toEqual(fullDeckValue);
    });

    it('should use new deck order by default', () => {
      expect(createDeck()).toEqual(fullDeckNdo);
    });

    it('should throw when specifying unknown deck order', () => {
      // @ts-expect-error test invalid input
      expect(() => createDeck({ order: 'foo' })).toThrow(/unknown deck order/i);
    });
  });
});
