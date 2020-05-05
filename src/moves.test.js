import { INVALID_MOVE } from 'boardgame.io/core';
import { SinglePlay } from './play';
import { Card, RANK, SUIT } from './cards';
import { ResponsePlay } from './moves';

it('should allow a stronger single to beat a weaker single', () => {
  const G = {
    lastPlay: new SinglePlay([ new Card(RANK.THREE, SUIT.H) ]),
    hands: [
      [ new Card(RANK.TWO, SUIT.H) ]
    ],
  };

  const ctx = {
    currentPlayer: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const new_G = ResponsePlay(G, ctx, [0])

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(new_G.hands[0].length).toBe(0);
});

it('should not allow a weaker single to beat a stronger single', () => {
  const G = {
    lastPlay: new SinglePlay([new Card(RANK.TWO, SUIT.H)]),
    hands: [
      [ new Card(RANK.THREE, SUIT.S) ]
    ],
  };

  const ctx = {
    currentPlayer: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  expect(ResponsePlay(G, ctx, [0])).toBe(INVALID_MOVE);

  expect(ctx.events.endTurn).not.toHaveBeenCalled();
});
