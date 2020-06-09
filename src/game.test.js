import { Client } from 'boardgame.io/client';
import Card from './Card';
import { SUIT, RANK } from './Card/constants';
import Play from './Play';
import { COMBO } from './Play/constants';
import Game from './game';

it('should mark winner after playing final card', () => {
  const hand = [new Card(RANK.TWO, SUIT.H)];
  const scenario = {
    ...Game,
    setup: () => ({
      players: {
        '0': hand,
        '1': [0, 1, 2],
        '2': [2, 3, 4],
        '3': [5, 6, 7],
      },
      log: [],
      startingPlayer: 0,
      lastPlay: null,
      playersInGame: ['0', '1', '2', '3'],
      playersInRound: ['0', '1', '2', '3'],
      winOrder: [],
    }),
  };

  const client = Client({
    game: scenario,
    numPlayers: 4,
  });

  const play = new Play(COMBO.SINGLE, hand);
  play.player = '0';
  client.moves.MakeMove(play); // p0 plays last card

  {
    const { G } = client.store.getState();

    // and p0 should be removed from game
    expect(G.playersInGame).not.toContain('0');
    expect(G.playersInRound).not.toContain('0');
    expect(G.winOrder).toContain('0');
  }

  // if everyone passes, power goes to p1
  client.moves.Pass(); // p1 passes
  client.moves.Pass(); // p2 passes
  client.moves.Pass(); // p3 passes

  {
    const { G, ctx } = client.store.getState();

    // now, power should go to p1
    expect(ctx.playOrderPos).toBe(1);
    expect(G.lastPlay).toBeNull();
  }
});

it('should mark second after playing last card', () => {
  const hand = [new Card(RANK.TWO, SUIT.H)];
  const scenario = {
    ...Game,
    setup: () => ({
      players: {
        '0': [0, 1, 2],
        '1': hand,
        '2': [],
        '3': [2, 3, 4],
      },
      log: [],
      startingPlayer: 1,
      lastPlay: new Play(COMBO.SINGLE, [new Card(RANK.TWO, SUIT.D)]),
      playersInGame: ['0', '1', '3'],
      playersInRound: ['1', '3'],
      winOrder: ['2'],
    }),
  };

  const client = Client({
    game: scenario,
    numPlayers: 4,
  });

  const play = new Play(COMBO.SINGLE, hand);
  client.moves.MakeMove(play); // p1 plays last card

  const { G, ctx } = client.store.getState();

  // and p1 should be removed from game
  expect(G.playersInGame).not.toContain('1');
  expect(G.playersInRound).not.toContain('1');
  expect(G.winOrder).toContain('1');

  // but p3 should be next and be able to beat the lastPlay
  expect(ctx.playOrderPos).toBe(3);
  expect(G.playersInRound.length).toBe(1);
  expect(G.playersInRound).toContain('3');
});

it('should pass power to the person after the winner, if all pass after a win', () => {
  const lastPlay = new Play(COMBO.SINGLE, [new Card(RANK.EIGHT, SUIT.D)]);
  lastPlay.player = '0';
  const scenario = {
    ...Game,
    setup: () => ({
      players: { '0': [], '1': [0, 1, 2], '2': [2, 3, 4], '3': [5, 6, 7] },
      log: [],
      startingPlayer: 3,
      lastPlay,
      playersInGame: ['1', '2', '3'],
      playersInRound: ['3'],
      winOrder: [0],
    }),
  };

  const client = Client({
    game: scenario,
    numPlayers: 4,
  });

  client.moves.Pass(); // p3 passes

  const { G, ctx } = client.store.getState();

  // now, power should go to p1
  expect(ctx.playOrderPos).toBe(1);
  expect(G.lastPlay).toBeNull();
});

it('should mark gameover after 3rd person goes out', () => {
  const hand = [new Card(RANK.TWO, SUIT.H)];
  const scenario = {
    ...Game,
    setup: () => ({
      players: {
        '0': hand,
        '1': [],
        '2': [],
        '3': [5, 6, 7],
      },
      log: [],
      startingPlayer: 0,
      lastPlay: null,
      playersInGame: ['0', '3'],
      playersInRound: ['0', '3'],
      winOrder: ['1', '2'],
    }),
  };

  const client = Client({
    game: scenario,
    numPlayers: 4,
  });

  const play = new Play(COMBO.SINGLE, hand);
  client.moves.MakeMove(play); // p0 plays last card

  const { G, ctx } = client.store.getState();

  // and p0 should be removed from game
  expect(G.playersInGame).not.toContain('0');
  expect(G.playersInRound).not.toContain('0');
  expect(G.winOrder).toContain('0');

  // and p1 should be declared winner
  expect(ctx.gameover.winOrder).toEqual(['1', '2', '0', '3']);
});

it('should mark gameover in a two person game', () => {
  const hand = [new Card(RANK.TWO, SUIT.H)];
  const scenario = {
    ...Game,
    setup: () => ({
      players: {
        '0': hand,
        '1': [0],
      },
      log: [],
      startingPlayer: 0,
      lastPlay: null,
      playersInGame: ['0', '1'],
      playersInRound: ['0', '1'],
      winOrder: [],
    }),
  };

  const client = Client({
    game: scenario,
    numPlayers: 2,
  });

  const play = new Play(COMBO.SINGLE, hand);
  client.moves.MakeMove(play); // p0 plays last card

  const { G, ctx } = client.store.getState();

  // and p0 should be removed from game
  expect(G.playersInGame).not.toContain('0');
  expect(G.playersInRound).not.toContain('0');

  // and p0 should be declared winner
  expect(ctx.gameover.winOrder).toEqual(['0', '1']);
});
