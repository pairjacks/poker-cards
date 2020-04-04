import { Face, Suit } from '../../card/constants';

export const ranksHighCard = {
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

export const ranksPair = {
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
} as const;

export const ranksTwoPair = {
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
} as const;

export const ranksTwoPairContainsThreePair = {
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
} as const;

export const ranksThreeOfAKind = {
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
} as const;

export const ranksStraightContainsPair = {
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

export const ranksStraightAceLowContainsPair = {
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
} as const;

export const ranksFlushContainsTwoPair = {
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

export const ranksFullHouse = {
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
} as const;

export const ranksFullHouseContainsTwoPair = {
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
} as const;

export const ranksFullHouseContainsTwoThreeOfAKind = {
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
} as const;
[];

export const ranksFourOfAKind = {
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
} as const;
[];

export const ranksStraightFlushContainsPair = {
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

export const ranksStraightFlushAceLow = {
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

export const ranksRoyalFlushContainsPair = {
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
} as const;
