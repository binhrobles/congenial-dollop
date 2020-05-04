import { Client } from 'boardgame.io/react';
import { STANDARD_DECK, COMBOS } from './constants';
// import assert from 'assert';

export class Play {
  // combo: COMBOS enum
  // cards: [] of CARD strings
  // suited: bool (only relevant for runs)
  constructor(combo, cards, suited = false) {
    this.combo = combo;
    this.cards = cards;
    this.suited = suited;
  }

  // TODO
  // for runs, validates # of cards and suit preference
  matchesCombo(cards) {
    // validate is same combo
    if (this.combo === COMBOS.SINGLE) return Play.isSingle(cards);
    return true;
  }

  static isSingle(cards) {
    return cards.length === 1;
  }

  static determineCombo(cards) {
    if (Play.isSingle(cards)) return COMBOS.SINGLE;
    else return COMBOS.INVALID;
  }

  toString() {
    return `Combo: ${this.combo}\nCards: ${this.cards}\nSuited? ${this.suited}`;
  }

  // TODO: comparison definition
}

export function setup(ctx) {
  return {
    hands: dealCards(ctx.numPlayers, ctx.random.Shuffle(STANDARD_DECK)),
    lastPlay: null,
  };
}

export function dealCards(numPlayers, deck) {
  const hands = Array(numPlayers).fill().map(() => []); // fills `hands` with unique Array objects

  for (let i = 0; i <= 12; i++) {
    hands.forEach(hand => hand.push(deck.pop()));
  }

  return hands;
}

export function ResponsePlay(G, ctx, card_ids) {
  const cards = [];
  card_ids.forEach(id => {
    cards.push(G.hands[ctx.currentPlayer][id]);
  });

  // optimistically created
  const attemptedPlay = new Play(G.lastPlay.combo, cards, G.lastPlay.suited);

  if (G.lastPlay.matchesCombo(cards) || attemptedPlay < G.lastPlay) {
    console.log(`Invalid play: ${attemptedPlay} does not beat ${G.lastPlay}`);
    return;
  }

  card_ids.forEach(id => {
    G.hands[ctx.currentPlayer].slice(id, 1);
  });
  G.lastPlay = attemptedPlay;

  console.log(`${G.lastPlay} played`);
  ctx.events.endTurn();
}

export function OpeningPlay(G, ctx, card_ids) {
  const cards = [];
  card_ids.forEach(id => {
    cards.push(G.hands[ctx.currentPlayer][id]);
  });

  const combo = Play.determineCombo(cards);

  if (combo === COMBOS.INVALID) {
    console.log(`Invalid play: Could not determine combo of ${cards}`);
    return;
  }

  card_ids.forEach(id => {
    G.hands[ctx.currentPlayer].slice(id, 1);
  });
  G.lastPlay = new Play(combo, cards); // TODO: suited?

  console.log(`${G.lastPlay} played`);
  ctx.events.endTurn();
}

const Thirteen = {
  name: 'thirteen',
  setup,
  moves: { OpeningPlay, ResponsePlay },
};

const App = Client({
  game: Thirteen,
  numPlayers: 4,
});

export default App;
