import { RANK, SUIT } from './constants';

export default class Card {
  static Get(rank, suit) {
    return {
      rank,
      suit,
      rankText: Object.keys(RANK)[rank],
      suitText: Object.keys(SUIT)[suit],
      value: rank * 4 + suit,
    };
  }

  static Compare(a, b) {
    return a.value - b.value;
  }
}

export { RANK, SUIT };
