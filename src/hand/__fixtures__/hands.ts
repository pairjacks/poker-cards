import { Face, Suit } from '../../card/constants';

export const ranksHighCard = {
  pocketCards: [
    { face: Face.Jack, suit: Suit.Clubs },
    { face: Face.Eight, suit: Suit.Spades },
  ],
  communityCards: [
    { face: Face.Six, suit: Suit.Diamonds },
    { face: Face.Two, suit: Suit.Diamonds },
    { face: Face.Three, suit: Suit.Clubs },
    { face: Face.Four, suit: Suit.Clubs },
    { face: Face.Queen, suit: Suit.Diamonds },
  ],
};

export const ranksPair = {
  pocketCards: [
    { face: Face.Six, suit: Suit.Clubs },
    { face: Face.Two, suit: Suit.Diamonds },
  ],
  communityCards: [
    { face: Face.Six, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Clubs },
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Four, suit: Suit.Clubs },
    { face: Face.Queen, suit: Suit.Diamonds },
  ],
};

export const ranksTwoPair = {
  pocketCards: [
    { face: Face.Four, suit: Suit.Clubs },
    { face: Face.Jack, suit: Suit.Diamonds },
  ],
  communityCards: [
    { face: Face.Six, suit: Suit.Diamonds },
    { face: Face.Two, suit: Suit.Diamonds },
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Six, suit: Suit.Clubs },
    { face: Face.Jack, suit: Suit.Clubs },
  ],
};

export const ranksTwoPairContainsThreePair = {
  pocketCards: [
    { face: Face.Queen, suit: Suit.Clubs },
    { face: Face.Jack, suit: Suit.Clubs },
  ],
  communityCards: [
    { face: Face.Six, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Diamonds },
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Six, suit: Suit.Clubs },
    { face: Face.Queen, suit: Suit.Spades },
  ],
};

export const ranksThreeOfAKind = {
  pocketCards: [
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Six, suit: Suit.Clubs },
  ],
  communityCards: [
    { face: Face.Six, suit: Suit.Diamonds },
    { face: Face.Two, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Diamonds },
    { face: Face.Six, suit: Suit.Hearts },
    { face: Face.Queen, suit: Suit.Clubs },
  ],
};

export const ranksStraightContainsPair = {
  pocketCards: [
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Six, suit: Suit.Hearts },
  ],
  communityCards: [
    { face: Face.Four, suit: Suit.Diamonds },
    { face: Face.Two, suit: Suit.Clubs },
    { face: Face.Three, suit: Suit.Diamonds },
    { face: Face.Five, suit: Suit.Clubs },
    { face: Face.Six, suit: Suit.Diamonds },
  ],
};

export const ranksStraightAceLowContainsPair = {
  pocketCards: [
    { face: Face.Ace, suit: Suit.Spades },
    { face: Face.Eight, suit: Suit.Hearts },
  ],
  communityCards: [
    { face: Face.Four, suit: Suit.Diamonds },
    { face: Face.Two, suit: Suit.Clubs },
    { face: Face.Three, suit: Suit.Diamonds },
    { face: Face.Five, suit: Suit.Clubs },
    { face: Face.Eight, suit: Suit.Diamonds },
  ],
};

export const ranksFlushContainsTwoPair = {
  pocketCards: [
    { face: Face.Three, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Diamonds },
  ],
  communityCards: [
    { face: Face.Four, suit: Suit.Diamonds },
    { face: Face.Two, suit: Suit.Diamonds },
    { face: Face.Three, suit: Suit.Spades },
    { face: Face.Five, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Hearts },
  ],
};

export const ranksFullHouse = {
  pocketCards: [
    { face: Face.Three, suit: Suit.Spades },
    { face: Face.Four, suit: Suit.Diamonds },
  ],
  communityCards: [
    { face: Face.Three, suit: Suit.Clubs },
    { face: Face.Three, suit: Suit.Diamonds },
    { face: Face.Five, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Hearts },
  ],
};

export const ranksFullHouseContainsTwoPair = {
  pocketCards: [
    { face: Face.Four, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Hearts },
  ],
  communityCards: [
    { face: Face.Four, suit: Suit.Hearts },
    { face: Face.Three, suit: Suit.Clubs },
    { face: Face.Three, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Spades },
    { face: Face.Jack, suit: Suit.Diamonds },
  ],
};

export const ranksFullHouseContainsTwoThreeOfAKind = {
  pocketCards: [
    { face: Face.Four, suit: Suit.Diamonds },
    { face: Face.Three, suit: Suit.Clubs },
  ],
  communityCards: [
    { face: Face.Three, suit: Suit.Hearts },
    { face: Face.Three, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Spades },
    { face: Face.Jack, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Hearts },
  ],
};
[];

export const ranksFourOfAKind = {
  pocketCards: [
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Jack, suit: Suit.Diamonds },
  ],
  communityCards: [
    { face: Face.Six, suit: Suit.Diamonds },
    { face: Face.Two, suit: Suit.Diamonds },
    { face: Face.Six, suit: Suit.Clubs },
    { face: Face.Six, suit: Suit.Hearts },
    { face: Face.Six, suit: Suit.Spades },
  ],
};
[];

export const ranksStraightFlushContainsPair = {
  pocketCards: [
    { face: Face.Two, suit: Suit.Clubs },
    { face: Face.Six, suit: Suit.Clubs },
  ],
  communityCards: [
    { face: Face.Four, suit: Suit.Clubs },
    { face: Face.Three, suit: Suit.Clubs },
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Five, suit: Suit.Clubs },
    { face: Face.Six, suit: Suit.Spades },
  ],
};

export const ranksStraightFlushAceLow = {
  pocketCards: [
    { face: Face.Ace, suit: Suit.Spades },
    { face: Face.Eight, suit: Suit.Hearts },
  ],
  communityCards: [
    { face: Face.Four, suit: Suit.Spades },
    { face: Face.Two, suit: Suit.Spades },
    { face: Face.Three, suit: Suit.Spades },
    { face: Face.Five, suit: Suit.Spades },
    { face: Face.Eight, suit: Suit.Diamonds },
  ],
};

export const ranksRoyalFlushContainsPair = {
  pocketCards: [
    { face: Face.King, suit: Suit.Clubs },
    { face: Face.Queen, suit: Suit.Clubs },
  ],
  communityCards: [
    { face: Face.Ace, suit: Suit.Clubs },
    { face: Face.Ten, suit: Suit.Clubs },
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Jack, suit: Suit.Clubs },
    { face: Face.Jack, suit: Suit.Spades },
  ],
};
