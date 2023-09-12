import assert from "node:assert";
import { describe, it } from "node:test";

import { Suit, Face } from "../card/constants.js";
import { drawCardsFromDeck } from "./draw.js";

import type { Cards } from "../card/types.js";

void describe("deck/draw", () => {
	void describe("drawCardsFromDeck", () => {
		void it("should not modify deck if no cards to be drawn", () => {
			const emptyDeck: Cards = [] as const;
			const initialDeck = [[Face.Two, Suit.Diamonds]] as const;

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
				[Face.Jack, Suit.Hearts],
				[Face.Six, Suit.Diamonds],
				[Face.Nine, Suit.Spades],
				[Face.Ten, Suit.Clubs],
			] as const;

			let drawResult = drawCardsFromDeck(initialDeck);

			assert.deepStrictEqual(drawResult, {
				cards: [[Face.Jack, Suit.Hearts]],
				deck: [
					[Face.Six, Suit.Diamonds],
					[Face.Nine, Suit.Spades],
					[Face.Ten, Suit.Clubs],
				],
			});

			assert.notStrictEqual(drawResult.deck, initialDeck);
			assert.strictEqual(initialDeck.length, 4);

			drawResult = drawCardsFromDeck(initialDeck, 6);

			assert.deepStrictEqual(drawResult, {
				cards: [
					[Face.Ten, Suit.Clubs],
					[Face.Nine, Suit.Spades],
					[Face.Six, Suit.Diamonds],
					[Face.Jack, Suit.Hearts],
				],
				deck: [],
			});
			assert.notStrictEqual(drawResult.deck, initialDeck);
			assert.strictEqual(initialDeck.length, 4);
		});
	});
});
