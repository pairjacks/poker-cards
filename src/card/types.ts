import type { FACE, SUIT } from "./constants.js";

export type Face = (typeof FACE)[keyof typeof FACE];

export type Suit = (typeof SUIT)[keyof typeof SUIT];

export type Card = `${Face}${Suit}`;
