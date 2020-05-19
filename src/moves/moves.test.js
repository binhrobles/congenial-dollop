import { INVALID_MOVE } from 'boardgame.io/core';
import Card, { RANK, SUIT } from '../cards';
import MakeMove from './makeMove';
import Play, { COMBO } from '../play';

it('should allow a stronger single to beat a weaker single', () => {
  const G = {
    lastPlay: new Play(COMBO.SINGLE, [new Card(RANK.THREE, SUIT.H)]),
    hands: [[new Card(RANK.TWO, SUIT.H)]],
  };

  const ctx = {
    playOrderPos: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const newG = MakeMove(G, ctx, [0]);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(newG.hands[0].length).toBe(0);
  expect(newG.lastPlay).not.toBe(G.lastPlay);
});

it('should not allow a weaker single to beat a stronger single', () => {
  const G = {
    lastPlay: new Play(COMBO.PAIR, [new Card(RANK.TWO, SUIT.H)]),
    hands: [[new Card(RANK.THREE, SUIT.S)]],
  };

  const ctx = {
    playOrderPos: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  expect(MakeMove(G, ctx, [0])).toBe(INVALID_MOVE);
  expect(ctx.events.endTurn).not.toHaveBeenCalled();
});

it('should allow a stronger double to beat a weaker double', () => {
  const G = {
    lastPlay: new Play(COMBO.PAIR, [
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
    playOrderPos: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const newG = MakeMove(G, ctx, [0, 2]);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(newG.hands[0].length).toBe(1);
  expect(newG.lastPlay).not.toBe(G.lastPlay);
});

it('should allow a stronger trip to beat a weaker trip', () => {
  const G = {
    lastPlay: new Play(COMBO.TRIPLE, [
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
    playOrderPos: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const newG = MakeMove(G, ctx, [0, 1, 2]);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(newG.hands[0].length).toBe(0);
  expect(newG.lastPlay).not.toBe(G.lastPlay);
});

it('should allow a stronger quad to beat a weaker quad', () => {
  const G = {
    lastPlay: new Play(COMBO.QUAD, [
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
    playOrderPos: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const newG = MakeMove(G, ctx, [0, 1, 2, 3]);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(newG.hands[0].length).toBe(0);
  expect(newG.lastPlay).not.toBe(G.lastPlay);
});

it('should not allow a weaker quad to beat a stronger quad', () => {
  const G = {
    lastPlay: new Play(COMBO.QUAD, [
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
    playOrderPos: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  expect(MakeMove(G, ctx, [0, 1, 2, 3])).toBe(INVALID_MOVE);
  expect(ctx.events.endTurn).not.toHaveBeenCalled();
});

it('should allow a quad to beat a two', () => {
  const G = {
    lastPlay: new Play(COMBO.SINGLE, [new Card(RANK.TWO, SUIT.S)]),
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
    playOrderPos: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const newG = MakeMove(G, ctx, [0, 1, 2, 3]);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(newG.hands[0].length).toBe(0);
  expect(newG.lastPlay).not.toBe(G.lastPlay);
  expect(newG.lastPlay.combo).toBe(COMBO.QUAD);
});

it('should allow a bomb to beat a two', () => {
  const G = {
    lastPlay: new Play(COMBO.SINGLE, [new Card(RANK.TWO, SUIT.H)]),
    hands: [
      [
        new Card(RANK.FOUR, SUIT.H),
        new Card(RANK.FOUR, SUIT.D),
        new Card(RANK.FIVE, SUIT.S),
        new Card(RANK.FIVE, SUIT.C),
        new Card(RANK.SIX, SUIT.H),
        new Card(RANK.SIX, SUIT.C),
      ],
    ],
  };

  const ctx = {
    playOrderPos: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const newG = MakeMove(G, ctx, [0, 1, 2, 3, 4, 5]);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(newG.hands[0].length).toBe(0);
  expect(newG.lastPlay).not.toBe(G.lastPlay);
  expect(newG.lastPlay.combo).toBe(COMBO.BOMB);
});
