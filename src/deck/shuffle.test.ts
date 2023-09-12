import assert from "node:assert";
import { describe, it } from "node:test";

import { differenceWith } from "../util/array.js";
import { isSameCard } from "../card/compare.js";
import { fullDeckNdo } from "./__fixtures__/deck.js";
import { shuffleDeckNaive, createDeckShuffler } from "./shuffle.js";

void describe("deck/shuffle", () => {
	void it("should asynchronously shuffle a deck using naive shuffler", async () => {
		const deck = [...fullDeckNdo];
		const shuffled = await shuffleDeckNaive(deck);

		assert.notStrictEqual(shuffled, deck);
		assert.strictEqual(differenceWith(isSameCard, deck, shuffled).length, 0);
		assert.strictEqual(differenceWith(isSameCard, shuffled, deck).length, 0);
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
