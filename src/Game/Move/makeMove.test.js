import { INVALID_MOVE } from 'boardgame.io/core';
import MakeMove, { tryStandardMove } from './makeMove';
import Card, { RANK, SUIT } from '../Card';
import Play, { COMBO } from '../Play';

it('should allow a stronger single to beat a weaker single', () => {
  const lastPlay = Play.Get(COMBO.SINGLE, [Card.Get(RANK.THREE, SUIT.H)]);

  const hand = [Card.Get(RANK.TWO, SUIT.H)];
  const nextPlay = Play.Get(COMBO.SINGLE, hand);

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

  const newG = MakeMove(G, ctx, nextPlay);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(newG.players[0].length).toBe(0);
  expect(newG.lastPlay).not.toBe(G.lastPlay);
});

it('should not allow a weaker single to beat a stronger single', () => {
  const lastPlay = Play.Get(COMBO.PAIR, [Card.Get(RANK.TWO, SUIT.H)]);

  const hand = [Card.Get(RANK.THREE, SUIT.S)];
  const nextPlay = Play.Get(COMBO.PAIR, hand);

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

  expect(MakeMove(G, ctx, nextPlay)).toBe(INVALID_MOVE);
  expect(ctx.events.endTurn).not.toHaveBeenCalled();
});

