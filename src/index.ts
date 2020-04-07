/*
  export type { ... } does not currently work with api extractor
  export { ... } for types throws an error if isolatedModules is true
  in tsconfig - this is set for babel and in-ide linting since
  babel compiles with isolated modules.
  ignore the resulting ts error, KIV api extractor updates
*/
/* eslint-disable @typescript-eslint/ban-ts-ignore */

export { Face, Suit } from './card/constants';
export { isSameCard } from './card/compare';
// @ts-ignore
export { Card, Cards } from './card/types'; // export type

export { createDeck } from './deck/create';
export { drawCardsFromDeck } from './deck/draw';
export {
  shuffleDeckNaive,
  createDeckShuffler,
  createFisherYatesStackShuffle,
  randomIntNaive,
} from './deck/shuffle';
// @ts-ignore
export { DeckDrawResult } from './deck/draw'; // export type
export {
  // @ts-ignore
  RandomIntGenerator,
  // @ts-ignore
  ShuffleFunction,
  // @ts-ignore
  ShuffleFunctionCreator,
  // @ts-ignore
  DeckShuffler,
} from './deck/shuffle'; // export type

export { HandRank } from './hand/constants';
export { extractHand } from './hand/extract';
export { findHighestHands } from './hand/compare';
export { describePocketCards, describeHand } from './hand/describe';
// @ts-ignore
export { HandCandidate, Hand, HandComparisonResult } from './hand/types'; // export type
