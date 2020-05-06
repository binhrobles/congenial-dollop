import { INVALID_MOVE } from 'boardgame.io/core';
import { COMBO } from './plays/common';
import PlayFactory from './plays/factory';

export function getCardsFromIds(hand, ids) {
  const cards = [];

  ids.forEach((id) => {
    // instead of copying from proxied `G` object, create local versions
    cards.push({ ...hand[id] });
  });

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
  const combo = PlayFactory.DetermineCombo(cards);

  if (combo === COMBO.INVALID) {
    return INVALID_MOVE;
  }

  // TODO: suited?
  return PlayFactory.InstantiatePlay(combo, cards);
}

export function MakeMove(G, ctx, cardIds) {
  const currentPlayerId = parseInt(ctx.currentPlayer, 10);
  const cards = getCardsFromIds(G.hands[currentPlayerId], cardIds);

  const currentPlay = G.lastPlay
    ? standardMove(G.lastPlay, cards)
    : openingMove(cards);
  if (currentPlay === INVALID_MOVE) return INVALID_MOVE;

  // deep copy object so we don't modify state
  const newHands = JSON.parse(JSON.stringify(G.hands));

  // reverse array before splicing ids, since array will be modified
  cardIds.reverse().forEach((id) => {
    newHands[currentPlayerId].splice(id, 1);
  });

  ctx.events.endTurn();
  return {
    ...G,
    hands: newHands,
    lastPlay: currentPlay,
  };
}
