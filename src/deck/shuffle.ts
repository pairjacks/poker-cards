import { Cards } from '../card/types'; // import type

export type RandomIntGenerator = (min: number, max: number) => Promise<number>;

export type ShuffleFunction = <T>(arr: T[]) => Promise<T[]>;

export type ShuffleFunctionCreator = (
  randomIntGenerator: RandomIntGenerator,
) => ShuffleFunction;

// Provide a naive Math.random based generator, BYO robust solution
// e.g. random-number-csprng
export const randomIntNaive: RandomIntGenerator = (min: number, max: number) =>
  Promise.resolve(min + Math.floor(Math.random() * max));

// Based on fisher-yates (https://bost.ocks.org/mike/shuffle/)
// Adapted from https://medium.com/swlh/the-javascript-shuffle-62660df19a5d
export const createFisherYatesStackShuffle: ShuffleFunctionCreator = (
  randomIntGenerator,
) => async (arr) => {
  let count = arr.length;

  while (count) {
    const sampleIndex = await randomIntGenerator(0, count);

    arr.push(arr.splice(sampleIndex, 1)[0]);
    count -= 1;
  }

  return arr;
};

export type DeckShuffler = (deck: Cards) => Promise<Cards>;

export const createDeckShuffler = (shuffleFn?: ShuffleFunction) => {
  const shuffle = shuffleFn || createFisherYatesStackShuffle(randomIntNaive);
  const shuffler: DeckShuffler = (deck) => shuffle([...deck]);

  return shuffler;
};
