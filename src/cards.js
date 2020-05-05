export const SUIT = Object.freeze({
  'H': 0x3,
  'D': 0x2,
  'C': 0x1,
  'S': 0x0,
});

export const RANK = Object.freeze({
  'TWO': 0xC0,
  'ACE': 0xB0,
  'KING': 0xA0,
  'QUEEN': 0x90,
  'JACK': 0x80,
  'TEN': 0x70,
  'NINE': 0x60,
  'EIGHT': 0x50,
  'SEVEN': 0x40,
  'SIX': 0x30,
  'FIVE': 0x20,
  'FOUR': 0x10,
  'THREE': 0x0,
});

export class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  equals(card) {
    return this.valueOf() === card.valueOf();
  }

  valueOf() {
    return this.rank + this.suit;
  }

  toString() {
    return `${this.suit}:${this.rank.toString(16)}`;
  }
}

export function generateStandardDeck() {
  const deck = [];
  for (const suit in Object.keys(SUIT)) {
    for (const rank in Object.keys(RANK)) {
      deck.push(new Card(rank, suit));
    }
  }
  return deck;
}
