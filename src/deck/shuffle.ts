import type { Card, Cards } from '../card/types';

export type RandomIntGenerator = (min: number, max: number) => Promise<number>;

export type ShuffleFunction = (cards: Card[]) => Promise<Cards>;

export type ShuffleFunctionCreator = (
  randomIntGenerator: RandomIntGenerator,
) => ShuffleFunction;

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
export const createFisherYatesStackShuffle: ShuffleFunctionCreator =
  (randomIntGenerator) => (arr) =>
    Promise.all(arr.map((_, i) => randomIntGenerator(0, arr.length - i))).then(
      (randomInts) => {
        for (const i of randomInts) {
          const picked = arr.splice(i, 1)[0];

          if (picked) arr.push(picked);
        }

        return arr;
      },
    );

export type DeckShuffler = (deck: Cards) => Promise<Cards>;

/**
 * Create a non-mutating async shuffle function wrapper
 * @param shuffleFn - an async shuffle function
 */
export const createDeckShuffler =
  (shuffleFn: ShuffleFunction): DeckShuffler =>
  (deck) =>
    shuffleFn([...deck]);

/**
 * Provide a default shuffler using naive Math.random int generator
 */
export const shuffleDeckNaive: DeckShuffler = createDeckShuffler(
  createFisherYatesStackShuffle(randomIntNaive),
);
