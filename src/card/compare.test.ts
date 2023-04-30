import assert from "node:assert";
import { describe, it } from "node:test";

import { isSameCard, compareCards } from "./compare.js";

void describe("card/compare", () => {
	void describe("isSameCard", () => {
		void it("should determine if two cards are the same", () => {
			assert.strictEqual(isSameCard(["4", "d"], ["4", "d"]), true);
			assert.strictEqual(isSameCard(["3", "d"], ["4", "d"]), false);
			assert.strictEqual(isSameCard(["4", "d"], ["4", "c"]), false);
		});
	});

	void describe("compareCards", () => {
		void it("should compare card values", () => {
			assert.strictEqual(compareCards(["2", "c"], ["2", "c"]), 0);
			assert.strictEqual(compareCards(["2", "c"], ["3", "c"]), 1);
			assert.strictEqual(compareCards(["2", "c"], ["2", "h"]), 0);
			assert.strictEqual(compareCards(["3", "c"], ["2", "d"]), -1);
			assert.strictEqual(compareCards(["t", "d"], ["9", "s"]), -1);
		});
	});
});
