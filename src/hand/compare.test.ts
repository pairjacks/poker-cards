import { Suit, Face } from '../card/constants';
import { findHighestHands } from './compare';
import {
  ranksFourOfAKind,
  ranksFullHouse,
  ranksTwoPair,
  ranksRoyalFlushContainspair,
} from './__fixtures__/hands';
import { HandRank } from './constants';

describe('compare', () => {
  describe('findHighestHands', () => {
    it('should find natural highest hand', () => {
      expect(
        findHighestHands([
          ranksFourOfAKind,
          ranksFullHouse,
          ranksTwoPair,
          ranksRoyalFlushContainspair,
        ]),
      ).toEqual([
        {
          candidate: ranksRoyalFlushContainspair,
          hand: expect.objectContaining({ rank: HandRank.RoyalFlush }),
        },
      ]);
    });

    describe('resolve tied hand ranks', () => {
      test('high card', () => {
        const highCardHighKicker = {
          pocketCards: [
            { face: Face.Jack, suit: Suit.Clubs },
            { face: Face.Eight, suit: Suit.Spades },
          ],
          communityCards: [
            { face: Face.Seven, suit: Suit.Diamonds },
            { face: Face.Two, suit: Suit.Diamonds },
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Four, suit: Suit.Clubs },
            { face: Face.Queen, suit: Suit.Diamonds },
          ],
        };
        const highCardLowKicker = {
          pocketCards: [
            { face: Face.Jack, suit: Suit.Clubs },
            { face: Face.Eight, suit: Suit.Spades },
          ],
          communityCards: [
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
          pocketCards: [
            { face: Face.Jack, suit: Suit.Clubs },
            { face: Face.Eight, suit: Suit.Spades },
          ],
          communityCards: [
            { face: Face.Six, suit: Suit.Diamonds },
            { face: Face.Two, suit: Suit.Diamonds },
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Four, suit: Suit.Clubs },
            { face: Face.Queen, suit: Suit.Diamonds },
          ],
        };
        const highCardEqualB = {
          pocketCards: [
            { face: Face.Jack, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Diamonds },
          ],
          communityCards: [
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

      test('pair', () => {
        const pairThrees = {
          pocketCards: [
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Diamonds },
          ],
          communityCards: [
            { face: Face.King, suit: Suit.Diamonds },
            { face: Face.Five, suit: Suit.Clubs },
            { face: Face.Ace, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
            { face: Face.Seven, suit: Suit.Diamonds },
          ],
        };

        const pairFives = {
          pocketCards: [
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Five, suit: Suit.Clubs },
          ],
          communityCards: [
            { face: Face.King, suit: Suit.Diamonds },
            { face: Face.Five, suit: Suit.Diamonds },
            { face: Face.Ace, suit: Suit.Hearts },
            { face: Face.Eight, suit: Suit.Diamonds },
            { face: Face.Seven, suit: Suit.Hearts },
          ],
        };

        expect(findHighestHands([pairThrees, pairFives])).toEqual([
          {
            candidate: pairFives,
            hand: expect.objectContaining({ rank: HandRank.Pair }),
          },
        ]);

        const pairThreesHighKicker = {
          pocketCards: [
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Diamonds },
          ],
          communityCards: [
            { face: Face.King, suit: Suit.Diamonds },
            { face: Face.Five, suit: Suit.Clubs },
            { face: Face.Ace, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
            { face: Face.Seven, suit: Suit.Diamonds },
          ],
        };

        const pairThreesLowKicker = {
          pocketCards: [
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Three, suit: Suit.Spades },
          ],
          communityCards: [
            { face: Face.Four, suit: Suit.Hearts },
            { face: Face.Five, suit: Suit.Spades },
            { face: Face.Ace, suit: Suit.Clubs },
            { face: Face.Eight, suit: Suit.Diamonds },
            { face: Face.Seven, suit: Suit.Hearts },
          ],
        };

        expect(
          findHighestHands([pairThreesLowKicker, pairThreesHighKicker]),
        ).toEqual([
          {
            candidate: pairThreesHighKicker,
            hand: expect.objectContaining({ rank: HandRank.Pair }),
          },
        ]);

        const pairEqualA = {
          pocketCards: [
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Diamonds },
          ],
          communityCards: [
            { face: Face.King, suit: Suit.Diamonds },
            { face: Face.Five, suit: Suit.Clubs },
            { face: Face.Ace, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
            { face: Face.Seven, suit: Suit.Diamonds },
          ],
        };

        const pairEqualB = {
          pocketCards: [
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Three, suit: Suit.Spades },
          ],
          communityCards: [
            { face: Face.King, suit: Suit.Hearts },
            { face: Face.Five, suit: Suit.Spades },
            { face: Face.Ace, suit: Suit.Clubs },
            { face: Face.Eight, suit: Suit.Diamonds },
            { face: Face.Seven, suit: Suit.Hearts },
          ],
        };

        expect(findHighestHands([pairEqualA, pairEqualB])).toEqual([
          {
            candidate: pairEqualA,
            hand: expect.objectContaining({ rank: HandRank.Pair }),
          },
          {
            candidate: pairEqualB,
            hand: expect.objectContaining({ rank: HandRank.Pair }),
          },
        ]);
      });

      test('two pair', () => {
        const twoPairFivesOverThrees = {
          pocketCards: [
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Diamonds },
          ],
          communityCards: [
            { face: Face.Five, suit: Suit.Diamonds },
            { face: Face.Five, suit: Suit.Clubs },
            { face: Face.Ace, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
            { face: Face.Seven, suit: Suit.Diamonds },
          ],
        };

        const twoPairSixesOverThrees = {
          pocketCards: [
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Three, suit: Suit.Spades },
          ],
          communityCards: [
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
          pocketCards: [
            { face: Face.Four, suit: Suit.Hearts },
            { face: Face.Four, suit: Suit.Spades },
          ],
          communityCards: [
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
          pocketCards: [
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Diamonds },
          ],
          communityCards: [
            { face: Face.Four, suit: Suit.Diamonds },
            { face: Face.Four, suit: Suit.Clubs },
            { face: Face.Ace, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
            { face: Face.Seven, suit: Suit.Diamonds },
          ],
        };

        const twoPairFoursOverThreesLowKicker = {
          pocketCards: [
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Three, suit: Suit.Spades },
          ],
          communityCards: [
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
          pocketCards: [
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Diamonds },
          ],
          communityCards: [
            { face: Face.Four, suit: Suit.Diamonds },
            { face: Face.Four, suit: Suit.Clubs },
            { face: Face.Ace, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
            { face: Face.Seven, suit: Suit.Diamonds },
          ],
        };

        const twoPairEqualB = {
          pocketCards: [
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Three, suit: Suit.Spades },
          ],
          communityCards: [
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
          pocketCards: [
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Diamonds },
          ],
          communityCards: [
            { face: Face.King, suit: Suit.Diamonds },
            { face: Face.Three, suit: Suit.Spades },
            { face: Face.Ace, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
            { face: Face.Seven, suit: Suit.Diamonds },
          ],
        };

        const threeOfAKindFives = {
          pocketCards: [
            { face: Face.Five, suit: Suit.Hearts },
            { face: Face.Five, suit: Suit.Clubs },
          ],
          communityCards: [
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
          pocketCards: [
            { face: Face.Eight, suit: Suit.Spades },
            { face: Face.Six, suit: Suit.Hearts },
          ],
          communityCards: [
            { face: Face.Four, suit: Suit.Diamonds },
            { face: Face.Two, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Diamonds },
            { face: Face.Five, suit: Suit.Clubs },
            { face: Face.Six, suit: Suit.Diamonds },
          ],
        };
        const straightAceSpadesLow = {
          pocketCards: [
            { face: Face.Ace, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
          ],
          communityCards: [
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
          pocketCards: [
            { face: Face.Eight, suit: Suit.Clubs },
            { face: Face.Six, suit: Suit.Diamonds },
          ],
          communityCards: [
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
          pocketCards: [
            { face: Face.Three, suit: Suit.Diamonds },
            { face: Face.Jack, suit: Suit.Diamonds },
          ],
          communityCards: [
            { face: Face.Four, suit: Suit.Diamonds },
            { face: Face.Two, suit: Suit.Diamonds },
            { face: Face.Three, suit: Suit.Spades },
            { face: Face.Five, suit: Suit.Diamonds },
            { face: Face.Jack, suit: Suit.Hearts },
          ],
        };
        const flushNineHighHearts = {
          pocketCards: [
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Nine, suit: Suit.Hearts },
          ],
          communityCards: [
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
          pocketCards: [
            { face: Face.Three, suit: Suit.Spades },
            { face: Face.Jack, suit: Suit.Spades },
          ],
          communityCards: [
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
          pocketCards: [
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Diamonds },
          ],
          communityCards: [
            { face: Face.Five, suit: Suit.Diamonds },
            { face: Face.Five, suit: Suit.Clubs },
            { face: Face.Five, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
            { face: Face.Seven, suit: Suit.Diamonds },
          ],
        };

        const fullHouseSixesOverThrees = {
          pocketCards: [
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Three, suit: Suit.Spades },
          ],
          communityCards: [
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
          pocketCards: [
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Diamonds },
          ],
          communityCards: [
            { face: Face.King, suit: Suit.Diamonds },
            { face: Face.Three, suit: Suit.Spades },
            { face: Face.Three, suit: Suit.Hearts },
            { face: Face.Eight, suit: Suit.Hearts },
            { face: Face.Seven, suit: Suit.Diamonds },
          ],
        };

        const fourOfAKindFives = {
          pocketCards: [
            { face: Face.Five, suit: Suit.Hearts },
            { face: Face.Five, suit: Suit.Clubs },
          ],
          communityCards: [
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
          pocketCards: [
            { face: Face.Two, suit: Suit.Clubs },
            { face: Face.Six, suit: Suit.Clubs },
          ],
          communityCards: [
            { face: Face.Four, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Eight, suit: Suit.Spades },
            { face: Face.Five, suit: Suit.Clubs },
            { face: Face.Six, suit: Suit.Spades },
          ],
        };
        const straightFlushAceLow = {
          pocketCards: [
            { face: Face.Ace, suit: Suit.Spades },
            { face: Face.Eight, suit: Suit.Hearts },
          ],
          communityCards: [
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
          pocketCards: [
            { face: Face.Two, suit: Suit.Clubs },
            { face: Face.Six, suit: Suit.Clubs },
          ],
          communityCards: [
            { face: Face.Four, suit: Suit.Clubs },
            { face: Face.Three, suit: Suit.Clubs },
            { face: Face.Eight, suit: Suit.Spades },
            { face: Face.Five, suit: Suit.Clubs },
            { face: Face.Six, suit: Suit.Spades },
          ],
        };
        const straightFlushSixHighSpades = {
          pocketCards: [
            { face: Face.Two, suit: Suit.Spades },
            { face: Face.Six, suit: Suit.Spades },
          ],
          communityCards: [
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
          pocketCards: [
            { face: Face.King, suit: Suit.Diamonds },
            { face: Face.Queen, suit: Suit.Diamonds },
          ],
          communityCards: [
            { face: Face.Ace, suit: Suit.Diamonds },
            { face: Face.Ten, suit: Suit.Diamonds },
            { face: Face.Eight, suit: Suit.Spades },
            { face: Face.Jack, suit: Suit.Diamonds },
            { face: Face.Jack, suit: Suit.Spades },
          ],
        };
        const royalFlushSpades = {
          pocketCards: [
            { face: Face.King, suit: Suit.Spades },
            { face: Face.Queen, suit: Suit.Spades },
          ],
          communityCards: [
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
