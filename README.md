# @pairjacks/poker-cards

![CI status](https://github.com/pairjacks/poker-cards/workflows/Test/badge.svg)

## Base Constants & Types

```ts
type Face =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "t"
  | "j"
  | "q"
  | "k"
  | "a";

type Suit =
  | "d"
  | "c"
  | "h"
  | "s";

type Card = readonly [Face, Suit];

// Convenience type expressing a readonly array of readonly cards
type Cards = readonly Card[];

// Represents a collection of cards that can be used to create a 5 card hand
type HandCandidate {
  readonly pocketCards: Cards;
  readonly communityCards: Cards;
}

// A hand derived from a HandCandidate
type Hand {
  // Straight, TwoPair etc
  readonly rank: HandRank;
  // Cards included in the ranking combination
  readonly rankCards: Cards;
  // Cards included in the hand but not in the ranking combination
  readonly kickerCards: Cards;
}
```

## Api

### Cards

#### `isSameCard`

Determines if two cards are identical

```ts
import { isSameCard, Face, Suit } from "@pairjacks/poker-cards";

isSameCard(["2", "c"], ["2", "c"]); // true
isSameCard(["3", "c"], ["2", "c"]); // false
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
		["2", "c"],
		["6", "c"],
	],
	communityCards: [
		["4", "c"],
		["3", "c"],
		["8", "s"],
		["5", "c"],
		["6", "s"],
	],
});
/*
hand: Hand = {
  rank: 'straightFlush',
  rankCards: [
    ['6', 'c'],
    ['5', 'c'],
    ['4', 'c'],
    ['3', 'c'],
    ['2', 'c'],
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
	["a", "h"],
	["a", "s"],
]);
// Pocket Aces
```

#### `describeHand`

Describes a hand in words

```ts
import { extractHand, describeHand, Face, Suit } from "@pairjacks/poker-cards";

describeHand(extractHand({
  pocketCards: [
    ["5", "h"],
    ["3", "d"],
  ],
  communityCards: [
    ["2", "h"],
    ["5", "d"],
    ["2", "d"],
    ["7", "c"],
  ],
});
// { rank: 'Two pair, Fives over Twos', kickers: 'Seven kicker' }
```
