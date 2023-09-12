import assert from "node:assert";
import { describe, it } from "node:test";

import { Face, Suit } from "../card/constants.js";
import { extractHand } from "./extract.js";
import { describePocketCards, describeHand } from "./describe.js";

void describe("hand/describe", () => {
	void describe("describePocketCards", () => {
		void it("should describe pocket cards", () => {
			assert.strictEqual(describePocketCards([]), "");

			assert.strictEqual(
				describePocketCards([[Face.Three, Suit.Diamonds]]),
				"Three",
			);

			assert.strictEqual(
				describePocketCards([
					[Face.Ace, Suit.Clubs],
					[Face.Two, Suit.Clubs],
				]),
				"Ace-Two Suited",
			);

			assert.strictEqual(
				describePocketCards([
					[Face.Two, Suit.Diamonds],
					[Face.Two, Suit.Clubs],
				]),
				"Pocket Twos",
			);

			assert.strictEqual(
				describePocketCards([
					[Face.Eight, Suit.Diamonds],
					[Face.King, Suit.Clubs],
				]),
				"King-Eight Offsuit",
			);
		});
	});

	void describe("describeHand", () => {
		void it("should describe empty hand", () => {
			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [],
						communityCards: [],
					}),
				),
				{ rank: "", kickers: "" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [[Face.Ace, Suit.Clubs]],
						communityCards: [],
					}),
				),
				{ rank: "Ace high", kickers: "" },
			);
		});

		void it("should describe high card", () => {
			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [[Face.Ace, Suit.Clubs]],
						communityCards: [],
					}),
				),
				{ rank: "Ace high", kickers: "" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							[Face.Ace, Suit.Clubs],
							[Face.Two, Suit.Clubs],
						],
						communityCards: [],
					}),
				),
				{ rank: "Ace high", kickers: "Two kicker" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							[Face.Ace, Suit.Clubs],
							[Face.Two, Suit.Clubs],
						],
						communityCards: [[Face.Seven, Suit.Clubs]],
					}),
				),
				{ rank: "Ace high", kickers: "Seven-Two kickers" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							[Face.Ace, Suit.Clubs],
							[Face.Two, Suit.Diamonds],
						],
						communityCards: [
							[Face.Ten, Suit.Spades],
							[Face.Seven, Suit.Clubs],
						],
					}),
				),
				{ rank: "Ace high", kickers: "Ten-Seven-Two kickers" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							[Face.Ace, Suit.Clubs],
							[Face.Two, Suit.Diamonds],
						],
						communityCards: [
							[Face.Ten, Suit.Spades],
							[Face.Seven, Suit.Clubs],
							[Face.Jack, Suit.Clubs],
							[Face.Three, Suit.Diamonds],
						],
					}),
				),
				{ rank: "Ace high", kickers: "Jack-Ten-Seven-Three kickers" },
			);
		});

		void it("shoulde describe pair", () => {
			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							[Face.Two, Suit.Diamonds],
							[Face.Two, Suit.Clubs],
						],
						communityCards: [],
					}),
				),
				{ rank: "Pair Twos", kickers: "" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							[Face.Two, Suit.Diamonds],
							[Face.Two, Suit.Clubs],
						],
						communityCards: [[Face.Seven, Suit.Clubs]],
					}),
				),
				{ rank: "Pair Twos", kickers: "Seven kicker" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							[Face.Two, Suit.Diamonds],
							[Face.Two, Suit.Clubs],
						],
						communityCards: [
							[Face.Ten, Suit.Clubs],
							[Face.Seven, Suit.Clubs],
							[Face.Jack, Suit.Diamonds],
							[Face.Eight, Suit.Diamonds],
						],
					}),
				),
				{ rank: "Pair Twos", kickers: "Jack-Ten-Eight kickers" },
			);
		});

		void it("should describe two pair", () => {
			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							[Face.Six, Suit.Diamonds],
							[Face.Six, Suit.Clubs],
						],
						communityCards: [
							[Face.Two, Suit.Diamonds],
							[Face.Two, Suit.Clubs],
						],
					}),
				),
				{ rank: "Two pair, Sixes over Twos", kickers: "" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							[Face.Two, Suit.Diamonds],
							[Face.Two, Suit.Clubs],
						],
						communityCards: [
							[Face.Six, Suit.Diamonds],
							[Face.Six, Suit.Clubs],
							[Face.Jack, Suit.Clubs],
							[Face.Seven, Suit.Diamonds],
						],
					}),
				),
				{ rank: "Two pair, Sixes over Twos", kickers: "Jack kicker" },
			);
		});

		void it("should describe three of a kind", () => {
			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							[Face.Six, Suit.Diamonds],
							[Face.Six, Suit.Clubs],
						],
						communityCards: [[Face.Six, Suit.Spades]],
					}),
				),
				{ rank: "Three of a kind Sixes", kickers: "" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							[Face.Four, Suit.Diamonds],
							[Face.Four, Suit.Clubs],
						],
						communityCards: [
							[Face.Four, Suit.Spades],
							[Face.Eight, Suit.Diamonds],
						],
					}),
				),
				{ rank: "Three of a kind Fours", kickers: "Eight kicker" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							[Face.Four, Suit.Diamonds],
							[Face.Four, Suit.Clubs],
						],
						communityCards: [
							[Face.Four, Suit.Spades],
							[Face.Six, Suit.Spades],
							[Face.Two, Suit.Clubs],
							[Face.Eight, Suit.Diamonds],
							[Face.Jack, Suit.Clubs],
						],
					}),
				),
				{ rank: "Three of a kind Fours", kickers: "Jack-Eight kickers" },
			);
		});

		void it("should describe straight", () => {
			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							[Face.Eight, Suit.Diamonds],
							[Face.Seven, Suit.Clubs],
						],
						communityCards: [
							[Face.Six, Suit.Spades],
							[Face.Five, Suit.Hearts],
							[Face.Four, Suit.Spades],
						],
					}),
				),
				{ rank: "Straight, Four to Eight", kickers: "" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							[Face.Ace, Suit.Spades],
							[Face.Two, Suit.Hearts],
						],
						communityCards: [
							[Face.Three, Suit.Spades],
							[Face.Four, Suit.Clubs],
							[Face.Five, Suit.Diamonds],
						],
					}),
				),
				{ rank: "Straight, Ace to Five", kickers: "" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							[Face.Ace, Suit.Spades],
							[Face.Ten, Suit.Hearts],
						],
						communityCards: [
							[Face.King, Suit.Spades],
							[Face.Jack, Suit.Clubs],
							[Face.Queen, Suit.Diamonds],
						],
					}),
				),
				{ rank: "Straight, Ten to Ace", kickers: "" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							[Face.Ace, Suit.Spades],
							[Face.Ten, Suit.Hearts],
						],
						communityCards: [
							[Face.King, Suit.Spades],
							[Face.Jack, Suit.Clubs],
							[Face.Queen, Suit.Diamonds],
							[Face.Two, Suit.Diamonds],
						],
					}),
				),
				{ rank: "Straight, Ten to Ace", kickers: "" },
			);
		});
	});

	void it("should describe flush", () => {
		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: [
						[Face.Seven, Suit.Spades],
						[Face.Two, Suit.Spades],
					],
					communityCards: [
						[Face.Jack, Suit.Spades],
						[Face.Four, Suit.Spades],
						[Face.Five, Suit.Spades],
					],
				}),
			),
			{ rank: "Flush, Jack-Seven high", kickers: "" },
		);

		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: [
						[Face.Seven, Suit.Spades],
						[Face.Two, Suit.Spades],
					],
					communityCards: [
						[Face.Jack, Suit.Spades],
						[Face.Four, Suit.Spades],
						[Face.Five, Suit.Spades],
						[Face.Ace, Suit.Clubs],
					],
				}),
			),
			{ rank: "Flush, Jack-Seven high", kickers: "" },
		);
	});

	void it("should describe full house", () => {
		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: [
						[Face.Four, Suit.Spades],
						[Face.Four, Suit.Hearts],
					],
					communityCards: [
						[Face.Four, Suit.Clubs],
						[Face.Jack, Suit.Clubs],
						[Face.Jack, Suit.Spades],
					],
				}),
			),
			{ rank: "Full house, Fours full of Jacks", kickers: "" },
		);

		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: [
						[Face.Four, Suit.Spades],
						[Face.Four, Suit.Hearts],
					],
					communityCards: [
						[Face.Four, Suit.Clubs],
						[Face.Jack, Suit.Clubs],
						[Face.Jack, Suit.Spades],
						[Face.King, Suit.Spades],
					],
				}),
			),
			{ rank: "Full house, Fours full of Jacks", kickers: "" },
		);
	});

	void it("should describe four of a kind", () => {
		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: [
						[Face.Four, Suit.Spades],
						[Face.Four, Suit.Hearts],
					],
					communityCards: [
						[Face.Four, Suit.Clubs],
						[Face.Four, Suit.Diamonds],
						[Face.Jack, Suit.Spades],
					],
				}),
			),
			{ rank: "Four of a kind Fours", kickers: "Jack kicker" },
		);

		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: [
						[Face.Four, Suit.Spades],
						[Face.Four, Suit.Hearts],
					],
					communityCards: [
						[Face.Four, Suit.Clubs],
						[Face.Four, Suit.Diamonds],
						[Face.Jack, Suit.Spades],
						[Face.King, Suit.Spades],
					],
				}),
			),
			{ rank: "Four of a kind Fours", kickers: "King kicker" },
		);
	});

	void it("should describe straight flush", () => {
		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: [
						[Face.Eight, Suit.Diamonds],
						[Face.Seven, Suit.Diamonds],
					],
					communityCards: [
						[Face.Six, Suit.Diamonds],
						[Face.Five, Suit.Diamonds],
						[Face.Four, Suit.Diamonds],
					],
				}),
			),
			{ rank: "Straight flush, Four to Eight", kickers: "" },
		);

		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: [
						[Face.Ace, Suit.Spades],
						[Face.Two, Suit.Spades],
					],
					communityCards: [
						[Face.Three, Suit.Spades],
						[Face.Four, Suit.Spades],
						[Face.Five, Suit.Spades],
					],
				}),
			),
			{ rank: "Straight flush, Ace to Five", kickers: "" },
		);

		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: [
						[Face.Ace, Suit.Spades],
						[Face.Two, Suit.Spades],
					],
					communityCards: [
						[Face.Three, Suit.Spades],
						[Face.Four, Suit.Spades],
						[Face.Five, Suit.Spades],
						[Face.Eight, Suit.Spades],
					],
				}),
			),
			{ rank: "Straight flush, Ace to Five", kickers: "" },
		);
	});

	void it("should describe royal flush", () => {
		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: [
						[Face.Ace, Suit.Spades],
						[Face.Ten, Suit.Spades],
					],
					communityCards: [
						[Face.King, Suit.Spades],
						[Face.Jack, Suit.Spades],
						[Face.Queen, Suit.Spades],
						[Face.Two, Suit.Spades],
					],
				}),
			),
			{ rank: "Royal flush", kickers: "" },
		);
	});
});
