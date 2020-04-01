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
          findHighestHand([highCardHighKicker, highCardLowKicker])?.hand,
        ).toBe(highCardHighKicker);

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

        expect(findHighestHand([onePairThrees, onePairFives])?.hand).toBe(
          onePairFives,
        );

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
          findHighestHand([onePairThreesLowKicker, onePairThreesHighKicker])
            ?.hand,
        ).toBe(onePairThreesHighKicker);

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

        expect(findHighestHand([twoPairThreeFive, twoPairThreeSix])?.hand).toBe(
          twoPairThreeSix,
        );

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

        expect(findHighestHand([twoPairThreeFive, twoPairFourFive])?.hand).toBe(
          twoPairFourFive,
        );

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
          ])?.hand,
        ).toBe(twoPairThreeFourHighKicker);

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
          findHighestHand([threeOfAKindThrees, threeOfAKindFives])?.hand,
        ).toBe(threeOfAKindFives);

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
          ])?.hand,
        ).toBe(threeOfAKindThreesHighKicker);

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
    });
  });
});
