import { Face, Suit } from '../card/constants';
import { HandRank } from './constants';
import { extractHand } from './extract';

describe('extract', () => {
  describe('extractHand', () => {
    it('handles empty state', () => {
      expect(
        extractHand({
          pocketCards: [],
          communityCards: [],
        }),
      ).toEqual({
        rank: HandRank.HighCard,
        rankCards: [],
        kickerCards: [],
      });

      expect(
        extractHand({
          pocketCards: [[Face.Ace, Suit.Clubs]],
          communityCards: [],
        }),
      ).toEqual({
        rank: HandRank.HighCard,
        rankCards: [[Face.Ace, Suit.Clubs]],
        kickerCards: [],
      });
    });

    it('extracts high card', () => {
      expect(
        extractHand({
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
        }),
      ).toEqual({
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
      expect(
        extractHand({
          pocketCards: [
            [Face.Six, Suit.Clubs],
            [Face.Two, Suit.Diamonds],
          ],
          communityCards: [
            [Face.Six, Suit.Diamonds],
            [Face.Jack, Suit.Clubs],
            [Face.Eight, Suit.Spades],
            [Face.Four, Suit.Clubs],
            [Face.Queen, Suit.Diamonds],
          ],
        }),
      ).toEqual({
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
      expect(
        extractHand({
          pocketCards: [
            [Face.Four, Suit.Clubs],
            [Face.Jack, Suit.Diamonds],
          ],
          communityCards: [
            [Face.Six, Suit.Diamonds],
            [Face.Two, Suit.Diamonds],
            [Face.Eight, Suit.Spades],
            [Face.Six, Suit.Clubs],
            [Face.Jack, Suit.Clubs],
          ],
        }),
      ).toEqual({
        rank: HandRank.TwoPair,
        rankCards: [
          [Face.Jack, Suit.Clubs],
          [Face.Jack, Suit.Diamonds],
          [Face.Six, Suit.Clubs],
          [Face.Six, Suit.Diamonds],
        ],
        kickerCards: [[Face.Eight, Suit.Spades]],
      });

      // Contains extra pair sixes
      expect(
        extractHand({
          pocketCards: [
            [Face.Queen, Suit.Clubs],
            [Face.Jack, Suit.Clubs],
          ],
          communityCards: [
            [Face.Six, Suit.Diamonds],
            [Face.Jack, Suit.Diamonds],
            [Face.Eight, Suit.Spades],
            [Face.Six, Suit.Clubs],
            [Face.Queen, Suit.Spades],
          ],
        }),
      ).toEqual({
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
      expect(
        extractHand({
          pocketCards: [
            [Face.Eight, Suit.Spades],
            [Face.Six, Suit.Clubs],
          ],
          communityCards: [
            [Face.Six, Suit.Diamonds],
            [Face.Two, Suit.Diamonds],
            [Face.Jack, Suit.Diamonds],
            [Face.Six, Suit.Hearts],
            [Face.Queen, Suit.Clubs],
          ],
        } as const),
      ).toEqual({
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
      expect(
        extractHand({
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
        }),
      ).toEqual({
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

      // Ace low
      expect(
        extractHand({
          pocketCards: [
            [Face.Ace, Suit.Spades],
            [Face.Eight, Suit.Hearts],
          ],
          communityCards: [
            [Face.Four, Suit.Diamonds],
            [Face.Two, Suit.Clubs],
            [Face.Three, Suit.Diamonds],
            [Face.Five, Suit.Clubs],
            [Face.Eight, Suit.Diamonds],
          ],
        }),
      ).toEqual({
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

      // Observed bugs

      const ambiguousAce = extractHand({
        pocketCards: [
          [Face.Ace, Suit.Diamonds],
          [Face.Five, Suit.Diamonds],
        ],
        communityCards: [
          [Face.Nine, Suit.Diamonds],
          [Face.Queen, Suit.Clubs],
          [Face.Seven, Suit.Hearts],
          [Face.King, Suit.Clubs],
          [Face.Jack, Suit.Diamonds],
        ],
      });

      expect(ambiguousAce).not.toEqual(
        expect.objectContaining({ rank: HandRank.Straight }),
      );
      expect(ambiguousAce).toEqual(
        expect.objectContaining({ rank: HandRank.HighCard }),
      );
    });

    it('extracts flush', () => {
      expect(
        extractHand({
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
        }),
      ).toEqual({
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
      expect(
        extractHand({
          pocketCards: [
            [Face.Three, Suit.Spades],
            [Face.Four, Suit.Diamonds],
          ],
          communityCards: [
            [Face.Three, Suit.Clubs],
            [Face.Three, Suit.Diamonds],
            [Face.Five, Suit.Diamonds],
            [Face.Jack, Suit.Diamonds],
            [Face.Jack, Suit.Hearts],
          ],
        }),
      ).toEqual({
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

      // contains pair fours and pair threes
      expect(
        extractHand({
          pocketCards: [
            [Face.Four, Suit.Diamonds],
            [Face.Jack, Suit.Hearts],
          ],
          communityCards: [
            [Face.Four, Suit.Hearts],
            [Face.Three, Suit.Clubs],
            [Face.Three, Suit.Diamonds],
            [Face.Jack, Suit.Spades],
            [Face.Jack, Suit.Diamonds],
          ],
        }),
      ).toEqual({
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

      // contains three jacks and three threes
      expect(
        extractHand({
          pocketCards: [
            [Face.Four, Suit.Diamonds],
            [Face.Three, Suit.Clubs],
          ],
          communityCards: [
            [Face.Three, Suit.Hearts],
            [Face.Three, Suit.Diamonds],
            [Face.Jack, Suit.Spades],
            [Face.Jack, Suit.Diamonds],
            [Face.Jack, Suit.Hearts],
          ],
        }),
      ).toEqual({
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
      expect(
        extractHand({
          pocketCards: [
            [Face.Eight, Suit.Spades],
            [Face.Jack, Suit.Diamonds],
          ],
          communityCards: [
            [Face.Six, Suit.Diamonds],
            [Face.Two, Suit.Diamonds],
            [Face.Six, Suit.Clubs],
            [Face.Six, Suit.Hearts],
            [Face.Six, Suit.Spades],
          ],
        }),
      ).toEqual({
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
      expect(
        extractHand({
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
        }),
      ).toEqual({
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

      expect(
        extractHand({
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
        }),
      ).toEqual({
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

      // Observed bugs

      const offsuitAce = extractHand({
        pocketCards: [
          [Face.Ace, Suit.Clubs],
          [Face.Two, Suit.Spades],
        ],
        communityCards: [
          [Face.Three, Suit.Spades],
          [Face.Four, Suit.Spades],
          [Face.Five, Suit.Spades],
          [Face.Eight, Suit.Spades],
        ],
      });

      expect(offsuitAce).not.toEqual(
        expect.objectContaining({ rank: HandRank.StraightFlush }),
      );
      expect(offsuitAce).toEqual(
        expect.objectContaining({ rank: HandRank.Flush }),
      );

      const ambiguousAce = extractHand({
        pocketCards: [
          [Face.Ace, Suit.Diamonds],
          [Face.Five, Suit.Diamonds],
        ],
        communityCards: [
          [Face.Nine, Suit.Diamonds],
          [Face.Queen, Suit.Diamonds],
          [Face.Seven, Suit.Diamonds],
          [Face.King, Suit.Diamonds],
          [Face.Jack, Suit.Diamonds],
        ],
      });

      expect(ambiguousAce).not.toEqual(
        expect.objectContaining({ rank: HandRank.StraightFlush }),
      );
      expect(ambiguousAce).toEqual(
        expect.objectContaining({ rank: HandRank.Flush }),
      );
    });

    it('extracts royal flush', () => {
      expect(
        extractHand({
          pocketCards: [
            [Face.King, Suit.Clubs],
            [Face.Queen, Suit.Clubs],
          ],
          communityCards: [
            [Face.Ace, Suit.Clubs],
            [Face.Ten, Suit.Clubs],
            [Face.Eight, Suit.Spades],
            [Face.Jack, Suit.Clubs],
            [Face.Jack, Suit.Spades],
          ],
        }),
      ).toEqual({
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
