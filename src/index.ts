export { FACES, SUITS } from "./card/constants.js";
export { isSameCard } from "./card/compare.js";

export type { Card, Cards } from "./card/types.js";

export { createDeck } from "./deck/create.js";
export { drawCardsFromDeck } from "./deck/draw.js";
export {
	shuffleDeckNaive,
	createDeckShuffler,
	createFisherYatesStackShuffle,
	randomIntNaive,
} from "./deck/shuffle.js";

export type { DeckDrawResult } from "./deck/draw.js";
export type {
	RandomIntGenerator,
	ShuffleFunction,
	ShuffleFunctionCreator,
	DeckShuffler,
} from "./deck/shuffle.js";

export { HAND_RANKS } from "./hand/constants.js";
export { extractHand } from "./hand/extract.js";
export { findHighestHands } from "./hand/compare.js";
export { describePocketCards, describeHand } from "./hand/describe.js";

export type {
	Hand,
	HandCandidate,
	HandComparisonResult,
	HandDescription,
} from "./hand/types.js";
