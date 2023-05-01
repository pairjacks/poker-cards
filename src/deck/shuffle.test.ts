import assert from "node:assert";
import { describe, it } from "node:test";

import { differenceWith } from "../util/array.js";
import { fullDeckNdo } from "./__fixtures__/deck.js";
import { shuffleDeckNaive, createDeckShuffler } from "./shuffle.js";

void describe("deck/shuffle", () => {
	void it("should asynchronously shuffle a deck using naive shuffler", async () => {
		const deck = [...fullDeckNdo];
		const shuffled = await shuffleDeckNaive(deck);
		const eq = <T>(a: T, b: T) => a === b;

		assert.notStrictEqual(shuffled, deck);
		assert.strictEqual(differenceWith(eq, deck, shuffled).length, 0);
		assert.strictEqual(differenceWith(eq, shuffled, deck).length, 0);
	});

	void it("should accept a custom shuffle function", async () => {
		const deck = [...fullDeckNdo];
		const shuffle = createDeckShuffler((d) => {
			const result = [...d];

			result.reverse();

			return Promise.resolve(result);
		});
		const shuffled = await shuffle(deck);

		assert.notStrictEqual(shuffled, deck);
		assert.strictEqual(shuffled[0], deck[deck.length - 1]);
		assert.strictEqual(shuffled[shuffled.length - 1], deck[0]);
	});
});
