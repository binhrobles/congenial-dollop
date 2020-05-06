import { COMBO } from './common';
import SinglePlay from './single';
import PairPlay from './pair';
import TriplePlay from './triple';
import QuadPlay from './quad';

export default class PlayFactory {
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
    return COMBO.INVALID;
  }
}
