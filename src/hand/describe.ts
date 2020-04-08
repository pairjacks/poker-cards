import { HandRank } from './constants';
import { Face } from '../card/constants';
import { getSortedCards } from './util';
import { allEqualBy } from '../util/array';
import { getFaceValue, getSuitValue } from '../card/value';
import { Card, Cards } from '../card/types'; // import type
import { Hand } from './types'; // import type

type HandDescriber = (hand: Hand) => string;

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

const sentence = (parts: unknown[]) =>
  parts.filter((part) => part && typeof part === 'string').join(', ');

const handDescribers: { [key in HandRank]: HandDescriber } = {
  // This is the only rank at which rankCards could be zero, for the rest
  // to have been derived, there would need to be at least 2 rank cards
  [HandRank.HighCard]: ({ rankCards, kickerCards }) =>
    rankCards.length
      ? sentence([`${facePlural(rankCards[0])} high`, kickerList(kickerCards)])
      : '',

  [HandRank.Pair]: ({ rankCards, kickerCards }) =>
    sentence([`Pair ${facePlural(rankCards[0], 2)}`, kickerList(kickerCards)]),

  [HandRank.TwoPair]: ({ rankCards, kickerCards }) =>
    sentence([
      'Two pair',
      `${facePlural(rankCards[0], 2)} over ${facePlural(rankCards[2], 2)}`,
      kickerList(kickerCards),
    ]),

  [HandRank.ThreeOfAKind]: ({ rankCards, kickerCards }) =>
    sentence([
      `Three of a kind ${facePlural(rankCards[0], 2)}`,
      kickerList(kickerCards),
    ]),

  [HandRank.Straight]: ({ rankCards }) =>
    sentence([
      'Straight',
      `${facePlural(rankCards[rankCards.length - 1])} to ${facePlural(
        rankCards[0],
      )}`,
    ]),

  [HandRank.Flush]: ({ rankCards }) =>
    sentence([
      'Flush',
      `${rankCards
        .slice(0, 2)
        .map((card) => facePlural(card))
        .join('-')} high`,
    ]),

  [HandRank.FullHouse]: ({ rankCards }) =>
    sentence(['Full house', `${facePlural(rankCards[0], 2)} full`]),

  [HandRank.FourOfAKind]: ({ rankCards, kickerCards }) =>
    sentence([
      `Four of a kind ${facePlural(rankCards[0], 2)}`,
      kickerList(kickerCards),
    ]),

  [HandRank.StraightFlush]: ({ rankCards }) =>
    sentence([
      'Straight flush',
      `${facePlural(rankCards[rankCards.length - 1])} to ${facePlural(
        rankCards[0],
      )}`,
    ]),

  [HandRank.RoyalFlush]: () => 'Royal flush',
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
 * Describes a hand in words, e.g. "Two pair, Aces over Kings, Jack kicker"
 * @param pocketCards - Player's pocket cards
 */
export const describeHand = (hand: Hand): string =>
  handDescribers[hand.rank](hand);
