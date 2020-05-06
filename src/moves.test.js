import { INVALID_MOVE } from 'boardgame.io/core';
import { SinglePlay, PairPlay, TriplePlay, QuadPlay } from './play';
import { Card, RANK, SUIT } from './cards';
import { MakeMove } from './moves';

it('should allow a stronger single to beat a weaker single', () => {
  const G = {
    lastPlay: new SinglePlay([new Card(RANK.THREE, SUIT.H)]),
    hands: [[new Card(RANK.TWO, SUIT.H)]],
  };

  const ctx = {
    currentPlayer: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const new_G = MakeMove(G, ctx, [0]);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(new_G.hands[0].length).toBe(0);
  expect(new_G.lastPlay).not.toBe(G.lastPlay);
});

it('should not allow a weaker single to beat a stronger single', () => {
  const G = {
    lastPlay: new SinglePlay([new Card(RANK.TWO, SUIT.H)]),
    hands: [[new Card(RANK.THREE, SUIT.S)]],
  };

  const ctx = {
    currentPlayer: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  expect(MakeMove(G, ctx, [0])).toBe(INVALID_MOVE);

  expect(ctx.events.endTurn).not.toHaveBeenCalled();
});

it('should allow a stronger double to beat a weaker double', () => {
  const G = {
    lastPlay: new PairPlay([
      new Card(RANK.THREE, SUIT.H),
      new Card(RANK.THREE, SUIT.S),
    ]),
    hands: [
      [
        new Card(RANK.EIGHT, SUIT.H),
        new Card(RANK.ACE, SUIT.C),
        new Card(RANK.EIGHT, SUIT.D),
      ],
    ],
  };

  const ctx = {
    currentPlayer: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const new_G = MakeMove(G, ctx, [0, 2]);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(new_G.hands[0].length).toBe(1);
  expect(new_G.lastPlay).not.toBe(G.lastPlay);
});

it('should allow a stronger trip to beat a weaker trip', () => {
  const G = {
    lastPlay: new TriplePlay([
      new Card(RANK.THREE, SUIT.H),
      new Card(RANK.THREE, SUIT.S),
      new Card(RANK.THREE, SUIT.C),
    ]),
    hands: [
      [
        new Card(RANK.EIGHT, SUIT.H),
        new Card(RANK.EIGHT, SUIT.D),
        new Card(RANK.EIGHT, SUIT.C),
      ],
    ],
  };

  const ctx = {
    currentPlayer: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const new_G = MakeMove(G, ctx, [0, 1, 2]);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(new_G.hands[0].length).toBe(0);
  expect(new_G.lastPlay).not.toBe(G.lastPlay);
});

it('should allow a stronger quad to beat a weaker quad', () => {
  const G = {
    lastPlay: new QuadPlay([
      new Card(RANK.THREE, SUIT.H),
      new Card(RANK.THREE, SUIT.D),
      new Card(RANK.THREE, SUIT.S),
      new Card(RANK.THREE, SUIT.C),
    ]),
    hands: [
      [
        new Card(RANK.EIGHT, SUIT.H),
        new Card(RANK.EIGHT, SUIT.D),
        new Card(RANK.EIGHT, SUIT.C),
        new Card(RANK.EIGHT, SUIT.S),
      ],
    ],
  };

  const ctx = {
    currentPlayer: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const new_G = MakeMove(G, ctx, [0, 1, 2, 3]);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(new_G.hands[0].length).toBe(0);
  expect(new_G.lastPlay).not.toBe(G.lastPlay);
});

it('should not allow a weaker quad to beat a stronger quad', () => {
  const G = {
    lastPlay: new QuadPlay([
      new Card(RANK.FIVE, SUIT.H),
      new Card(RANK.FIVE, SUIT.D),
      new Card(RANK.FIVE, SUIT.C),
      new Card(RANK.FIVE, SUIT.S),
    ]),
    hands: [
      [
        new Card(RANK.FOUR, SUIT.H),
        new Card(RANK.FOUR, SUIT.D),
        new Card(RANK.FOUR, SUIT.S),
        new Card(RANK.FOUR, SUIT.C),
      ],
    ],
  };

  const ctx = {
    currentPlayer: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  MakeMove(G, ctx, [0, 1, 2, 3]);

  expect(MakeMove(G, ctx, [0])).toBe(INVALID_MOVE);
  expect(ctx.events.endTurn).not.toHaveBeenCalled();
});
