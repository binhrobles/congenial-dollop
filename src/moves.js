import { INVALID_MOVE } from 'boardgame.io/core';
import { Play, COMBO } from './play';

export function ResponsePlay(G, ctx, card_ids) {
  const cards = [];
  for (const id of card_ids) {
    cards.push(G.hands[ctx.currentPlayer][id]);
  };

  if (!G.lastPlay.constructor.matchCombo(cards)) {
    return INVALID_MOVE;
  }

  const attemptedPlay = Object.create(G.lastPlay);
  attemptedPlay.cards = cards;

  if (attemptedPlay < G.lastPlay) {
    return INVALID_MOVE;
  }

  // deep copy object so we don't modify state
  const new_hands = JSON.parse(JSON.stringify(G.hands));

  // reverse array before splicing ids, since array will be modified
  for (const id of card_ids.reverse()) {
    new_hands[ctx.currentPlayer].splice(id, 1);
  };

  ctx.events.endTurn();
  return { 
    ...G, 
    hands: new_hands 
  };
}

export function OpeningPlay(G, ctx, card_ids) {
  const cards = [];
  for (const id of card_ids) {
    cards.push(G.hands[ctx.currentPlayer][id]);
  };

  const combo = Play.determineCombo(cards);

  if (combo === COMBO.INVALID) {
    return INVALID_MOVE;
  } 

  // TODO: suited?

  // deep copy object so we don't modify state
  const new_hands = JSON.parse(JSON.stringify(G.hands));

  // reverse array before splicing ids, since array will be modified
  for (const id of card_ids.reverse()) {
    new_hands[ctx.currentPlayer].splice(id, 1);
  };

  ctx.events.endTurn();

  return { 
    ...G, 
    hands: new_hands, 
    lastPlay: Play.instantiatePlay(combo, cards) 
  };
}
