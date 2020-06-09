import { INVALID_MOVE } from 'boardgame.io/core';
import MakeMove, { tryStandardMove } from './makeMove';
import Card from '../Card';
import { RANK, SUIT } from '../Card/constants';
import Play from '../Play';
import { COMBO } from '../Play/constants';

it('should allow a stronger single to beat a weaker single', () => {
  const lastPlay = new Play(COMBO.SINGLE, [new Card(RANK.THREE, SUIT.H)]);
  const hand = [new Card(RANK.TWO, SUIT.H)];

  const G = {
    lastPlay,
    log: [],
    players: { '0': hand },
  };

  const ctx = {
    playOrderPos: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const play = { ...lastPlay, cards: hand };
  const newG = MakeMove(G, ctx, play);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(newG.players[0].length).toBe(0);
  expect(newG.lastPlay).not.toBe(G.lastPlay);
});

it('should not allow a weaker single to beat a stronger single', () => {
  const lastPlay = new Play(COMBO.PAIR, [new Card(RANK.TWO, SUIT.H)]);
  const hand = [new Card(RANK.THREE, SUIT.S)];
  const G = {
    lastPlay,
    log: [],
    players: { '0': hand },
  };

  const ctx = {
    playOrderPos: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const play = { ...lastPlay, cards: hand };

  expect(MakeMove(G, ctx, play)).toBe(INVALID_MOVE);
  expect(ctx.events.endTurn).not.toHaveBeenCalled();
});

it('should allow a stronger double to beat a weaker double', () => {
  const lastPlay = new Play(COMBO.PAIR, [
    new Card(RANK.THREE, SUIT.H),
    new Card(RANK.THREE, SUIT.S),
  ]);
  const hand = [
    new Card(RANK.EIGHT, SUIT.H),
    new Card(RANK.ACE, SUIT.C),
    new Card(RANK.EIGHT, SUIT.D),
  ];
  const G = {
    lastPlay,
    log: [],
    players: {
      '0': hand,
    },
  };

  const ctx = {
    playOrderPos: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const play = { ...lastPlay, cards: [hand[0], hand[2]] };
  const newG = MakeMove(G, ctx, play);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(newG.players[0].length).toBe(1);
  expect(newG.lastPlay).not.toBe(G.lastPlay);
});

it('should allow a stronger trip to beat a weaker trip', () => {
  const lastPlay = new Play(COMBO.TRIPLE, [
    new Card(RANK.THREE, SUIT.H),
    new Card(RANK.THREE, SUIT.S),
    new Card(RANK.THREE, SUIT.C),
  ]);
  const hand = [
    new Card(RANK.EIGHT, SUIT.H),
    new Card(RANK.EIGHT, SUIT.D),
    new Card(RANK.EIGHT, SUIT.C),
  ];

  const G = {
    lastPlay,
    log: [],
    players: {
      '0': hand,
    },
  };

  const ctx = {
    playOrderPos: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const play = { ...lastPlay, cards: hand };
  const newG = MakeMove(G, ctx, play);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(newG.players[0].length).toBe(0);
  expect(newG.lastPlay).not.toBe(G.lastPlay);
});

it('should allow a stronger quad to beat a weaker quad', () => {
  const lastPlay = new Play(COMBO.QUAD, [
    new Card(RANK.THREE, SUIT.H),
    new Card(RANK.THREE, SUIT.D),
    new Card(RANK.THREE, SUIT.S),
    new Card(RANK.THREE, SUIT.C),
  ]);
  const hand = [
    new Card(RANK.EIGHT, SUIT.H),
    new Card(RANK.EIGHT, SUIT.D),
    new Card(RANK.EIGHT, SUIT.C),
    new Card(RANK.EIGHT, SUIT.S),
  ];

  const G = {
    lastPlay,
    log: [],
    players: {
      '0': hand,
    },
  };

  const ctx = {
    playOrderPos: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const play = { ...lastPlay, cards: hand };
  const newG = MakeMove(G, ctx, play);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(newG.players[0].length).toBe(0);
  expect(newG.lastPlay).not.toBe(G.lastPlay);
});

it('should not allow a weaker quad to beat a stronger quad', () => {
  const lastPlay = new Play(COMBO.QUAD, [
    new Card(RANK.FIVE, SUIT.H),
    new Card(RANK.FIVE, SUIT.D),
    new Card(RANK.FIVE, SUIT.C),
    new Card(RANK.FIVE, SUIT.S),
  ]);
  const hand = [
    new Card(RANK.FOUR, SUIT.H),
    new Card(RANK.FOUR, SUIT.D),
    new Card(RANK.FOUR, SUIT.S),
    new Card(RANK.FOUR, SUIT.C),
  ];
  const G = {
    lastPlay,
    players: {
      '0': hand,
    },
  };

  const ctx = {
    playOrderPos: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const play = { ...lastPlay, cards: hand };
  const newG = MakeMove(G, ctx, play);

  expect(newG).toBe(INVALID_MOVE);
  expect(ctx.events.endTurn).not.toHaveBeenCalled();
});

it('should allow a quad to beat a two', () => {
  const lastPlay = new Play(COMBO.SINGLE, [new Card(RANK.TWO, SUIT.S)]);
  const hand = [
    new Card(RANK.FOUR, SUIT.H),
    new Card(RANK.FOUR, SUIT.D),
    new Card(RANK.FOUR, SUIT.S),
    new Card(RANK.FOUR, SUIT.C),
  ];
  const G = {
    lastPlay,
    log: [],
    players: {
      '0': hand,
    },
  };

  const ctx = {
    playOrderPos: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const play = new Play(COMBO.QUAD, hand);
  const newG = MakeMove(G, ctx, play);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(newG.players[0].length).toBe(0);
  expect(newG.lastPlay).not.toBe(G.lastPlay);
  expect(newG.lastPlay.combo).toBe(COMBO.QUAD);
});

it('should allow a bomb to beat a two', () => {
  const lastPlay = new Play(COMBO.SINGLE, [new Card(RANK.TWO, SUIT.H)]);
  const hand = [
    new Card(RANK.FOUR, SUIT.H),
    new Card(RANK.FOUR, SUIT.D),
    new Card(RANK.FIVE, SUIT.S),
    new Card(RANK.FIVE, SUIT.C),
    new Card(RANK.SIX, SUIT.H),
    new Card(RANK.SIX, SUIT.C),
  ];
  const G = {
    lastPlay,
    log: [],
    players: {
      '0': hand,
    },
  };

  const ctx = {
    playOrderPos: 0,
    events: {
      endTurn: jest.fn(),
    },
  };

  const play = new Play(COMBO.BOMB, hand);
  const newG = MakeMove(G, ctx, play);

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

  expect(() => tryStandardMove(lastPlay, attemptedCards)).toThrow();
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

  expect(() => tryStandardMove(lastPlay, attemptedCards)).not.toThrow();
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

  expect(() => tryStandardMove(lastPlay, attemptedCards)).toThrow();
});

it('should enforce a suited straight', () => {
  const lastPlay = new Play(
    COMBO.RUN,
    [
      new Card(RANK.THREE, SUIT.D),
      new Card(RANK.FOUR, SUIT.D),
      new Card(RANK.FIVE, SUIT.D),
    ],
    true
  );
  const attemptedCards = [
    new Card(RANK.THREE, SUIT.C),
    new Card(RANK.FOUR, SUIT.H),
    new Card(RANK.FIVE, SUIT.D),
  ];

  expect(() => tryStandardMove(lastPlay, attemptedCards)).toThrow();
});

it('should allow a better suited straight', () => {
  const lastPlay = new Play(
    COMBO.RUN,
    [
      new Card(RANK.THREE, SUIT.D),
      new Card(RANK.FOUR, SUIT.D),
      new Card(RANK.FIVE, SUIT.D),
    ],
    true
  );
  const attemptedCards = [
    new Card(RANK.THREE, SUIT.H),
    new Card(RANK.FOUR, SUIT.H),
    new Card(RANK.FIVE, SUIT.H),
  ];

  expect(() => tryStandardMove(lastPlay, attemptedCards)).not.toThrow();
});
