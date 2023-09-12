import assert from "node:assert";
import { describe, it } from "node:test";

import { Suit, Face } from "../card/constants.js";
import { findHighestHands } from "./compare.js";
import { HandRank } from "./constants.js";

import type { HandCandidate } from "./types.js";

void describe("hand/compare", () => {
	void describe("findHighestHands", () => {
		void it("should find natural highest hands", () => {
			const twoPair = {
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
			} as const;

			const fullHouse = {
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
			} as const;

			const fourOfAKind = {
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
			} as const;

			const royalFlush = {
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
			} as const;

			assertFindHighestResult(
				[fourOfAKind, fullHouse, royalFlush, twoPair, royalFlush],
				[
					{
						candidate: royalFlush,
						candidateIndex: 2,
						rank: HandRank.RoyalFlush,
					},
					{
						candidate: royalFlush,
						candidateIndex: 4,
						rank: HandRank.RoyalFlush,
					},
				],
			);
		});

		void it("should find highest ties when all ranks are same", () => {
			const straightEightSpadesHigh = {
				pocketCards: [
					[Face.Eight, Suit.Spades],
					[Face.Seven, Suit.Diamonds],
				],
				communityCards: [
					[Face.Six, Suit.Hearts],
					[Face.Five, Suit.Clubs],
					[Face.Four, Suit.Diamonds],
					[Face.Three, Suit.Diamonds],
					[Face.Two, Suit.Clubs],
				],
			} as const;

			const straightEightClubsHigh = {
				pocketCards: [
					[Face.Eight, Suit.Clubs],
					[Face.Seven, Suit.Hearts],
				],
				communityCards: [
					[Face.Six, Suit.Diamonds],
					[Face.Five, Suit.Spades],
					[Face.Four, Suit.Hearts],
					[Face.Three, Suit.Hearts],
					[Face.Two, Suit.Spades],
				],
			} as const;

			const straightAceSpadesLow = {
				pocketCards: [
					[Face.Five, Suit.Spades],
					[Face.Four, Suit.Hearts],
				],
				communityCards: [
					[Face.Three, Suit.Hearts],
					[Face.Two, Suit.Spades],
					[Face.Ace, Suit.Spades],
					[Face.Eight, Suit.Hearts],
					[Face.Eight, Suit.Hearts],
				],
			} as const;

			assertFindHighestResult(
				[straightEightSpadesHigh, straightAceSpadesLow, straightEightClubsHigh],
				[
					{
						candidate: straightEightSpadesHigh,
						candidateIndex: 0,
						rank: HandRank.Straight,
					},
					{
						candidate: straightEightClubsHigh,
						candidateIndex: 2,
						rank: HandRank.Straight,
					},
				],
			);
		});

		void it("should resolve to high card", () => {
			const highCardHighKicker = {
				pocketCards: [
					[Face.Jack, Suit.Clubs],
					[Face.Eight, Suit.Spades],
				],
				communityCards: [
					[Face.Seven, Suit.Diamonds],
					[Face.Two, Suit.Diamonds],
					[Face.Three, Suit.Clubs],
					[Face.Four, Suit.Clubs],
					[Face.Queen, Suit.Diamonds],
				],
			} as const;

			const highCardLowKicker = {
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
			} as const;

			assertFindHighestResult(
				[highCardHighKicker, highCardLowKicker],
				[
					{
						candidate: highCardHighKicker,
						candidateIndex: 0,
						rank: HandRank.HighCard,
					},
				],
			);

			const highCardEqualA = {
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
			} as const;

			const highCardEqualB = {
				pocketCards: [
					[Face.Jack, Suit.Spades],
					[Face.Eight, Suit.Diamonds],
				],
				communityCards: [
					[Face.Six, Suit.Clubs],
					[Face.Two, Suit.Hearts],
					[Face.Three, Suit.Spades],
					[Face.Four, Suit.Hearts],
					[Face.Queen, Suit.Spades],
				],
			} as const;

			assertFindHighestResult(
				[highCardEqualA, highCardEqualB],
				[
					{
						candidate: highCardEqualA,
						candidateIndex: 0,
						rank: HandRank.HighCard,
					},
					{
						candidate: highCardEqualB,
						candidateIndex: 1,
						rank: HandRank.HighCard,
					},
				],
			);
		});

		void it("should resolve pair", () => {
			const pairThrees = {
				pocketCards: [
					[Face.Three, Suit.Clubs],
					[Face.Three, Suit.Diamonds],
				],
				communityCards: [
					[Face.King, Suit.Diamonds],
					[Face.Five, Suit.Clubs],
					[Face.Ace, Suit.Spades],
					[Face.Eight, Suit.Hearts],
					[Face.Seven, Suit.Diamonds],
				],
			} as const;

			const pairFives = {
				pocketCards: [
					[Face.Three, Suit.Hearts],
					[Face.Five, Suit.Clubs],
				],
				communityCards: [
					[Face.King, Suit.Diamonds],
					[Face.Five, Suit.Diamonds],
					[Face.Ace, Suit.Hearts],
					[Face.Eight, Suit.Diamonds],
					[Face.Seven, Suit.Hearts],
				],
			} as const;

			assertFindHighestResult(
				[pairThrees, pairFives],
				[
					{
						candidate: pairFives,
						candidateIndex: 1,
						rank: HandRank.Pair,
					},
				],
			);

			const pairThreesHighKicker = {
				pocketCards: [
					[Face.Three, Suit.Clubs],
					[Face.Three, Suit.Diamonds],
				],
				communityCards: [
					[Face.King, Suit.Diamonds],
					[Face.Five, Suit.Clubs],
					[Face.Ace, Suit.Spades],
					[Face.Eight, Suit.Hearts],
					[Face.Seven, Suit.Diamonds],
				],
			} as const;

			const pairThreesLowKicker = {
				pocketCards: [
					[Face.Three, Suit.Hearts],
					[Face.Three, Suit.Spades],
				],
				communityCards: [
					[Face.Four, Suit.Hearts],
					[Face.Five, Suit.Spades],
					[Face.Ace, Suit.Clubs],
					[Face.Eight, Suit.Diamonds],
					[Face.Seven, Suit.Hearts],
				],
			} as const;

			assertFindHighestResult(
				[pairThreesLowKicker, pairThreesHighKicker],
				[
					{
						candidate: pairThreesHighKicker,
						candidateIndex: 1,
						rank: HandRank.Pair,
					},
				],
			);

			const pairEqualA = {
				pocketCards: [
					[Face.Three, Suit.Clubs],
					[Face.Three, Suit.Diamonds],
				],
				communityCards: [
					[Face.King, Suit.Diamonds],
					[Face.Five, Suit.Clubs],
					[Face.Ace, Suit.Spades],
					[Face.Eight, Suit.Hearts],
					[Face.Seven, Suit.Diamonds],
				],
			} as const;

			const pairEqualB = {
				pocketCards: [
					[Face.Three, Suit.Hearts],
					[Face.Three, Suit.Spades],
				],
				communityCards: [
					[Face.King, Suit.Hearts],
					[Face.Five, Suit.Spades],
					[Face.Ace, Suit.Clubs],
					[Face.Eight, Suit.Diamonds],
					[Face.Seven, Suit.Hearts],
				],
			} as const;

			assertFindHighestResult(
				[pairEqualA, pairEqualB],
				[
					{
						candidate: pairEqualA,
						candidateIndex: 0,
						rank: HandRank.Pair,
					},
					{
						candidate: pairEqualB,
						candidateIndex: 1,
						rank: HandRank.Pair,
					},
				],
			);
		});

		void it("should resolve two pair", () => {
			const twoPairFivesOverThrees = {
				pocketCards: [
					[Face.Three, Suit.Clubs],
					[Face.Three, Suit.Diamonds],
				],
				communityCards: [
					[Face.Five, Suit.Diamonds],
					[Face.Five, Suit.Clubs],
					[Face.Ace, Suit.Spades],
					[Face.Eight, Suit.Hearts],
					[Face.Seven, Suit.Diamonds],
				],
			} as const;

			const twoPairSixesOverThrees = {
				pocketCards: [
					[Face.Three, Suit.Hearts],
					[Face.Three, Suit.Spades],
				],
				communityCards: [
					[Face.Six, Suit.Diamonds],
					[Face.Six, Suit.Clubs],
					[Face.Ace, Suit.Clubs],
					[Face.Eight, Suit.Diamonds],
					[Face.Seven, Suit.Hearts],
				],
			} as const;

			assertFindHighestResult(
				[twoPairFivesOverThrees, twoPairSixesOverThrees],
				[
					{
						candidate: twoPairSixesOverThrees,
						candidateIndex: 1,
						rank: HandRank.TwoPair,
					},
				],
			);

			const twoPairFivesOverFours = {
				pocketCards: [
					[Face.Four, Suit.Hearts],
					[Face.Four, Suit.Spades],
				],
				communityCards: [
					[Face.Five, Suit.Hearts],
					[Face.Five, Suit.Spades],
					[Face.Ace, Suit.Clubs],
					[Face.Eight, Suit.Diamonds],
					[Face.Seven, Suit.Hearts],
				],
			} as const;

			assertFindHighestResult(
				[twoPairFivesOverThrees, twoPairFivesOverFours],
				[
					{
						candidate: twoPairFivesOverFours,
						candidateIndex: 1,
						rank: HandRank.TwoPair,
					},
				],
			);

			const twoPairFoursOverThreesHighKicker = {
				pocketCards: [
					[Face.Three, Suit.Clubs],
					[Face.Three, Suit.Diamonds],
				],
				communityCards: [
					[Face.Four, Suit.Diamonds],
					[Face.Four, Suit.Clubs],
					[Face.Ace, Suit.Spades],
					[Face.Eight, Suit.Hearts],
					[Face.Seven, Suit.Diamonds],
				],
			} as const;

			const twoPairFoursOverThreesLowKicker = {
				pocketCards: [
					[Face.Three, Suit.Hearts],
					[Face.Three, Suit.Spades],
				],
				communityCards: [
					[Face.Four, Suit.Hearts],
					[Face.Four, Suit.Spades],
					[Face.King, Suit.Clubs],
					[Face.Eight, Suit.Diamonds],
					[Face.Seven, Suit.Hearts],
				],
			} as const;

			assertFindHighestResult(
				[twoPairFoursOverThreesLowKicker, twoPairFoursOverThreesHighKicker],
				[
					{
						candidate: twoPairFoursOverThreesHighKicker,
						candidateIndex: 1,
						rank: HandRank.TwoPair,
					},
				],
			);

			const twoPairEqualA = {
				pocketCards: [
					[Face.Three, Suit.Clubs],
					[Face.Three, Suit.Diamonds],
				],
				communityCards: [
					[Face.Four, Suit.Diamonds],
					[Face.Four, Suit.Clubs],
					[Face.Ace, Suit.Spades],
					[Face.Eight, Suit.Hearts],
					[Face.Seven, Suit.Diamonds],
				],
			} as const;

			const twoPairEqualB = {
				pocketCards: [
					[Face.Three, Suit.Hearts],
					[Face.Three, Suit.Spades],
				],
				communityCards: [
					[Face.Four, Suit.Hearts],
					[Face.Four, Suit.Spades],
					[Face.Ace, Suit.Clubs],
					[Face.Eight, Suit.Diamonds],
					[Face.Seven, Suit.Hearts],
				],
			} as const;

			assertFindHighestResult(
				[twoPairEqualA, twoPairEqualB],
				[
					{
						candidate: twoPairEqualA,
						candidateIndex: 0,
						rank: HandRank.TwoPair,
					},
					{
						candidate: twoPairEqualB,
						candidateIndex: 1,
						rank: HandRank.TwoPair,
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
					[Face.Three, Suit.Clubs],
					[Face.Three, Suit.Diamonds],
				],
				communityCards: [
					[Face.King, Suit.Diamonds],
					[Face.Three, Suit.Spades],
					[Face.Ace, Suit.Spades],
					[Face.Eight, Suit.Hearts],
					[Face.Seven, Suit.Diamonds],
				],
			} as const;

			const threeOfAKindFives = {
				pocketCards: [
					[Face.Five, Suit.Hearts],
					[Face.Five, Suit.Clubs],
				],
				communityCards: [
					[Face.King, Suit.Diamonds],
					[Face.Five, Suit.Diamonds],
					[Face.Ace, Suit.Hearts],
					[Face.Eight, Suit.Diamonds],
					[Face.Seven, Suit.Hearts],
				],
			} as const;

			assertFindHighestResult(
				[threeOfAKindThrees, threeOfAKindFives],
				[
					{
						candidate: threeOfAKindFives,
						candidateIndex: 1,
						rank: HandRank.ThreeOfAKind,
					},
				],
			);
		});

		void it("should resolve straight", () => {
			const straightEightSpadesHigh = {
				pocketCards: [
					[Face.Eight, Suit.Spades],
					[Face.Six, Suit.Hearts],
				],
				communityCards: [
					[Face.Four, Suit.Diamonds],
					[Face.Two, Suit.Clubs],
					[Face.Three, Suit.Diamonds],
					[Face.Five, Suit.Clubs],
					[Face.Seven, Suit.Diamonds],
				],
			} as const;

			const straightAceSpadesLow = {
				pocketCards: [
					[Face.Ace, Suit.Spades],
					[Face.Eight, Suit.Hearts],
				],
				communityCards: [
					[Face.Four, Suit.Hearts],
					[Face.Two, Suit.Spades],
					[Face.Three, Suit.Hearts],
					[Face.Five, Suit.Spades],
					[Face.Eight, Suit.Hearts],
				],
			} as const;

			assertFindHighestResult(
				[straightEightSpadesHigh, straightAceSpadesLow],
				[
					{
						candidate: straightEightSpadesHigh,
						candidateIndex: 0,
						rank: HandRank.Straight,
					},
				],
			);

			const straightEightClubsHigh = {
				pocketCards: [
					[Face.Eight, Suit.Clubs],
					[Face.Six, Suit.Diamonds],
				],
				communityCards: [
					[Face.Four, Suit.Hearts],
					[Face.Two, Suit.Spades],
					[Face.Three, Suit.Hearts],
					[Face.Five, Suit.Spades],
					[Face.Seven, Suit.Hearts],
				],
			} as const;

			assertFindHighestResult(
				[straightEightClubsHigh, straightEightSpadesHigh],
				[
					{
						candidate: straightEightClubsHigh,
						candidateIndex: 0,
						rank: HandRank.Straight,
					},
					{
						candidate: straightEightSpadesHigh,
						candidateIndex: 1,
						rank: HandRank.Straight,
					},
				],
			);
		});

		void it("should resolve flush", () => {
			const flushJackHighDiamonds = {
				pocketCards: [
					[Face.Jack, Suit.Diamonds],
					[Face.Five, Suit.Diamonds],
				],
				communityCards: [
					[Face.Three, Suit.Diamonds],
					[Face.Four, Suit.Diamonds],
					[Face.Two, Suit.Diamonds],
					[Face.Jack, Suit.Hearts],
					[Face.Three, Suit.Spades],
				],
			} as const;

			const flushNineHighHearts = {
				pocketCards: [
					[Face.Nine, Suit.Hearts],
					[Face.Five, Suit.Hearts],
				],
				communityCards: [
					[Face.Four, Suit.Hearts],
					[Face.Three, Suit.Hearts],
					[Face.Two, Suit.Hearts],
					[Face.Three, Suit.Clubs],
					[Face.Nine, Suit.Diamonds],
				],
			} as const;

			assertFindHighestResult(
				[flushJackHighDiamonds, flushNineHighHearts],
				[
					{
						candidate: flushJackHighDiamonds,
						candidateIndex: 0,
						rank: HandRank.Flush,
					},
				],
			);

			const flushJackHighSpades = {
				pocketCards: [
					[Face.Jack, Suit.Spades],
					[Face.Five, Suit.Spades],
				],
				communityCards: [
					[Face.Four, Suit.Spades],
					[Face.Three, Suit.Spades],
					[Face.Two, Suit.Spades],
					[Face.Three, Suit.Diamonds],
					[Face.Jack, Suit.Hearts],
				],
			} as const;

			assertFindHighestResult(
				[flushJackHighDiamonds, flushJackHighSpades],
				[
					{
						candidate: flushJackHighDiamonds,
						candidateIndex: 0,
						rank: HandRank.Flush,
					},
					{
						candidate: flushJackHighSpades,
						candidateIndex: 1,
						rank: HandRank.Flush,
					},
				],
			);

			const flushNineHighDiamondsHigherInternal = {
				pocketCards: [
					[Face.Nine, Suit.Diamonds],
					[Face.Eight, Suit.Diamonds],
				],
				communityCards: [
					[Face.Four, Suit.Diamonds],
					[Face.Three, Suit.Diamonds],
					[Face.Two, Suit.Diamonds],
					[Face.Nine, Suit.Hearts],
					[Face.Three, Suit.Spades],
				],
			} as const;

			assertFindHighestResult(
				[flushNineHighHearts, flushNineHighDiamondsHigherInternal],
				[
					{
						candidate: flushNineHighDiamondsHigherInternal,
						candidateIndex: 1,
						rank: HandRank.Flush,
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
					[Face.Three, Suit.Clubs],
					[Face.Three, Suit.Diamonds],
				],
				communityCards: [
					[Face.Five, Suit.Diamonds],
					[Face.Five, Suit.Clubs],
					[Face.Five, Suit.Spades],
					[Face.Eight, Suit.Hearts],
					[Face.Seven, Suit.Diamonds],
				],
			} as const;

			const fullHouseSixesOverThrees = {
				pocketCards: [
					[Face.Three, Suit.Hearts],
					[Face.Three, Suit.Spades],
				],
				communityCards: [
					[Face.Six, Suit.Diamonds],
					[Face.Six, Suit.Clubs],
					[Face.Six, Suit.Hearts],
					[Face.Eight, Suit.Diamonds],
					[Face.Seven, Suit.Hearts],
				],
			} as const;

			assertFindHighestResult(
				[fullHouseFivesOverThrees, fullHouseSixesOverThrees],
				[
					{
						candidate: fullHouseSixesOverThrees,
						candidateIndex: 1,
						rank: HandRank.FullHouse,
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
					[Face.Three, Suit.Clubs],
					[Face.Three, Suit.Diamonds],
				],
				communityCards: [
					[Face.King, Suit.Diamonds],
					[Face.Three, Suit.Spades],
					[Face.Three, Suit.Hearts],
					[Face.Eight, Suit.Hearts],
					[Face.Seven, Suit.Diamonds],
				],
			} as const;

			const fourOfAKindFives = {
				pocketCards: [
					[Face.Five, Suit.Hearts],
					[Face.Five, Suit.Clubs],
				],
				communityCards: [
					[Face.King, Suit.Diamonds],
					[Face.Five, Suit.Diamonds],
					[Face.Five, Suit.Spades],
					[Face.Eight, Suit.Diamonds],
					[Face.Seven, Suit.Hearts],
				],
			} as const;

			assertFindHighestResult(
				[fourOfAKindThrees, fourOfAKindFives],
				[
					{
						candidate: fourOfAKindFives,
						candidateIndex: 1,
						rank: HandRank.FourOfAKind,
					},
				],
			);
		});

		void it("should resolve straight flush", () => {
			const straightFlushEightHigh = {
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
			} as const;

			const straightFlushAceLow = {
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
			} as const;

			assertFindHighestResult(
				[straightFlushEightHigh, straightFlushAceLow],
				[
					{
						candidate: straightFlushEightHigh,
						candidateIndex: 0,
						rank: HandRank.StraightFlush,
					},
				],
			);

			const straightFlushSixHighClubs = {
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
			} as const;

			const straightFlushSixHighSpades = {
				pocketCards: [
					[Face.Two, Suit.Spades],
					[Face.Six, Suit.Spades],
				],
				communityCards: [
					[Face.Four, Suit.Spades],
					[Face.Three, Suit.Spades],
					[Face.Eight, Suit.Hearts],
					[Face.Five, Suit.Spades],
					[Face.Six, Suit.Hearts],
				],
			} as const;

			assertFindHighestResult(
				[straightFlushSixHighClubs, straightFlushSixHighSpades],
				[
					{
						candidate: straightFlushSixHighClubs,
						candidateIndex: 0,
						rank: HandRank.StraightFlush,
					},
					{
						candidate: straightFlushSixHighSpades,
						candidateIndex: 1,
						rank: HandRank.StraightFlush,
					},
				],
			);
		});

		void it("should resolve royal flush", () => {
			const royalFlushDiamonds = {
				pocketCards: [
					[Face.King, Suit.Diamonds],
					[Face.Queen, Suit.Diamonds],
				],
				communityCards: [
					[Face.Ace, Suit.Diamonds],
					[Face.Ten, Suit.Diamonds],
					[Face.Eight, Suit.Spades],
					[Face.Jack, Suit.Diamonds],
					[Face.Jack, Suit.Spades],
				],
			} as const;

			const royalFlushSpades = {
				pocketCards: [
					[Face.King, Suit.Spades],
					[Face.Queen, Suit.Spades],
				],
				communityCards: [
					[Face.Ace, Suit.Spades],
					[Face.Ten, Suit.Spades],
					[Face.Eight, Suit.Spades],
					[Face.Jack, Suit.Spades],
					[Face.Jack, Suit.Spades],
				],
			} as const;

			assertFindHighestResult(
				[royalFlushDiamonds, royalFlushSpades],
				[
					{
						candidate: royalFlushDiamonds,
						candidateIndex: 0,
						rank: HandRank.RoyalFlush,
					},
					{
						candidate: royalFlushSpades,
						candidateIndex: 1,
						rank: HandRank.RoyalFlush,
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
