import { Face, Suit } from '../card/constants';
import { HandRank } from './constants';
import {
  ranksHighCard,
  ranksFullHouse,
  ranksTwoPair,
  ranksPair,
  ranksThreeOfAKind,
  ranksTwoPairContainsThreePair,
  ranksStraightContainsPair,
  ranksFlushContainsTwoPair,
  ranksFullHouseContainsTwoPair,
  ranksFullHouseContainsTwoThreeOfAKind,
  ranksFourOfAKind,
  ranksStraightFlushContainsPair,
  ranksRoyalFlushContainsPair,
  ranksStraightAceLowContainsPair,
  ranksStraightFlushAceLow,
} from './__fixtures__/hands';
import { extractHand } from './extract';

describe('evaluate/extract', () => {
  describe('extractHand', () => {
    it('extracts high card', () => {
      expect(extractHand(ranksHighCard)).toEqual({
        rank: HandRank.HighCard,
        rankValue: 1,
        rankCards: [{ face: Face.Queen, suit: Suit.Diamonds }],
        kickers: [
          { face: Face.Jack, suit: Suit.Clubs },
          { face: Face.Eight, suit: Suit.Spades },
          { face: Face.Six, suit: Suit.Diamonds },
          { face: Face.Four, suit: Suit.Clubs },
        ],
      });
    });

    it('extracts pair', () => {
      expect(extractHand(ranksPair)).toEqual({
        rank: HandRank.Pair,
        rankValue: 2,
        rankCards: [
          { face: Face.Six, suit: Suit.Clubs },
          { face: Face.Six, suit: Suit.Diamonds },
        ],
        kickers: [
          { face: Face.Queen, suit: Suit.Diamonds },
          { face: Face.Jack, suit: Suit.Clubs },
          { face: Face.Eight, suit: Suit.Spades },
        ],
      });
    });

    it('extracts two pair', () => {
      expect(extractHand(ranksTwoPair)).toEqual({
        rank: HandRank.TwoPair,
        rankValue: 3,
        rankCards: [
          { face: Face.Jack, suit: Suit.Clubs },
          { face: Face.Jack, suit: Suit.Diamonds },
          { face: Face.Six, suit: Suit.Clubs },
          { face: Face.Six, suit: Suit.Diamonds },
        ],
        kickers: [{ face: Face.Eight, suit: Suit.Spades }],
      });

      expect(extractHand(ranksTwoPairContainsThreePair)).toEqual({
        rank: HandRank.TwoPair,
        rankValue: 3,
        rankCards: [
          { face: Face.Queen, suit: Suit.Spades },
          { face: Face.Queen, suit: Suit.Clubs },
          { face: Face.Jack, suit: Suit.Clubs },
          { face: Face.Jack, suit: Suit.Diamonds },
        ],
        kickers: [{ face: Face.Eight, suit: Suit.Spades }],
      });
    });

    it('extracts three of a kind', () => {
      expect(extractHand(ranksThreeOfAKind)).toEqual({
        rank: HandRank.ThreeOfAKind,
        rankValue: 4,
        rankCards: [
          { face: Face.Six, suit: Suit.Hearts },
          { face: Face.Six, suit: Suit.Clubs },
          { face: Face.Six, suit: Suit.Diamonds },
        ],
        kickers: [
          { face: Face.Queen, suit: Suit.Clubs },
          { face: Face.Jack, suit: Suit.Diamonds },
        ],
      });
    });

    it('extracts straight', () => {
      expect(extractHand(ranksStraightContainsPair)).toEqual({
        rank: HandRank.Straight,
        rankValue: 5,
        rankCards: [
          { face: Face.Six, suit: Suit.Hearts },
          { face: Face.Five, suit: Suit.Clubs },
          { face: Face.Four, suit: Suit.Diamonds },
          { face: Face.Three, suit: Suit.Diamonds },
          { face: Face.Two, suit: Suit.Clubs },
        ],
        kickers: [],
      });

      expect(extractHand(ranksStraightAceLowContainsPair)).toEqual({
        rank: HandRank.Straight,
        rankValue: 5,
        rankCards: [
          { face: Face.Five, suit: Suit.Clubs },
          { face: Face.Four, suit: Suit.Diamonds },
          { face: Face.Three, suit: Suit.Diamonds },
          { face: Face.Two, suit: Suit.Clubs },
          { face: Face.Ace, suit: Suit.Spades },
        ],
        kickers: [],
      });
    });

    it('extracts flush', () => {
      expect(extractHand(ranksFlushContainsTwoPair)).toEqual({
        rank: HandRank.Flush,
        rankValue: 6,
        rankCards: [
          { face: Face.Jack, suit: Suit.Diamonds },
          { face: Face.Five, suit: Suit.Diamonds },
          { face: Face.Four, suit: Suit.Diamonds },
          { face: Face.Three, suit: Suit.Diamonds },
          { face: Face.Two, suit: Suit.Diamonds },
        ],
        kickers: [],
      });
    });

    it('extracts full house', () => {
      expect(extractHand(ranksFullHouse)).toEqual({
        rank: HandRank.FullHouse,
        rankValue: 7,
        rankCards: [
          { face: Face.Three, suit: Suit.Spades },
          { face: Face.Three, suit: Suit.Clubs },
          { face: Face.Three, suit: Suit.Diamonds },
          { face: Face.Jack, suit: Suit.Hearts },
          { face: Face.Jack, suit: Suit.Diamonds },
        ],
        kickers: [],
      });

      expect(extractHand(ranksFullHouseContainsTwoPair)).toEqual({
        rank: HandRank.FullHouse,
        rankValue: 7,
        rankCards: [
          { face: Face.Jack, suit: Suit.Spades },
          { face: Face.Jack, suit: Suit.Hearts },
          { face: Face.Jack, suit: Suit.Diamonds },
          { face: Face.Four, suit: Suit.Hearts },
          { face: Face.Four, suit: Suit.Diamonds },
        ],
        kickers: [],
      });

      expect(extractHand(ranksFullHouseContainsTwoThreeOfAKind)).toEqual({
        rank: HandRank.FullHouse,
        rankValue: 7,
        rankCards: [
          { face: Face.Jack, suit: Suit.Spades },
          { face: Face.Jack, suit: Suit.Hearts },
          { face: Face.Jack, suit: Suit.Diamonds },
          { face: Face.Three, suit: Suit.Hearts },
          { face: Face.Three, suit: Suit.Clubs },
        ],
        kickers: [],
      });
    });

    it('extracts four of a kind', () => {
      expect(extractHand(ranksFourOfAKind)).toEqual({
        rank: HandRank.FourOfAKind,
        rankValue: 8,
        rankCards: [
          { face: Face.Six, suit: Suit.Spades },
          { face: Face.Six, suit: Suit.Hearts },
          { face: Face.Six, suit: Suit.Clubs },
          { face: Face.Six, suit: Suit.Diamonds },
        ],
        kickers: [{ face: Face.Jack, suit: Suit.Diamonds }],
      });
    });

    it('extracts straight flush', () => {
      expect(extractHand(ranksStraightFlushContainsPair)).toEqual({
        rank: HandRank.StraightFlush,
        rankValue: 9,
        rankCards: [
          { face: Face.Six, suit: Suit.Clubs },
          { face: Face.Five, suit: Suit.Clubs },
          { face: Face.Four, suit: Suit.Clubs },
          { face: Face.Three, suit: Suit.Clubs },
          { face: Face.Two, suit: Suit.Clubs },
        ],
        kickers: [],
      });

      expect(extractHand(ranksStraightFlushAceLow)).toEqual({
        rank: HandRank.StraightFlush,
        rankValue: 9,
        rankCards: [
          { face: Face.Five, suit: Suit.Spades },
          { face: Face.Four, suit: Suit.Spades },
          { face: Face.Three, suit: Suit.Spades },
          { face: Face.Two, suit: Suit.Spades },
          { face: Face.Ace, suit: Suit.Spades },
        ],
        kickers: [],
      });
    });

    it('extracts royal flush', () => {
      expect(extractHand(ranksRoyalFlushContainsPair)).toEqual({
        rank: HandRank.RoyalFlush,
        rankValue: 10,
        rankCards: [
          { face: Face.Ace, suit: Suit.Clubs },
          { face: Face.King, suit: Suit.Clubs },
          { face: Face.Queen, suit: Suit.Clubs },
          { face: Face.Jack, suit: Suit.Clubs },
          { face: Face.Ten, suit: Suit.Clubs },
        ],
        kickers: [],
      });
    });
  });
});
