import { RANK, SUIT } from './constants';

export default class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.rankText = Object.keys(RANK)[rank];
    this.suit = suit;
    this.suitText = Object.keys(SUIT)[suit];
    this.value = this.rank * 4 + this.suit;
  }

  static Compare(a, b) {
    return a.value - b.value;
  }
}
