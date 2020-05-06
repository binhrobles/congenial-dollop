import { INVALID_MOVE } from 'boardgame.io/core';
import { COMBO, Play } from './play';

export function getCardsFromIds(hand, ids) {
  const cards = [];

  ids.forEach((id) => {
    // instead of copying from proxied `G` object, create local versions
    cards.push({ ...hand[id] });
  });

  return cards;
}

export function standardMove(lastPlay, cards) {
  if (!lastPlay.matchesCombo(cards)) {
    console.log(`${cards} is not a ${lastPlay.combo}`);
    return INVALID_MOVE;
  }

  if (!lastPlay.isBeatenBy(cards)) {
    console.log(`${cards} does not beat ${lastPlay.cards}`);
    return INVALID_MOVE;
  }

  return new Play(lastPlay.combo, cards);
}

export function openingMove(cards) {
  const combo = Play.DetermineCombo(cards);

  if (combo === COMBO.INVALID) {
    return INVALID_MOVE;
  }

  // TODO: suited?
  return new Play(combo, cards);
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
