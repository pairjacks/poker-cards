import { findHighestHands } from './compare';
import {
  ranksFourOfAKind,
  ranksFullHouse,
  ranksTwoPair,
  ranksRoyalFlushContainsOnePair,
} from './__fixtures__/hands';
import { HandRank } from '../constants';
import { Suit, Face } from '../../core/constants';

describe('compare', () => {
  describe('findHighestHands', () => {
    it('should find natural highest hand', () => {
      expect(
        findHighestHands([
          ranksFourOfAKind,
          ranksFullHouse,
          ranksTwoPair,
          ranksRoyalFlushContainsOnePair,
        ]),
      ).toEqual([
        {
          hand: ranksRoyalFlushContainsOnePair,
          ranked: expect.objectContaining({ rank: HandRank.RoyalFlush }),
        },
      ]);
    });

    describe('resolve tied hand ranks', () => {
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
          findHighestHands([highCardHighKicker, highCardLowKicker]),
        ).toEqual([
          {
            hand: highCardHighKicker,
            ranked: expect.objectContaining({ rank: HandRank.HighCard }),
          },
        ]);

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

        expect(findHighestHands([highCardEqualA, highCardEqualB])).toEqual([
          {
            hand: highCardEqualA,
            ranked: expect.objectContaining({ rank: HandRank.HighCard }),
          },
          {
            hand: highCardEqualB,
            ranked: expect.objectContaining({ rank: HandRank.HighCard }),
          },
        ]);
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

        expect(findHighestHands([onePairThrees, onePairFives])).toEqual([
          {
            hand: onePairFives,
            ranked: expect.objectContaining({ rank: HandRank.OnePair }),
          },
        ]);

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
          findHighestHands([onePairThreesLowKicker, onePairThreesHighKicker]),
        ).toEqual([
          {
            hand: onePairThreesHighKicker,
            ranked: expect.objectContaining({ rank: HandRank.OnePair }),
          },
        ]);

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

        expect(findHighestHands([onePairEqualA, onePairEqualB])).toEqual([
          {
            hand: onePairEqualA,
            ranked: expect.objectContaining({ rank: HandRank.OnePair }),
          },
          {
            hand: onePairEqualB,
            ranked: expect.objectContaining({ rank: HandRank.OnePair }),
          },
        ]);
      });

      test('two pair', () => {
        const twoPairFivesOverThrees = {
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

        const twoPairSixesOverThrees = {
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

        expect(
          findHighestHands([twoPairFivesOverThrees, twoPairSixesOverThrees]),
        ).toEqual([
          {
            hand: twoPairSixesOverThrees,
            ranked: expect.objectContaining({ rank: HandRank.TwoPair }),
          },
        ]);

        const twoPairFivesOverFours = {
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

        expect(
          findHighestHands([twoPairFivesOverThrees, twoPairFivesOverFours]),
        ).toEqual([
          {
            hand: twoPairFivesOverFours,
            ranked: expect.objectContaining({ rank: HandRank.TwoPair }),
          },
        ]);

        const twoPairFoursOverThreesHighKicker = {
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

        const twoPairFoursOverThreesLowKicker = {
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
          findHighestHands([
            twoPairFoursOverThreesLowKicker,
            twoPairFoursOverThreesHighKicker,
          ]),
        ).toEqual([
          {
            hand: twoPairFoursOverThreesHighKicker,
            ranked: expect.objectContaining({ rank: HandRank.TwoPair }),
          },
        ]);

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

        expect(findHighestHands([twoPairEqualA, twoPairEqualB])).toEqual([
          {
            hand: twoPairEqualA,
            ranked: expect.objectContaining({ rank: HandRank.TwoPair }),
          },
          {
            hand: twoPairEqualB,
            ranked: expect.objectContaining({ rank: HandRank.TwoPair }),
          },
        ]);
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
          findHighestHands([threeOfAKindThrees, threeOfAKindFives]),
        ).toEqual([
          {
            hand: threeOfAKindFives,
            ranked: expect.objectContaining({ rank: HandRank.ThreeOfAKind }),
          },
        ]);

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
          findHighestHands([
            threeOfAKindThreesLowKicker,
            threeOfAKindThreesHighKicker,
          ]),
        ).toEqual([
          {
            hand: threeOfAKindThreesHighKicker,
            ranked: expect.objectContaining({ rank: HandRank.ThreeOfAKind }),
          },
        ]);

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
          findHighestHands([threeOfAKindEqualA, threeOfAKindEqualB]),
        ).toEqual([
          {
            hand: threeOfAKindEqualA,
            ranked: expect.objectContaining({ rank: HandRank.ThreeOfAKind }),
          },
          {
            hand: threeOfAKindEqualB,
            ranked: expect.objectContaining({ rank: HandRank.ThreeOfAKind }),
          },
        ]);
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

        expect(findHighestHands([straightEightHigh, straightAceLow])).toEqual([
          {
            hand: straightEightHigh,
            ranked: expect.objectContaining({ rank: HandRank.Straight }),
          },
        ]);

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

        expect(findHighestHands([straightEqualA, straightEqualB])).toEqual([
          {
            hand: straightEqualA,
            ranked: expect.objectContaining({ rank: HandRank.Straight }),
          },
          {
            hand: straightEqualB,
            ranked: expect.objectContaining({ rank: HandRank.Straight }),
          },
        ]);
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

        expect(findHighestHands([flushJackHigh, flushNineHigh])).toEqual([
          {
            hand: flushJackHigh,
            ranked: expect.objectContaining({ rank: HandRank.Flush }),
          },
        ]);

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

        expect(findHighestHands([flushEqualA, flushEqualB])).toEqual([
          {
            hand: flushEqualA,
            ranked: expect.objectContaining({ rank: HandRank.Flush }),
          },
          {
            hand: flushEqualB,
            ranked: expect.objectContaining({ rank: HandRank.Flush }),
          },
        ]);
      });

      test('full house', () => {
        const fullHouseFivesOverThrees = {
          pocket: [
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Diamonds },
          ],
          community: [
            { face: Face.Five, suit: Suit.Diamonds },
            { face: Face.Five, suit: Suit.Clubs },
            { face: Face.Five, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
            { face: Face.Seven, suit: Suit.Diamonds },
          ],
        };

        const fullHouseSixesOverThrees = {
          pocket: [
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Three, suit: Suit.Spades },
          ],
          community: [
            { face: Face.Six, suit: Suit.Diamonds },
            { face: Face.Six, suit: Suit.Clubs },
            { face: Face.Six, suit: Suit.Clubs },
            { face: Face.Eight, suit: Suit.Diamonds },
            { face: Face.Seven, suit: Suit.Hearts },
          ],
        };

        expect(
          findHighestHands([
            fullHouseFivesOverThrees,
            fullHouseSixesOverThrees,
          ]),
        ).toEqual([
          {
            hand: fullHouseSixesOverThrees,
            ranked: expect.objectContaining({ rank: HandRank.FullHouse }),
          },
        ]);

        const fullHouseFivesOverFours = {
          pocket: [
            { face: Face.Four, suit: Suit.Hearts },
            { face: Face.Four, suit: Suit.Spades },
          ],
          community: [
            { face: Face.Five, suit: Suit.Hearts },
            { face: Face.Five, suit: Suit.Spades },
            { face: Face.Five, suit: Suit.Clubs },
            { face: Face.Eight, suit: Suit.Diamonds },
            { face: Face.Seven, suit: Suit.Hearts },
          ],
        };

        expect(
          findHighestHands([fullHouseFivesOverThrees, fullHouseFivesOverFours]),
        ).toEqual([
          {
            hand: fullHouseFivesOverFours,
            ranked: expect.objectContaining({ rank: HandRank.FullHouse }),
          },
        ]);

        const fullHouseEqualA = {
          pocket: [
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Diamonds },
          ],
          community: [
            { face: Face.Four, suit: Suit.Diamonds },
            { face: Face.Four, suit: Suit.Clubs },
            { face: Face.Four, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
            { face: Face.Seven, suit: Suit.Diamonds },
          ],
        };

        const fullHouseEqualB = {
          pocket: [
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Three, suit: Suit.Spades },
          ],
          community: [
            { face: Face.Four, suit: Suit.Hearts },
            { face: Face.Four, suit: Suit.Spades },
            { face: Face.Four, suit: Suit.Clubs },
            { face: Face.Eight, suit: Suit.Diamonds },
            { face: Face.Seven, suit: Suit.Hearts },
          ],
        };

        expect(findHighestHands([fullHouseEqualA, fullHouseEqualB])).toEqual([
          {
            hand: fullHouseEqualA,
            ranked: expect.objectContaining({ rank: HandRank.FullHouse }),
          },
          {
            hand: fullHouseEqualB,
            ranked: expect.objectContaining({ rank: HandRank.FullHouse }),
          },
        ]);
      });
    });
  });
});
