import { Cards } from '../card/types'; // import type

export type RandomIntGenerator = (min: number, max: number) => Promise<number>;

export type ShuffleFunction = <T>(arr: T[]) => Promise<T[]>;

export type ShuffleFunctionCreator = (
  randomIntGenerator: RandomIntGenerator,
) => ShuffleFunction;

/**
 * Provide a naive Math.random based generator.
 * BYO robust solution e.g. random-number-csprng
 * @param min - mininmum int value
 * @param max - maximum int value
 * @returns a random int value
 */
export const randomIntNaive: RandomIntGenerator = (min: number, max: number) =>
  Promise.resolve(min + Math.floor(Math.random() * max));

/**
 * Create a shuffler based on fisher-yates (https://bost.ocks.org/mike/shuffle/)
 * Adapted from https://medium.com/swlh/the-javascript-shuffle-62660df19a5d
 * @param randomIntGenerator - an async random integeter generator
 */
export const createFisherYatesStackShuffle: ShuffleFunctionCreator = (
  randomIntGenerator,
) => (arr) =>
  Promise.all(arr.map((_, i) => randomIntGenerator(0, arr.length - i))).then(
    (randomInts) => {
      for (let i = 0; i < randomInts.length; i++) {
        arr.push(arr.splice(randomInts[i], 1)[0]);
      }

      return arr;
    },
  );

export type DeckShuffler = (deck: Cards) => Promise<Cards>;

/**
 * Create a non-mutation async shuffle function wrapper
 * @param shuffleFn - an async shuffle function
 */
export const createDeckShuffler = (shuffleFn?: ShuffleFunction) => {
  const shuffle = shuffleFn || createFisherYatesStackShuffle(randomIntNaive);
  const shuffler: DeckShuffler = (deck) => shuffle([...deck]);

  return shuffler;
};
