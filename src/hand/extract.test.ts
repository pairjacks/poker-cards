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
					pocketCards: ["ac"],
					communityCards: [],
				}),
				{
					rank: "highCard",
					rankCards: ["ac"],
					kickerCards: [],
				},
			);
		});

		void it("should extract high card", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: ["jc", "8s"],
					communityCards: ["6d", "2d", "3c", "4c", "qd"],
				}),
				{
					rank: "highCard",
					rankCards: ["qd"],
					kickerCards: ["jc", "8s", "6d", "4c"],
				},
			);
		});

		void it("should extract pair", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: ["6c", "2d"],
					communityCards: ["6d", "jc", "8s", "4c", "qd"],
				}),
				{
					rank: "pair",
					rankCards: ["6c", "6d"],
					kickerCards: ["qd", "jc", "8s"],
				},
			);
		});

		void it("should extract two pair", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: ["4c", "jd"],
					communityCards: ["6d", "2d", "8s", "6c", "jc"],
				}),
				{
					rank: "twoPair",
					rankCards: ["jd", "jc", "6d", "6c"],
					kickerCards: ["8s"],
				},
			);

			// Contains extra pair sixes
			assert.deepStrictEqual(
				extractHand({
					pocketCards: ["qc", "jc"],
					communityCards: ["6d", "jd", "8s", "6c", "qs"],
				}),
				{
					rank: "twoPair",
					rankCards: ["qc", "qs", "jc", "jd"],
					kickerCards: ["8s"],
				},
			);
		});

		void it("should extract three of a kind", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: ["8s", "6c"],
					communityCards: ["6d", "2d", "jd", "6h", "qc"],
				}),
				{
					rank: "threeOfAKind",
					rankCards: ["6c", "6d", "6h"],
					kickerCards: ["qc", "jd"],
				},
			);
		});

		void it("should extract straight", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: ["8s", "6h"],
					communityCards: ["4d", "2c", "3d", "5c", "6d"],
				}),
				{
					rank: "straight",
					rankCards: ["6h", "5c", "4d", "3d", "2c"],
					kickerCards: [],
				},
			);

			// Ace low
			assert.deepStrictEqual(
				extractHand({
					pocketCards: ["as", "8h"],
					communityCards: ["4d", "2c", "3d", "5c", "8d"],
				}),
				{
					rank: "straight",
					rankCards: ["5c", "4d", "3d", "2c", "as"],
					kickerCards: [],
				},
			);

			// Observed bugs

			const ambiguousAce = extractHand({
				pocketCards: ["ad", "5d"],
				communityCards: ["9d", "qc", "7h", "kc", "jd"],
			});

			assert.notEqual(ambiguousAce.rank, "straight");
			assert.strictEqual(ambiguousAce.rank, "highCard");

			const queenInAceHigh = extractHand({
				pocketCards: ["jd", "3c"],
				communityCards: ["qd", "kc", "8d", "th", "ah"],
			});

			assert.deepStrictEqual(queenInAceHigh, {
				rank: "straight",
				rankCards: ["ah", "kc", "qd", "jd", "th"],
				kickerCards: [],
			});

			const queenInAceHighInverseCommunity = extractHand({
				pocketCards: ["jd", "3c"],
				communityCards: ["ah", "th", "8d", "kc", "qd"],
			});

			assert.deepStrictEqual(queenInAceHighInverseCommunity, {
				rank: "straight",
				rankCards: ["ah", "kc", "qd", "jd", "th"],
				kickerCards: [],
			});
		});

		void it("should extract flush", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: ["3d", "jd"],
					communityCards: ["4d", "2d", "3s", "5d", "jh"],
				}),
				{
					rank: "flush",
					rankCards: ["jd", "5d", "4d", "3d", "2d"],
					kickerCards: [],
				},
			);
		});

		void it("should extract full house", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: ["3s", "4d"],
					communityCards: ["3c", "3d", "5d", "jd", "jh"],
				}),
				{
					rank: "fullHouse",
					rankCards: ["3s", "3c", "3d", "jd", "jh"],
					kickerCards: [],
				},
			);

			// contains pair fours and pair threes
			assert.deepStrictEqual(
				extractHand({
					pocketCards: ["4d", "jh"],
					communityCards: ["4h", "3c", "3d", "js", "jd"],
				}),
				{
					rank: "fullHouse",
					rankCards: ["jh", "js", "jd", "4d", "4h"],
					kickerCards: [],
				},
			);

			// contains three jacks and three threes
			assert.deepStrictEqual(
				extractHand({
					pocketCards: ["4d", "3c"],
					communityCards: ["3h", "3d", "js", "jd", "jh"],
				}),
				{
					rank: "fullHouse",
					rankCards: ["js", "jd", "jh", "3c", "3h"],
					kickerCards: [],
				},
			);
		});

		void it("should extract four of a kind", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: ["8s", "jd"],
					communityCards: ["6d", "2d", "6c", "6h", "6s"],
				}),
				{
					rank: "fourOfAKind",
					rankCards: ["6d", "6c", "6h", "6s"],
					kickerCards: ["jd"],
				},
			);
		});

		void it("should extract straight flush", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: ["2c", "6c"],
					communityCards: ["4c", "3c", "8s", "5c", "6s"],
				}),
				{
					rank: "straightFlush",
					rankCards: ["6c", "5c", "4c", "3c", "2c"],
					kickerCards: [],
				},
			);

			assert.deepStrictEqual(
				extractHand({
					pocketCards: ["as", "8h"],
					communityCards: ["4s", "2s", "3s", "5s", "8d"],
				}),
				{
					rank: "straightFlush",
					rankCards: ["5s", "4s", "3s", "2s", "as"],
					kickerCards: [],
				},
			);

			// Observed bugs

			const offsuitAce = extractHand({
				pocketCards: ["ac", "2s"],
				communityCards: ["3s", "4s", "5s", "8s"],
			});

			assert.notEqual(offsuitAce.rank, "straightFlush");
			assert.strictEqual(offsuitAce.rank, "flush");

			const ambiguousAce = extractHand({
				pocketCards: ["ad", "5d"],
				communityCards: ["9d", "qd", "7d", "kd", "jd"],
			});

			assert.notEqual(ambiguousAce.rank, "straightflush");
			assert.strictEqual(ambiguousAce.rank, "flush");
		});

		void it("should extract royal flush", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: ["kc", "qc"],
					communityCards: ["ac", "tc", "8s", "jc", "js"],
				}),
				{
					rank: "royalFlush",
					rankCards: ["ac", "kc", "qc", "jc", "tc"],
					kickerCards: [],
				},
			);
		});
	});
});
