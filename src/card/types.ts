import type { Suit, Face } from "./constants.ts";

export type Card = readonly [Face, Suit];

/** Convenience type expressing a readonly array of readonly cards */
export type Cards = readonly Card[];
