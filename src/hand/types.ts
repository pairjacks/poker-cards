import type { HAND_RANKS } from "./constants.js";
import type { Cards } from "../card/types.js";

export type HandRank = (typeof HAND_RANKS)[number];

/** Represents a collection of cards that can be used to create a 5 card hand */
export type HandCandidate = {
	/** A player's pocket cards */
	readonly pocketCards: Cards;
	/** Community cards available to all players */
	readonly communityCards: Cards;
};

/** Represents a hand derived from a HandCandidate */
export type Hand = {
	readonly rank: HandRank;
	/** Cards included in the ranking combination */
	readonly rankCards: Cards;
	/** Cards included in the hand but not in the ranking combination */
	readonly kickerCards: Cards;
};

/** Finds a hand pattern from the given array of cards */
export type HandExtractor<T = Hand | null> = (cards: Cards) => T;

/** Represents an item in the result of comparing hands */
export type HandComparisonResult = {
	readonly hand: Hand;
	/** The original HandCandidate */
	readonly candidate: HandCandidate;
	/** The index of the original HandCandidate in the comparison array */
	readonly candidateIndex: number;
};

/** Represents a human readable description of a hand */
export type HandDescription = {
	readonly rank: string;
	readonly kickers: string;
};
