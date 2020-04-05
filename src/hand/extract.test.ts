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
        rankCards: [[Face.Queen, Suit.Diamonds]],
        kickerCards: [
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
        rankCards: [
          [Face.Six, Suit.Clubs],
          [Face.Six, Suit.Diamonds],
        ],
        kickerCards: [
          [Face.Queen, Suit.Diamonds],
          [Face.Jack, Suit.Clubs],
          [Face.Eight, Suit.Spades],
        ],
      });
    });

    it('extracts two pair', () => {
      expect(extractHand(ranksTwoPair)).toEqual({
        rank: HandRank.TwoPair,
        rankCards: [
          [Face.Jack, Suit.Clubs],
          [Face.Jack, Suit.Diamonds],
          [Face.Six, Suit.Clubs],
          [Face.Six, Suit.Diamonds],
        ],
        kickerCards: [[Face.Eight, Suit.Spades]],
      });

      expect(extractHand(ranksTwoPairContainsThreePair)).toEqual({
        rank: HandRank.TwoPair,
        rankCards: [
          [Face.Queen, Suit.Spades],
          [Face.Queen, Suit.Clubs],
          [Face.Jack, Suit.Clubs],
          [Face.Jack, Suit.Diamonds],
        ],
        kickerCards: [[Face.Eight, Suit.Spades]],
      });
    });

    it('extracts three of a kind', () => {
      expect(extractHand(ranksThreeOfAKind)).toEqual({
        rank: HandRank.ThreeOfAKind,
        rankCards: [
          [Face.Six, Suit.Hearts],
          [Face.Six, Suit.Clubs],
          [Face.Six, Suit.Diamonds],
        ],
        kickerCards: [
          [Face.Queen, Suit.Clubs],
          [Face.Jack, Suit.Diamonds],
        ],
      });
    });

    it('extracts straight', () => {
      expect(extractHand(ranksStraightContainsPair)).toEqual({
        rank: HandRank.Straight,
        rankCards: [
          [Face.Six, Suit.Hearts],
          [Face.Five, Suit.Clubs],
          [Face.Four, Suit.Diamonds],
          [Face.Three, Suit.Diamonds],
          [Face.Two, Suit.Clubs],
        ],
        kickerCards: [],
      });

      expect(extractHand(ranksStraightAceLowContainsPair)).toEqual({
        rank: HandRank.Straight,
        rankCards: [
          [Face.Five, Suit.Clubs],
          [Face.Four, Suit.Diamonds],
          [Face.Three, Suit.Diamonds],
          [Face.Two, Suit.Clubs],
          [Face.Ace, Suit.Spades],
        ],
        kickerCards: [],
      });
    });

    it('extracts flush', () => {
      expect(extractHand(ranksFlushContainsTwoPair)).toEqual({
        rank: HandRank.Flush,
        rankCards: [
          [Face.Jack, Suit.Diamonds],
          [Face.Five, Suit.Diamonds],
          [Face.Four, Suit.Diamonds],
          [Face.Three, Suit.Diamonds],
          [Face.Two, Suit.Diamonds],
        ],
        kickerCards: [],
      });
    });

    it('extracts full house', () => {
      expect(extractHand(ranksFullHouse)).toEqual({
        rank: HandRank.FullHouse,
        rankCards: [
          [Face.Three, Suit.Spades],
          [Face.Three, Suit.Clubs],
          [Face.Three, Suit.Diamonds],
          [Face.Jack, Suit.Hearts],
          [Face.Jack, Suit.Diamonds],
        ],
        kickerCards: [],
      });

      expect(extractHand(ranksFullHouseContainsTwoPair)).toEqual({
        rank: HandRank.FullHouse,
        rankCards: [
          [Face.Jack, Suit.Spades],
          [Face.Jack, Suit.Hearts],
          [Face.Jack, Suit.Diamonds],
          [Face.Four, Suit.Hearts],
          [Face.Four, Suit.Diamonds],
        ],
        kickerCards: [],
      });

      expect(extractHand(ranksFullHouseContainsTwoThreeOfAKind)).toEqual({
        rank: HandRank.FullHouse,
        rankCards: [
          [Face.Jack, Suit.Spades],
          [Face.Jack, Suit.Hearts],
          [Face.Jack, Suit.Diamonds],
          [Face.Three, Suit.Hearts],
          [Face.Three, Suit.Clubs],
        ],
        kickerCards: [],
      });
    });

    it('extracts four of a kind', () => {
      expect(extractHand(ranksFourOfAKind)).toEqual({
        rank: HandRank.FourOfAKind,
        rankCards: [
          [Face.Six, Suit.Spades],
          [Face.Six, Suit.Hearts],
          [Face.Six, Suit.Clubs],
          [Face.Six, Suit.Diamonds],
        ],
        kickerCards: [[Face.Jack, Suit.Diamonds]],
      });
    });

    it('extracts straight flush', () => {
      expect(extractHand(ranksStraightFlushContainsPair)).toEqual({
        rank: HandRank.StraightFlush,
        rankCards: [
          [Face.Six, Suit.Clubs],
          [Face.Five, Suit.Clubs],
          [Face.Four, Suit.Clubs],
          [Face.Three, Suit.Clubs],
          [Face.Two, Suit.Clubs],
        ],
        kickerCards: [],
      });

      expect(extractHand(ranksStraightFlushAceLow)).toEqual({
        rank: HandRank.StraightFlush,
        rankCards: [
          [Face.Five, Suit.Spades],
          [Face.Four, Suit.Spades],
          [Face.Three, Suit.Spades],
          [Face.Two, Suit.Spades],
          [Face.Ace, Suit.Spades],
        ],
        kickerCards: [],
      });
    });

    it('extracts royal flush', () => {
      expect(extractHand(ranksRoyalFlushContainsPair)).toEqual({
        rank: HandRank.RoyalFlush,
        rankCards: [
          [Face.Ace, Suit.Clubs],
          [Face.King, Suit.Clubs],
          [Face.Queen, Suit.Clubs],
          [Face.Jack, Suit.Clubs],
          [Face.Ten, Suit.Clubs],
        ],
        kickerCards: [],
      });
    });
  });
});
