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
  | "t" // 10
  | "j" // Jack
  | "q" // Queen
  | "k" // King
  | "a"; // Ace

type Suit =
  | "d" // Diamonds
  | "c" // Clubs
  | "h" // Hearts
  | "s"; // Spades

type Card = `${Face}${Suit}`;

// Represents a collection of cards that can be used to create a 5 card hand
type HandCandidate {
  readonly pocketCards: readonly Card[];
  readonly communityCards: readonly Card[];
}

// A hand derived from a HandCandidate
type Hand {
  // Straight, TwoPair etc
  readonly rank: HandRank;
  // Cards included in the ranking combination
  readonly rankCards: readonly Card[];
  // Cards included in the hand but not in the ranking combination
  readonly kickerCards: readonly Card[];
}
```

## Api

### Cards

#### `compareCards`

Returns -1 if first card is higher in value than second card
Returns 0 if card values are the same
Returns 1 if second card is higher in value than first card

```ts
import { compareCards } from "@pairjacks/poker-cards";

compareCards("2c", "2d"); // 0
compareCards("3c", "2c"); // -1
compareCards("3d", "5c"); // 1
```

### Deck

#### `createDeck`

Creates a 52 card deck without Jokers. Accepts an optional parameter object

- `{ order: "ndo" }` new deck order (default value)
- `{ order: "value" }` sorted by suite (Diamonds to Spades) and face (Two to Ace).

```ts
import { createDeck } from "@pairjacks/poker-cards";

createDeck(); // ["ah", "2h" ... "2s", "as"]
createDeck({ order: "ndo" }); // ["ah", "2h" ... "2s", "as"]
createDeck({ order: "value" }); // ["ad", "2d" ... "qs", "ks"]
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
	pocketCards: ["2c", "6c"],
	communityCards: ["4c", "3c", "8s", "5c", "6s"],
});
/*
hand: Hand = {
  rank: "straightFlush",
  rankCards: ["6c", "5c", "4c", "3c", "2c"],
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

describePocketCards(["ah", "as"]);
// Pocket Aces
```

#### `describeHand`

Describes a hand in words

```ts
import { extractHand, describeHand, Face, Suit } from "@pairjacks/poker-cards";

describeHand(extractHand({
  pocketCards: ["5h", "3d"],
  communityCards: ["2h", "5d", "2d", "7c"],
});
// { rank: 'Two pair, Fives over Twos', kickers: 'Seven kicker' }
```