it('should allow a stronger double to beat a weaker double', () => {
  const lastPlay = Play.Get(COMBO.PAIR, [
    Card.Get(RANK.THREE, SUIT.H),
    Card.Get(RANK.THREE, SUIT.S),
  ]);
  const hand = [
    Card.Get(RANK.EIGHT, SUIT.H),
    Card.Get(RANK.ACE, SUIT.C),
    Card.Get(RANK.EIGHT, SUIT.D),
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
  const lastPlay = Play.Get(COMBO.TRIPLE, [
    Card.Get(RANK.THREE, SUIT.H),
    Card.Get(RANK.THREE, SUIT.S),
    Card.Get(RANK.THREE, SUIT.C),
  ]);
  const hand = [
    Card.Get(RANK.EIGHT, SUIT.H),
    Card.Get(RANK.EIGHT, SUIT.D),
    Card.Get(RANK.EIGHT, SUIT.C),
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
  const lastPlay = Play.Get(COMBO.QUAD, [
    Card.Get(RANK.THREE, SUIT.H),
    Card.Get(RANK.THREE, SUIT.D),
    Card.Get(RANK.THREE, SUIT.S),
    Card.Get(RANK.THREE, SUIT.C),
  ]);
  const hand = [
    Card.Get(RANK.EIGHT, SUIT.H),
    Card.Get(RANK.EIGHT, SUIT.D),
    Card.Get(RANK.EIGHT, SUIT.C),
    Card.Get(RANK.EIGHT, SUIT.S),
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
  const lastPlay = Play.Get(COMBO.QUAD, [
    Card.Get(RANK.FIVE, SUIT.H),
    Card.Get(RANK.FIVE, SUIT.D),
    Card.Get(RANK.FIVE, SUIT.C),
    Card.Get(RANK.FIVE, SUIT.S),
  ]);
  const hand = [
    Card.Get(RANK.FOUR, SUIT.H),
    Card.Get(RANK.FOUR, SUIT.D),
    Card.Get(RANK.FOUR, SUIT.S),
    Card.Get(RANK.FOUR, SUIT.C),
  ];
  const nextPlay = Play.Get(COMBO.QUAD, hand);

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

  const newG = MakeMove(G, ctx, nextPlay);

  expect(newG).toBe(INVALID_MOVE);
  expect(ctx.events.endTurn).not.toHaveBeenCalled();
});

it('should allow a quad to beat a two', () => {
  const lastPlay = Play.Get(COMBO.SINGLE, [Card.Get(RANK.TWO, SUIT.S)]);
  const hand = [
    Card.Get(RANK.FOUR, SUIT.H),
    Card.Get(RANK.FOUR, SUIT.D),
    Card.Get(RANK.FOUR, SUIT.S),
    Card.Get(RANK.FOUR, SUIT.C),
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

  const play = Play.Get(COMBO.QUAD, hand);
  const newG = MakeMove(G, ctx, play);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(newG.players[0].length).toBe(0);
  expect(newG.lastPlay).not.toBe(G.lastPlay);
  expect(newG.lastPlay.combo).toBe(COMBO.QUAD);
});

it('should allow a bomb to beat a two', () => {
  const lastPlay = Play.Get(COMBO.SINGLE, [Card.Get(RANK.TWO, SUIT.H)]);
  const hand = [
    Card.Get(RANK.FOUR, SUIT.H),
    Card.Get(RANK.FOUR, SUIT.D),
    Card.Get(RANK.FIVE, SUIT.S),
    Card.Get(RANK.FIVE, SUIT.C),
    Card.Get(RANK.SIX, SUIT.H),
    Card.Get(RANK.SIX, SUIT.C),
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

  const play = Play.Get(COMBO.BOMB, hand);
  const newG = MakeMove(G, ctx, play);

  expect(ctx.events.endTurn).toHaveBeenCalled();
  expect(newG.players[0].length).toBe(0);
  expect(newG.lastPlay).not.toBe(G.lastPlay);
  expect(newG.lastPlay.combo).toBe(COMBO.BOMB);
});

it('should allow a 8 bomb to beat a pair of twos', () => {
  const lastPlay = Play.Get(COMBO.PAIR, [
    Card.Get(RANK.TWO, SUIT.H),
    Card.Get(RANK.TWO, SUIT.D),
  ]);
  const attemptedCards = [
    Card.Get(RANK.FOUR, SUIT.H),
    Card.Get(RANK.FOUR, SUIT.D),
    Card.Get(RANK.FIVE, SUIT.S),
    Card.Get(RANK.FIVE, SUIT.C),
    Card.Get(RANK.SIX, SUIT.H),
    Card.Get(RANK.SIX, SUIT.C),
    Card.Get(RANK.SEVEN, SUIT.H),
    Card.Get(RANK.SEVEN, SUIT.D),
  ];

  const attemptedPlay = tryStandardMove(lastPlay, attemptedCards);

  expect(attemptedPlay).not.toEqual(INVALID_MOVE);
  expect(attemptedPlay.combo).toBe(COMBO.BOMB);
});

it('should not allow a 6 bomb to beat a pair of twos', () => {
  const lastPlay = Play.Get(COMBO.PAIR, [
    Card.Get(RANK.TWO, SUIT.H),
    Card.Get(RANK.TWO, SUIT.D),
  ]);
  const attemptedCards = [
    Card.Get(RANK.FIVE, SUIT.S),
    Card.Get(RANK.FIVE, SUIT.C),
    Card.Get(RANK.SIX, SUIT.H),
    Card.Get(RANK.SIX, SUIT.C),
    Card.Get(RANK.SEVEN, SUIT.H),
    Card.Get(RANK.SEVEN, SUIT.D),
  ];

  expect(() => tryStandardMove(lastPlay, attemptedCards)).toThrow();
});

it('should allow a better run to win', () => {
  const lastPlay = Play.Get(COMBO.RUN, [
    Card.Get(RANK.THREE, SUIT.H),
    Card.Get(RANK.FOUR, SUIT.D),
    Card.Get(RANK.FIVE, SUIT.H),
  ]);
  const attemptedCards = [
    Card.Get(RANK.QUEEN, SUIT.C),
    Card.Get(RANK.KING, SUIT.H),
    Card.Get(RANK.ACE, SUIT.D),
  ];

  expect(() => tryStandardMove(lastPlay, attemptedCards)).not.toThrow();
});

it('should disallow a worse run to win', () => {
  const lastPlay = Play.Get(COMBO.RUN, [
    Card.Get(RANK.THREE, SUIT.H),
    Card.Get(RANK.FOUR, SUIT.D),
    Card.Get(RANK.FIVE, SUIT.H),
  ]);
  const attemptedCards = [
    Card.Get(RANK.THREE, SUIT.C),
    Card.Get(RANK.FOUR, SUIT.H),
    Card.Get(RANK.FIVE, SUIT.D),
  ];

  expect(() => tryStandardMove(lastPlay, attemptedCards)).toThrow();
});

it('should enforce a suited straight', () => {
  const lastPlay = Play.Get(
    COMBO.RUN,
    [
      Card.Get(RANK.THREE, SUIT.D),
      Card.Get(RANK.FOUR, SUIT.D),
      Card.Get(RANK.FIVE, SUIT.D),
    ],
    true
  );
  const attemptedCards = [
    Card.Get(RANK.THREE, SUIT.C),
    Card.Get(RANK.FOUR, SUIT.H),
    Card.Get(RANK.FIVE, SUIT.D),
  ];

  expect(() => tryStandardMove(lastPlay, attemptedCards)).toThrow();
});

it('should allow a better suited straight', () => {
  const lastPlay = Play.Get(
    COMBO.RUN,
    [
      Card.Get(RANK.THREE, SUIT.D),
      Card.Get(RANK.FOUR, SUIT.D),
      Card.Get(RANK.FIVE, SUIT.D),
    ],
    true
  );
  const attemptedCards = [
    Card.Get(RANK.THREE, SUIT.H),
    Card.Get(RANK.FOUR, SUIT.H),
    Card.Get(RANK.FIVE, SUIT.H),
  ];

  expect(() => tryStandardMove(lastPlay, attemptedCards)).not.toThrow();
});
