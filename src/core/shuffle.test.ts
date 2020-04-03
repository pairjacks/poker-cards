import { differenceWith } from './util/array';
import { fullDeck } from './__fixtures__/deck';
import { isSameCard } from './card';
import { createDeckShuffler } from './shuffle';

describe('core/shuffle', () => {
  it('asynchronously shuffles a deck using default shuffler', async () => {
    const deck = fullDeck;
    const shuffle = createDeckShuffler();
    const shuffled = await shuffle(deck);

    expect(shuffled).not.toEqual(deck);
    expect(differenceWith(isSameCard, deck, shuffled)).toHaveLength(0);
    expect(differenceWith(isSameCard, shuffled, deck)).toHaveLength(0);
  });

  it('uses custom shuffle function', async () => {
    const deck = fullDeck;
    const shuffle = createDeckShuffler(async (d) => {
      const result = [...d];

      result.reverse();

      return result;
    });
    const shuffled = await shuffle(deck);

    expect(shuffled).not.toEqual(deck);
    expect(shuffled[0]).toEqual(deck[deck.length - 1]);
    expect(shuffled[shuffled.length - 1]).toEqual(deck[0]);
  });
});