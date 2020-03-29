import randomNumberCsprng from 'random-number-csprng';

// Based on fisher-yates using async crypto secure pseudo random numbers
// Adapted from https://medium.com/swlh/the-javascript-shuffle-62660df19a5d
export const shuffleFisherYatesStack: Shuffler = async (arr) => {
  const shuffled = [...arr];
  let count = shuffled.length;

  while (count) {
    const sampleIndex = await randomNumberCsprng(0, count);

    shuffled.push(shuffled.splice(sampleIndex, 1)[0]);
    count -= 1;
  }

  return shuffled;
};

export type Shuffler = <T>(arr: readonly T[]) => Promise<readonly T[]>;
