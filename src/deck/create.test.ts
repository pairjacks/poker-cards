import { fullDeck } from './__fixtures__/deck';
import { createDeck } from './create';

describe('create', () => {
  describe('createDeck', () => {
    it('creates a full deck', () => {
      expect(createDeck()).toEqual(fullDeck);
    });
  });
});
