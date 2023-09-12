import assert from "node:assert";
import { describe, it } from "node:test";

import { Face, Suit } from "../card/constants.js";
import { HandRank } from "./constants.js";
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
					rank: HandRank.HighCard,
					rankCards: [],
					kickerCards: [],
				},
			);

			assert.deepStrictEqual(
				extractHand({
					pocketCards: [[Face.Ace, Suit.Clubs]],
					communityCards: [],
				}),
				{
					rank: HandRank.HighCard,
					rankCards: [[Face.Ace, Suit.Clubs]],
					kickerCards: [],
				},
			);
		});

		void it("should extract high card", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						[Face.Jack, Suit.Clubs],
						[Face.Eight, Suit.Spades],
					],
					communityCards: [
						[Face.Six, Suit.Diamonds],
						[Face.Two, Suit.Diamonds],
						[Face.Three, Suit.Clubs],
						[Face.Four, Suit.Clubs],
						[Face.Queen, Suit.Diamonds],
					],
				}),
				{
					rank: HandRank.HighCard,
					rankCards: [[Face.Queen, Suit.Diamonds]],
					kickerCards: [
						[Face.Jack, Suit.Clubs],
						[Face.Eight, Suit.Spades],
						[Face.Six, Suit.Diamonds],
						[Face.Four, Suit.Clubs],
					],
				},
			);
		});

		void it("should extract pair", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						[Face.Six, Suit.Clubs],
						[Face.Two, Suit.Diamonds],
					],
					communityCards: [
						[Face.Six, Suit.Diamonds],
						[Face.Jack, Suit.Clubs],
						[Face.Eight, Suit.Spades],
						[Face.Four, Suit.Clubs],
						[Face.Queen, Suit.Diamonds],
					],
				}),
				{
					rank: HandRank.Pair,
					rankCards: [
						[Face.Six, Suit.Clubs],
						[Face.Six, Suit.Diamonds],
					],
					kickerCards: [
						[Face.Queen, Suit.Diamonds],
						[Face.Jack, Suit.Clubs],
						[Face.Eight, Suit.Spades],
					],
				},
			);
		});

		void it("should extract two pair", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						[Face.Four, Suit.Clubs],
						[Face.Jack, Suit.Diamonds],
					],
					communityCards: [
						[Face.Six, Suit.Diamonds],
						[Face.Two, Suit.Diamonds],
						[Face.Eight, Suit.Spades],
						[Face.Six, Suit.Clubs],
						[Face.Jack, Suit.Clubs],
					],
				}),
				{
					rank: HandRank.TwoPair,
					rankCards: [
						[Face.Jack, Suit.Clubs],
						[Face.Jack, Suit.Diamonds],
						[Face.Six, Suit.Clubs],
						[Face.Six, Suit.Diamonds],
					],
					kickerCards: [[Face.Eight, Suit.Spades]],
				},
			);

			// Contains extra pair sixes
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						[Face.Queen, Suit.Clubs],
						[Face.Jack, Suit.Clubs],
					],
					communityCards: [
						[Face.Six, Suit.Diamonds],
						[Face.Jack, Suit.Diamonds],
						[Face.Eight, Suit.Spades],
						[Face.Six, Suit.Clubs],
						[Face.Queen, Suit.Spades],
					],
				}),
				{
					rank: HandRank.TwoPair,
					rankCards: [
						[Face.Queen, Suit.Spades],
						[Face.Queen, Suit.Clubs],
						[Face.Jack, Suit.Clubs],
						[Face.Jack, Suit.Diamonds],
					],
					kickerCards: [[Face.Eight, Suit.Spades]],
				},
			);
		});

		void it("should extract three of a kind", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						[Face.Eight, Suit.Spades],
						[Face.Six, Suit.Clubs],
					],
					communityCards: [
						[Face.Six, Suit.Diamonds],
						[Face.Two, Suit.Diamonds],
						[Face.Jack, Suit.Diamonds],
						[Face.Six, Suit.Hearts],
						[Face.Queen, Suit.Clubs],
					],
				}),
				{
					rank: HandRank.ThreeOfAKind,
					rankCards: [
						[Face.Six, Suit.Hearts],
						[Face.Six, Suit.Clubs],
						[Face.Six, Suit.Diamonds],
					],
					kickerCards: [
						[Face.Queen, Suit.Clubs],
						[Face.Jack, Suit.Diamonds],
					],
				},
			);
		});

		void it("should extract straight", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						[Face.Eight, Suit.Spades],
						[Face.Six, Suit.Hearts],
					],
					communityCards: [
						[Face.Four, Suit.Diamonds],
						[Face.Two, Suit.Clubs],
						[Face.Three, Suit.Diamonds],
						[Face.Five, Suit.Clubs],
						[Face.Six, Suit.Diamonds],
					],
				}),
				{
					rank: HandRank.Straight,
					rankCards: [
						[Face.Six, Suit.Hearts],
						[Face.Five, Suit.Clubs],
						[Face.Four, Suit.Diamonds],
						[Face.Three, Suit.Diamonds],
						[Face.Two, Suit.Clubs],
					],
					kickerCards: [],
				},
			);

			// Ace low
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						[Face.Ace, Suit.Spades],
						[Face.Eight, Suit.Hearts],
					],
					communityCards: [
						[Face.Four, Suit.Diamonds],
						[Face.Two, Suit.Clubs],
						[Face.Three, Suit.Diamonds],
						[Face.Five, Suit.Clubs],
						[Face.Eight, Suit.Diamonds],
					],
				}),
				{
					rank: HandRank.Straight,
					rankCards: [
						[Face.Five, Suit.Clubs],
						[Face.Four, Suit.Diamonds],
						[Face.Three, Suit.Diamonds],
						[Face.Two, Suit.Clubs],
						[Face.Ace, Suit.Spades],
					],
					kickerCards: [],
				},
			);

			// Observed bugs

			const ambiguousAce = extractHand({
				pocketCards: [
					[Face.Ace, Suit.Diamonds],
					[Face.Five, Suit.Diamonds],
				],
				communityCards: [
					[Face.Nine, Suit.Diamonds],
					[Face.Queen, Suit.Clubs],
					[Face.Seven, Suit.Hearts],
					[Face.King, Suit.Clubs],
					[Face.Jack, Suit.Diamonds],
				],
			});

			assert.notEqual(ambiguousAce.rank, HandRank.Straight);
			assert.strictEqual(ambiguousAce.rank, HandRank.HighCard);

			const queenInAceHigh = extractHand({
				pocketCards: [
					[Face.Jack, Suit.Diamonds],
					[Face.Three, Suit.Clubs],
				],
				communityCards: [
					[Face.Queen, Suit.Diamonds],
					[Face.King, Suit.Clubs],
					[Face.Eight, Suit.Diamonds],
					[Face.Ten, Suit.Hearts],
					[Face.Ace, Suit.Hearts],
				],
			});

			assert.deepStrictEqual(queenInAceHigh, {
				rank: HandRank.Straight,
				rankCards: [
					[Face.Ace, Suit.Hearts],
					[Face.King, Suit.Clubs],
					[Face.Queen, Suit.Diamonds],
					[Face.Jack, Suit.Diamonds],
					[Face.Ten, Suit.Hearts],
				],
				kickerCards: [],
			});

			const queenInAceHighInverseCommunity = extractHand({
				pocketCards: [
					[Face.Jack, Suit.Diamonds],
					[Face.Three, Suit.Clubs],
				],
				communityCards: [
					[Face.Ace, Suit.Hearts],
					[Face.Ten, Suit.Hearts],
					[Face.Eight, Suit.Diamonds],
					[Face.King, Suit.Clubs],
					[Face.Queen, Suit.Diamonds],
				],
			});

			assert.deepStrictEqual(queenInAceHighInverseCommunity, {
				rank: HandRank.Straight,
				rankCards: [
					[Face.Ace, Suit.Hearts],
					[Face.King, Suit.Clubs],
					[Face.Queen, Suit.Diamonds],
					[Face.Jack, Suit.Diamonds],
					[Face.Ten, Suit.Hearts],
				],
				kickerCards: [],
			});
		});

		void it("should extract flush", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						[Face.Three, Suit.Diamonds],
						[Face.Jack, Suit.Diamonds],
					],
					communityCards: [
						[Face.Four, Suit.Diamonds],
						[Face.Two, Suit.Diamonds],
						[Face.Three, Suit.Spades],
						[Face.Five, Suit.Diamonds],
						[Face.Jack, Suit.Hearts],
					],
				}),
				{
					rank: HandRank.Flush,
					rankCards: [
						[Face.Jack, Suit.Diamonds],
						[Face.Five, Suit.Diamonds],
						[Face.Four, Suit.Diamonds],
						[Face.Three, Suit.Diamonds],
						[Face.Two, Suit.Diamonds],
					],
					kickerCards: [],
				},
			);
		});

		void it("should extract full house", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						[Face.Three, Suit.Spades],
						[Face.Four, Suit.Diamonds],
					],
					communityCards: [
						[Face.Three, Suit.Clubs],
						[Face.Three, Suit.Diamonds],
						[Face.Five, Suit.Diamonds],
						[Face.Jack, Suit.Diamonds],
						[Face.Jack, Suit.Hearts],
					],
				}),
				{
					rank: HandRank.FullHouse,
					rankCards: [
						[Face.Three, Suit.Spades],
						[Face.Three, Suit.Clubs],
						[Face.Three, Suit.Diamonds],
						[Face.Jack, Suit.Hearts],
						[Face.Jack, Suit.Diamonds],
					],
					kickerCards: [],
				},
			);

			// contains pair fours and pair threes
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						[Face.Four, Suit.Diamonds],
						[Face.Jack, Suit.Hearts],
					],
					communityCards: [
						[Face.Four, Suit.Hearts],
						[Face.Three, Suit.Clubs],
						[Face.Three, Suit.Diamonds],
						[Face.Jack, Suit.Spades],
						[Face.Jack, Suit.Diamonds],
					],
				}),
				{
					rank: HandRank.FullHouse,
					rankCards: [
						[Face.Jack, Suit.Spades],
						[Face.Jack, Suit.Hearts],
						[Face.Jack, Suit.Diamonds],
						[Face.Four, Suit.Hearts],
						[Face.Four, Suit.Diamonds],
					],
					kickerCards: [],
				},
			);

			// contains three jacks and three threes
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						[Face.Four, Suit.Diamonds],
						[Face.Three, Suit.Clubs],
					],
					communityCards: [
						[Face.Three, Suit.Hearts],
						[Face.Three, Suit.Diamonds],
						[Face.Jack, Suit.Spades],
						[Face.Jack, Suit.Diamonds],
						[Face.Jack, Suit.Hearts],
					],
				}),
				{
					rank: HandRank.FullHouse,
					rankCards: [
						[Face.Jack, Suit.Spades],
						[Face.Jack, Suit.Hearts],
						[Face.Jack, Suit.Diamonds],
						[Face.Three, Suit.Hearts],
						[Face.Three, Suit.Clubs],
					],
					kickerCards: [],
				},
			);
		});

		void it("should extract four of a kind", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						[Face.Eight, Suit.Spades],
						[Face.Jack, Suit.Diamonds],
					],
					communityCards: [
						[Face.Six, Suit.Diamonds],
						[Face.Two, Suit.Diamonds],
						[Face.Six, Suit.Clubs],
						[Face.Six, Suit.Hearts],
						[Face.Six, Suit.Spades],
					],
				}),
				{
					rank: HandRank.FourOfAKind,
					rankCards: [
						[Face.Six, Suit.Spades],
						[Face.Six, Suit.Hearts],
						[Face.Six, Suit.Clubs],
						[Face.Six, Suit.Diamonds],
					],
					kickerCards: [[Face.Jack, Suit.Diamonds]],
				},
			);
		});

		void it("should extract straight flush", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						[Face.Two, Suit.Clubs],
						[Face.Six, Suit.Clubs],
					],
					communityCards: [
						[Face.Four, Suit.Clubs],
						[Face.Three, Suit.Clubs],
						[Face.Eight, Suit.Spades],
						[Face.Five, Suit.Clubs],
						[Face.Six, Suit.Spades],
					],
				}),
				{
					rank: HandRank.StraightFlush,
					rankCards: [
						[Face.Six, Suit.Clubs],
						[Face.Five, Suit.Clubs],
						[Face.Four, Suit.Clubs],
						[Face.Three, Suit.Clubs],
						[Face.Two, Suit.Clubs],
					],
					kickerCards: [],
				},
			);

			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						[Face.Ace, Suit.Spades],
						[Face.Eight, Suit.Hearts],
					],
					communityCards: [
						[Face.Four, Suit.Spades],
						[Face.Two, Suit.Spades],
						[Face.Three, Suit.Spades],
						[Face.Five, Suit.Spades],
						[Face.Eight, Suit.Diamonds],
					],
				}),
				{
					rank: HandRank.StraightFlush,
					rankCards: [
						[Face.Five, Suit.Spades],
						[Face.Four, Suit.Spades],
						[Face.Three, Suit.Spades],
						[Face.Two, Suit.Spades],
						[Face.Ace, Suit.Spades],
					],
					kickerCards: [],
				},
			);

			// Observed bugs

			const offsuitAce = extractHand({
				pocketCards: [
					[Face.Ace, Suit.Clubs],
					[Face.Two, Suit.Spades],
				],
				communityCards: [
					[Face.Three, Suit.Spades],
					[Face.Four, Suit.Spades],
					[Face.Five, Suit.Spades],
					[Face.Eight, Suit.Spades],
				],
			});

			assert.notEqual(offsuitAce.rank, HandRank.StraightFlush);
			assert.strictEqual(offsuitAce.rank, HandRank.Flush);

			const ambiguousAce = extractHand({
				pocketCards: [
					[Face.Ace, Suit.Diamonds],
					[Face.Five, Suit.Diamonds],
				],
				communityCards: [
					[Face.Nine, Suit.Diamonds],
					[Face.Queen, Suit.Diamonds],
					[Face.Seven, Suit.Diamonds],
					[Face.King, Suit.Diamonds],
					[Face.Jack, Suit.Diamonds],
				],
			});

			assert.notEqual(ambiguousAce.rank, HandRank.StraightFlush);
			assert.strictEqual(ambiguousAce.rank, HandRank.Flush);
		});

		void it("should extract royal flush", () => {
			assert.deepStrictEqual(
				extractHand({
					pocketCards: [
						[Face.King, Suit.Clubs],
						[Face.Queen, Suit.Clubs],
					],
					communityCards: [
						[Face.Ace, Suit.Clubs],
						[Face.Ten, Suit.Clubs],
						[Face.Eight, Suit.Spades],
						[Face.Jack, Suit.Clubs],
						[Face.Jack, Suit.Spades],
					],
				}),
				{
					rank: HandRank.RoyalFlush,
					rankCards: [
						[Face.Ace, Suit.Clubs],
						[Face.King, Suit.Clubs],
						[Face.Queen, Suit.Clubs],
						[Face.Jack, Suit.Clubs],
						[Face.Ten, Suit.Clubs],
					],
					kickerCards: [],
				},
			);
		});
	});
});
