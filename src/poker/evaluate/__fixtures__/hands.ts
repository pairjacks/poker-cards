import { Face, Suit } from '../../../core/constants';

export const ranksHighCard = {
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

export const ranksOnePair = {
  pocket: [
    { face: Face.Six, suit: Suit.Clubs },
    { face: Face.Two, suit: Suit.Diamonds },
  ],
  community: [
    { face: Face.Six, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Clubs },
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Four, suit: Suit.Clubs },
    { face: Face.Queen, suit: Suit.Diamonds },
  ],
};

export const ranksTwoPair = {
  pocket: [
    { face: Face.Four, suit: Suit.Clubs },
    { face: Face.Jack, suit: Suit.Diamonds },
  ],
  community: [
    { face: Face.Six, suit: Suit.Diamonds },
    { face: Face.Two, suit: Suit.Diamonds },
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Six, suit: Suit.Clubs },
    { face: Face.Jack, suit: Suit.Clubs },
  ],
};

export const ranksTwoPairContainsThreePair = {
  pocket: [
    { face: Face.Queen, suit: Suit.Clubs },
    { face: Face.Jack, suit: Suit.Clubs },
  ],
  community: [
    { face: Face.Six, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Diamonds },
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Six, suit: Suit.Clubs },
    { face: Face.Queen, suit: Suit.Spades },
  ],
};

export const ranksThreeOfAKind = {
  pocket: [
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Six, suit: Suit.Clubs },
  ],
  community: [
    { face: Face.Six, suit: Suit.Diamonds },
    { face: Face.Two, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Diamonds },
    { face: Face.Six, suit: Suit.Hearts },
    { face: Face.Queen, suit: Suit.Clubs },
  ],
};

export const ranksStraightContainsPair = {
  pocket: [
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Six, suit: Suit.Hearts },
  ],
  community: [
    { face: Face.Four, suit: Suit.Diamonds },
    { face: Face.Two, suit: Suit.Clubs },
    { face: Face.Three, suit: Suit.Diamonds },
    { face: Face.Five, suit: Suit.Clubs },
    { face: Face.Six, suit: Suit.Diamonds },
  ],
};

export const ranksStraightAceLowContainsPair = {
  pocket: [
    { face: Face.Ace, suit: Suit.Spades },
    { face: Face.Eight, suit: Suit.Hearts },
  ],
  community: [
    { face: Face.Four, suit: Suit.Diamonds },
    { face: Face.Two, suit: Suit.Clubs },
    { face: Face.Three, suit: Suit.Diamonds },
    { face: Face.Five, suit: Suit.Clubs },
    { face: Face.Eight, suit: Suit.Diamonds },
  ],
};

export const ranksFlushContainsTwoPair = {
  pocket: [
    { face: Face.Three, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Diamonds },
  ],
  community: [
    { face: Face.Four, suit: Suit.Diamonds },
    { face: Face.Two, suit: Suit.Diamonds },
    { face: Face.Three, suit: Suit.Spades },
    { face: Face.Five, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Hearts },
  ],
};

export const ranksFullHouse = {
  pocket: [
    { face: Face.Three, suit: Suit.Spades },
    { face: Face.Four, suit: Suit.Diamonds },
  ],
  community: [
    { face: Face.Three, suit: Suit.Clubs },
    { face: Face.Three, suit: Suit.Diamonds },
    { face: Face.Five, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Hearts },
  ],
};

export const ranksFullHouseContainsTwoPair = {
  pocket: [
    { face: Face.Four, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Hearts },
  ],
  community: [
    { face: Face.Four, suit: Suit.Hearts },
    { face: Face.Three, suit: Suit.Clubs },
    { face: Face.Three, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Spades },
    { face: Face.Jack, suit: Suit.Diamonds },
  ],
};

export const ranksFullHouseContainsTwoThreeOfAKind = {
  pocket: [
    { face: Face.Four, suit: Suit.Diamonds },
    { face: Face.Three, suit: Suit.Clubs },
  ],
  community: [
    { face: Face.Three, suit: Suit.Hearts },
    { face: Face.Three, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Spades },
    { face: Face.Jack, suit: Suit.Diamonds },
    { face: Face.Jack, suit: Suit.Hearts },
  ],
};
[];

export const ranksFourOfAKind = {
  pocket: [
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Jack, suit: Suit.Diamonds },
  ],
  community: [
    { face: Face.Six, suit: Suit.Diamonds },
    { face: Face.Two, suit: Suit.Diamonds },
    { face: Face.Six, suit: Suit.Clubs },
    { face: Face.Six, suit: Suit.Hearts },
    { face: Face.Six, suit: Suit.Spades },
  ],
};
[];

export const ranksStraightFlushContainsOnePair = {
  pocket: [
    { face: Face.Two, suit: Suit.Clubs },
    { face: Face.Six, suit: Suit.Clubs },
  ],
  community: [
    { face: Face.Four, suit: Suit.Clubs },
    { face: Face.Three, suit: Suit.Clubs },
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Five, suit: Suit.Clubs },
    { face: Face.Six, suit: Suit.Spades },
  ],
};

export const ranksStraightFlushAceLow = {
  pocket: [
    { face: Face.Ace, suit: Suit.Spades },
    { face: Face.Eight, suit: Suit.Hearts },
  ],
  community: [
    { face: Face.Four, suit: Suit.Spades },
    { face: Face.Two, suit: Suit.Spades },
    { face: Face.Three, suit: Suit.Spades },
    { face: Face.Five, suit: Suit.Spades },
    { face: Face.Eight, suit: Suit.Diamonds },
  ],
};

export const ranksRoyalFlushContainsOnePair = {
  pocket: [
    { face: Face.King, suit: Suit.Clubs },
    { face: Face.Queen, suit: Suit.Clubs },
  ],
  community: [
    { face: Face.Ace, suit: Suit.Clubs },
    { face: Face.Ten, suit: Suit.Clubs },
    { face: Face.Eight, suit: Suit.Spades },
    { face: Face.Jack, suit: Suit.Clubs },
    { face: Face.Jack, suit: Suit.Spades },
  ],
};
