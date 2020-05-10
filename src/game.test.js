import { Client } from 'boardgame.io/client';
import Card, { SUIT, RANK } from './cards';
import { Play, COMBO } from './play';
import { Thirteen } from './game';

it('should mark winner after playing final card', () => {
  const scenario = {
    ...Thirteen,
    setup: () => ({
      hands: [[new Card(RANK.TWO, SUIT.H)], [0, 1, 2], [2, 3, 4], [5, 6, 7]],
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

  client.moves.MakeMove([0]); // p0 plays last card

  const { G } = client.store.getState();

  // and p0 should be removed from game
  expect(G.playersInGame).not.toContain(0);
  expect(G.playersInRound).not.toContain(0);
  expect(G.winOrder).toContain(0);
});

it('should mark second after playing last card', () => {
  const scenario = {
    ...Thirteen,
    setup: () => ({
      hands: [[0, 1, 2], [new Card(RANK.TWO, SUIT.H)], [], [2, 3, 4]],
      lastPlay: new Play(COMBO.SINGLE, [new Card(RANK.TWO, SUIT.D)]),
      playersInGame: ['0', '1', '3'],
      playersInRound: ['1', '3'],
      winOrder: [2],
    }),
    turn: {
      ...Thirteen.turn,
      order: {
        ...Thirteen.turn.order,
        first: () => 1,
      },
    },
  };

  const client = Client({
    game: scenario,
    numPlayers: 4,
  });

  client.moves.MakeMove([0]); // p1 plays last card

  const { G, ctx } = client.store.getState();

  // and p1 should be removed from game
  expect(G.playersInGame).not.toContain('1');
  expect(G.playersInRound).not.toContain('1');
  expect(G.winOrder).toContain(1);

  // but p3 should be next and be able to beat the lastPlay
  expect(ctx.playOrderPos).toBe(3);
  expect(G.playersInRound.length).toBe(1);
  expect(G.playersInRound).toContain('3');
});
