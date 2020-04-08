import { Face, Suit } from '../card/constants';
import { extractHand } from './extract';
import { describePocketCards, describeHand } from './describe';

describe('describe', () => {
  describe('describePocketCards', () => {
    it('should describe pocket cards', () => {
      expect(
        describePocketCards([
          [Face.Ace, Suit.Clubs],
          [Face.Two, Suit.Clubs],
        ]),
      ).toBe('Ace-Two Suited');

      expect(
        describePocketCards([
          [Face.Two, Suit.Diamonds],
          [Face.Two, Suit.Clubs],
        ]),
      ).toBe('Pocket Twos');

      expect(
        describePocketCards([
          [Face.Eight, Suit.Diamonds],
          [Face.King, Suit.Clubs],
        ]),
      ).toBe('King-Eight Offsuit');
    });
  });

  describe('describeHand', () => {
    test('high card', () => {
      expect(
        describeHand(
          extractHand({
            pocketCards: [[Face.Ace, Suit.Clubs]],
            communityCards: [],
          }),
        ),
      ).toBe('Ace high');

      expect(
        describeHand(
          extractHand({
            pocketCards: [
              [Face.Ace, Suit.Clubs],
              [Face.Two, Suit.Clubs],
            ],
            communityCards: [],
          }),
        ),
      ).toBe('Ace high, Two kicker');

      expect(
        describeHand(
          extractHand({
            pocketCards: [
              [Face.Ace, Suit.Clubs],
              [Face.Two, Suit.Clubs],
            ],
            communityCards: [[Face.Seven, Suit.Clubs]],
          }),
        ),
      ).toBe('Ace high, Seven-Two kickers');

      expect(
        describeHand(
          extractHand({
            pocketCards: [
              [Face.Ace, Suit.Clubs],
              [Face.Two, Suit.Diamonds],
            ],
            communityCards: [
              [Face.Ten, Suit.Spades],
              [Face.Seven, Suit.Clubs],
            ],
          }),
        ),
      ).toBe('Ace high, Ten-Seven-Two kickers');

      expect(
        describeHand(
          extractHand({
            pocketCards: [
              [Face.Ace, Suit.Clubs],
              [Face.Two, Suit.Diamonds],
            ],
            communityCards: [
              [Face.Ten, Suit.Spades],
              [Face.Seven, Suit.Clubs],
              [Face.Jack, Suit.Clubs],
              [Face.Three, Suit.Diamonds],
            ],
          }),
        ),
      ).toBe('Ace high, Jack-Ten-Seven-Three kickers');
    });

    test('pair', () => {
      expect(
        describeHand(
          extractHand({
            pocketCards: [
              [Face.Two, Suit.Diamonds],
              [Face.Two, Suit.Clubs],
            ],
            communityCards: [],
          }),
        ),
      ).toBe('Pair Twos');

      expect(
        describeHand(
          extractHand({
            pocketCards: [
              [Face.Two, Suit.Diamonds],
              [Face.Two, Suit.Clubs],
            ],
            communityCards: [[Face.Seven, Suit.Clubs]],
          }),
        ),
      ).toBe('Pair Twos, Seven kicker');

      expect(
        describeHand(
          extractHand({
            pocketCards: [
              [Face.Two, Suit.Diamonds],
              [Face.Two, Suit.Clubs],
            ],
            communityCards: [
              [Face.Ten, Suit.Clubs],
              [Face.Seven, Suit.Clubs],
              [Face.Jack, Suit.Diamonds],
              [Face.Eight, Suit.Diamonds],
            ],
          }),
        ),
      ).toBe('Pair Twos, Jack-Ten-Eight kickers');
    });

    test('two pair', () => {
      expect(
        describeHand(
          extractHand({
            pocketCards: [
              [Face.Six, Suit.Diamonds],
              [Face.Six, Suit.Clubs],
            ],
            communityCards: [
              [Face.Two, Suit.Diamonds],
              [Face.Two, Suit.Clubs],
            ],
          }),
        ),
      ).toBe('Two pair, Sixes over Twos');

      expect(
        describeHand(
          extractHand({
            pocketCards: [
              [Face.Six, Suit.Diamonds],
              [Face.Six, Suit.Clubs],
            ],
            communityCards: [
              [Face.Two, Suit.Diamonds],
              [Face.Two, Suit.Clubs],
              [Face.Jack, Suit.Clubs],
              [Face.Seven, Suit.Diamonds],
            ],
          }),
        ),
      ).toBe('Two pair, Sixes over Twos, Jack kicker');
    });

    test('three of a kind', () => {
      expect(
        describeHand(
          extractHand({
            pocketCards: [
              [Face.Six, Suit.Diamonds],
              [Face.Six, Suit.Clubs],
            ],
            communityCards: [[Face.Six, Suit.Spades]],
          }),
        ),
      ).toBe('Three of a kind Sixes');

      expect(
        describeHand(
          extractHand({
            pocketCards: [
              [Face.Four, Suit.Diamonds],
              [Face.Four, Suit.Clubs],
            ],
            communityCards: [
              [Face.Four, Suit.Spades],
              [Face.Eight, Suit.Diamonds],
            ],
          }),
        ),
      ).toBe('Three of a kind Fours, Eight kicker');

      expect(
        describeHand(
          extractHand({
            pocketCards: [
              [Face.Four, Suit.Diamonds],
              [Face.Four, Suit.Clubs],
            ],
            communityCards: [
              [Face.Four, Suit.Spades],
              [Face.Six, Suit.Spades],
              [Face.Two, Suit.Clubs],
              [Face.Eight, Suit.Diamonds],
              [Face.Jack, Suit.Clubs],
            ],
          }),
        ),
      ).toBe('Three of a kind Fours, Jack-Eight kickers');
    });

    test('straight', () => {
      expect(
        describeHand(
          extractHand({
            pocketCards: [
              [Face.Eight, Suit.Diamonds],
              [Face.Seven, Suit.Clubs],
            ],
            communityCards: [
              [Face.Six, Suit.Spades],
              [Face.Five, Suit.Hearts],
              [Face.Four, Suit.Spades],
            ],
          }),
        ),
      ).toBe('Straight, Four to Eight');

      expect(
        describeHand(
          extractHand({
            pocketCards: [
              [Face.Ace, Suit.Spades],
              [Face.Two, Suit.Hearts],
            ],
            communityCards: [
              [Face.Three, Suit.Spades],
              [Face.Four, Suit.Clubs],
              [Face.Five, Suit.Diamonds],
            ],
          }),
        ),
      ).toBe('Straight, Ace to Five');

      expect(
        describeHand(
          extractHand({
            pocketCards: [
              [Face.Ace, Suit.Spades],
              [Face.Ten, Suit.Hearts],
            ],
            communityCards: [
              [Face.King, Suit.Spades],
              [Face.Jack, Suit.Clubs],
              [Face.Queen, Suit.Diamonds],
            ],
          }),
        ),
      ).toBe('Straight, Ten to Ace');

      expect(
        describeHand(
          extractHand({
            pocketCards: [
              [Face.Ace, Suit.Spades],
              [Face.Ten, Suit.Hearts],
            ],
            communityCards: [
              [Face.King, Suit.Spades],
              [Face.Jack, Suit.Clubs],
              [Face.Queen, Suit.Diamonds],
              [Face.Two, Suit.Diamonds],
            ],
          }),
        ),
      ).toBe('Straight, Ten to Ace');
    });
  });

  test('flush', () => {
    expect(
      describeHand(
        extractHand({
          pocketCards: [
            [Face.Seven, Suit.Spades],
            [Face.Two, Suit.Spades],
          ],
          communityCards: [
            [Face.Jack, Suit.Spades],
            [Face.Four, Suit.Spades],
            [Face.Five, Suit.Spades],
          ],
        }),
      ),
    ).toBe('Flush, Jack-Seven high');

    expect(
      describeHand(
        extractHand({
          pocketCards: [
            [Face.Seven, Suit.Spades],
            [Face.Two, Suit.Spades],
          ],
          communityCards: [
            [Face.Jack, Suit.Spades],
            [Face.Four, Suit.Spades],
            [Face.Five, Suit.Spades],
            [Face.Ace, Suit.Clubs],
          ],
        }),
      ),
    ).toBe('Flush, Jack-Seven high');
  });

  test('full house', () => {
    expect(
      describeHand(
        extractHand({
          pocketCards: [
            [Face.Four, Suit.Spades],
            [Face.Four, Suit.Hearts],
          ],
          communityCards: [
            [Face.Four, Suit.Clubs],
            [Face.Jack, Suit.Clubs],
            [Face.Jack, Suit.Spades],
          ],
        }),
      ),
    ).toBe('Full house, Fours full');

    expect(
      describeHand(
        extractHand({
          pocketCards: [
            [Face.Four, Suit.Spades],
            [Face.Four, Suit.Hearts],
          ],
          communityCards: [
            [Face.Four, Suit.Clubs],
            [Face.Jack, Suit.Clubs],
            [Face.Jack, Suit.Spades],
            [Face.King, Suit.Spades],
          ],
        }),
      ),
    ).toBe('Full house, Fours full');
  });

  test('four of a kind', () => {
    expect(
      describeHand(
        extractHand({
          pocketCards: [
            [Face.Four, Suit.Spades],
            [Face.Four, Suit.Hearts],
          ],
          communityCards: [
            [Face.Four, Suit.Clubs],
            [Face.Four, Suit.Diamonds],
            [Face.Jack, Suit.Spades],
          ],
        }),
      ),
    ).toBe('Four of a kind Fours, Jack kicker');

    expect(
      describeHand(
        extractHand({
          pocketCards: [
            [Face.Four, Suit.Spades],
            [Face.Four, Suit.Hearts],
          ],
          communityCards: [
            [Face.Four, Suit.Clubs],
            [Face.Four, Suit.Diamonds],
            [Face.Jack, Suit.Spades],
            [Face.King, Suit.Spades],
          ],
        }),
      ),
    ).toBe('Four of a kind Fours, King kicker');
  });

  test('straight flush', () => {
    expect(
      describeHand(
        extractHand({
          pocketCards: [
            [Face.Eight, Suit.Diamonds],
            [Face.Seven, Suit.Diamonds],
          ],
          communityCards: [
            [Face.Six, Suit.Diamonds],
            [Face.Five, Suit.Diamonds],
            [Face.Four, Suit.Diamonds],
          ],
        }),
      ),
    ).toBe('Straight flush, Four to Eight');

    expect(
      describeHand(
        extractHand({
          pocketCards: [
            [Face.Ace, Suit.Spades],
            [Face.Two, Suit.Spades],
          ],
          communityCards: [
            [Face.Three, Suit.Spades],
            [Face.Four, Suit.Spades],
            [Face.Five, Suit.Spades],
          ],
        }),
      ),
    ).toBe('Straight flush, Ace to Five');

    expect(
      describeHand(
        extractHand({
          pocketCards: [
            [Face.Ace, Suit.Spades],
            [Face.Two, Suit.Spades],
          ],
          communityCards: [
            [Face.Three, Suit.Spades],
            [Face.Four, Suit.Spades],
            [Face.Five, Suit.Spades],
            [Face.Eight, Suit.Spades],
          ],
        }),
      ),
    ).toBe('Straight flush, Ace to Five');
  });

  test('royal flush', () => {
    expect(
      describeHand(
        extractHand({
          pocketCards: [
            [Face.Ace, Suit.Spades],
            [Face.Ten, Suit.Spades],
          ],
          communityCards: [
            [Face.King, Suit.Spades],
            [Face.Jack, Suit.Spades],
            [Face.Queen, Suit.Spades],
            [Face.Two, Suit.Spades],
          ],
        }),
      ),
    ).toBe('Royal flush');
  });
});
