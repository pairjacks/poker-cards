import assert from "node:assert";
import { describe, it } from "node:test";

import { compareCards } from "./compare.js";

void describe("card/compare", () => {
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
