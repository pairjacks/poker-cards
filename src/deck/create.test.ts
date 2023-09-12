import assert from "node:assert";
import { describe, it } from "node:test";

import { fullDeckValue, fullDeckNdo } from "./__fixtures__/deck.js";
import { createDeck } from "./create.js";

void describe("deck/create", () => {
	void describe("createDeck", () => {
		void it("should create a full deck ordered by new deck order", () => {
			assert.deepStrictEqual(createDeck({ order: "ndo" }), fullDeckNdo);
		});

		void it("should create a full deck ordered by value", () => {
			assert.deepStrictEqual(createDeck({ order: "value" }), fullDeckValue);
		});

		void it("should use new deck order by default", () => {
			assert.deepStrictEqual(createDeck(), fullDeckNdo);
		});

		void it("should throw when specifying unknown deck order", () => {
			// @ts-expect-error test invalid input
			assert.throws(() => createDeck({ order: "foo" }), /unknown deck order/i);
		});
	});
});
