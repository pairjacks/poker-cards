import { getSortedCards } from "./util.js";
import { allEqualBy } from "../util/array.js";

import type { HandRank, Hand, HandDescription } from "./types.js";
import type { Card, Cards, Face } from "../card/types.js";

/**
 * Describes pocket cards in words, e.g. "Pocket Aces"
 * @param pocketCards - Player's pocket cards
 */
export function describePocketCards(pocketCards: Cards) {
	const first = pocketCards[0];

	if (!first) return "";

	if (pocketCards.length === 1) return facePlural(first);

	if (allEqualBy((card) => card[0], pocketCards)) {
		return `Pocket ${facePlural(first, 2)}`;
	}

	const sorted = getSortedCards(pocketCards);
	const suitStatus = allEqualBy((card) => card[1], pocketCards)
		? "Suited"
		: "Offsuit";

	return `${cardList(sorted)} ${suitStatus}`;
}

/**
 * Describes a hand in words,
 * e.g. rank: 'Two pair, Aces over Kings', kickers: 'Jack kicker'
 * @param hand - Player's hand
 */
export function describeHand(hand: Hand): HandDescription {
	return handDescribers[hand.rank](hand);
}

const faceTextPluralForms: { [key in Face]: PluralForms } = {
	2: ["Two", "Twos"],
	3: ["Three", "Threes"],
	4: ["Four", "Fours"],
	5: ["Five", "Fives"],
	6: ["Six", "Sixes"],
	7: ["Seven", "Sevens"],
	8: ["Eight", "Eights"],
	9: ["Nine", "Nines"],
	t: ["Ten", "Tens"],
	j: ["Jack", "Jacks"],
	q: ["Queen", "Queens"],
	k: ["King", "Kings"],
	a: ["Ace", "Aces"],
};

function facePlural(card: Card, count = 1) {
	return faceTextPluralForms[card[0]][count > 1 ? 1 : 0];
}

function cardList(cards: Cards) {
	return cards.map((card) => facePlural(card)).join("-");
}

function kickerList(kickers: Cards) {
	return kickers.length
		? `${cardList(kickers)} ${kickers.length > 1 ? "kickers" : "kicker"}`
		: "";
}

function assertCard(card?: Card): asserts card is Card {
	if (!card) throw new Error("Card expected");
}

const handDescribers: { [key in HandRank]: HandDescriber } = {
	// This is the only rank at which rankCards could be zero - for the rest
	// to have been derived, there would need to be at least 2 rank cards
	highCard: ({ rankCards: [rankCard], kickerCards }) =>
		rankCard
			? {
					rank: `${facePlural(rankCard)} high`,
					kickers: kickerList(kickerCards),
			  }
			: { rank: "", kickers: "" },

	pair: ({ rankCards: [rankCard], kickerCards }) => {
		assertCard(rankCard);

		return {
			rank: `Pair ${facePlural(rankCard, 2)}`,
			kickers: kickerList(kickerCards),
		};
	},

	twoPair: ({ rankCards: [rankCard, , over], kickerCards }) => {
		assertCard(rankCard);
		assertCard(over);

		return {
			rank: `Two pair, ${facePlural(rankCard, 2)} over ${facePlural(over, 2)}`,
			kickers: kickerList(kickerCards),
		};
	},

	threeOfAKind: ({ rankCards: [rankCard], kickerCards }) => {
		assertCard(rankCard);

		return {
			rank: `Three of a kind ${facePlural(rankCard, 2)}`,
			kickers: kickerList(kickerCards),
		};
	},

	straight: ({ rankCards }) => {
		const first = rankCards[0];
		const last = rankCards[rankCards.length - 1];

		assertCard(first);
		assertCard(last);

		return {
			rank: `Straight, ${facePlural(last)} to ${facePlural(first)}`,
			kickers: "",
		};
	},

	flush: ({ rankCards }) => ({
		rank: `Flush, ${rankCards
			.slice(0, 2)
			.map((card) => facePlural(card))
			.join("-")} high`,
		kickers: "",
	}),

	fullHouse: ({ rankCards }) => {
		const first = rankCards[0];
		const last = rankCards[rankCards.length - 1];

		assertCard(first);
		assertCard(last);

		return {
			rank: `Full house, ${facePlural(first, 2)} full of ${facePlural(
				last,
				2,
			)}`,
			kickers: "",
		};
	},

	fourOfAKind: ({ rankCards: [rankCard], kickerCards }) => {
		assertCard(rankCard);

		return {
			rank: `Four of a kind ${facePlural(rankCard, 2)}`,
			kickers: kickerList(kickerCards),
		};
	},

	straightFlush: ({ rankCards }) => {
		const first = rankCards[0];
		const last = rankCards[rankCards.length - 1];

		assertCard(first);
		assertCard(last);

		return {
			rank: `Straight flush, ${facePlural(last)} to ${facePlural(first)}`,
			kickers: "",
		};
	},

	royalFlush: () => ({ rank: "Royal flush", kickers: "" }),
};

type HandDescriber = (hand: Hand) => HandDescription;

/** Plural forms for card face values, [One, Many] */
type PluralForms = [string, string];
