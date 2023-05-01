import assert from "node:assert";
import { describe, it } from "node:test";

import { drawCardsFromDeck } from "./draw.js";

import type { Cards } from "../card/types.js";

void describe("deck/draw", () => {
	void describe("drawCardsFromDeck", () => {
		void it("should not modify deck if no cards to be drawn", () => {
			const emptyDeck: Cards = [] as const;
			const initialDeck = ["2d"] as const;

			let drawResult = drawCardsFromDeck(emptyDeck, 1);

			assert.deepStrictEqual(drawResult.cards, []);
			assert.deepStrictEqual(drawResult.deck === emptyDeck, true);

			drawResult = drawCardsFromDeck(initialDeck, 0);

			assert.deepStrictEqual(drawResult.cards, []);
			assert.deepStrictEqual(drawResult.deck === initialDeck, true);

			drawResult = drawCardsFromDeck(initialDeck, -1);

			assert.deepStrictEqual(drawResult.cards, []);
			assert.deepStrictEqual(drawResult.deck === initialDeck, true);
		});

		void it("should immutably draw cards from top of deck", () => {
			const initialDeck = ["jh", "6d", "9s", "tc"] as const;

			let drawResult = drawCardsFromDeck(initialDeck);

			assert.deepStrictEqual(drawResult, {
				cards: ["jh"],
				deck: ["6d", "9s", "tc"],
			});

			assert.notStrictEqual(drawResult.deck, initialDeck);
			assert.strictEqual(initialDeck.length, 4);

			drawResult = drawCardsFromDeck(initialDeck, 6);

			assert.deepStrictEqual(drawResult, {
				cards: ["tc", "9s", "6d", "jh"],
				deck: [],
			});
			assert.notStrictEqual(drawResult.deck, initialDeck);
			assert.strictEqual(initialDeck.length, 4);
		});
	});
});
