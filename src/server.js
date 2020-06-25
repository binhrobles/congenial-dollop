const { Server, FlatFile } = require('boardgame.io/server');
const Game = require('./Game/index').default;

const port = process.env.PORT || 8000;
let serverInput = { games: [Game] };
if (process.env.NODE_ENV === 'development') {
  serverInput = {
    ...serverInput,
    db: new FlatFile({ dir: 'db/instance', logging: true }),
  };
}
const server = Server(serverInput);

server.run(port);
