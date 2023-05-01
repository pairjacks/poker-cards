import type { Face, Suit } from "./types.js";

export const FACE = {
	Ace: "a",
	Two: "2",
	Three: "3",
	Four: "4",
	Five: "5",
	Six: "6",
	Seven: "7",
	Eight: "8",
	Nine: "9",
	Ten: "t",
	Jack: "j",
	Queen: "q",
	King: "k",
} as const;

export const SUIT = {
	Diamonds: "d",
	Clubs: "c",
	Hearts: "h",
	Spades: "s",
} as const;

export const FACE_VALUE: { [key in Face]: number } = {
	[FACE.Two]: 1,
	[FACE.Three]: 2,
	[FACE.Four]: 3,
	[FACE.Five]: 4,
	[FACE.Six]: 5,
	[FACE.Seven]: 6,
	[FACE.Eight]: 7,
	[FACE.Nine]: 8,
	[FACE.Ten]: 9,
	[FACE.Jack]: 10,
	[FACE.Queen]: 11,
	[FACE.King]: 12,
	[FACE.Ace]: 13,
};

export const SUIT_VALUE: { [key in Suit]: number } = {
	[SUIT.Diamonds]: 1,
	[SUIT.Clubs]: 1,
	[SUIT.Hearts]: 1,
	[SUIT.Spades]: 1,
};
