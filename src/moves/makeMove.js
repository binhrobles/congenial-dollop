import { INVALID_MOVE } from 'boardgame.io/core';
import { COMBO, Play } from '../play';

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
    console.log(`${JSON.stringify(cards)} is not a ${lastPlay.combo}`);
    return INVALID_MOVE;
  }

  const attemptedPlay = new Play(lastPlay.combo, cards);

  if (lastPlay > attemptedPlay) {
    console.log(`${attemptedPlay.cards[0]} does not beat ${lastPlay.cards[0]}`);
    return INVALID_MOVE;
  }

  return attemptedPlay;
}

export function openingMove(cards) {
  const combo = Play.DetermineCombo(cards);

  if (combo === COMBO.INVALID) {
    return INVALID_MOVE;
  }

  // TODO: suited?
  return new Play(combo, cards);
}

export default function MakeMove(G, ctx, cardIds) {
  // ensure card selection is valid (should be done on the client as well)
  const selectionSet = new Set(cardIds);
  if (cardIds.length !== selectionSet.size) return INVALID_MOVE;

  const cards = getCardsFromIds(G.hands[ctx.playOrderPos], cardIds);

  const currentPlay = G.lastPlay
    ? standardMove(G.lastPlay, cards)
    : openingMove(cards);
  if (currentPlay === INVALID_MOVE) return INVALID_MOVE;

  // deep copy object so we don't modify state
  const newHands = JSON.parse(JSON.stringify(G.hands));

  // reverse array before splicing ids, since array will be modified
  cardIds.reverse().forEach((id) => {
    newHands[ctx.playOrderPos].splice(id, 1);
  });

  ctx.events.endTurn();
  return {
    ...G,
    hands: newHands,
    lastPlay: currentPlay,
  };
}
