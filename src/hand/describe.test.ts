import assert from "node:assert";
import { describe, it } from "node:test";

import { extractHand } from "./extract.js";
import { describePocketCards, describeHand } from "./describe.js";

void describe("hand/describe", () => {
	void describe("describePocketCards", () => {
		void it("should describe pocket cards", () => {
			assert.strictEqual(describePocketCards([]), "");

			assert.strictEqual(describePocketCards([["3", "d"]]), "Three");

			assert.strictEqual(
				describePocketCards([
					["a", "c"],
					["2", "c"],
				]),
				"Ace-Two Suited",
			);

			assert.strictEqual(
				describePocketCards([
					["2", "d"],
					["2", "c"],
				]),
				"Pocket Twos",
			);

			assert.strictEqual(
				describePocketCards([
					["8", "d"],
					["k", "c"],
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
						pocketCards: [["a", "c"]],
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
						pocketCards: [["a", "c"]],
						communityCards: [],
					}),
				),
				{ rank: "Ace high", kickers: "" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							["a", "c"],
							["2", "c"],
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
							["a", "c"],
							["2", "c"],
						],
						communityCards: [["7", "c"]],
					}),
				),
				{ rank: "Ace high", kickers: "Seven-Two kickers" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							["a", "c"],
							["2", "d"],
						],
						communityCards: [
							["t", "s"],
							["7", "c"],
						],
					}),
				),
				{ rank: "Ace high", kickers: "Ten-Seven-Two kickers" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							["a", "c"],
							["2", "d"],
						],
						communityCards: [
							["t", "s"],
							["7", "c"],
							["j", "c"],
							["3", "d"],
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
							["2", "d"],
							["2", "c"],
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
							["2", "d"],
							["2", "c"],
						],
						communityCards: [["7", "c"]],
					}),
				),
				{ rank: "Pair Twos", kickers: "Seven kicker" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							["2", "d"],
							["2", "c"],
						],
						communityCards: [
							["t", "c"],
							["7", "c"],
							["j", "d"],
							["8", "d"],
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
							["6", "d"],
							["6", "c"],
						],
						communityCards: [
							["2", "d"],
							["2", "c"],
						],
					}),
				),
				{ rank: "Two pair, Sixes over Twos", kickers: "" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							["2", "d"],
							["2", "c"],
						],
						communityCards: [
							["6", "d"],
							["6", "c"],
							["j", "c"],
							["7", "d"],
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
							["6", "d"],
							["6", "c"],
						],
						communityCards: [["6", "s"]],
					}),
				),
				{ rank: "Three of a kind Sixes", kickers: "" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							["4", "d"],
							["4", "c"],
						],
						communityCards: [
							["4", "s"],
							["8", "d"],
						],
					}),
				),
				{ rank: "Three of a kind Fours", kickers: "Eight kicker" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							["4", "d"],
							["4", "c"],
						],
						communityCards: [
							["4", "s"],
							["6", "s"],
							["2", "c"],
							["8", "d"],
							["j", "c"],
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
							["8", "d"],
							["7", "c"],
						],
						communityCards: [
							["6", "s"],
							["5", "h"],
							["4", "s"],
						],
					}),
				),
				{ rank: "Straight, Four to Eight", kickers: "" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							["a", "s"],
							["2", "h"],
						],
						communityCards: [
							["3", "s"],
							["4", "c"],
							["5", "d"],
						],
					}),
				),
				{ rank: "Straight, Ace to Five", kickers: "" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							["a", "s"],
							["t", "h"],
						],
						communityCards: [
							["k", "s"],
							["j", "c"],
							["q", "d"],
						],
					}),
				),
				{ rank: "Straight, Ten to Ace", kickers: "" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: [
							["a", "s"],
							["t", "h"],
						],
						communityCards: [
							["k", "s"],
							["j", "c"],
							["q", "d"],
							["2", "d"],
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
						["7", "s"],
						["2", "s"],
					],
					communityCards: [
						["j", "s"],
						["4", "s"],
						["5", "s"],
					],
				}),
			),
			{ rank: "Flush, Jack-Seven high", kickers: "" },
		);

		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: [
						["7", "s"],
						["2", "s"],
					],
					communityCards: [
						["j", "s"],
						["4", "s"],
						["5", "s"],
						["a", "c"],
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
						["4", "s"],
						["4", "h"],
					],
					communityCards: [
						["4", "c"],
						["j", "c"],
						["j", "s"],
					],
				}),
			),
			{ rank: "Full house, Fours full of Jacks", kickers: "" },
		);

		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: [
						["4", "s"],
						["4", "h"],
					],
					communityCards: [
						["4", "c"],
						["j", "c"],
						["j", "s"],
						["k", "s"],
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
						["4", "s"],
						["4", "h"],
					],
					communityCards: [
						["4", "c"],
						["4", "d"],
						["j", "s"],
					],
				}),
			),
			{ rank: "Four of a kind Fours", kickers: "Jack kicker" },
		);

		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: [
						["4", "s"],
						["4", "h"],
					],
					communityCards: [
						["4", "c"],
						["4", "d"],
						["j", "s"],
						["k", "s"],
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
						["8", "d"],
						["7", "d"],
					],
					communityCards: [
						["6", "d"],
						["5", "d"],
						["4", "d"],
					],
				}),
			),
			{ rank: "Straight flush, Four to Eight", kickers: "" },
		);

		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: [
						["a", "s"],
						["2", "s"],
					],
					communityCards: [
						["3", "s"],
						["4", "s"],
						["5", "s"],
					],
				}),
			),
			{ rank: "Straight flush, Ace to Five", kickers: "" },
		);

		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: [
						["a", "s"],
						["2", "s"],
					],
					communityCards: [
						["3", "s"],
						["4", "s"],
						["5", "s"],
						["8", "s"],
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
						["a", "s"],
						["t", "s"],
					],
					communityCards: [
						["k", "s"],
						["j", "s"],
						["q", "s"],
						["2", "s"],
					],
				}),
			),
			{ rank: "Royal flush", kickers: "" },
		);
	});
});
