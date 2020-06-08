import { HandRank } from './constants';
import { Face } from '../card/constants';
import { getSortedCards } from './util';
import { allEqualBy } from '../util/array';
import { getFaceValue, getSuitValue } from '../card/value';
import { Card, Cards } from '../card/types'; // import type
import { Hand, HandDescription } from './types'; // import type

type HandDescriber = (hand: Hand) => HandDescription;

/** Plural forms for card face values, [One, Many] */
type PluralForms = [string, string];

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

const facePlural = (card: Card, count = 1) =>
  faceTextPluralForms[card[0]][count > 1 ? 1 : 0];

const cardList = (cards: Cards) =>
  cards.map((card) => facePlural(card)).join('-');

const kickerList = (kickers: Cards) =>
  kickers.length
    ? `${cardList(kickers)} ${kickers.length > 1 ? 'kickers' : 'kicker'}`
    : '';

const handDescribers: { [key in HandRank]: HandDescriber } = {
  // This is the only rank at which rankCards could be zero - for the rest
  // to have been derived, there would need to be at least 2 rank cards
  [HandRank.HighCard]: ({ rankCards, kickerCards }) =>
    rankCards.length
      ? {
          rank: `${facePlural(rankCards[0])} high`,
          kickers: kickerList(kickerCards),
        }
      : { rank: '', kickers: '' },

  [HandRank.Pair]: ({ rankCards, kickerCards }) => ({
    rank: `Pair ${facePlural(rankCards[0], 2)}`,
    kickers: kickerList(kickerCards),
  }),

  [HandRank.TwoPair]: ({ rankCards, kickerCards }) => ({
    rank: `Two pair, ${facePlural(rankCards[0], 2)} over ${facePlural(
      rankCards[2],
      2,
    )}`,
    kickers: kickerList(kickerCards),
  }),

  [HandRank.ThreeOfAKind]: ({ rankCards, kickerCards }) => ({
    rank: `Three of a kind ${facePlural(rankCards[0], 2)}`,
    kickers: kickerList(kickerCards),
  }),

  [HandRank.Straight]: ({ rankCards }) => ({
    rank: `Straight, ${facePlural(
      rankCards[rankCards.length - 1],
    )} to ${facePlural(rankCards[0])}`,
    kickers: '',
  }),

  [HandRank.Flush]: ({ rankCards }) => ({
    rank: `Flush, ${rankCards
      .slice(0, 2)
      .map((card) => facePlural(card))
      .join('-')} high`,
    kickers: '',
  }),

  [HandRank.FullHouse]: ({ rankCards }) => ({
    rank: `Full house, ${facePlural(rankCards[0], 2)} full of ${facePlural(
      rankCards[rankCards.length - 1],
      2,
    )}`,
    kickers: '',
  }),

  [HandRank.FourOfAKind]: ({ rankCards, kickerCards }) => ({
    rank: `Four of a kind ${facePlural(rankCards[0], 2)}`,
    kickers: kickerList(kickerCards),
  }),

  [HandRank.StraightFlush]: ({ rankCards }) => ({
    rank: `Straight flush, ${facePlural(
      rankCards[rankCards.length - 1],
    )} to ${facePlural(rankCards[0])}`,
    kickers: '',
  }),

  [HandRank.RoyalFlush]: () => ({ rank: 'Royal flush', kickers: '' }),
};

/**
 * Describes pocket cards in words, e.g. "Pocket Aces"
 * @param pocketCards - Player's pocket cards
 */
export const describePocketCards = (pocketCards: Cards): string => {
  if (!pocketCards.length) return '';

  if (pocketCards.length === 1) return facePlural(pocketCards[0]);

  if (allEqualBy(getFaceValue, pocketCards)) {
    return `Pocket ${facePlural(pocketCards[0], 2)}`;
  }

  const sorted = getSortedCards(pocketCards);
  const suitStatus = allEqualBy(getSuitValue, pocketCards)
    ? 'Suited'
    : 'Offsuit';

  return `${cardList(sorted)} ${suitStatus}`;
};

/**
 * Describes a hand in words,
 * e.g. rank: 'Two pair, Aces over Kings', kickers: 'Jack kicker'
 * @param pocketCards - Player's pocket cards
 */
export const describeHand = (hand: Hand): HandDescription =>
  handDescribers[hand.rank](hand);
