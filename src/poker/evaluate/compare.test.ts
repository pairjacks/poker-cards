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
          candidate: ranksRoyalFlushContainsOnePair,
          hand: expect.objectContaining({ rank: HandRank.RoyalFlush }),
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
            candidate: highCardHighKicker,
            hand: expect.objectContaining({ rank: HandRank.HighCard }),
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
            candidate: highCardEqualA,
            hand: expect.objectContaining({ rank: HandRank.HighCard }),
          },
          {
            candidate: highCardEqualB,
            hand: expect.objectContaining({ rank: HandRank.HighCard }),
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
            candidate: onePairFives,
            hand: expect.objectContaining({ rank: HandRank.OnePair }),
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
            candidate: onePairThreesHighKicker,
            hand: expect.objectContaining({ rank: HandRank.OnePair }),
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
            candidate: onePairEqualA,
            hand: expect.objectContaining({ rank: HandRank.OnePair }),
          },
          {
            candidate: onePairEqualB,
            hand: expect.objectContaining({ rank: HandRank.OnePair }),
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
            candidate: twoPairSixesOverThrees,
            hand: expect.objectContaining({ rank: HandRank.TwoPair }),
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
            candidate: twoPairFivesOverFours,
            hand: expect.objectContaining({ rank: HandRank.TwoPair }),
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
            candidate: twoPairFoursOverThreesHighKicker,
            hand: expect.objectContaining({ rank: HandRank.TwoPair }),
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
            candidate: twoPairEqualA,
            hand: expect.objectContaining({ rank: HandRank.TwoPair }),
          },
          {
            candidate: twoPairEqualB,
            hand: expect.objectContaining({ rank: HandRank.TwoPair }),
          },
        ]);
      });

      test('three of a kind', () => {
        // It should be impossible for two hands to have the same
        // value three of a kind, so a natural higher hand should
        // be determined by high rank card

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
            candidate: threeOfAKindFives,
            hand: expect.objectContaining({ rank: HandRank.ThreeOfAKind }),
          },
        ]);
      });

      test('straight', () => {
        const straightEightSpadesHigh = {
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
        const straightAceSpadesLow = {
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

        expect(
          findHighestHands([straightEightSpadesHigh, straightAceSpadesLow]),
        ).toEqual([
          {
            candidate: straightEightSpadesHigh,
            hand: expect.objectContaining({ rank: HandRank.Straight }),
          },
        ]);

        const straightEightClubsHigh = {
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

        expect(
          findHighestHands([straightEightClubsHigh, straightEightSpadesHigh]),
        ).toEqual([
          {
            candidate: straightEightClubsHigh,
            hand: expect.objectContaining({ rank: HandRank.Straight }),
          },
          {
            candidate: straightEightSpadesHigh,
            hand: expect.objectContaining({ rank: HandRank.Straight }),
          },
        ]);
      });

      test('flush', () => {
        const flushJackHighDiamonds = {
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
        const flushNineHighHearts = {
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

        expect(
          findHighestHands([flushJackHighDiamonds, flushNineHighHearts]),
        ).toEqual([
          {
            candidate: flushJackHighDiamonds,
            hand: expect.objectContaining({ rank: HandRank.Flush }),
          },
        ]);

        const flushJackHighSpades = {
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

        expect(
          findHighestHands([flushJackHighDiamonds, flushJackHighSpades]),
        ).toEqual([
          {
            candidate: flushJackHighDiamonds,
            hand: expect.objectContaining({ rank: HandRank.Flush }),
          },
          {
            candidate: flushJackHighSpades,
            hand: expect.objectContaining({ rank: HandRank.Flush }),
          },
        ]);
      });

      test('full house', () => {
        // It should be impossible for two hands to contain
        // the same three high cards in a full house, so there should
        // always be a natural higher hand on high card value

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
            { face: Face.Six, suit: Suit.Hearts },
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
            candidate: fullHouseSixesOverThrees,
            hand: expect.objectContaining({ rank: HandRank.FullHouse }),
          },
        ]);
      });

      test('four of a kind', () => {
        // It should be impossible for two hands to contain equal value
        // four-of-a-kinds, so there should always be a natural better hand
        // on highest rank cards.

        const fourOfAKindThrees = {
          pocket: [
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Diamonds },
          ],
          community: [
            { face: Face.King, suit: Suit.Diamonds },
            { face: Face.Three, suit: Suit.Spades },
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Eight, suit: Suit.Hearts },
            { face: Face.Seven, suit: Suit.Diamonds },
          ],
        };

        const fourOfAKindFives = {
          pocket: [
            { face: Face.Five, suit: Suit.Hearts },
            { face: Face.Five, suit: Suit.Clubs },
          ],
          community: [
            { face: Face.King, suit: Suit.Diamonds },
            { face: Face.Five, suit: Suit.Diamonds },
            { face: Face.Five, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Diamonds },
            { face: Face.Seven, suit: Suit.Hearts },
          ],
        };

        expect(findHighestHands([fourOfAKindThrees, fourOfAKindFives])).toEqual(
          [
            {
              candidate: fourOfAKindFives,
              hand: expect.objectContaining({ rank: HandRank.FourOfAKind }),
            },
          ],
        );
      });

      test('straight flush', () => {
        const straightFlushEightHigh = {
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
        const straightFlushAceLow = {
          pocket: [
            { face: Face.Ace, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
          ],
          community: [
            { face: Face.Four, suit: Suit.Spades },
            { face: Face.Two, suit: Suit.Spades },
            { face: Face.Three, suit: Suit.Spades },
            { face: Face.Five, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Diamonds },
          ],
        };

        expect(
          findHighestHands([straightFlushEightHigh, straightFlushAceLow]),
        ).toEqual([
          {
            candidate: straightFlushEightHigh,
            hand: expect.objectContaining({ rank: HandRank.StraightFlush }),
          },
        ]);

        const straightFlushSixHighClubs = {
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
        const straightFlushSixHighSpades = {
          pocket: [
            { face: Face.Two, suit: Suit.Spades },
            { face: Face.Six, suit: Suit.Spades },
          ],
          community: [
            { face: Face.Four, suit: Suit.Spades },
            { face: Face.Three, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
            { face: Face.Five, suit: Suit.Spades },
            { face: Face.Six, suit: Suit.Hearts },
          ],
        };

        expect(
          findHighestHands([
            straightFlushSixHighClubs,
            straightFlushSixHighSpades,
          ]),
        ).toEqual([
          {
            candidate: straightFlushSixHighClubs,
            hand: expect.objectContaining({ rank: HandRank.StraightFlush }),
          },
          {
            candidate: straightFlushSixHighSpades,
            hand: expect.objectContaining({ rank: HandRank.StraightFlush }),
          },
        ]);
      });

      test('royal flush', () => {
        const royalFlushDiamonds = {
          pocket: [
            { face: Face.King, suit: Suit.Diamonds },
            { face: Face.Queen, suit: Suit.Diamonds },
          ],
          community: [
            { face: Face.Ace, suit: Suit.Diamonds },
            { face: Face.Ten, suit: Suit.Diamonds },
            { face: Face.Eight, suit: Suit.Spades },
            { face: Face.Jack, suit: Suit.Diamonds },
            { face: Face.Jack, suit: Suit.Spades },
          ],
        };
        const royalFlushSpades = {
          pocket: [
            { face: Face.King, suit: Suit.Spades },
            { face: Face.Queen, suit: Suit.Spades },
          ],
          community: [
            { face: Face.Ace, suit: Suit.Spades },
            { face: Face.Ten, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Spades },
            { face: Face.Jack, suit: Suit.Spades },
            { face: Face.Jack, suit: Suit.Spades },
          ],
        };

        expect(
          findHighestHands([royalFlushDiamonds, royalFlushSpades]),
        ).toEqual([
          {
            candidate: royalFlushDiamonds,
            hand: expect.objectContaining({ rank: HandRank.RoyalFlush }),
          },
          {
            candidate: royalFlushSpades,
            hand: expect.objectContaining({ rank: HandRank.RoyalFlush }),
          },
        ]);
      });
    });
  });
});
