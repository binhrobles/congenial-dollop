import { COMBO, Play } from './common';

export default class TriplePlay extends Play {
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
