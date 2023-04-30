import assert from "node:assert";
import { describe, it } from "node:test";

import { extractHand } from "./extract.js";

void describe("hand/extract", () => {
	void describe("extractHand", () => {
		void it("should handle empty state", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [],
					communityCards: [],
				}),
				{
					rank: "highCard",
					rankCards: [],
					kickerCards: [],
				},
			);

			assert.deepStrictEqual(
				extractHand({
					pocketCards: [["a", "c"]],
					communityCards: [],
				}),
				{
					rank: "highCard",
					rankCards: [["a", "c"]],
					kickerCards: [],
				},
			);
		});

		void it("should extract high card", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						["j", "c"],
						["8", "s"],
					],
					communityCards: [
						["6", "d"],
						["2", "d"],
						["3", "c"],
						["4", "c"],
						["q", "d"],
					],
				}),
				{
					rank: "highCard",
					rankCards: [["q", "d"]],
					kickerCards: [
						["j", "c"],
						["8", "s"],
						["6", "d"],
						["4", "c"],
					],
				},
			);
		});

		void it("should extract pair", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						["6", "c"],
						["2", "d"],
					],
					communityCards: [
						["6", "d"],
						["j", "c"],
						["8", "s"],
						["4", "c"],
						["q", "d"],
					],
				}),
				{
					rank: "pair",
					rankCards: [
						["6", "c"],
						["6", "d"],
					],
					kickerCards: [
						["q", "d"],
						["j", "c"],
						["8", "s"],
					],
				},
			);
		});

		void it("should extract two pair", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						["4", "c"],
						["j", "d"],
					],
					communityCards: [
						["6", "d"],
						["2", "d"],
						["8", "s"],
						["6", "c"],
						["j", "c"],
					],
				}),
				{
					rank: "twoPair",
					rankCards: [
						["j", "d"],
						["j", "c"],
						["6", "d"],
						["6", "c"],
					],
					kickerCards: [["8", "s"]],
				},
			);

			// Contains extra pair sixes
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						["q", "c"],
						["j", "c"],
					],
					communityCards: [
						["6", "d"],
						["j", "d"],
						["8", "s"],
						["6", "c"],
						["q", "s"],
					],
				}),
				{
					rank: "twoPair",
					rankCards: [
						["q", "c"],
						["q", "s"],
						["j", "c"],
						["j", "d"],
					],
					kickerCards: [["8", "s"]],
				},
			);
		});

		void it("should extract three of a kind", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						["8", "s"],
						["6", "c"],
					],
					communityCards: [
						["6", "d"],
						["2", "d"],
						["j", "d"],
						["6", "h"],
						["q", "c"],
					],
				}),
				{
					rank: "threeOfAKind",
					rankCards: [
						["6", "c"],
						["6", "d"],
						["6", "h"],
					],
					kickerCards: [
						["q", "c"],
						["j", "d"],
					],
				},
			);
		});

		void it("should extract straight", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						["8", "s"],
						["6", "h"],
					],
					communityCards: [
						["4", "d"],
						["2", "c"],
						["3", "d"],
						["5", "c"],
						["6", "d"],
					],
				}),
				{
					rank: "straight",
					rankCards: [
						["6", "h"],
						["5", "c"],
						["4", "d"],
						["3", "d"],
						["2", "c"],
					],
					kickerCards: [],
				},
			);

			// Ace low
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						["a", "s"],
						["8", "h"],
					],
					communityCards: [
						["4", "d"],
						["2", "c"],
						["3", "d"],
						["5", "c"],
						["8", "d"],
					],
				}),
				{
					rank: "straight",
					rankCards: [
						["5", "c"],
						["4", "d"],
						["3", "d"],
						["2", "c"],
						["a", "s"],
					],
					kickerCards: [],
				},
			);

			// Observed bugs

			const ambiguousAce = extractHand({
				pocketCards: [
					["a", "d"],
					["5", "d"],
				],
				communityCards: [
					["9", "d"],
					["q", "c"],
					["7", "h"],
					["k", "c"],
					["j", "d"],
				],
			});

			assert.notEqual(ambiguousAce.rank, "straight");
			assert.strictEqual(ambiguousAce.rank, "highCard");

			const queenInAceHigh = extractHand({
				pocketCards: [
					["j", "d"],
					["3", "c"],
				],
				communityCards: [
					["q", "d"],
					["k", "c"],
					["8", "d"],
					["t", "h"],
					["a", "h"],
				],
			});

			assert.deepStrictEqual(queenInAceHigh, {
				rank: "straight",
				rankCards: [
					["a", "h"],
					["k", "c"],
					["q", "d"],
					["j", "d"],
					["t", "h"],
				],
				kickerCards: [],
			});

			const queenInAceHighInverseCommunity = extractHand({
				pocketCards: [
					["j", "d"],
					["3", "c"],
				],
				communityCards: [
					["a", "h"],
					["t", "h"],
					["8", "d"],
					["k", "c"],
					["q", "d"],
				],
			});

			assert.deepStrictEqual(queenInAceHighInverseCommunity, {
				rank: "straight",
				rankCards: [
					["a", "h"],
					["k", "c"],
					["q", "d"],
					["j", "d"],
					["t", "h"],
				],
				kickerCards: [],
			});
		});

		void it("should extract flush", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						["3", "d"],
						["j", "d"],
					],
					communityCards: [
						["4", "d"],
						["2", "d"],
						["3", "s"],
						["5", "d"],
						["j", "h"],
					],
				}),
				{
					rank: "flush",
					rankCards: [
						["j", "d"],
						["5", "d"],
						["4", "d"],
						["3", "d"],
						["2", "d"],
					],
					kickerCards: [],
				},
			);
		});

		void it("should extract full house", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						["3", "s"],
						["4", "d"],
					],
					communityCards: [
						["3", "c"],
						["3", "d"],
						["5", "d"],
						["j", "d"],
						["j", "h"],
					],
				}),
				{
					rank: "fullHouse",
					rankCards: [
						["3", "s"],
						["3", "c"],
						["3", "d"],
						["j", "d"],
						["j", "h"],
					],
					kickerCards: [],
				},
			);

			// contains pair fours and pair threes
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						["4", "d"],
						["j", "h"],
					],
					communityCards: [
						["4", "h"],
						["3", "c"],
						["3", "d"],
						["j", "s"],
						["j", "d"],
					],
				}),
				{
					rank: "fullHouse",
					rankCards: [
						["j", "h"],
						["j", "s"],
						["j", "d"],
						["4", "d"],
						["4", "h"],
					],
					kickerCards: [],
				},
			);

			// contains three jacks and three threes
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						["4", "d"],
						["3", "c"],
					],
					communityCards: [
						["3", "h"],
						["3", "d"],
						["j", "s"],
						["j", "d"],
						["j", "h"],
					],
				}),
				{
					rank: "fullHouse",
					rankCards: [
						["j", "s"],
						["j", "d"],
						["j", "h"],
						["3", "c"],
						["3", "h"],
					],
					kickerCards: [],
				},
			);
		});

		void it("should extract four of a kind", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						["8", "s"],
						["j", "d"],
					],
					communityCards: [
						["6", "d"],
						["2", "d"],
						["6", "c"],
						["6", "h"],
						["6", "s"],
					],
				}),
				{
					rank: "fourOfAKind",
					rankCards: [
						["6", "d"],
						["6", "c"],
						["6", "h"],
						["6", "s"],
					],
					kickerCards: [["j", "d"]],
				},
			);
		});

		void it("should extract straight flush", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						["2", "c"],
						["6", "c"],
					],
					communityCards: [
						["4", "c"],
						["3", "c"],
						["8", "s"],
						["5", "c"],
						["6", "s"],
					],
				}),
				{
					rank: "straightFlush",
					rankCards: [
						["6", "c"],
						["5", "c"],
						["4", "c"],
						["3", "c"],
						["2", "c"],
					],
					kickerCards: [],
				},
			);

			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						["a", "s"],
						["8", "h"],
					],
					communityCards: [
						["4", "s"],
						["2", "s"],
						["3", "s"],
						["5", "s"],
						["8", "d"],
					],
				}),
				{
					rank: "straightFlush",
					rankCards: [
						["5", "s"],
						["4", "s"],
						["3", "s"],
						["2", "s"],
						["a", "s"],
					],
					kickerCards: [],
				},
			);

			// Observed bugs

			const offsuitAce = extractHand({
				pocketCards: [
					["a", "c"],
					["2", "s"],
				],
				communityCards: [
					["3", "s"],
					["4", "s"],
					["5", "s"],
					["8", "s"],
				],
			});

			assert.notEqual(offsuitAce.rank, "straightFlush");
			assert.strictEqual(offsuitAce.rank, "flush");

			const ambiguousAce = extractHand({
				pocketCards: [
					["a", "d"],
					["5", "d"],
				],
				communityCards: [
					["9", "d"],
					["q", "d"],
					["7", "d"],
					["k", "d"],
					["j", "d"],
				],
			});

			assert.notEqual(ambiguousAce.rank, "straightflush");
			assert.strictEqual(ambiguousAce.rank, "flush");
		});

		void it("should extract royal flush", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						["k", "c"],
						["q", "c"],
					],
					communityCards: [
						["a", "c"],
						["t", "c"],
						["8", "s"],
						["j", "c"],
						["j", "s"],
					],
				}),
				{
					rank: "royalFlush",
					rankCards: [
						["a", "c"],
						["k", "c"],
						["q", "c"],
						["j", "c"],
						["t", "c"],
					],
					kickerCards: [],
				},
			);
		});
	});
});
