import assert from "node:assert";
import { describe, it } from "node:test";

import { drawCardsFromDeck } from "./draw.js";

import type { Cards } from "../card/types.js";

void describe("deck/draw", () => {
	void describe("drawCardsFromDeck", () => {
		void it("should not modify deck if no cards to be drawn", () => {
			const emptyDeck: Cards = [] as const;
			const initialDeck = [["2", "d"]] as const;

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
			const initialDeck = [
				["j", "h"],
				["6", "d"],
				["9", "s"],
				["t", "c"],
			] as const;

			let drawResult = drawCardsFromDeck(initialDeck);

			assert.deepStrictEqual(drawResult, {
				cards: [["j", "h"]],
				deck: [
					["6", "d"],
					["9", "s"],
					["t", "c"],
				],
			});

			assert.notStrictEqual(drawResult.deck, initialDeck);
			assert.strictEqual(initialDeck.length, 4);

			drawResult = drawCardsFromDeck(initialDeck, 6);

			assert.deepStrictEqual(drawResult, {
				cards: [
					["t", "c"],
					["9", "s"],
					["6", "d"],
					["j", "h"],
				],
				deck: [],
			});
			assert.notStrictEqual(drawResult.deck, initialDeck);
			assert.strictEqual(initialDeck.length, 4);
		});
	});
});
