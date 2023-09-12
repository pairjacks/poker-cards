import assert from "node:assert";
import { describe, it } from "node:test";

import { Face, Suit } from "./constants.js";
import { isSameCard, compareCards } from "./compare.js";

void describe("card/compare", () => {
	void describe("isSameCard", () => {
		void it("should determine if two cards are the same", () => {
			assert.strictEqual(
				isSameCard([Face.Four, Suit.Diamonds], [Face.Four, Suit.Diamonds]),
				true,
			);

			assert.strictEqual(
				isSameCard([Face.Three, Suit.Diamonds], [Face.Four, Suit.Diamonds]),
				false,
			);

			assert.strictEqual(
				isSameCard([Face.Four, Suit.Diamonds], [Face.Four, Suit.Clubs]),
				false,
			);
		});
	});

	void describe("compareCards", () => {
		void it("should compare card values", () => {
			assert.strictEqual(
				compareCards([Face.Two, Suit.Clubs], [Face.Two, Suit.Clubs]),
				0,
			);

			assert.strictEqual(
				compareCards([Face.Two, Suit.Clubs], [Face.Three, Suit.Clubs]),
				1,
			);

			assert.strictEqual(
				compareCards([Face.Two, Suit.Clubs], [Face.Two, Suit.Hearts]),
				1,
			);

			assert.strictEqual(
				compareCards([Face.Three, Suit.Clubs], [Face.Two, Suit.Diamonds]),
				-1,
			);

			assert.strictEqual(
				compareCards([Face.Ten, Suit.Diamonds], [Face.Nine, Suit.Spades]),
				-1,
			);
		});
	});
});
