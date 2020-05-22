/*
  export type { ... } does not currently work with api extractor
  export { ... } for types throws an error if isolatedModules is true
  in tsconfig - this is set in tsconfig for in-IDE linting since
  babel compiles with isolated modules.
  ignore the resulting ts error, KIV api extractor updates
*/
/* eslint-disable @typescript-eslint/ban-ts-comment */

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
export {
  // @ts-ignore
  HandCandidate,
  // @ts-ignore
  Hand,
  // @ts-ignore
  HandComparisonResult,
  // @ts-ignore
  HandDescription,
} from './hand/types'; // export type
