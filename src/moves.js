import { INVALID_MOVE } from 'boardgame.io/core';
import { Play, COMBO } from './play';

export function ResponsePlay(G, ctx, card_ids) {

  const cards = [];
  card_ids.forEach(id => {
    cards.push(G.hands[ctx.currentPlayer][id]);
  });

  if (!G.lastPlay.constructor.matchCombo(cards)) {
    return INVALID_MOVE;
  }

  const attemptedPlay = Object.create(G.lastPlay);
  attemptedPlay.cards = cards;

  if (attemptedPlay < G.lastPlay) {
    return INVALID_MOVE;
  }

  const new_hands = JSON.parse(JSON.stringify(G.hands));
  card_ids.forEach(id => {
    new_hands[ctx.currentPlayer].splice(id, 1);
  });

  ctx.events.endTurn();
  return { 
    ...G, 
    hands: new_hands 
  };
}

export function OpeningPlay(G, ctx, card_ids) {
  const cards = [];
  card_ids.forEach(id => {
    cards.push(G.hands[ctx.currentPlayer][id]);
  });

  const combo = Play.determineCombo(cards);

  if (combo === COMBO.INVALID) {
    return INVALID_MOVE;
  } 

  // TODO: suited?

  const new_hands = JSON.parse(JSON.stringify(G.hands));
  card_ids.forEach(id => {
    new_hands[ctx.currentPlayer].splice(id, 1);
  });

  ctx.events.endTurn();

  return { 
    ...G, 
    hands: new_hands, 
    lastPlay: Play.instantiatePlay(combo, cards) 
  };
}
