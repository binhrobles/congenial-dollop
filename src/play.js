export const COMBO = Object.freeze({
  SINGLE: 'Single',
  PAIR: 'Pair',
  TRIPLE: 'Triple',
  RUN: 'Run', // TODO: ideally, prompted after play if suited or not
  QUAD: 'Quad',
  BOMB: 'Bomb',
  INVALID: null,
});

export class Play {
  // combo: COMBO enum
  // cards: [] of CARD strings
  // suited: bool (only relevant for runs)
  static instantiatePlay(combo, cards, suited = false) {
    switch (combo) {
      case COMBO.SINGLE:
        return new SinglePlay(cards);
      case COMBO.PAIR:
        return new PairPlay(cards);
      case COMBO.TRIPLE:
        return new TriplePlay(cards);
      case COMBO.QUAD:
        return new QuadPlay(cards);
      default:
        throw new Error(COMBO.INVALID);
    }
  }

  // TODO
  // for runs, validates # of cards and suit preference
  // matchesCombo(cards)

  static determineCombo(cards) {
    if (SinglePlay.matchCombo(cards)) return COMBO.SINGLE;
    if (PairPlay.matchCombo(cards)) return COMBO.PAIR;
    if (TriplePlay.matchCombo(cards)) return COMBO.TRIPLE;
    if (QuadPlay.matchCombo(cards)) return COMBO.QUAD;
    else return COMBO.INVALID;
  }

  toString() {
    return `Combo: ${this.combo}\nCards: ${this.cards}\nSuited? ${this.suited}`;
  }
}

export class SinglePlay extends Play {
  static matchCombo(cards) {
    return cards.length === 1;
  }

  constructor(cards) {
    super();
    this.combo = COMBO.SINGLE;
    this.cards = cards;
  }

  valueOf() {
    return this.cards[0].rank;
  }
}

export class PairPlay extends Play {
  static matchCombo(cards) {
    return cards.length === 2 && cards[0].rank === cards[1].rank;
  }

  constructor(cards) {
    super();
    this.combo = COMBO.PAIR;
    this.cards = cards.sort();
  }

  valueOf() {
    return this.cards[0].rank;
  }
}

export class TriplePlay extends Play {
  static matchCombo(cards) {
    return (
      cards.length === 3 &&
      cards[0].rank === cards[1].rank &&
      cards[0].rank === cards[2].rank
    );
  }

  constructor(cards) {
    super();
    this.combo = COMBO.TRIPLE;
    this.cards = cards.sort();
  }

  valueOf() {
    return this.cards[0].rank;
  }
}

export class QuadPlay extends Play {
  static matchCombo(cards) {
    return (
      cards.length === 4 &&
      cards[0].rank === cards[1].rank &&
      cards[0].rank === cards[2].rank &&
      cards[0].rank === cards[3].rank
    );
  }

  constructor(cards) {
    super();
    this.combo = COMBO.QUAD;
    this.cards = cards.sort();
  }

  valueOf() {
    return this.cards[0].rank;
  }
}
