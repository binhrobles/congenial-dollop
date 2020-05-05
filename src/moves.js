import { INVALID_MOVE } from 'boardgame.io/core';
import { Play, COMBO } from './play';

export function getCardsFromIds(hand, ids) {
  const cards = [];

  debugger;
  for (const id of ids) {
    // instead of copying from proxied `G` object, create local versions
    cards.push({...hand[id]});
  };

  return cards;
}

export function standardMove(lastPlay, cards) {
  if (!lastPlay.constructor.matchCombo(cards)) {
    return INVALID_MOVE;
  }

  const attemptedPlay = Object.create(lastPlay);
  attemptedPlay.cards = cards;

  if (attemptedPlay < lastPlay) {
    return INVALID_MOVE;
  }

  return attemptedPlay;
}

export function openingMove(cards) {
  const combo = Play.determineCombo(cards);

  if (combo === COMBO.INVALID) {
    return INVALID_MOVE;
  } 

  // TODO: suited?
  return Play.instantiatePlay(combo, cards);
}

export function MakeMove(G, ctx, card_ids) {
  const current_player_id = parseInt(ctx.currentPlayer);
  const cards = getCardsFromIds(G.hands[current_player_id], card_ids);
  
  const currentPlay = G.lastPlay ? standardMove(G.lastPlay, cards) : openingMove(cards);
  if (currentPlay === INVALID_MOVE) return INVALID_MOVE;

  // deep copy object so we don't modify state
  const new_hands = JSON.parse(JSON.stringify(G.hands));

  // reverse array before splicing ids, since array will be modified
  for (const id of card_ids.reverse()) {
    new_hands[current_player_id].splice(id, 1);
  };

  ctx.events.endTurn();
  return { 
    ...G, 
    hands: new_hands,
    lastPlay: currentPlay,
  };
}
