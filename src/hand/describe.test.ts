import assert from "node:assert";
import { describe, it } from "node:test";

import { extractHand } from "./extract.js";
import { describePocketCards, describeHand } from "./describe.js";

void describe("hand/describe", () => {
	void describe("describePocketCards", () => {
		void it("should describe pocket cards", () => {
			assert.strictEqual(describePocketCards([]), "");

			assert.strictEqual(describePocketCards(["3d"]), "Three");

			assert.strictEqual(describePocketCards(["ac", "2c"]), "Ace-Two Suited");

			assert.strictEqual(describePocketCards(["2d", "2c"]), "Pocket Twos");

			assert.strictEqual(
				describePocketCards(["8d", "kc"]),
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
						pocketCards: ["ac"],
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
						pocketCards: ["ac"],
						communityCards: [],
					}),
				),
				{ rank: "Ace high", kickers: "" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: ["ac", "2c"],
						communityCards: [],
					}),
				),
				{ rank: "Ace high", kickers: "Two kicker" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: ["ac", "2c"],
						communityCards: ["7c"],
					}),
				),
				{ rank: "Ace high", kickers: "Seven-Two kickers" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: ["ac", "2d"],
						communityCards: ["ts", "7c"],
					}),
				),
				{ rank: "Ace high", kickers: "Ten-Seven-Two kickers" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: ["ac", "2d"],
						communityCards: ["ts", "7c", "jc", "3d"],
					}),
				),
				{ rank: "Ace high", kickers: "Jack-Ten-Seven-Three kickers" },
			);
		});

		void it("shoulde describe pair", () => {
			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: ["2d", "2c"],
						communityCards: [],
					}),
				),
				{ rank: "Pair Twos", kickers: "" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: ["2d", "2c"],
						communityCards: ["7c"],
					}),
				),
				{ rank: "Pair Twos", kickers: "Seven kicker" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: ["2d", "2c"],
						communityCards: ["tc", "7c", "jd", "8d"],
					}),
				),
				{ rank: "Pair Twos", kickers: "Jack-Ten-Eight kickers" },
			);
		});

		void it("should describe two pair", () => {
			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: ["6d", "6c"],
						communityCards: ["2d", "2c"],
					}),
				),
				{ rank: "Two pair, Sixes over Twos", kickers: "" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: ["2d", "2c"],
						communityCards: ["6d", "6c", "jc", "7d"],
					}),
				),
				{ rank: "Two pair, Sixes over Twos", kickers: "Jack kicker" },
			);
		});

		void it("should describe three of a kind", () => {
			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: ["6d", "6c"],
						communityCards: ["6s"],
					}),
				),
				{ rank: "Three of a kind Sixes", kickers: "" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: ["4d", "4c"],
						communityCards: ["4s", "8d"],
					}),
				),
				{ rank: "Three of a kind Fours", kickers: "Eight kicker" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: ["4d", "4c"],
						communityCards: ["4s", "6s", "2c", "8d", "jc"],
					}),
				),
				{ rank: "Three of a kind Fours", kickers: "Jack-Eight kickers" },
			);
		});

		void it("should describe straight", () => {
			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: ["8d", "7c"],
						communityCards: ["6s", "5h", "4s"],
					}),
				),
				{ rank: "Straight, Four to Eight", kickers: "" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: ["as", "2h"],
						communityCards: ["3s", "4c", "5d"],
					}),
				),
				{ rank: "Straight, Ace to Five", kickers: "" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: ["as", "th"],
						communityCards: ["ks", "jc", "qd"],
					}),
				),
				{ rank: "Straight, Ten to Ace", kickers: "" },
			);

			assert.deepStrictEqual(
				describeHand(
					extractHand({
						pocketCards: ["as", "th"],
						communityCards: ["ks", "jc", "qd", "2d"],
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
					pocketCards: ["7s", "2s"],
					communityCards: ["js", "4s", "5s"],
				}),
			),
			{ rank: "Flush, Jack-Seven high", kickers: "" },
		);

		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: ["7s", "2s"],
					communityCards: ["js", "4s", "5s", "ac"],
				}),
			),
			{ rank: "Flush, Jack-Seven high", kickers: "" },
		);
	});

	void it("should describe full house", () => {
		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: ["4s", "4h"],
					communityCards: ["4c", "jc", "js"],
				}),
			),
			{ rank: "Full house, Fours full of Jacks", kickers: "" },
		);

		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: ["4s", "4h"],
					communityCards: ["4c", "jc", "js", "ks"],
				}),
			),
			{ rank: "Full house, Fours full of Jacks", kickers: "" },
		);
	});

	void it("should describe four of a kind", () => {
		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: ["4s", "4h"],
					communityCards: ["4c", "4d", "js"],
				}),
			),
			{ rank: "Four of a kind Fours", kickers: "Jack kicker" },
		);

		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: ["4s", "4h"],
					communityCards: ["4c", "4d", "js", "ks"],
				}),
			),
			{ rank: "Four of a kind Fours", kickers: "King kicker" },
		);
	});

	void it("should describe straight flush", () => {
		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: ["8d", "7d"],
					communityCards: ["6d", "5d", "4d"],
				}),
			),
			{ rank: "Straight flush, Four to Eight", kickers: "" },
		);

		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: ["as", "2s"],
					communityCards: ["3s", "4s", "5s"],
				}),
			),
			{ rank: "Straight flush, Ace to Five", kickers: "" },
		);

		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: ["as", "2s"],
					communityCards: ["3s", "4s", "5s", "8s"],
				}),
			),
			{ rank: "Straight flush, Ace to Five", kickers: "" },
		);
	});

	void it("should describe royal flush", () => {
		assert.deepStrictEqual(
			describeHand(
				extractHand({
					pocketCards: ["as", "ts"],
					communityCards: ["ks", "js", "qs", "2s"],
				}),
			),
			{ rank: "Royal flush", kickers: "" },
		);
	});
});
