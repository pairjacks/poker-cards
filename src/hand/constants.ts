import type { HandRank } from "./types.js";

export const HAND_RANK = {
	HighCard: "highCard",
	Pair: "pair",
	TwoPair: "twoPair",
	ThreeOfAKind: "threeOfAKind",
	Straight: "straight",
	Flush: "flush",
	FullHouse: "fullHouse",
	FourOfAKind: "fourOfAKind",
	StraightFlush: "straightFlush",
	RoyalFlush: "royalFlush",
} as const;

export const HAND_RANK_VALUE: { [key in HandRank]: number } = {
	[HAND_RANK.HighCard]: 1,
	[HAND_RANK.Pair]: 2,
	[HAND_RANK.TwoPair]: 3,
	[HAND_RANK.ThreeOfAKind]: 4,
	[HAND_RANK.Straight]: 5,
	[HAND_RANK.Flush]: 6,
	[HAND_RANK.FullHouse]: 7,
	[HAND_RANK.FourOfAKind]: 8,
	[HAND_RANK.StraightFlush]: 9,
	[HAND_RANK.RoyalFlush]: 10,
} as const;
