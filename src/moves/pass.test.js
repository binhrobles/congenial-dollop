import { Client } from 'boardgame.io/client';
import { Thirteen } from '../game';

// TODO: should take this over to `game.test.js` in some form
// it('should pass power to the person after the winner, if all pass after a win', () => {
//   const scenario = {
//     ...Thirteen,
//     setup: () => ({
//       hands: [[], [0, 1, 2], [2, 3, 4], [5, 6, 7]],
//       lastPlay: { foo: 1 },
//       playersInGame: ['1', '2', '3'],
//       playersInRound: ['1', '2', '3'],
//       winOrder: [0],
//     }),
//     turn: {
//       ...Thirteen.turn,
//       order: {
//         ...Thirteen.turn.order,
//         first: () => 1,
//       },
//     },
//   };

//   const client = Client({
//     game: scenario,
//     numPlayers: 4,
//   });

//   client.moves.Pass(); // p1 passes
//   client.moves.Pass(); // p2 passes
//   client.moves.Pass(); // p3 passes

//   const { G, ctx } = client.store.getState();

//   // now, power should go to p1
//   expect(ctx.playOrderPos).toBe(1);
//   expect(G.lastPlay).toBeNull();
// });
