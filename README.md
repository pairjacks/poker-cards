# poker-cards

![CI status](https://github.com/kavsingh/poker-lib/workflows/CI/badge.svg)

## Base Constants & Types

```ts
export enum Face {
  Two = 'Two',
  Three = 'Three',
  Four = 'Four',
  Five = 'Five',
  Six = 'Six',
  Seven = 'Seven',
  Eight = 'Eight',
  Nine = 'Nine',
  Ten = 'Ten',
  Jack = 'Jack',
  Queen = 'Queen',
  King = 'King',
  Ace = 'Ace',
}

export enum Suit {
  Diamonds = 'Diamonds',
  Clubs = 'Clubs',
  Hearts = 'Heart',
  Spades = 'Spades',
}

type Card = [Face, Suit];

// Represents a collection of cards that can be used to create a 5 card hand
interface HandCandidate {
  pocketCards: Card[];
  communityCards: Card[];
}

// A hand derived from a HandCandidate
interface Hand {
  rank: HandRank; // Straight, TwoPair etc
  rankCards: Card[]; // Card used in the ranking combination
  kickers: Card[]; // Cards included in the hand but not in the ranking combination
}
```

## Api

### Cards

#### `isSameCard`

Determines if two cards are identical

```ts
import { isSameCard, Face, Suit } from '@kavsingh/poker-cards';

isSameCard([Face.Two, Suit.Clubs], [Face.Two, Suit.Clubs]); // true
isSameCard([Face.Three, Suit.Clubs], [Face.Two, Suit.Clubs]); // false
```

### Deck

#### `createDeck`

Creates an ordered 52 card deck without Jokers, sorted by suite and face.

```ts
import { createDeck } from '@kavsingh/poker-cards';

createDeck(); // [[Two, Diamonds], [Three, Diamonds] ... [King, Spades], [Ace, Spades]]
```

#### `drawCardsFromDeck`

Draws n cards from deck without mutating the deck. Returned card order tries to represent drawing cards one-by-one, as opposed to cutting off a chunk of cards from the "top" of the deck
e.g. when drawing 3:

```text
initial deck: [a, b, c, d]
draw first card: [b, c, d] => [a]
then second: [c, d] => [b, a]
then third: [b] => [c, b, a]
```

```ts
import { drawCardsFromDeck } from '@kavsingh/poker-cards';

drawCardsFromDeck(deck, 4); // { cards: [...4 cards], deck: [...deck without 4 cards] }
```

#### Shuffling a deck

You will need to create a shuffle function before use to allow swapping shuffle implementations. The shuffle function returned is async to allow for async random number generators.

This library provides default values for the shuffle function, using fisher-yates and a _naive Math.random random number generator_.

#### `createDeckShuffler`

Creating the default shuffler

```ts
import { createDeckShuffler } from '@kavsingh/poker-cards';

const shuffle = createDeckShuffler();
const shuffled = await shuffle(deck);
```

You might want to use a more robust random int generator, like that provided by (`random-number-csprng`)[<https://www.npmjs.com/package/random-number-csprng]> which asynchronously returns a crypto-secure random int.

```ts
import {
  createDeckShuffler,
  createFisherYatesStackShuffle,
} from '@kavsingh/poker-cards';
import randomNumberCsprng from 'random-number-csprng';

// (min: number, max: number) => Promise<number>;
const randomInt = randomNumberCsprng;

// <T>(arr: T[]) => Promise<T[]>);
const shuffleFunction: ShuffleFunction = createFisherYatesStackShuffle(
  randomInt,
);
const shuffle = createDeckShuffler(shuffleFunction);
const shuffled = await shuffle(deck);
```

### Hand

#### `extractHand`

Extracts the highest possible hand from a candidate hand

```ts
import { extractHand } from '@kavsingh/poker-cards';

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
  rankValue: 9,
  rankCards: [
    [Face.Six, Suit.Clubs],
    [Face.Five, Suit.Clubs],
    [Face.Four, Suit.Clubs],
    [Face.Three, Suit.Clubs],
    [Face.Two, Suit.Clubs],
  ],
  kickers: [],
}
*/
```

#### `findHighestHands`

Returns an array of highest hands from a list of candidates. Multiple entries indicates a draw.

```ts
import { findHighestHands } from '@kavsingh/poker-cards';

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
