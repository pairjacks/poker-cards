import { Card, Face, Suite } from './types';

export const compareCards: CardComparator = (a, b) => {
  const faceResult = compareFaces(a, b);

  return faceResult === 0 ? compareSuites(a, b) : faceResult;
};

const compareFaces: Comparator<{ face: Face }> = (a, b) =>
  faceValueMap[b.face] - faceValueMap[a.face];

const compareSuites: Comparator<{ suite: Suite }> = (a, b) =>
  suiteValueMap[b.suite] - suiteValueMap[a.suite];

const faceValueMap = {
  [Face.Two]: 2,
  [Face.Three]: 3,
  [Face.Four]: 4,
  [Face.Five]: 5,
  [Face.Six]: 6,
  [Face.Seven]: 7,
  [Face.Eight]: 8,
  [Face.Nine]: 9,
  [Face.Ten]: 10,
  [Face.Jack]: 11,
  [Face.Queen]: 12,
  [Face.King]: 13,
  [Face.Ace]: 14,
} as const;

const suiteValueMap = {
  [Suite.Diamonds]: 1,
  [Suite.Clubs]: 2,
  [Suite.Hearts]: 3,
  [Suite.Spades]: 4,
} as const;

export type CardComparator = Comparator<Card>;

export type Comparator<T> = (a: T, b: T) => number;
