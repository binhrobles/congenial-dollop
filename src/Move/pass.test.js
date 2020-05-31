import { Client } from 'boardgame.io/client';
import Game from '../game';

it('should remove a player from the round', () => {
  const scenario = {
    ...Game,
    setup: () => ({
      players: {
        '0': [8, 9, 10],
        '1': [0, 1, 2],
        '2': [2, 3, 4],
        '3': [5, 6, 7],
      },
      startingPlayer: 0,
      lastPlay: { foo: 1 },
      log: [],
      playersInGame: ['0', '1', '2', '3'],
      playersInRound: ['0', '1', '2', '3'],
      winOrder: [],
    }),
  };

  const client = Client({
    game: scenario,
    numPlayers: 4,
  });

  client.moves.Pass(); // p0 passes
  let { G, ctx } = client.store.getState();

  expect(ctx.playOrderPos).toBe(1);
  expect(G.playersInRound).not.toContain('0');

  client.moves.Pass(); // p1 passes
  ({ G, ctx } = client.store.getState());

  expect(ctx.playOrderPos).toBe(2);
  expect(G.playersInRound).not.toContain('1');

  client.moves.Pass(); // p2 passes
  ({ G, ctx } = client.store.getState());

  expect(ctx.playOrderPos).toBe(3);
  expect(G.playersInRound).not.toContain('2');

  expect(G.playersInGame).toStrictEqual(['0', '1', '2', '3']);
});
