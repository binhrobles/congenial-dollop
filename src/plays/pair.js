import { COMBO, Play } from './common';

export default class PairPlay extends Play {
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
