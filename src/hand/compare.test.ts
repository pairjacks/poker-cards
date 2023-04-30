import assert from "node:assert";
import { describe, it } from "node:test";

import { findHighestHands } from "./compare.js";

import type { HandCandidate, HandRank } from "./types.js";

void describe("hand/compare", () => {
	void describe("findHighestHands", () => {
		void it("should find natural highest hands", () => {
			const twoPair = {
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
			} as const;

			const fullHouse = {
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
			} as const;

			const fourOfAKind = {
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
			} as const;

			const royalFlush = {
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
				pocketCards: [
					["8", "s"],
					["7", "d"],
				],
				communityCards: [
					["6", "h"],
					["5", "c"],
					["4", "d"],
					["3", "d"],
					["2", "c"],
				],
			} as const;

			const straightEightClubsHigh = {
				pocketCards: [
					["8", "c"],
					["7", "h"],
				],
				communityCards: [
					["6", "d"],
					["5", "s"],
					["4", "h"],
					["3", "h"],
					["2", "s"],
				],
			} as const;

			const straightAceSpadesLow = {
				pocketCards: [
					["5", "s"],
					["4", "h"],
				],
				communityCards: [
					["3", "h"],
					["2", "s"],
					["a", "s"],
					["8", "h"],
					["8", "h"],
				],
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
				pocketCards: [
					["j", "c"],
					["8", "s"],
				],
				communityCards: [
					["7", "d"],
					["2", "d"],
					["3", "c"],
					["4", "c"],
					["q", "d"],
				],
			} as const;

			const highCardLowKicker = {
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
			} as const;

			const highCardEqualB = {
				pocketCards: [
					["j", "s"],
					["8", "d"],
				],
				communityCards: [
					["6", "c"],
					["2", "h"],
					["3", "s"],
					["4", "h"],
					["q", "s"],
				],
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
				pocketCards: [
					["3", "c"],
					["3", "d"],
				],
				communityCards: [
					["k", "d"],
					["5", "c"],
					["a", "s"],
					["8", "h"],
					["7", "d"],
				],
			} as const;

			const pairFives = {
				pocketCards: [
					["3", "h"],
					["5", "c"],
				],
				communityCards: [
					["k", "d"],
					["5", "d"],
					["a", "h"],
					["8", "d"],
					["7", "h"],
				],
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
				pocketCards: [
					["3", "c"],
					["3", "d"],
				],
				communityCards: [
					["k", "d"],
					["5", "c"],
					["a", "s"],
					["8", "h"],
					["7", "d"],
				],
			} as const;

			const pairThreesLowKicker = {
				pocketCards: [
					["3", "h"],
					["3", "s"],
				],
				communityCards: [
					["4", "h"],
					["5", "s"],
					["a", "c"],
					["8", "d"],
					["7", "h"],
				],
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
				pocketCards: [
					["3", "c"],
					["3", "d"],
				],
				communityCards: [
					["k", "d"],
					["5", "c"],
					["a", "s"],
					["8", "h"],
					["7", "d"],
				],
			} as const;

			const pairEqualB = {
				pocketCards: [
					["3", "h"],
					["3", "s"],
				],
				communityCards: [
					["k", "h"],
					["5", "s"],
					["a", "c"],
					["8", "d"],
					["7", "h"],
				],
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
				pocketCards: [
					["3", "c"],
					["3", "d"],
				],
				communityCards: [
					["5", "d"],
					["5", "c"],
					["a", "s"],
					["8", "h"],
					["7", "d"],
				],
			} as const;

			const twoPairSixesOverThrees = {
				pocketCards: [
					["3", "h"],
					["3", "s"],
				],
				communityCards: [
					["6", "d"],
					["6", "c"],
					["a", "c"],
					["8", "d"],
					["7", "h"],
				],
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
				pocketCards: [
					["4", "h"],
					["4", "s"],
				],
				communityCards: [
					["5", "h"],
					["5", "s"],
					["a", "c"],
					["8", "d"],
					["7", "h"],
				],
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
				pocketCards: [
					["3", "c"],
					["3", "d"],
				],
				communityCards: [
					["4", "d"],
					["4", "c"],
					["a", "s"],
					["8", "h"],
					["7", "d"],
				],
			} as const;

			const twoPairFoursOverThreesLowKicker = {
				pocketCards: [
					["3", "h"],
					["3", "s"],
				],
				communityCards: [
					["4", "h"],
					["4", "s"],
					["k", "c"],
					["8", "d"],
					["7", "h"],
				],
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
				pocketCards: [
					["3", "c"],
					["3", "d"],
				],
				communityCards: [
					["4", "d"],
					["4", "c"],
					["a", "s"],
					["8", "h"],
					["7", "d"],
				],
			} as const;

			const twoPairEqualB = {
				pocketCards: [
					["3", "h"],
					["3", "s"],
				],
				communityCards: [
					["4", "h"],
					["4", "s"],
					["a", "c"],
					["8", "d"],
					["7", "h"],
				],
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
				pocketCards: [
					["3", "c"],
					["3", "d"],
				],
				communityCards: [
					["k", "d"],
					["3", "s"],
					["a", "s"],
					["8", "h"],
					["7", "d"],
				],
			} as const;

			const threeOfAKindFives = {
				pocketCards: [
					["5", "h"],
					["5", "c"],
				],
				communityCards: [
					["k", "d"],
					["5", "d"],
					["a", "h"],
					["8", "d"],
					["7", "h"],
				],
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
				pocketCards: [
					["8", "s"],
					["6", "h"],
				],
				communityCards: [
					["4", "d"],
					["2", "c"],
					["3", "d"],
					["5", "c"],
					["7", "d"],
				],
			} as const;

			const straightAceSpadesLow = {
				pocketCards: [
					["a", "s"],
					["8", "h"],
				],
				communityCards: [
					["4", "h"],
					["2", "s"],
					["3", "h"],
					["5", "s"],
					["8", "h"],
				],
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
				pocketCards: [
					["8", "c"],
					["6", "d"],
				],
				communityCards: [
					["4", "h"],
					["2", "s"],
					["3", "h"],
					["5", "s"],
					["7", "h"],
				],
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
				pocketCards: [
					["j", "d"],
					["5", "d"],
				],
				communityCards: [
					["3", "d"],
					["4", "d"],
					["2", "d"],
					["j", "h"],
					["3", "s"],
				],
			} as const;

			const flushNineHighHearts = {
				pocketCards: [
					["9", "h"],
					["5", "h"],
				],
				communityCards: [
					["4", "h"],
					["3", "h"],
					["2", "h"],
					["3", "c"],
					["9", "d"],
				],
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
				pocketCards: [
					["j", "s"],
					["5", "s"],
				],
				communityCards: [
					["4", "s"],
					["3", "s"],
					["2", "s"],
					["3", "d"],
					["j", "h"],
				],
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
				pocketCards: [
					["9", "d"],
					["8", "d"],
				],
				communityCards: [
					["4", "d"],
					["3", "d"],
					["2", "d"],
					["9", "h"],
					["3", "s"],
				],
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
				pocketCards: [
					["3", "c"],
					["3", "d"],
				],
				communityCards: [
					["5", "d"],
					["5", "c"],
					["5", "s"],
					["8", "h"],
					["7", "d"],
				],
			} as const;

			const fullHouseSixesOverThrees = {
				pocketCards: [
					["3", "h"],
					["3", "s"],
				],
				communityCards: [
					["6", "d"],
					["6", "c"],
					["6", "h"],
					["8", "d"],
					["7", "h"],
				],
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
				pocketCards: [
					["3", "c"],
					["3", "d"],
				],
				communityCards: [
					["k", "d"],
					["3", "s"],
					["3", "h"],
					["8", "h"],
					["7", "d"],
				],
			} as const;

			const fourOfAKindFives = {
				pocketCards: [
					["5", "h"],
					["5", "c"],
				],
				communityCards: [
					["k", "d"],
					["5", "d"],
					["5", "s"],
					["8", "d"],
					["7", "h"],
				],
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
			} as const;

			const straightFlushAceLow = {
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
			} as const;

			const straightFlushSixHighSpades = {
				pocketCards: [
					["2", "s"],
					["6", "s"],
				],
				communityCards: [
					["4", "s"],
					["3", "s"],
					["8", "h"],
					["5", "s"],
					["6", "h"],
				],
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
				pocketCards: [
					["k", "d"],
					["q", "d"],
				],
				communityCards: [
					["a", "d"],
					["t", "d"],
					["8", "s"],
					["j", "d"],
					["j", "s"],
				],
			} as const;

			const royalFlushSpades = {
				pocketCards: [
					["k", "s"],
					["q", "s"],
				],
				communityCards: [
					["a", "s"],
					["t", "s"],
					["8", "s"],
					["j", "s"],
					["j", "s"],
				],
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
