import { findHighestHand } from './compare';
import {
  ranksFourOfAKind,
  ranksFullHouse,
  ranksTwoPair,
  ranksRoyalFlushContainsOnePair,
} from './__fixtures__/hands';
import { HandRank } from '../constants';
import { Suit, Face } from '../../core/constants';

describe('compare', () => {
  describe('findHighestHand', () => {
    it('should find natural highest hand', () => {
      expect(
        findHighestHand([
          ranksFourOfAKind,
          ranksFullHouse,
          ranksTwoPair,
          ranksRoyalFlushContainsOnePair,
        ]),
      ).toEqual({
        hand: ranksRoyalFlushContainsOnePair,
        ranked: expect.objectContaining({ rank: HandRank.RoyalFlush }),
      });
    });

    describe('resolve tied hands', () => {
      test('high card', () => {
        const highCardHighKicker = {
          pocket: [
            { face: Face.Jack, suit: Suit.Clubs },
            { face: Face.Eight, suit: Suit.Spades },
          ],
          community: [
            { face: Face.Seven, suit: Suit.Diamonds },
            { face: Face.Two, suit: Suit.Diamonds },
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Four, suit: Suit.Clubs },
            { face: Face.Queen, suit: Suit.Diamonds },
          ],
        };
        const highCardLowKicker = {
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

        expect(
          findHighestHand([highCardHighKicker, highCardLowKicker]),
        ).toEqual({
          hand: highCardHighKicker,
          ranked: expect.objectContaining({ rank: HandRank.HighCard }),
        });

        const highCardEqualA = {
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
        const highCardEqualB = {
          pocket: [
            { face: Face.Jack, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Diamonds },
          ],
          community: [
            { face: Face.Six, suit: Suit.Clubs },
            { face: Face.Two, suit: Suit.Hearts },
            { face: Face.Three, suit: Suit.Spades },
            { face: Face.Four, suit: Suit.Hearts },
            { face: Face.Queen, suit: Suit.Spades },
          ],
        };

        expect(findHighestHand([highCardEqualA, highCardEqualB])).toBeNull();
      });

      test('one pair', () => {
        const onePairThrees = {
          pocket: [
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Diamonds },
          ],
          community: [
            { face: Face.King, suit: Suit.Diamonds },
            { face: Face.Five, suit: Suit.Clubs },
            { face: Face.Ace, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
            { face: Face.Seven, suit: Suit.Diamonds },
          ],
        };

        const onePairFives = {
          pocket: [
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Five, suit: Suit.Clubs },
          ],
          community: [
            { face: Face.King, suit: Suit.Diamonds },
            { face: Face.Five, suit: Suit.Diamonds },
            { face: Face.Ace, suit: Suit.Hearts },
            { face: Face.Eight, suit: Suit.Diamonds },
            { face: Face.Seven, suit: Suit.Hearts },
          ],
        };

        expect(findHighestHand([onePairThrees, onePairFives])).toEqual({
          hand: onePairFives,
          ranked: expect.objectContaining({ rank: HandRank.OnePair }),
        });

        const onePairThreesHighKicker = {
          pocket: [
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Diamonds },
          ],
          community: [
            { face: Face.King, suit: Suit.Diamonds },
            { face: Face.Five, suit: Suit.Clubs },
            { face: Face.Ace, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
            { face: Face.Seven, suit: Suit.Diamonds },
          ],
        };

        const onePairThreesLowKicker = {
          pocket: [
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Three, suit: Suit.Spades },
          ],
          community: [
            { face: Face.Four, suit: Suit.Hearts },
            { face: Face.Five, suit: Suit.Spades },
            { face: Face.Ace, suit: Suit.Clubs },
            { face: Face.Eight, suit: Suit.Diamonds },
            { face: Face.Seven, suit: Suit.Hearts },
          ],
        };

        expect(
          findHighestHand([onePairThreesLowKicker, onePairThreesHighKicker]),
        ).toEqual({
          hand: onePairThreesHighKicker,
          ranked: expect.objectContaining({ rank: HandRank.OnePair }),
        });

        const onePairEqualA = {
          pocket: [
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Diamonds },
          ],
          community: [
            { face: Face.King, suit: Suit.Diamonds },
            { face: Face.Five, suit: Suit.Clubs },
            { face: Face.Ace, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
            { face: Face.Seven, suit: Suit.Diamonds },
          ],
        };

        const onePairEqualB = {
          pocket: [
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Three, suit: Suit.Spades },
          ],
          community: [
            { face: Face.King, suit: Suit.Hearts },
            { face: Face.Five, suit: Suit.Spades },
            { face: Face.Ace, suit: Suit.Clubs },
            { face: Face.Eight, suit: Suit.Diamonds },
            { face: Face.Seven, suit: Suit.Hearts },
          ],
        };

        expect(findHighestHand([onePairEqualA, onePairEqualB])).toBeNull();
      });

      test('two pair', () => {
        const twoPairThreeFive = {
          pocket: [
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Diamonds },
          ],
          community: [
            { face: Face.Five, suit: Suit.Diamonds },
            { face: Face.Five, suit: Suit.Clubs },
            { face: Face.Ace, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
            { face: Face.Seven, suit: Suit.Diamonds },
          ],
        };

        const twoPairThreeSix = {
          pocket: [
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Three, suit: Suit.Spades },
          ],
          community: [
            { face: Face.Six, suit: Suit.Diamonds },
            { face: Face.Six, suit: Suit.Clubs },
            { face: Face.Ace, suit: Suit.Clubs },
            { face: Face.Eight, suit: Suit.Diamonds },
            { face: Face.Seven, suit: Suit.Hearts },
          ],
        };

        expect(findHighestHand([twoPairThreeFive, twoPairThreeSix])).toEqual({
          hand: twoPairThreeSix,
          ranked: expect.objectContaining({ rank: HandRank.TwoPair }),
        });

        const twoPairFourFive = {
          pocket: [
            { face: Face.Four, suit: Suit.Hearts },
            { face: Face.Four, suit: Suit.Spades },
          ],
          community: [
            { face: Face.Five, suit: Suit.Hearts },
            { face: Face.Five, suit: Suit.Spades },
            { face: Face.Ace, suit: Suit.Clubs },
            { face: Face.Eight, suit: Suit.Diamonds },
            { face: Face.Seven, suit: Suit.Hearts },
          ],
        };

        expect(findHighestHand([twoPairThreeFive, twoPairFourFive])).toEqual({
          hand: twoPairFourFive,
          ranked: expect.objectContaining({ rank: HandRank.TwoPair }),
        });

        const twoPairThreeFourHighKicker = {
          pocket: [
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Diamonds },
          ],
          community: [
            { face: Face.Four, suit: Suit.Diamonds },
            { face: Face.Four, suit: Suit.Clubs },
            { face: Face.Ace, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
            { face: Face.Seven, suit: Suit.Diamonds },
          ],
        };

        const twoPairThreeFourLowKicker = {
          pocket: [
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Three, suit: Suit.Spades },
          ],
          community: [
            { face: Face.Four, suit: Suit.Hearts },
            { face: Face.Four, suit: Suit.Spades },
            { face: Face.King, suit: Suit.Clubs },
            { face: Face.Eight, suit: Suit.Diamonds },
            { face: Face.Seven, suit: Suit.Hearts },
          ],
        };

        expect(
          findHighestHand([
            twoPairThreeFourLowKicker,
            twoPairThreeFourHighKicker,
          ]),
        ).toEqual({
          hand: twoPairThreeFourHighKicker,
          ranked: expect.objectContaining({ rank: HandRank.TwoPair }),
        });

        const twoPairEqualA = {
          pocket: [
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Diamonds },
          ],
          community: [
            { face: Face.Four, suit: Suit.Diamonds },
            { face: Face.Four, suit: Suit.Clubs },
            { face: Face.Ace, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
            { face: Face.Seven, suit: Suit.Diamonds },
          ],
        };

        const twoPairEqualB = {
          pocket: [
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Three, suit: Suit.Spades },
          ],
          community: [
            { face: Face.Four, suit: Suit.Hearts },
            { face: Face.Four, suit: Suit.Spades },
            { face: Face.Ace, suit: Suit.Clubs },
            { face: Face.Eight, suit: Suit.Diamonds },
            { face: Face.Seven, suit: Suit.Hearts },
          ],
        };

        expect(findHighestHand([twoPairEqualA, twoPairEqualB])).toBeNull();
      });

      test('three of a kind', () => {
        const threeOfAKindThrees = {
          pocket: [
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Diamonds },
          ],
          community: [
            { face: Face.King, suit: Suit.Diamonds },
            { face: Face.Three, suit: Suit.Spades },
            { face: Face.Ace, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
            { face: Face.Seven, suit: Suit.Diamonds },
          ],
        };

        const threeOfAKindFives = {
          pocket: [
            { face: Face.Five, suit: Suit.Hearts },
            { face: Face.Five, suit: Suit.Clubs },
          ],
          community: [
            { face: Face.King, suit: Suit.Diamonds },
            { face: Face.Five, suit: Suit.Diamonds },
            { face: Face.Ace, suit: Suit.Hearts },
            { face: Face.Eight, suit: Suit.Diamonds },
            { face: Face.Seven, suit: Suit.Hearts },
          ],
        };

        expect(
          findHighestHand([threeOfAKindThrees, threeOfAKindFives]),
        ).toEqual({
          hand: threeOfAKindFives,
          ranked: expect.objectContaining({ rank: HandRank.ThreeOfAKind }),
        });

        const threeOfAKindThreesHighKicker = {
          pocket: [
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Diamonds },
          ],
          community: [
            { face: Face.King, suit: Suit.Diamonds },
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Ace, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
            { face: Face.Seven, suit: Suit.Diamonds },
          ],
        };

        const threeOfAKindThreesLowKicker = {
          pocket: [
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Three, suit: Suit.Spades },
          ],
          community: [
            { face: Face.Four, suit: Suit.Hearts },
            { face: Face.Three, suit: Suit.Spades },
            { face: Face.Ace, suit: Suit.Clubs },
            { face: Face.Eight, suit: Suit.Diamonds },
            { face: Face.Seven, suit: Suit.Hearts },
          ],
        };

        expect(
          findHighestHand([
            threeOfAKindThreesLowKicker,
            threeOfAKindThreesHighKicker,
          ]),
        ).toEqual({
          hand: threeOfAKindThreesHighKicker,
          ranked: expect.objectContaining({ rank: HandRank.ThreeOfAKind }),
        });

        const threeOfAKindEqualA = {
          pocket: [
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Diamonds },
          ],
          community: [
            { face: Face.King, suit: Suit.Diamonds },
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Ace, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
            { face: Face.Seven, suit: Suit.Diamonds },
          ],
        };

        const threeOfAKindEqualB = {
          pocket: [
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Three, suit: Suit.Spades },
          ],
          community: [
            { face: Face.King, suit: Suit.Hearts },
            { face: Face.Three, suit: Suit.Spades },
            { face: Face.Ace, suit: Suit.Clubs },
            { face: Face.Eight, suit: Suit.Diamonds },
            { face: Face.Seven, suit: Suit.Hearts },
          ],
        };

        expect(
          findHighestHand([threeOfAKindEqualA, threeOfAKindEqualB]),
        ).toBeNull();
      });

      test('straight', () => {
        const straightEightHigh = {
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
        const straightAceLow = {
          pocket: [
            { face: Face.Ace, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
          ],
          community: [
            { face: Face.Four, suit: Suit.Hearts },
            { face: Face.Two, suit: Suit.Spades },
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Five, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
          ],
        };

        expect(findHighestHand([straightEightHigh, straightAceLow])).toEqual({
          hand: straightEightHigh,
          ranked: expect.objectContaining({ rank: HandRank.Straight }),
        });

        const straightEqualA = {
          pocket: [
            { face: Face.Eight, suit: Suit.Clubs },
            { face: Face.Six, suit: Suit.Diamonds },
          ],
          community: [
            { face: Face.Four, suit: Suit.Hearts },
            { face: Face.Two, suit: Suit.Spades },
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Five, suit: Suit.Spades },
            { face: Face.Six, suit: Suit.Hearts },
          ],
        };
        const straightEqualB = {
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

        expect(findHighestHand([straightEqualA, straightEqualB])).toBeNull();
      });

      test('flush', () => {
        const flushJackHigh = {
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
        const flushNineHigh = {
          pocket: [
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Nine, suit: Suit.Hearts },
          ],
          community: [
            { face: Face.Four, suit: Suit.Hearts },
            { face: Face.Two, suit: Suit.Hearts },
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Five, suit: Suit.Hearts },
            { face: Face.Nine, suit: Suit.Hearts },
          ],
        };

        expect(findHighestHand([flushJackHigh, flushNineHigh])).toEqual({
          hand: flushJackHigh,
          ranked: expect.objectContaining({ rank: HandRank.Flush }),
        });

        const flushEqualA = {
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
        const flushEqualB = {
          pocket: [
            { face: Face.Three, suit: Suit.Spades },
            { face: Face.Jack, suit: Suit.Spades },
          ],
          community: [
            { face: Face.Four, suit: Suit.Spades },
            { face: Face.Two, suit: Suit.Spades },
            { face: Face.Three, suit: Suit.Diamonds },
            { face: Face.Five, suit: Suit.Spades },
            { face: Face.Jack, suit: Suit.Hearts },
          ],
        };

        expect(findHighestHand([flushEqualA, flushEqualB])).toBeNull();
      });
    });
  });
});
