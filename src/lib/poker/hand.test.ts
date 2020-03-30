import { Face, Suit } from '../cards';
import { evaluatePokerHand, comparePokerHands } from './hand';
import { HandRank } from './types';

describe('poker/hand', () => {
  describe('comparePokerHands', () => {
    it('compares hands', () => {
      expect(comparePokerHands(ranksOnePair, ranksOnePair)).toBe(0);
      expect(
        comparePokerHands(ranksTwoPair, ranksThreeOfAKind),
      ).toBeGreaterThan(0);
      expect(comparePokerHands(ranksFullHouse, ranksThreeOfAKind)).toBeLessThan(
        0,
      );
    });
  });

  describe('evaluatePokerHand', () => {
    it('evaluates high card', () => {
      expect(evaluatePokerHand(ranksHighCard)).toEqual({
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
      expect(evaluatePokerHand(ranksOnePair)).toEqual({
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
      expect(evaluatePokerHand(ranksTwoPair)).toEqual({
        rank: HandRank.TwoPair,
        rankCards: [
          { face: Face.Jack, suit: Suit.Clubs },
          { face: Face.Jack, suit: Suit.Diamonds },
          { face: Face.Six, suit: Suit.Clubs },
          { face: Face.Six, suit: Suit.Diamonds },
        ],
        kickers: [{ face: Face.Eight, suit: Suit.Spades }],
      });

      expect(evaluatePokerHand(ranksTwoPairAndThreePair)).toEqual({
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
      expect(evaluatePokerHand(ranksThreeOfAKind)).toEqual({
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
      expect(evaluatePokerHand(ranksStraightAndPair)).toEqual({
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
      expect(evaluatePokerHand(ranksFlushAndTwoPair)).toEqual({
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
      expect(evaluatePokerHand(ranksFullHouse)).toEqual({
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

      expect(evaluatePokerHand(ranksFullHouseAndTwoPair)).toEqual({
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

      expect(evaluatePokerHand(ranksFullHouseAndTwoThreeOfAKind)).toEqual({
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
      expect(evaluatePokerHand(ranksFourOfAKind)).toEqual({
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
      expect(evaluatePokerHand(ranksStraightFlushAndOnePair)).toEqual({
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
      expect(evaluatePokerHand(ranksRoyalFlushAndOnePair)).toEqual({
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

const ranksHighCard = {
  pocket: [
    { face: Face.Jack, suit: Suit.Clubs },
    { face: Face.Eight, suit: Suit.Spades },
  ],
  community: [
    { face: Face.Six, suit: Suit.Diamonds },
    { face: Face.Two, suit: Suit.Diamonds },
    { face: Face.Three, suit: Suit.Clubs },
    { face: Face.Four, suit: Suit.Clubs },
    { face: Face.Queen, suit: Suit.Diamonds },
  ],
};

const ranksOnePair = {
  pocket: [
    { face: Face.Six, suit: Suit.Clubs },
    { face: Face.Two, suit: Suit.Diamonds },
  ],
  community: [
    { face: Face.Six, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Clubs },
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Four, suit: Suit.Clubs },
    { face: Face.Queen, suit: Suit.Diamonds },
  ],
};

const ranksTwoPair = {
  pocket: [
    { face: Face.Four, suit: Suit.Clubs },
    { face: Face.Jack, suit: Suit.Diamonds },
  ],
  community: [
    { face: Face.Six, suit: Suit.Diamonds },
    { face: Face.Two, suit: Suit.Diamonds },
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Six, suit: Suit.Clubs },
    { face: Face.Jack, suit: Suit.Clubs },
  ],
};

const ranksTwoPairAndThreePair = {
  pocket: [
    { face: Face.Queen, suit: Suit.Clubs },
    { face: Face.Jack, suit: Suit.Clubs },
  ],
  community: [
    { face: Face.Six, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Diamonds },
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Six, suit: Suit.Clubs },
    { face: Face.Queen, suit: Suit.Spades },
  ],
};

const ranksThreeOfAKind = {
  pocket: [
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Six, suit: Suit.Clubs },
  ],
  community: [
    { face: Face.Six, suit: Suit.Diamonds },
    { face: Face.Two, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Diamonds },
    { face: Face.Six, suit: Suit.Hearts },
    { face: Face.Queen, suit: Suit.Clubs },
  ],
};

const ranksStraightAndPair = {
  pocket: [
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Six, suit: Suit.Hearts },
  ],
  community: [
    { face: Face.Four, suit: Suit.Diamonds },
    { face: Face.Two, suit: Suit.Clubs },
    { face: Face.Three, suit: Suit.Diamonds },
    { face: Face.Five, suit: Suit.Clubs },
    { face: Face.Six, suit: Suit.Diamonds },
  ],
};

const ranksFlushAndTwoPair = {
  pocket: [
    { face: Face.Three, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Diamonds },
  ],
  community: [
    { face: Face.Four, suit: Suit.Diamonds },
    { face: Face.Two, suit: Suit.Diamonds },
    { face: Face.Three, suit: Suit.Spades },
    { face: Face.Five, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Hearts },
  ],
};

const ranksFullHouse = {
  pocket: [
    { face: Face.Three, suit: Suit.Spades },
    { face: Face.Four, suit: Suit.Diamonds },
  ],
  community: [
    { face: Face.Three, suit: Suit.Clubs },
    { face: Face.Three, suit: Suit.Diamonds },
    { face: Face.Five, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Hearts },
  ],
};

const ranksFullHouseAndTwoPair = {
  pocket: [
    { face: Face.Four, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Hearts },
  ],
  community: [
    { face: Face.Four, suit: Suit.Hearts },
    { face: Face.Three, suit: Suit.Clubs },
    { face: Face.Three, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Spades },
    { face: Face.Jack, suit: Suit.Diamonds },
  ],
};

const ranksFullHouseAndTwoThreeOfAKind = {
  pocket: [
    { face: Face.Four, suit: Suit.Diamonds },
    { face: Face.Three, suit: Suit.Clubs },
  ],
  community: [
    { face: Face.Three, suit: Suit.Hearts },
    { face: Face.Three, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Spades },
    { face: Face.Jack, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Hearts },
  ],
};
[];

const ranksFourOfAKind = {
  pocket: [
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Jack, suit: Suit.Diamonds },
  ],
  community: [
    { face: Face.Six, suit: Suit.Diamonds },
    { face: Face.Two, suit: Suit.Diamonds },
    { face: Face.Six, suit: Suit.Clubs },
    { face: Face.Six, suit: Suit.Hearts },
    { face: Face.Six, suit: Suit.Spades },
  ],
};
[];

const ranksStraightFlushAndOnePair = {
  pocket: [
    { face: Face.Two, suit: Suit.Clubs },
    { face: Face.Six, suit: Suit.Clubs },
  ],
  community: [
    { face: Face.Four, suit: Suit.Clubs },
    { face: Face.Three, suit: Suit.Clubs },
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Five, suit: Suit.Clubs },
    { face: Face.Six, suit: Suit.Spades },
  ],
};

const ranksRoyalFlushAndOnePair = {
  pocket: [
    { face: Face.King, suit: Suit.Clubs },
    { face: Face.Queen, suit: Suit.Clubs },
  ],
  community: [
    { face: Face.Ace, suit: Suit.Clubs },
    { face: Face.Ten, suit: Suit.Clubs },
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Jack, suit: Suit.Clubs },
    { face: Face.Jack, suit: Suit.Spades },
  ],
};
