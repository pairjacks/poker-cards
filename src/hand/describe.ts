import { HandRank } from './constants';
import { Face } from '../card/constants';
import { getSortedCards } from './util';
import { allEqualBy } from '../util/array';
import { getFaceValue, getSuitValue } from '../card/value';

import type { Card, Cards } from '../card/types';
import type { Hand, HandDescription } from './types';

/**
 * Describes pocket cards in words, e.g. "Pocket Aces"
 * @param pocketCards - Player's pocket cards
 */
export function describePocketCards(pocketCards: Cards) {
  const [first, ...rest] = pocketCards;

  if (!first) return '';

  if (!rest.length) return facePlural(first);

  if (allEqualBy(getFaceValue, pocketCards)) {
    return `Pocket ${facePlural(first, 2)}`;
  }

  const sorted = getSortedCards(pocketCards);
  const suitStatus = allEqualBy(getSuitValue, pocketCards)
    ? 'Suited'
    : 'Offsuit';

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
  [Face.Two]: ['Two', 'Twos'],
  [Face.Three]: ['Three', 'Threes'],
  [Face.Four]: ['Four', 'Fours'],
  [Face.Five]: ['Five', 'Fives'],
  [Face.Six]: ['Six', 'Sixes'],
  [Face.Seven]: ['Seven', 'Sevens'],
  [Face.Eight]: ['Eight', 'Eights'],
  [Face.Nine]: ['Nine', 'Nines'],
  [Face.Ten]: ['Ten', 'Tens'],
  [Face.Jack]: ['Jack', 'Jacks'],
  [Face.Queen]: ['Queen', 'Queens'],
  [Face.King]: ['King', 'Kings'],
  [Face.Ace]: ['Ace', 'Aces'],
};

function facePlural(card: Card, count = 1) {
  return faceTextPluralForms[card[0]][count > 1 ? 1 : 0];
}

function cardList(cards: Cards) {
  return cards.map((card) => facePlural(card)).join('-');
}

function kickerList(kickers: Cards) {
  return kickers.length
    ? `${cardList(kickers)} ${kickers.length > 1 ? 'kickers' : 'kicker'}`
    : '';
}

function assertCard(card?: Card): asserts card is Card {
  if (!card) throw new Error('Card expected');
}

const handDescribers: { [key in HandRank]: HandDescriber } = {
  // This is the only rank at which rankCards could be zero - for the rest
  // to have been derived, there would need to be at least 2 rank cards
  [HandRank.HighCard]: ({ rankCards: [rankCard], kickerCards }) =>
    rankCard
      ? {
          rank: `${facePlural(rankCard)} high`,
          kickers: kickerList(kickerCards),
        }
      : { rank: '', kickers: '' },

  [HandRank.Pair]: ({ rankCards: [rankCard], kickerCards }) => {
    assertCard(rankCard);

    return {
      rank: `Pair ${facePlural(rankCard, 2)}`,
      kickers: kickerList(kickerCards),
    };
  },

  [HandRank.TwoPair]: ({ rankCards: [rankCard, , over], kickerCards }) => {
    assertCard(rankCard);
    assertCard(over);

    return {
      rank: `Two pair, ${facePlural(rankCard, 2)} over ${facePlural(over, 2)}`,
      kickers: kickerList(kickerCards),
    };
  },

  [HandRank.ThreeOfAKind]: ({ rankCards: [rankCard], kickerCards }) => {
    assertCard(rankCard);

    return {
      rank: `Three of a kind ${facePlural(rankCard, 2)}`,
      kickers: kickerList(kickerCards),
    };
  },

  [HandRank.Straight]: ({ rankCards }) => {
    const first = rankCards[0];
    const last = rankCards[rankCards.length - 1];

    assertCard(first);
    assertCard(last);

    return {
      rank: `Straight, ${facePlural(last)} to ${facePlural(first)}`,
      kickers: '',
    };
  },

  [HandRank.Flush]: ({ rankCards }) => ({
    rank: `Flush, ${rankCards
      .slice(0, 2)
      .map((card) => facePlural(card))
      .join('-')} high`,
    kickers: '',
  }),

  [HandRank.FullHouse]: ({ rankCards }) => {
    const first = rankCards[0];
    const last = rankCards[rankCards.length - 1];

    assertCard(first);
    assertCard(last);

    return {
      rank: `Full house, ${facePlural(first, 2)} full of ${facePlural(
        last,
        2,
      )}`,
      kickers: '',
    };
  },

  [HandRank.FourOfAKind]: ({ rankCards: [rankCard], kickerCards }) => {
    assertCard(rankCard);

    return {
      rank: `Four of a kind ${facePlural(rankCard, 2)}`,
      kickers: kickerList(kickerCards),
    };
  },

  [HandRank.StraightFlush]: ({ rankCards }) => {
    const first = rankCards[0];
    const last = rankCards[rankCards.length - 1];

    assertCard(first);
    assertCard(last);

    return {
      rank: `Straight flush, ${facePlural(last)} to ${facePlural(first)}`,
      kickers: '',
    };
  },

  [HandRank.RoyalFlush]: () => ({ rank: 'Royal flush', kickers: '' }),
};

type HandDescriber = (hand: Hand) => HandDescription;

/** Plural forms for card face values, [One, Many] */
type PluralForms = [string, string];
