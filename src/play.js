import Card from './cards';

export const COMBO = Object.freeze({
  SINGLE: 'Single',
  PAIR: 'Pair',
  TRIPLE: 'Triple',
  RUN: 'Run', // TODO: ideally, prompted after play if suited or not
  QUAD: 'Quad',
  BOMB: 'Bomb',
  INVALID: null,
});

export function isSingle(cards) {
  return cards.length === 1;
}

export function isPair(cards) {
  return cards.length === 2 && cards[0].rank === cards[1].rank;
}
export function isTriple(cards) {
  return (
    cards.length === 3 &&
    cards[0].rank === cards[1].rank &&
    cards[0].rank === cards[2].rank
  );
}

export function isQuad(cards) {
  return (
    cards.length === 4 &&
    cards[0].rank === cards[1].rank &&
    cards[0].rank === cards[2].rank &&
    cards[0].rank === cards[3].rank
  );
}

export function isRun(cards) {
  const sorted = cards.sort(Card.Compare);
  if (sorted.length < 3) return false;

  let running = true;
  for (let i = 0; i < sorted.length - 1; i += 1) {
    if (sorted[i].rank + 1 !== sorted[i + 1].rank) {
      running = false;
      break;
    }
  }

  return running;
}

export function isBomb(cards) {
  const sorted = cards.sort(Card.Compare);
  if (sorted.length < 6) return false;

  return (
    isPair(sorted.slice(0, 2)) &&
    isPair(sorted.slice(2, 4)) &&
    isPair(sorted.slice(4, 6)) &&
    isRun([sorted[0], sorted[2], sorted[4]])
  );
}

export class Play {
  constructor(combo, cards, player) {
    this.cards = cards.sort(Card.Compare).reverse(); // cards[0] now holds highest value card
    this.combo = combo;
    this.player = player;
  }

  matchesCombo(cards) {
    switch (this.combo) {
      case COMBO.SINGLE:
        return isSingle(cards);
      case COMBO.PAIR:
        return isPair(cards);
      case COMBO.TRIPLE:
        return isTriple(cards);
      case COMBO.QUAD:
        return isQuad(cards);
      case COMBO.RUN:
        return cards.length === this.cards.length && isRun(cards);
      case COMBO.BOMB:
        return isBomb(cards);
      default:
        throw new Error(COMBO.INVALID);
    }
  }

  valueOf() {
    // should really be this
    // return this.cards[0].valueOf();
    return this.cards[0].rank * 4 + this.cards[0].suit;
  }

  toString() {
    return `Combo: ${this.combo}\nCards: ${this.cards}\nSuited? ${this.suited}`;
  }

  static DetermineCombo(cards) {
    if (isSingle(cards)) return COMBO.SINGLE;
    if (isPair(cards)) return COMBO.PAIR;
    if (isTriple(cards)) return COMBO.TRIPLE;
    if (isQuad(cards)) return COMBO.QUAD;
    if (isRun(cards)) return COMBO.RUN;
    if (isBomb(cards)) return COMBO.BOMB;
    return COMBO.INVALID;
  }
}
