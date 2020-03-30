import { Card, Face, Suite } from '~/lib/cards';

export const compareCards: CardComparator = (a, b) => {
  const facesResult = compareFaces(a, b);

  return facesResult === 0 ? compareSuites(a, b) : facesResult;
};

export const compareFaces: Comparator<{ face: Face }> = (a, b) =>
  faceValueMap[b.face] - faceValueMap[a.face];

export const compareSuites: Comparator<{ suite: Suite }> = (a, b) =>
  suiteValueMap[b.suite] - suiteValueMap[a.suite];

const faceValueMap = {
  [Face.Two]: 1,
  [Face.Three]: 2,
  [Face.Four]: 3,
  [Face.Five]: 4,
  [Face.Six]: 5,
  [Face.Seven]: 6,
  [Face.Eight]: 7,
  [Face.Nine]: 8,
  [Face.Ten]: 9,
  [Face.Jack]: 10,
  [Face.Queen]: 11,
  [Face.King]: 12,
  [Face.Ace]: 13,
} as const;

const suiteValueMap = {
  [Suite.Diamonds]: 1,
  [Suite.Clubs]: 2,
  [Suite.Hearts]: 3,
  [Suite.Spades]: 4,
} as const;

export type CardComparator = Comparator<Card>;

export type Comparator<T> = (a: T, b: T) => number;
