import { INVALID_MOVE } from 'boardgame.io/core';
import Play from '../Play';
import { COMBO } from '../Play/constants';
import { RANK } from '../Card/constants';

export function getCardsFromIds(hand, ids) {
  const cards = [];

  ids.forEach((id) => {
    // instead of copying from proxied `G` object, create local versions
    cards.push({ ...hand[id] });
  });

  return cards;
}

export function standardMove(lastPlay, cards) {
  if (!Play.MatchesCombo(lastPlay, cards)) {
    // generally, if this play isn't of the same combo type, we can disqualify,
    // but in the case of SINGLE twos being chopped, we can switch to BOMBs or QUADs
    if (
      lastPlay.combo === COMBO.SINGLE &&
      lastPlay.cards[0].rank === RANK.TWO
    ) {
      const attemptedCombo = Play.DetermineCombo(cards);
      if (attemptedCombo === COMBO.QUAD || attemptedCombo === COMBO.BOMB) {
        return new Play(attemptedCombo, cards);
      }
    }

    return INVALID_MOVE;
  }

  const attemptedPlay = new Play(lastPlay.combo, cards);

  if (Play.ValueOf(lastPlay) > Play.ValueOf(attemptedPlay)) {
    return INVALID_MOVE;
  }

  return attemptedPlay;
}

export function openingMove(cards) {
  const combo = Play.DetermineCombo(cards);

  if (combo === COMBO.INVALID || combo === COMBO.BOMB) {
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
  currentPlay.player = ctx.currentPlayer;

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
