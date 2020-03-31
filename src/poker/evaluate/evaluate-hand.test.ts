import { Face, Suit } from '../../core/constants';
import { HandRank } from '../constants';
import {
  ranksHighCard,
  ranksFullHouse,
  ranksTwoPair,
  ranksOnePair,
  ranksThreeOfAKind,
  ranksTwoPairAndThreePair,
  ranksStraightAndPair,
  ranksFlushAndTwoPair,
  ranksFullHouseAndTwoPair,
  ranksFullHouseAndTwoThreeOfAKind,
  ranksFourOfAKind,
  ranksStraightFlushAndOnePair,
  ranksRoyalFlushAndOnePair,
} from './__fixtures__/hands';
import { evaluateHand } from './evaluate-hand';

describe('evaluate hand', () => {
  describe('evaluateHand', () => {
    it('evaluates high card', () => {
      expect(evaluateHand(ranksHighCard)).toEqual({
        rank: HandRank.HighCard,
        rankCards: [{ face: Face.Queen, suit: Suit.Diamonds }],
        kickers: [
          { face: Face.Jack, suit: Suit.Clubs },
          { face: Face.Eight, suit: Suit.Spades },
          { face: Face.Six, suit: Suit.Diamonds },
          { face: Face.Four, suit: Suit.Clubs },
        ],
      });
    });

    it('evaluates one pair', () => {
      expect(evaluateHand(ranksOnePair)).toEqual({
        rank: HandRank.OnePair,
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

    it('evaluates two pair', () => {
      expect(evaluateHand(ranksTwoPair)).toEqual({
        rank: HandRank.TwoPair,
        rankCards: [
          { face: Face.Jack, suit: Suit.Clubs },
          { face: Face.Jack, suit: Suit.Diamonds },
          { face: Face.Six, suit: Suit.Clubs },
          { face: Face.Six, suit: Suit.Diamonds },
        ],
        kickers: [{ face: Face.Eight, suit: Suit.Spades }],
      });

      expect(evaluateHand(ranksTwoPairAndThreePair)).toEqual({
        rank: HandRank.TwoPair,
        rankCards: [
          { face: Face.Queen, suit: Suit.Spades },
          { face: Face.Queen, suit: Suit.Clubs },
          { face: Face.Jack, suit: Suit.Clubs },
          { face: Face.Jack, suit: Suit.Diamonds },
        ],
        kickers: [{ face: Face.Eight, suit: Suit.Spades }],
      });
    });

    it('evaluates three of a kind', () => {
      expect(evaluateHand(ranksThreeOfAKind)).toEqual({
        rank: HandRank.ThreeOfAKind,
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

    it('evaluates straight', () => {
      expect(evaluateHand(ranksStraightAndPair)).toEqual({
        rank: HandRank.Straight,
        rankCards: [
          { face: Face.Six, suit: Suit.Hearts },
          { face: Face.Five, suit: Suit.Clubs },
          { face: Face.Four, suit: Suit.Diamonds },
          { face: Face.Three, suit: Suit.Diamonds },
          { face: Face.Two, suit: Suit.Clubs },
        ],
        kickers: [],
      });
    });

    it('evaluates flush', () => {
      expect(evaluateHand(ranksFlushAndTwoPair)).toEqual({
        rank: HandRank.Flush,
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

    it('evaluates full house', () => {
      expect(evaluateHand(ranksFullHouse)).toEqual({
        rank: HandRank.FullHouse,
        rankCards: [
          { face: Face.Three, suit: Suit.Spades },
          { face: Face.Three, suit: Suit.Clubs },
          { face: Face.Three, suit: Suit.Diamonds },
          { face: Face.Jack, suit: Suit.Hearts },
          { face: Face.Jack, suit: Suit.Diamonds },
        ],
        kickers: [],
      });

      expect(evaluateHand(ranksFullHouseAndTwoPair)).toEqual({
        rank: HandRank.FullHouse,
        rankCards: [
          { face: Face.Jack, suit: Suit.Spades },
          { face: Face.Jack, suit: Suit.Hearts },
          { face: Face.Jack, suit: Suit.Diamonds },
          { face: Face.Four, suit: Suit.Hearts },
          { face: Face.Four, suit: Suit.Diamonds },
        ],
        kickers: [],
      });

      expect(evaluateHand(ranksFullHouseAndTwoThreeOfAKind)).toEqual({
        rank: HandRank.FullHouse,
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

    it('evaluates four of a kind', () => {
      expect(evaluateHand(ranksFourOfAKind)).toEqual({
        rank: HandRank.FourOfAKind,
        rankCards: [
          { face: Face.Six, suit: Suit.Spades },
          { face: Face.Six, suit: Suit.Hearts },
          { face: Face.Six, suit: Suit.Clubs },
          { face: Face.Six, suit: Suit.Diamonds },
        ],
        kickers: [{ face: Face.Jack, suit: Suit.Diamonds }],
      });
    });

    it('evaluates straight flush', () => {
      expect(evaluateHand(ranksStraightFlushAndOnePair)).toEqual({
        rank: HandRank.StraightFlush,
        rankCards: [
          { face: Face.Six, suit: Suit.Clubs },
          { face: Face.Five, suit: Suit.Clubs },
          { face: Face.Four, suit: Suit.Clubs },
          { face: Face.Three, suit: Suit.Clubs },
          { face: Face.Two, suit: Suit.Clubs },
        ],
        kickers: [],
      });
    });

    it('evaluates royal flush', () => {
      expect(evaluateHand(ranksRoyalFlushAndOnePair)).toEqual({
        rank: HandRank.RoyalFlush,
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
