import type { FACES, SUITS } from "./constants.js";

export type Face = (typeof FACES)[number];

export type Suit = (typeof SUITS)[number];

export type Card = readonly [Face, Suit];

/** Convenience type expressing a readonly array of readonly cards */
export type Cards = readonly Card[];
