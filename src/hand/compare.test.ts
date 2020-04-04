import { Suit, Face } from '../card/constants';
import { findHighestHands } from './compare';
import {
  ranksFourOfAKind,
  ranksFullHouse,
  ranksTwoPair,
  ranksRoyalFlushContainsPair,
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
          ranksRoyalFlushContainsPair,
        ]),
      ).toEqual([
        {
          candidate: ranksRoyalFlushContainsPair,
          hand: expect.objectContaining({ rank: HandRank.RoyalFlush }),
        },
      ]);
    });

    describe('resolve tied hand ranks', () => {
      test('high card', () => {
        const highCardHighKicker = {
          pocketCards: [
            [Face.Jack, Suit.Clubs],
            [Face.Eight, Suit.Spades],
          ],
          communityCards: [
            [Face.Seven, Suit.Diamonds],
            [Face.Two, Suit.Diamonds],
            [Face.Three, Suit.Clubs],
            [Face.Four, Suit.Clubs],
            [Face.Queen, Suit.Diamonds],
          ],
        } as const;
        const highCardLowKicker = {
          pocketCards: [
            [Face.Jack, Suit.Clubs],
            [Face.Eight, Suit.Spades],
          ],
          communityCards: [
            [Face.Six, Suit.Diamonds],
            [Face.Two, Suit.Diamonds],
            [Face.Three, Suit.Clubs],
            [Face.Four, Suit.Clubs],
            [Face.Queen, Suit.Diamonds],
          ],
        } as const;

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
            [Face.Jack, Suit.Clubs],
            [Face.Eight, Suit.Spades],
          ],
          communityCards: [
            [Face.Six, Suit.Diamonds],
            [Face.Two, Suit.Diamonds],
            [Face.Three, Suit.Clubs],
            [Face.Four, Suit.Clubs],
            [Face.Queen, Suit.Diamonds],
          ],
        } as const;
        const highCardEqualB = {
          pocketCards: [
            [Face.Jack, Suit.Spades],
            [Face.Eight, Suit.Diamonds],
          ],
          communityCards: [
            [Face.Six, Suit.Clubs],
            [Face.Two, Suit.Hearts],
            [Face.Three, Suit.Spades],
            [Face.Four, Suit.Hearts],
            [Face.Queen, Suit.Spades],
          ],
        } as const;

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
            [Face.Three, Suit.Clubs],
            [Face.Three, Suit.Diamonds],
          ],
          communityCards: [
            [Face.King, Suit.Diamonds],
            [Face.Five, Suit.Clubs],
            [Face.Ace, Suit.Spades],
            [Face.Eight, Suit.Hearts],
            [Face.Seven, Suit.Diamonds],
          ],
        } as const;

        const pairFives = {
          pocketCards: [
            [Face.Three, Suit.Hearts],
            [Face.Five, Suit.Clubs],
          ],
          communityCards: [
            [Face.King, Suit.Diamonds],
            [Face.Five, Suit.Diamonds],
            [Face.Ace, Suit.Hearts],
            [Face.Eight, Suit.Diamonds],
            [Face.Seven, Suit.Hearts],
          ],
        } as const;

        expect(findHighestHands([pairThrees, pairFives])).toEqual([
          {
            candidate: pairFives,
            hand: expect.objectContaining({ rank: HandRank.Pair }),
          },
        ]);

        const pairThreesHighKicker = {
          pocketCards: [
            [Face.Three, Suit.Clubs],
            [Face.Three, Suit.Diamonds],
          ],
          communityCards: [
            [Face.King, Suit.Diamonds],
            [Face.Five, Suit.Clubs],
            [Face.Ace, Suit.Spades],
            [Face.Eight, Suit.Hearts],
            [Face.Seven, Suit.Diamonds],
          ],
        } as const;

        const pairThreesLowKicker = {
          pocketCards: [
            [Face.Three, Suit.Hearts],
            [Face.Three, Suit.Spades],
          ],
          communityCards: [
            [Face.Four, Suit.Hearts],
            [Face.Five, Suit.Spades],
            [Face.Ace, Suit.Clubs],
            [Face.Eight, Suit.Diamonds],
            [Face.Seven, Suit.Hearts],
          ],
        } as const;

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
            [Face.Three, Suit.Clubs],
            [Face.Three, Suit.Diamonds],
          ],
          communityCards: [
            [Face.King, Suit.Diamonds],
            [Face.Five, Suit.Clubs],
            [Face.Ace, Suit.Spades],
            [Face.Eight, Suit.Hearts],
            [Face.Seven, Suit.Diamonds],
          ],
        } as const;

        const pairEqualB = {
          pocketCards: [
            [Face.Three, Suit.Hearts],
            [Face.Three, Suit.Spades],
          ],
          communityCards: [
            [Face.King, Suit.Hearts],
            [Face.Five, Suit.Spades],
            [Face.Ace, Suit.Clubs],
            [Face.Eight, Suit.Diamonds],
            [Face.Seven, Suit.Hearts],
          ],
        } as const;

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
            [Face.Three, Suit.Clubs],
            [Face.Three, Suit.Diamonds],
          ],
          communityCards: [
            [Face.Five, Suit.Diamonds],
            [Face.Five, Suit.Clubs],
            [Face.Ace, Suit.Spades],
            [Face.Eight, Suit.Hearts],
            [Face.Seven, Suit.Diamonds],
          ],
        } as const;

        const twoPairSixesOverThrees = {
          pocketCards: [
            [Face.Three, Suit.Hearts],
            [Face.Three, Suit.Spades],
          ],
          communityCards: [
            [Face.Six, Suit.Diamonds],
            [Face.Six, Suit.Clubs],
            [Face.Ace, Suit.Clubs],
            [Face.Eight, Suit.Diamonds],
            [Face.Seven, Suit.Hearts],
          ],
        } as const;

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
            [Face.Four, Suit.Hearts],
            [Face.Four, Suit.Spades],
          ],
          communityCards: [
            [Face.Five, Suit.Hearts],
            [Face.Five, Suit.Spades],
            [Face.Ace, Suit.Clubs],
            [Face.Eight, Suit.Diamonds],
            [Face.Seven, Suit.Hearts],
          ],
        } as const;

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
            [Face.Three, Suit.Clubs],
            [Face.Three, Suit.Diamonds],
          ],
          communityCards: [
            [Face.Four, Suit.Diamonds],
            [Face.Four, Suit.Clubs],
            [Face.Ace, Suit.Spades],
            [Face.Eight, Suit.Hearts],
            [Face.Seven, Suit.Diamonds],
          ],
        } as const;

        const twoPairFoursOverThreesLowKicker = {
          pocketCards: [
            [Face.Three, Suit.Hearts],
            [Face.Three, Suit.Spades],
          ],
          communityCards: [
            [Face.Four, Suit.Hearts],
            [Face.Four, Suit.Spades],
            [Face.King, Suit.Clubs],
            [Face.Eight, Suit.Diamonds],
            [Face.Seven, Suit.Hearts],
          ],
        } as const;

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
            [Face.Three, Suit.Clubs],
            [Face.Three, Suit.Diamonds],
          ],
          communityCards: [
            [Face.Four, Suit.Diamonds],
            [Face.Four, Suit.Clubs],
            [Face.Ace, Suit.Spades],
            [Face.Eight, Suit.Hearts],
            [Face.Seven, Suit.Diamonds],
          ],
        } as const;

        const twoPairEqualB = {
          pocketCards: [
            [Face.Three, Suit.Hearts],
            [Face.Three, Suit.Spades],
          ],
          communityCards: [
            [Face.Four, Suit.Hearts],
            [Face.Four, Suit.Spades],
            [Face.Ace, Suit.Clubs],
            [Face.Eight, Suit.Diamonds],
            [Face.Seven, Suit.Hearts],
          ],
        } as const;

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
            [Face.Three, Suit.Clubs],
            [Face.Three, Suit.Diamonds],
          ],
          communityCards: [
            [Face.King, Suit.Diamonds],
            [Face.Three, Suit.Spades],
            [Face.Ace, Suit.Spades],
            [Face.Eight, Suit.Hearts],
            [Face.Seven, Suit.Diamonds],
          ],
        } as const;

        const threeOfAKindFives = {
          pocketCards: [
            [Face.Five, Suit.Hearts],
            [Face.Five, Suit.Clubs],
          ],
          communityCards: [
            [Face.King, Suit.Diamonds],
            [Face.Five, Suit.Diamonds],
            [Face.Ace, Suit.Hearts],
            [Face.Eight, Suit.Diamonds],
            [Face.Seven, Suit.Hearts],
          ],
        } as const;

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
            [Face.Eight, Suit.Spades],
            [Face.Six, Suit.Hearts],
          ],
          communityCards: [
            [Face.Four, Suit.Diamonds],
            [Face.Two, Suit.Clubs],
            [Face.Three, Suit.Diamonds],
            [Face.Five, Suit.Clubs],
            [Face.Six, Suit.Diamonds],
          ],
        } as const;
        const straightAceSpadesLow = {
          pocketCards: [
            [Face.Ace, Suit.Spades],
            [Face.Eight, Suit.Hearts],
          ],
          communityCards: [
            [Face.Four, Suit.Hearts],
            [Face.Two, Suit.Spades],
            [Face.Three, Suit.Hearts],
            [Face.Five, Suit.Spades],
            [Face.Eight, Suit.Hearts],
          ],
        } as const;

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
            [Face.Eight, Suit.Clubs],
            [Face.Six, Suit.Diamonds],
          ],
          communityCards: [
            [Face.Four, Suit.Hearts],
            [Face.Two, Suit.Spades],
            [Face.Three, Suit.Hearts],
            [Face.Five, Suit.Spades],
            [Face.Six, Suit.Hearts],
          ],
        } as const;

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
            [Face.Three, Suit.Diamonds],
            [Face.Jack, Suit.Diamonds],
          ],
          communityCards: [
            [Face.Four, Suit.Diamonds],
            [Face.Two, Suit.Diamonds],
            [Face.Three, Suit.Spades],
            [Face.Five, Suit.Diamonds],
            [Face.Jack, Suit.Hearts],
          ],
        } as const;
        const flushNineHighHearts = {
          pocketCards: [
            [Face.Three, Suit.Hearts],
            [Face.Nine, Suit.Hearts],
          ],
          communityCards: [
            [Face.Four, Suit.Hearts],
            [Face.Two, Suit.Hearts],
            [Face.Three, Suit.Clubs],
            [Face.Five, Suit.Hearts],
            [Face.Nine, Suit.Hearts],
          ],
        } as const;

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
            [Face.Three, Suit.Spades],
            [Face.Jack, Suit.Spades],
          ],
          communityCards: [
            [Face.Four, Suit.Spades],
            [Face.Two, Suit.Spades],
            [Face.Three, Suit.Diamonds],
            [Face.Five, Suit.Spades],
            [Face.Jack, Suit.Hearts],
          ],
        } as const;

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
            [Face.Three, Suit.Clubs],
            [Face.Three, Suit.Diamonds],
          ],
          communityCards: [
            [Face.Five, Suit.Diamonds],
            [Face.Five, Suit.Clubs],
            [Face.Five, Suit.Spades],
            [Face.Eight, Suit.Hearts],
            [Face.Seven, Suit.Diamonds],
          ],
        } as const;

        const fullHouseSixesOverThrees = {
          pocketCards: [
            [Face.Three, Suit.Hearts],
            [Face.Three, Suit.Spades],
          ],
          communityCards: [
            [Face.Six, Suit.Diamonds],
            [Face.Six, Suit.Clubs],
            [Face.Six, Suit.Hearts],
            [Face.Eight, Suit.Diamonds],
            [Face.Seven, Suit.Hearts],
          ],
        } as const;

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
            [Face.Three, Suit.Clubs],
            [Face.Three, Suit.Diamonds],
          ],
          communityCards: [
            [Face.King, Suit.Diamonds],
            [Face.Three, Suit.Spades],
            [Face.Three, Suit.Hearts],
            [Face.Eight, Suit.Hearts],
            [Face.Seven, Suit.Diamonds],
          ],
        } as const;

        const fourOfAKindFives = {
          pocketCards: [
            [Face.Five, Suit.Hearts],
            [Face.Five, Suit.Clubs],
          ],
          communityCards: [
            [Face.King, Suit.Diamonds],
            [Face.Five, Suit.Diamonds],
            [Face.Five, Suit.Spades],
            [Face.Eight, Suit.Diamonds],
            [Face.Seven, Suit.Hearts],
          ],
        } as const;

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
            [Face.Two, Suit.Clubs],
            [Face.Six, Suit.Clubs],
          ],
          communityCards: [
            [Face.Four, Suit.Clubs],
            [Face.Three, Suit.Clubs],
            [Face.Eight, Suit.Spades],
            [Face.Five, Suit.Clubs],
            [Face.Six, Suit.Spades],
          ],
        } as const;
        const straightFlushAceLow = {
          pocketCards: [
            [Face.Ace, Suit.Spades],
            [Face.Eight, Suit.Hearts],
          ],
          communityCards: [
            [Face.Four, Suit.Spades],
            [Face.Two, Suit.Spades],
            [Face.Three, Suit.Spades],
            [Face.Five, Suit.Spades],
            [Face.Eight, Suit.Diamonds],
          ],
        } as const;

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
            [Face.Two, Suit.Clubs],
            [Face.Six, Suit.Clubs],
          ],
          communityCards: [
            [Face.Four, Suit.Clubs],
            [Face.Three, Suit.Clubs],
            [Face.Eight, Suit.Spades],
            [Face.Five, Suit.Clubs],
            [Face.Six, Suit.Spades],
          ],
        } as const;
        const straightFlushSixHighSpades = {
          pocketCards: [
            [Face.Two, Suit.Spades],
            [Face.Six, Suit.Spades],
          ],
          communityCards: [
            [Face.Four, Suit.Spades],
            [Face.Three, Suit.Spades],
            [Face.Eight, Suit.Hearts],
            [Face.Five, Suit.Spades],
            [Face.Six, Suit.Hearts],
          ],
        } as const;

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
            [Face.King, Suit.Diamonds],
            [Face.Queen, Suit.Diamonds],
          ],
          communityCards: [
            [Face.Ace, Suit.Diamonds],
            [Face.Ten, Suit.Diamonds],
            [Face.Eight, Suit.Spades],
            [Face.Jack, Suit.Diamonds],
            [Face.Jack, Suit.Spades],
          ],
        } as const;
        const royalFlushSpades = {
          pocketCards: [
            [Face.King, Suit.Spades],
            [Face.Queen, Suit.Spades],
          ],
          communityCards: [
            [Face.Ace, Suit.Spades],
            [Face.Ten, Suit.Spades],
            [Face.Eight, Suit.Spades],
            [Face.Jack, Suit.Spades],
            [Face.Jack, Suit.Spades],
          ],
        } as const;

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
