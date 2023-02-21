import type { Card, Cards } from '../card/types';

/**
 * Provide a naive Math.random based generator.
 * @param min - minimum int value
 * @param max - maximum int value
 * @returns a random int value
 */
export const randomIntNaive: RandomIntGenerator = (min, max) =>
  Promise.resolve(min + Math.floor(Math.random() * max));

/**
 * Create a shuffler based on fisher-yates (https://bost.ocks.org/mike/shuffle/)
 * Adapted from https://medium.com/swlh/the-javascript-shuffle-62660df19a5d
 * @param randomIntGenerator - an async random integer generator
 */
export const createFisherYatesStackShuffle: ShuffleFunctionCreator = (
  randomIntGenerator,
) => {
  return function shuffleFn(arr) {
    const futureInts = arr.map((_, i) => randomIntGenerator(0, arr.length - i));

    return Promise.all(futureInts).then((ints) => {
      for (const i of ints) {
        const picked = arr.splice(i, 1)[0];

        if (picked) arr.push(picked);
      }

      return arr;
    });
  };
};

/**
 * Provide a default shuffler using naive Math.random int generator
 */
export const shuffleDeckNaive: DeckShuffler = createDeckShuffler(
  createFisherYatesStackShuffle(randomIntNaive),
);

/**
 * Create a non-mutating async shuffle function wrapper
 * @param shuffleFn - an async shuffle function
 */
export function createDeckShuffler(shuffleFn: ShuffleFunction): DeckShuffler {
  return function shuffle(deck) {
    return shuffleFn([...deck]);
  };
}

export type DeckShuffler = (deck: Cards) => Promise<Cards>;

export type RandomIntGenerator = (min: number, max: number) => Promise<number>;

export type ShuffleFunction = (cards: Card[]) => Promise<Cards>;

export type ShuffleFunctionCreator = (
  randomIntGenerator: RandomIntGenerator,
) => ShuffleFunction;
