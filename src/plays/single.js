import { COMBO, Play } from './common';

export default class SinglePlay extends Play {
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
