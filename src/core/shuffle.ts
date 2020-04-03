import { Deck } from './types'; // type

export type RandomIntGenerator = (min: number, max: number) => Promise<number>;

export type ShuffleFunction = <T>(arr: readonly T[]) => Promise<readonly T[]>;

export type ShuffleFunctionCreator = (
  randomIntGenerator: RandomIntGenerator,
) => ShuffleFunction;

// Provide a naive Math.random solution, BYO robust crypto solution
// e.g. random-number-csprng
export const randomIntNaive: RandomIntGenerator = (min: number, max: number) =>
  Promise.resolve(min + Math.floor(Math.random() * max));

// Based on fisher-yates using async crypto secure pseudo random numbers
// Adapted from https://medium.com/swlh/the-javascript-shuffle-62660df19a5d
// For info about fisher-yates: https://bost.ocks.org/mike/shuffle/
export const createFisherYatesStackShuffle: ShuffleFunctionCreator = (
  randomIntGenerator,
) => async (arr) => {
  const shuffled = [...arr];
  let m = arr.length;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    const i = await randomIntGenerator(0, m);

    m -= 1;

    // And swap it with the current element.
    const temp = shuffled[m];
    shuffled[m] = shuffled[i];
    shuffled[i] = temp;
  }

  return shuffled;

  /*
  let count = shuffled.length;

  while (count) {
    const sampleIndex = await randomIntGenerator(0, count);

    shuffled.push(shuffled.splice(sampleIndex, 1)[0]);
    count -= 1;
  }

  return shuffled;
  */
};

export const createDeckShuffler = (shuffleFn?: ShuffleFunction) => {
  const shuffle = shuffleFn || createFisherYatesStackShuffle(randomIntNaive);

  return (deck: Deck) => shuffle(deck);
};
