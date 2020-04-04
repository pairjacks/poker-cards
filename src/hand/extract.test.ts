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
        rankCards: [[Face.Queen, Suit.Diamonds]],
        kickers: [
          [Face.Jack, Suit.Clubs],
          [Face.Eight, Suit.Spades],
          [Face.Six, Suit.Diamonds],
          [Face.Four, Suit.Clubs],
        ],
      });
    });

    it('extracts pair', () => {
      expect(extractHand(ranksPair)).toEqual({
        rank: HandRank.Pair,
        rankValue: 2,
        rankCards: [
          [Face.Six, Suit.Clubs],
          [Face.Six, Suit.Diamonds],
        ],
        kickers: [
          [Face.Queen, Suit.Diamonds],
          [Face.Jack, Suit.Clubs],
          [Face.Eight, Suit.Spades],
        ],
      });
    });

    it('extracts two pair', () => {
      expect(extractHand(ranksTwoPair)).toEqual({
        rank: HandRank.TwoPair,
        rankValue: 3,
        rankCards: [
          [Face.Jack, Suit.Clubs],
          [Face.Jack, Suit.Diamonds],
          [Face.Six, Suit.Clubs],
          [Face.Six, Suit.Diamonds],
        ],
        kickers: [[Face.Eight, Suit.Spades]],
      });

      expect(extractHand(ranksTwoPairContainsThreePair)).toEqual({
        rank: HandRank.TwoPair,
        rankValue: 3,
        rankCards: [
          [Face.Queen, Suit.Spades],
          [Face.Queen, Suit.Clubs],
          [Face.Jack, Suit.Clubs],
          [Face.Jack, Suit.Diamonds],
        ],
        kickers: [[Face.Eight, Suit.Spades]],
      });
    });

    it('extracts three of a kind', () => {
      expect(extractHand(ranksThreeOfAKind)).toEqual({
        rank: HandRank.ThreeOfAKind,
        rankValue: 4,
        rankCards: [
          [Face.Six, Suit.Hearts],
          [Face.Six, Suit.Clubs],
          [Face.Six, Suit.Diamonds],
        ],
        kickers: [
          [Face.Queen, Suit.Clubs],
          [Face.Jack, Suit.Diamonds],
        ],
      });
    });

    it('extracts straight', () => {
      expect(extractHand(ranksStraightContainsPair)).toEqual({
        rank: HandRank.Straight,
        rankValue: 5,
        rankCards: [
          [Face.Six, Suit.Hearts],
          [Face.Five, Suit.Clubs],
          [Face.Four, Suit.Diamonds],
          [Face.Three, Suit.Diamonds],
          [Face.Two, Suit.Clubs],
        ],
        kickers: [],
      });

      expect(extractHand(ranksStraightAceLowContainsPair)).toEqual({
        rank: HandRank.Straight,
        rankValue: 5,
        rankCards: [
          [Face.Five, Suit.Clubs],
          [Face.Four, Suit.Diamonds],
          [Face.Three, Suit.Diamonds],
          [Face.Two, Suit.Clubs],
          [Face.Ace, Suit.Spades],
        ],
        kickers: [],
      });
    });

    it('extracts flush', () => {
      expect(extractHand(ranksFlushContainsTwoPair)).toEqual({
        rank: HandRank.Flush,
        rankValue: 6,
        rankCards: [
          [Face.Jack, Suit.Diamonds],
          [Face.Five, Suit.Diamonds],
          [Face.Four, Suit.Diamonds],
          [Face.Three, Suit.Diamonds],
          [Face.Two, Suit.Diamonds],
        ],
        kickers: [],
      });
    });

    it('extracts full house', () => {
      expect(extractHand(ranksFullHouse)).toEqual({
        rank: HandRank.FullHouse,
        rankValue: 7,
        rankCards: [
          [Face.Three, Suit.Spades],
          [Face.Three, Suit.Clubs],
          [Face.Three, Suit.Diamonds],
          [Face.Jack, Suit.Hearts],
          [Face.Jack, Suit.Diamonds],
        ],
        kickers: [],
      });

      expect(extractHand(ranksFullHouseContainsTwoPair)).toEqual({
        rank: HandRank.FullHouse,
        rankValue: 7,
        rankCards: [
          [Face.Jack, Suit.Spades],
          [Face.Jack, Suit.Hearts],
          [Face.Jack, Suit.Diamonds],
          [Face.Four, Suit.Hearts],
          [Face.Four, Suit.Diamonds],
        ],
        kickers: [],
      });

      expect(extractHand(ranksFullHouseContainsTwoThreeOfAKind)).toEqual({
        rank: HandRank.FullHouse,
        rankValue: 7,
        rankCards: [
          [Face.Jack, Suit.Spades],
          [Face.Jack, Suit.Hearts],
          [Face.Jack, Suit.Diamonds],
          [Face.Three, Suit.Hearts],
          [Face.Three, Suit.Clubs],
        ],
        kickers: [],
      });
    });

    it('extracts four of a kind', () => {
      expect(extractHand(ranksFourOfAKind)).toEqual({
        rank: HandRank.FourOfAKind,
        rankValue: 8,
        rankCards: [
          [Face.Six, Suit.Spades],
          [Face.Six, Suit.Hearts],
          [Face.Six, Suit.Clubs],
          [Face.Six, Suit.Diamonds],
        ],
        kickers: [[Face.Jack, Suit.Diamonds]],
      });
    });

    it('extracts straight flush', () => {
      expect(extractHand(ranksStraightFlushContainsPair)).toEqual({
        rank: HandRank.StraightFlush,
        rankValue: 9,
        rankCards: [
          [Face.Six, Suit.Clubs],
          [Face.Five, Suit.Clubs],
          [Face.Four, Suit.Clubs],
          [Face.Three, Suit.Clubs],
          [Face.Two, Suit.Clubs],
        ],
        kickers: [],
      });

      expect(extractHand(ranksStraightFlushAceLow)).toEqual({
        rank: HandRank.StraightFlush,
        rankValue: 9,
        rankCards: [
          [Face.Five, Suit.Spades],
          [Face.Four, Suit.Spades],
          [Face.Three, Suit.Spades],
          [Face.Two, Suit.Spades],
          [Face.Ace, Suit.Spades],
        ],
        kickers: [],
      });
    });

    it('extracts royal flush', () => {
      expect(extractHand(ranksRoyalFlushContainsPair)).toEqual({
        rank: HandRank.RoyalFlush,
        rankValue: 10,
        rankCards: [
          [Face.Ace, Suit.Clubs],
          [Face.King, Suit.Clubs],
          [Face.Queen, Suit.Clubs],
          [Face.Jack, Suit.Clubs],
          [Face.Ten, Suit.Clubs],
        ],
        kickers: [],
      });
    });
  });
});
