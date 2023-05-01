import assert from "node:assert";
import { describe, it } from "node:test";

import { isSameCard, compareCards } from "./compare.js";
import { FACE, SUIT } from "./constants.js";

void describe("card/compare", () => {
	void describe("isSameCard", () => {
		void it("should determine if two cards are the same", () => {
			assert.strictEqual(
				isSameCard(`${FACE.Four}${SUIT.Diamonds}`, "4d"),
				true,
			);
			assert.strictEqual(isSameCard("3d", "4d"), false);
			assert.strictEqual(isSameCard("4d", "4c"), false);
		});
	});

	void describe("compareCards", () => {
		void it("should compare card values", () => {
			assert.strictEqual(compareCards("2c", "2c"), 0);
			assert.strictEqual(compareCards("2c", "3c"), 1);
			assert.strictEqual(compareCards("2c", "2h"), 0);
			assert.strictEqual(compareCards("3c", "2d"), -1);
			assert.strictEqual(compareCards("td", "9s"), -1);
		});
	});
});
