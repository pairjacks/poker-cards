# @pairjacks/poker-cards

![CI status](https://github.com/pairjacks/poker-cards/workflows/Test/badge.svg)

## Base Constants & Types

```ts
enum Face {
	Two = "Two",
	Three = "Three",
	Four = "Four",
	Five = "Five",
	Six = "Six",
	Seven = "Seven",
	Eight = "Eight",
	Nine = "Nine",
	Ten = "Ten",
	Jack = "Jack",
	Queen = "Queen",
	King = "King",
	Ace = "Ace",
}

enum Suit {
	Diamonds = "Diamonds",
	Clubs = "Clubs",
	Hearts = "Heart",
	Spades = "Spades",
}

type Card = readonly [Face, Suit];

// Convenience type expressing a readonly array of readonly cards
type Cards = readonly Card[];

// Represents a collection of cards that can be used to create a 5 card hand
type HandCandidate = {
	readonly pocketCards: Cards;
	readonly communityCards: Cards;
};

// A hand derived from a HandCandidate
type Hand = {
	// Straight, TwoPair etc
	readonly rank: HandRank;
	// Cards included in the ranking combination
	readonly rankCards: Cards;
	// Cards included in the hand but not in the ranking combination
	readonly kickerCards: Cards;
};
```

## Api

### Cards

#### `isSameCard`

Determines if two cards are identical

```ts
import { isSameCard, Face, Suit } from "@pairjacks/poker-cards";

isSameCard([Face.Two, Suit.Clubs], [Face.Two, Suit.Clubs]); // true
isSameCard([Face.Three, Suit.Clubs], [Face.Two, Suit.Clubs]); // false
```

### Deck

#### `createDeck`

Creates a 52 card deck without Jokers. Accepts an optional parameter object

- `{ order: "ndo" }` new deck order (default value)
- `{ order: "value" }` sorted by suite (Diamonds to Spades) and face (Two to Ace).

```ts
import { createDeck } from "@pairjacks/poker-cards";

createDeck();
// [[Ace, Hearts], [Two, Hearts] ... [Two, Spades], [Ace, Spades]]

createDeck({ order: "ndo" });
// [[Ace, Hearts], [Two, Hearts] ... [Two, Spades], [Ace, Spades]] (default)

createDeck({ order: "value" });
// [[Ace, Diamonds], [Two, Diamonds] ... [Queen, Spades], [King, Spades]]
```

#### `drawCardsFromDeck`

Draws n cards from deck without mutating the deck. Returned card order tries to represent drawing cards one-by-one, as opposed to cutting off a chunk of cards from the top of the deck, **where index 0 represents the top of the deck**.
e.g. when drawing 3:

```text
initial deck: [a, b, c, d]
draw first card: [b, c, d] => [a]
then second: [c, d] => [b, a]
then third: [b] => [c, b, a]
```

```ts
import { drawCardsFromDeck } from "@pairjacks/poker-cards";

drawCardsFromDeck(deck, 4);
// { cards: [...4 cards], deck: [...deck without 4 cards] }
```

#### Shuffling a deck

Shuffle functions are async to allow for async random number generators.

#### `shuffleDeckNaive`

A default shuffle deck function is provided which uses Math.random to drive a fisher-yates shuffle.

```ts
import { shuffleDeckNaive } from "@pairjacks/poker-cards";

const shuffled = await shuffleDeckNaive(deck);
```

#### `createDeckShuffler`

You might want to use a more robust random int generator, like that provided by (`random-number-csprng`)[<https://www.npmjs.com/package/random-number-csprng]> which asynchronously returns a crypto-secure random int.

```ts
import {
	createDeckShuffler,
	createFisherYatesStackShuffle,
} from "@pairjacks/poker-cards";
import randomNumberCsprng from "random-number-csprng";

// (min: number, max: number) => Promise<number>;
const randomInt = randomNumberCsprng;

// <T>(arr: T[]) => Promise<T[]>);
const shuffleFunction = createFisherYatesStackShuffle(randomInt);
const shuffle = createDeckShuffler(shuffleFunction);
const shuffled = await shuffle(deck);
```

As another example, the following produces `shuffleDeckNaive` described above

```ts
import {
	createDeckShuffler,
	createFisherYatesStackShuffle,
	randomIntNaive,
} from "@pairjacks/poker-cards";

const shuffleDeckNaive = createDeckShuffler(
	createFisherYatesStackShuffle(randomIntNaive),
);
const shuffled = await shuffle(deck);
```

### Hand

#### `extractHand`

Extracts the highest possible hand from a candidate hand

```ts
import { extractHand } from "@pairjacks/poker-cards";

const hand = extractHand({
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
});
/*
hand: Hand = {
  rank: HandRank.StraightFlush,
  rankCards: [
    [Face.Six, Suit.Clubs],
    [Face.Five, Suit.Clubs],
    [Face.Four, Suit.Clubs],
    [Face.Three, Suit.Clubs],
    [Face.Two, Suit.Clubs],
  ],
  kickerCards: [],
}
*/
```

#### `findHighestHands`

Returns an array of highest hands from a list of candidates. Multiple entries indicates a draw.

```ts
import { findHighestHands } from '@pairjacks/poker-cards';

const twoPair: HandCandidate = {...}
const straightTenHighDiamonds: HandCandidate = {...}
const straightTenHighSpades: HandCandidate = {...}

const winners = findHighestHands([twoPair, straightTenHighDiamonds, straightTenHighSpades]);
/*
winners: HandComparisonResult[] = [
  {
    candidate: straightTenHighDiamonds,
    candidateIndex: 1,
    hand: Hand
  },
  {
    candidate: straightTenHighSpades,
    candidateIndex: 2,
    hand: Hand
  },
]
*/

```

#### `describePocketCards`

Describes pocket cards in words

```ts
import { describePocketCards, Face, Suit } from "@pairjacks/poker-cards";

describePocketCards([
	[Face.Ace, Suit.Hearts],
	[Face.Ace, Suit.Spades],
]);
// Pocket Aces
```

#### `describeHand`

Describes a hand in words

```ts
import { extractHand, describeHand, Face, Suit } from '@pairjacks/poker-cards';

describeHand(extractHand({
  pocketCards: [
    [Face.Five, Suit.Hearts],
    [Face.Three, Suit.Diamonds],
  ],
  communityCards: [
    [Face.Two, Suit.Hearts],
    [Face.Five, Suit.Diamonds],
    [Face.Two, Suit.Diamonds],
    [Face.Seven, Suit.Clubs],
  ],
});
// { rank: 'Two pair, Fives over Twos', kickers: 'Seven kicker' }
```
