import { INVALID_MOVE } from 'boardgame.io/core';
import MakeMove, { tryStandardMove } from './makeMove';
import Card from '../Card';
import { RANK, SUIT } from '../Card/constants';
import Play from '../Play';
import { COMBO } from '../Play/constants';

it('should allow a stronger single to beat a weaker single', () => {
  const G = {
    lastPlay: new Play(COMBO.SINGLE, [new Card(RANK.THREE, SUIT.H)]),
    log: [],
    players: { '0': [new Card(RANK.TWO, SUIT.H)] },
  };

  const ctx = {
    playOrderPos: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const newG = MakeMove(G, ctx, [0]);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(newG.players[0].length).toBe(0);
  expect(newG.lastPlay).not.toBe(G.lastPlay);
});

it('should not allow a weaker single to beat a stronger single', () => {
  const G = {
    lastPlay: new Play(COMBO.PAIR, [new Card(RANK.TWO, SUIT.H)]),
    log: [],
    players: { '0': [new Card(RANK.THREE, SUIT.S)] },
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
    log: [],
    players: {
      '0': [
        new Card(RANK.EIGHT, SUIT.H),
        new Card(RANK.ACE, SUIT.C),
        new Card(RANK.EIGHT, SUIT.D),
      ],
    },
  };

  const ctx = {
    playOrderPos: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const newG = MakeMove(G, ctx, [0, 2]);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(newG.players[0].length).toBe(1);
  expect(newG.lastPlay).not.toBe(G.lastPlay);
});

it('should allow a stronger trip to beat a weaker trip', () => {
  const G = {
    lastPlay: new Play(COMBO.TRIPLE, [
      new Card(RANK.THREE, SUIT.H),
      new Card(RANK.THREE, SUIT.S),
      new Card(RANK.THREE, SUIT.C),
    ]),
    log: [],
    players: {
      '0': [
        new Card(RANK.EIGHT, SUIT.H),
        new Card(RANK.EIGHT, SUIT.D),
        new Card(RANK.EIGHT, SUIT.C),
      ],
    },
  };

  const ctx = {
    playOrderPos: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const newG = MakeMove(G, ctx, [0, 1, 2]);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(newG.players[0].length).toBe(0);
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
    log: [],
    players: {
      '0': [
        new Card(RANK.EIGHT, SUIT.H),
        new Card(RANK.EIGHT, SUIT.D),
        new Card(RANK.EIGHT, SUIT.C),
        new Card(RANK.EIGHT, SUIT.S),
      ],
    },
  };

  const ctx = {
    playOrderPos: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const newG = MakeMove(G, ctx, [0, 1, 2, 3]);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(newG.players[0].length).toBe(0);
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
    players: {
      '0': [
        new Card(RANK.FOUR, SUIT.H),
        new Card(RANK.FOUR, SUIT.D),
        new Card(RANK.FOUR, SUIT.S),
        new Card(RANK.FOUR, SUIT.C),
      ],
    },
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
    log: [],
    players: {
      '0': [
        new Card(RANK.FOUR, SUIT.H),
        new Card(RANK.FOUR, SUIT.D),
        new Card(RANK.FOUR, SUIT.S),
        new Card(RANK.FOUR, SUIT.C),
      ],
    },
  };

  const ctx = {
    playOrderPos: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const newG = MakeMove(G, ctx, [0, 1, 2, 3]);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(newG.players[0].length).toBe(0);
  expect(newG.lastPlay).not.toBe(G.lastPlay);
  expect(newG.lastPlay.combo).toBe(COMBO.QUAD);
});

it('should allow a bomb to beat a two', () => {
  const G = {
    lastPlay: new Play(COMBO.SINGLE, [new Card(RANK.TWO, SUIT.H)]),
    log: [],
    players: [
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
  expect(newG.players[0].length).toBe(0);
  expect(newG.lastPlay).not.toBe(G.lastPlay);
  expect(newG.lastPlay.combo).toBe(COMBO.BOMB);
});

it('should allow a 8 bomb to beat a pair of twos', () => {
  const lastPlay = new Play(COMBO.PAIR, [
    new Card(RANK.TWO, SUIT.H),
    new Card(RANK.TWO, SUIT.D),
  ]);
  const attemptedCards = [
    new Card(RANK.FOUR, SUIT.H),
    new Card(RANK.FOUR, SUIT.D),
    new Card(RANK.FIVE, SUIT.S),
    new Card(RANK.FIVE, SUIT.C),
    new Card(RANK.SIX, SUIT.H),
    new Card(RANK.SIX, SUIT.C),
    new Card(RANK.SEVEN, SUIT.H),
    new Card(RANK.SEVEN, SUIT.D),
  ];

  const attemptedPlay = tryStandardMove(lastPlay, attemptedCards);

  expect(attemptedPlay).not.toEqual(INVALID_MOVE);
  expect(attemptedPlay.combo).toBe(COMBO.BOMB);
});

it('should not allow a 6 bomb to beat a pair of twos', () => {
  const lastPlay = new Play(COMBO.PAIR, [
    new Card(RANK.TWO, SUIT.H),
    new Card(RANK.TWO, SUIT.D),
  ]);
  const attemptedCards = [
    new Card(RANK.FIVE, SUIT.S),
    new Card(RANK.FIVE, SUIT.C),
    new Card(RANK.SIX, SUIT.H),
    new Card(RANK.SIX, SUIT.C),
    new Card(RANK.SEVEN, SUIT.H),
    new Card(RANK.SEVEN, SUIT.D),
  ];

  const attemptedPlay = tryStandardMove(lastPlay, attemptedCards);

  expect(attemptedPlay).toBe(INVALID_MOVE);
});

it('should allow a better run to win', () => {
  const lastPlay = new Play(COMBO.RUN, [
    new Card(RANK.THREE, SUIT.H),
    new Card(RANK.FOUR, SUIT.D),
    new Card(RANK.FIVE, SUIT.H),
  ]);
  const attemptedCards = [
    new Card(RANK.QUEEN, SUIT.C),
    new Card(RANK.KING, SUIT.H),
    new Card(RANK.ACE, SUIT.D),
  ];

  const attemptedPlay = tryStandardMove(lastPlay, attemptedCards);

  expect(attemptedPlay).not.toBe(INVALID_MOVE);
});

it('should disallow a worse run to win', () => {
  const lastPlay = new Play(COMBO.RUN, [
    new Card(RANK.THREE, SUIT.H),
    new Card(RANK.FOUR, SUIT.D),
    new Card(RANK.FIVE, SUIT.H),
  ]);
  const attemptedCards = [
    new Card(RANK.THREE, SUIT.C),
    new Card(RANK.FOUR, SUIT.H),
    new Card(RANK.FIVE, SUIT.D),
  ];

  const attemptedPlay = tryStandardMove(lastPlay, attemptedCards);

  expect(attemptedPlay).toBe(INVALID_MOVE);
});
