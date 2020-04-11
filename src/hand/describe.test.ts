import { Face, Suit } from '../card/constants';
import { extractHand } from './extract';
import { describePocketCards, describeHand } from './describe';

describe('describe', () => {
  describe('describePocketCards', () => {
    it('should describe pocket cards', () => {
      expect(describePocketCards([])).toBe('');

      expect(describePocketCards([[Face.Three, Suit.Diamonds]])).toBe('Three');

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
    test('empty state', () => {
      expect(
        describeHand(
          extractHand({
            pocketCards: [],
            communityCards: [],
          }),
        ),
      ).toEqual({ rank: '', kickers: '' });

      expect(
        describeHand(
          extractHand({
            pocketCards: [[Face.Ace, Suit.Clubs]],
            communityCards: [],
          }),
        ),
      ).toEqual({ rank: 'Ace high', kickers: '' });
    });

    test('high card', () => {
      expect(
        describeHand(
          extractHand({
            pocketCards: [[Face.Ace, Suit.Clubs]],
            communityCards: [],
          }),
        ),
      ).toEqual({ rank: 'Ace high', kickers: '' });

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
      ).toEqual({ rank: 'Ace high', kickers: 'Two kicker' });

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
      ).toEqual({ rank: 'Ace high', kickers: 'Seven-Two kickers' });

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
      ).toEqual({ rank: 'Ace high', kickers: 'Ten-Seven-Two kickers' });

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
      ).toEqual({ rank: 'Ace high', kickers: 'Jack-Ten-Seven-Three kickers' });
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
      ).toEqual({ rank: 'Pair Twos', kickers: '' });

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
      ).toEqual({ rank: 'Pair Twos', kickers: 'Seven kicker' });

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
      ).toEqual({ rank: 'Pair Twos', kickers: 'Jack-Ten-Eight kickers' });
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
      ).toEqual({ rank: 'Two pair, Sixes over Twos', kickers: '' });

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
      ).toEqual({ rank: 'Two pair, Sixes over Twos', kickers: 'Jack kicker' });
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
      ).toEqual({ rank: 'Three of a kind Sixes', kickers: '' });

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
      ).toEqual({ rank: 'Three of a kind Fours', kickers: 'Eight kicker' });

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
      ).toEqual({
        rank: 'Three of a kind Fours',
        kickers: 'Jack-Eight kickers',
      });
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
      ).toEqual({ rank: 'Straight, Four to Eight', kickers: '' });

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
      ).toEqual({ rank: 'Straight, Ace to Five', kickers: '' });

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
      ).toEqual({ rank: 'Straight, Ten to Ace', kickers: '' });

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
      ).toEqual({ rank: 'Straight, Ten to Ace', kickers: '' });
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
    ).toEqual({ rank: 'Flush, Jack-Seven high', kickers: '' });

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
    ).toEqual({ rank: 'Flush, Jack-Seven high', kickers: '' });
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
    ).toEqual({ rank: 'Full house, Fours full', kickers: '' });

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
    ).toEqual({ rank: 'Full house, Fours full', kickers: '' });
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
    ).toEqual({ rank: 'Four of a kind Fours', kickers: 'Jack kicker' });

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
    ).toEqual({ rank: 'Four of a kind Fours', kickers: 'King kicker' });
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
    ).toEqual({ rank: 'Straight flush, Four to Eight', kickers: '' });

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
    ).toEqual({ rank: 'Straight flush, Ace to Five', kickers: '' });

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
    ).toEqual({ rank: 'Straight flush, Ace to Five', kickers: '' });
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
    ).toEqual({ rank: 'Royal flush', kickers: '' });
  });
});
