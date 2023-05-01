import assert from "node:assert";
import { describe, it } from "node:test";

import { findHighestHands } from "./compare.js";

import type { HandCandidate, HandRank } from "./types.js";

void describe("hand/compare", () => {
	void describe("findHighestHands", () => {
		void it("should find natural highest hands", () => {
			const twoPair = {
				pocketCards: ["4c", "jd"],
				communityCards: ["6d", "2d", "8s", "6c", "jc"],
			} as const;

			const fullHouse = {
				pocketCards: ["3s", "4d"],
				communityCards: ["3c", "3d", "5d", "jd", "jh"],
			} as const;

			const fourOfAKind = {
				pocketCards: ["8s", "jd"],
				communityCards: ["6d", "2d", "6c", "6h", "6s"],
			} as const;

			const royalFlush = {
				pocketCards: ["kc", "qc"],
				communityCards: ["ac", "tc", "8s", "jc", "js"],
			} as const;

			assertFindHighestResult(
				[fourOfAKind, fullHouse, royalFlush, twoPair, royalFlush],
				[
					{
						candidate: royalFlush,
						candidateIndex: 2,
						rank: "royalFlush",
					},
					{
						candidate: royalFlush,
						candidateIndex: 4,
						rank: "royalFlush",
					},
				],
			);
		});

		void it("should find highest ties when all ranks are same", () => {
			const straightEightSpadesHigh = {
				pocketCards: ["8s", "7d"],
				communityCards: ["6h", "5c", "4d", "3d", "2c"],
			} as const;

			const straightEightClubsHigh = {
				pocketCards: ["8c", "7h"],
				communityCards: ["6d", "5s", "4h", "3h", "2s"],
			} as const;

			const straightAceSpadesLow = {
				pocketCards: ["5s", "4h"],
				communityCards: ["3h", "2s", "as", "8h", "8h"],
			} as const;

			assertFindHighestResult(
				[straightEightSpadesHigh, straightAceSpadesLow, straightEightClubsHigh],
				[
					{
						candidate: straightEightSpadesHigh,
						candidateIndex: 0,
						rank: "straight",
					},
					{
						candidate: straightEightClubsHigh,
						candidateIndex: 2,
						rank: "straight",
					},
				],
			);
		});

		void it("should resolve to high card", () => {
			const highCardHighKicker = {
				pocketCards: ["jc", "8s"],
				communityCards: ["7d", "2d", "3c", "4c", "qd"],
			} as const;

			const highCardLowKicker = {
				pocketCards: ["jc", "8s"],
				communityCards: ["6d", "2d", "3c", "4c", "qd"],
			} as const;

			assertFindHighestResult(
				[highCardHighKicker, highCardLowKicker],
				[
					{
						candidate: highCardHighKicker,
						candidateIndex: 0,
						rank: "highCard",
					},
				],
			);

			const highCardEqualA = {
				pocketCards: ["jc", "8s"],
				communityCards: ["6d", "2d", "3c", "4c", "qd"],
			} as const;

			const highCardEqualB = {
				pocketCards: ["js", "8d"],
				communityCards: ["6c", "2h", "3s", "4h", "qs"],
			} as const;

			assertFindHighestResult(
				[highCardEqualA, highCardEqualB],
				[
					{
						candidate: highCardEqualA,
						candidateIndex: 0,
						rank: "highCard",
					},
					{
						candidate: highCardEqualB,
						candidateIndex: 1,
						rank: "highCard",
					},
				],
			);
		});

		void it("should resolve pair", () => {
			const pairThrees = {
				pocketCards: ["3c", "3d"],
				communityCards: ["kd", "5c", "as", "8h", "7d"],
			} as const;

			const pairFives = {
				pocketCards: ["3h", "5c"],
				communityCards: ["kd", "5d", "ah", "8d", "7h"],
			} as const;

			assertFindHighestResult(
				[pairThrees, pairFives],
				[
					{
						candidate: pairFives,
						candidateIndex: 1,
						rank: "pair",
					},
				],
			);

			const pairThreesHighKicker = {
				pocketCards: ["3c", "3d"],
				communityCards: ["kd", "5c", "as", "8h", "7d"],
			} as const;

			const pairThreesLowKicker = {
				pocketCards: ["3h", "3s"],
				communityCards: ["4h", "5s", "ac", "8d", "7h"],
			} as const;

			assertFindHighestResult(
				[pairThreesLowKicker, pairThreesHighKicker],
				[
					{
						candidate: pairThreesHighKicker,
						candidateIndex: 1,
						rank: "pair",
					},
				],
			);

			const pairEqualA = {
				pocketCards: ["3c", "3d"],
				communityCards: ["kd", "5c", "as", "8h", "7d"],
			} as const;

			const pairEqualB = {
				pocketCards: ["3h", "3s"],
				communityCards: ["kh", "5s", "ac", "8d", "7h"],
			} as const;

			assertFindHighestResult(
				[pairEqualA, pairEqualB],
				[
					{
						candidate: pairEqualA,
						candidateIndex: 0,
						rank: "pair",
					},
					{
						candidate: pairEqualB,
						candidateIndex: 1,
						rank: "pair",
					},
				],
			);
		});

		void it("should resolve two pair", () => {
			const twoPairFivesOverThrees = {
				pocketCards: ["3c", "3d"],
				communityCards: ["5d", "5c", "as", "8h", "7d"],
			} as const;

			const twoPairSixesOverThrees = {
				pocketCards: ["3h", "3s"],
				communityCards: ["6d", "6c", "ac", "8d", "7h"],
			} as const;

			assertFindHighestResult(
				[twoPairFivesOverThrees, twoPairSixesOverThrees],
				[
					{
						candidate: twoPairSixesOverThrees,
						candidateIndex: 1,
						rank: "twoPair",
					},
				],
			);

			const twoPairFivesOverFours = {
				pocketCards: ["4h", "4s"],
				communityCards: ["5h", "5s", "ac", "8d", "7h"],
			} as const;

			assertFindHighestResult(
				[twoPairFivesOverThrees, twoPairFivesOverFours],
				[
					{
						candidate: twoPairFivesOverFours,
						candidateIndex: 1,
						rank: "twoPair",
					},
				],
			);

			const twoPairFoursOverThreesHighKicker = {
				pocketCards: ["3c", "3d"],
				communityCards: ["4d", "4c", "as", "8h", "7d"],
			} as const;

			const twoPairFoursOverThreesLowKicker = {
				pocketCards: ["3h", "3s"],
				communityCards: ["4h", "4s", "kc", "8d", "7h"],
			} as const;

			assertFindHighestResult(
				[twoPairFoursOverThreesLowKicker, twoPairFoursOverThreesHighKicker],
				[
					{
						candidate: twoPairFoursOverThreesHighKicker,
						candidateIndex: 1,
						rank: "twoPair",
					},
				],
			);

			const twoPairEqualA = {
				pocketCards: ["3c", "3d"],
				communityCards: ["4d", "4c", "as", "8h", "7d"],
			} as const;

			const twoPairEqualB = {
				pocketCards: ["3h", "3s"],
				communityCards: ["4h", "4s", "ac", "8d", "7h"],
			} as const;

			assertFindHighestResult(
				[twoPairEqualA, twoPairEqualB],
				[
					{
						candidate: twoPairEqualA,
						candidateIndex: 0,
						rank: "twoPair",
					},
					{
						candidate: twoPairEqualB,
						candidateIndex: 1,
						rank: "twoPair",
					},
				],
			);
		});

		void it("should resolve three of a kind", () => {
			// It should be impossible for two hands to have the same
			// value three of a kind, so a natural higher hand should
			// be determined by high rank card

			const threeOfAKindThrees = {
				pocketCards: ["3c", "3d"],
				communityCards: ["kd", "3s", "as", "8h", "7d"],
			} as const;

			const threeOfAKindFives = {
				pocketCards: ["5h", "5c"],
				communityCards: ["kd", "5d", "ah", "8d", "7h"],
			} as const;

			assertFindHighestResult(
				[threeOfAKindThrees, threeOfAKindFives],
				[
					{
						candidate: threeOfAKindFives,
						candidateIndex: 1,
						rank: "threeOfAKind",
					},
				],
			);
		});

		void it("should resolve straight", () => {
			const straightEightSpadesHigh = {
				pocketCards: ["8s", "6h"],
				communityCards: ["4d", "2c", "3d", "5c", "7d"],
			} as const;

			const straightAceSpadesLow = {
				pocketCards: ["as", "8h"],
				communityCards: ["4h", "2s", "3h", "5s", "8h"],
			} as const;

			assertFindHighestResult(
				[straightEightSpadesHigh, straightAceSpadesLow],
				[
					{
						candidate: straightEightSpadesHigh,
						candidateIndex: 0,
						rank: "straight",
					},
				],
			);

			const straightEightClubsHigh = {
				pocketCards: ["8c", "6d"],
				communityCards: ["4h", "2s", "3h", "5s", "7h"],
			} as const;

			assertFindHighestResult(
				[straightEightClubsHigh, straightEightSpadesHigh],
				[
					{
						candidate: straightEightClubsHigh,
						candidateIndex: 0,
						rank: "straight",
					},
					{
						candidate: straightEightSpadesHigh,
						candidateIndex: 1,
						rank: "straight",
					},
				],
			);
		});

		void it("should resolve flush", () => {
			const flushJackHighDiamonds = {
				pocketCards: ["jd", "5d"],
				communityCards: ["3d", "4d", "2d", "jh", "3s"],
			} as const;

			const flushNineHighHearts = {
				pocketCards: ["9h", "5h"],
				communityCards: ["4h", "3h", "2h", "3c", "9d"],
			} as const;

			assertFindHighestResult(
				[flushJackHighDiamonds, flushNineHighHearts],
				[
					{
						candidate: flushJackHighDiamonds,
						candidateIndex: 0,
						rank: "flush",
					},
				],
			);

			const flushJackHighSpades = {
				pocketCards: ["js", "5s"],
				communityCards: ["4s", "3s", "2s", "3d", "jh"],
			} as const;

			assertFindHighestResult(
				[flushJackHighDiamonds, flushJackHighSpades],
				[
					{
						candidate: flushJackHighDiamonds,
						candidateIndex: 0,
						rank: "flush",
					},
					{
						candidate: flushJackHighSpades,
						candidateIndex: 1,
						rank: "flush",
					},
				],
			);

			const flushNineHighDiamondsHigherInternal = {
				pocketCards: ["9d", "8d"],
				communityCards: ["4d", "3d", "2d", "9h", "3s"],
			} as const;

			assertFindHighestResult(
				[flushNineHighHearts, flushNineHighDiamondsHigherInternal],
				[
					{
						candidate: flushNineHighDiamondsHigherInternal,
						candidateIndex: 1,
						rank: "flush",
					},
				],
			);
		});

		void it("should resolve full house", () => {
			// It should be impossible for two hands to contain
			// the same three high cards in a full house, so there should
			// always be a natural higher hand on high card value

			const fullHouseFivesOverThrees = {
				pocketCards: ["3c", "3d"],
				communityCards: ["5d", "5c", "5s", "8h", "7d"],
			} as const;

			const fullHouseSixesOverThrees = {
				pocketCards: ["3h", "3s"],
				communityCards: ["6d", "6c", "6h", "8d", "7h"],
			} as const;

			assertFindHighestResult(
				[fullHouseFivesOverThrees, fullHouseSixesOverThrees],
				[
					{
						candidate: fullHouseSixesOverThrees,
						candidateIndex: 1,
						rank: "fullHouse",
					},
				],
			);
		});

		void it("should resolve four of a kind", () => {
			// It should be impossible for two hands to contain equal value
			// four-of-a-kinds, so there should always be a natural better hand
			// on highest rank cards.

			const fourOfAKindThrees = {
				pocketCards: ["3c", "3d"],
				communityCards: ["kd", "3s", "3h", "8h", "7d"],
			} as const;

			const fourOfAKindFives = {
				pocketCards: ["5h", "5c"],
				communityCards: ["kd", "5d", "5s", "8d", "7h"],
			} as const;

			assertFindHighestResult(
				[fourOfAKindThrees, fourOfAKindFives],
				[
					{
						candidate: fourOfAKindFives,
						candidateIndex: 1,
						rank: "fourOfAKind",
					},
				],
			);
		});

		void it("should resolve straight flush", () => {
			const straightFlushEightHigh = {
				pocketCards: ["2c", "6c"],
				communityCards: ["4c", "3c", "8s", "5c", "6s"],
			} as const;

			const straightFlushAceLow = {
				pocketCards: ["as", "8h"],
				communityCards: ["4s", "2s", "3s", "5s", "8d"],
			} as const;

			assertFindHighestResult(
				[straightFlushEightHigh, straightFlushAceLow],
				[
					{
						candidate: straightFlushEightHigh,
						candidateIndex: 0,
						rank: "straightFlush",
					},
				],
			);

			const straightFlushSixHighClubs = {
				pocketCards: ["2c", "6c"],
				communityCards: ["4c", "3c", "8s", "5c", "6s"],
			} as const;

			const straightFlushSixHighSpades = {
				pocketCards: ["2s", "6s"],
				communityCards: ["4s", "3s", "8h", "5s", "6h"],
			} as const;

			assertFindHighestResult(
				[straightFlushSixHighClubs, straightFlushSixHighSpades],
				[
					{
						candidate: straightFlushSixHighClubs,
						candidateIndex: 0,
						rank: "straightFlush",
					},
					{
						candidate: straightFlushSixHighSpades,
						candidateIndex: 1,
						rank: "straightFlush",
					},
				],
			);
		});

		void it("should resolve royal flush", () => {
			const royalFlushDiamonds = {
				pocketCards: ["kd", "qd"],
				communityCards: ["ad", "td", "8s", "jd", "js"],
			} as const;

			const royalFlushSpades = {
				pocketCards: ["ks", "qs"],
				communityCards: ["as", "ts", "8s", "js", "js"],
			} as const;

			assertFindHighestResult(
				[royalFlushDiamonds, royalFlushSpades],
				[
					{
						candidate: royalFlushDiamonds,
						candidateIndex: 0,
						rank: "royalFlush",
					},
					{
						candidate: royalFlushSpades,
						candidateIndex: 1,
						rank: "royalFlush",
					},
				],
			);
		});
	});
});

function assertFindHighestResult(
	candidates: HandCandidate[],
	expected: {
		candidate: HandCandidate;
		candidateIndex: number;
		rank: HandRank;
	}[],
) {
	assert.deepStrictEqual(
		findHighestHands(candidates).map(({ candidate, candidateIndex, hand }) => ({
			candidate,
			candidateIndex,
			rank: hand.rank,
		})),
		expected,
	);
}
