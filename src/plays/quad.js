import { COMBO, Play } from './common';

export default class QuadPlay extends Play {
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
