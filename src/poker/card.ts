import { Face, Suit } from '../core/constants';
import type { Card, Comparator } from '../core/types';

const faceValueMap = {
  [Face.Joker]: 0,
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

const suitValueMap = {
  [Suit.Joker]: 0,
  [Suit.Diamonds]: 1,
  [Suit.Clubs]: 2,
  [Suit.Hearts]: 3,
  [Suit.Spades]: 4,
} as const;

const getFaceValue = ({ face }: Pick<Card, 'face'>) => faceValueMap[face];

const getSuitValue = ({ suit }: Pick<Card, 'suit'>) => suitValueMap[suit];

export const compareFaces: Comparator<Pick<Card, 'face'>> = (a, b) =>
  getFaceValue(b) - getFaceValue(a);

export const compareSuits: Comparator<Pick<Card, 'suit'>> = (a, b) =>
  getSuitValue(b) - getSuitValue(a);

export const compareCards: CardComparator = (a, b) => {
  const facesResult = compareFaces(a, b);

  return facesResult === 0 ? compareSuits(a, b) : facesResult;
};

export type CardComparator = Comparator<Card>;
