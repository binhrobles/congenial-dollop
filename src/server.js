const Server = require('boardgame.io/server').Server;
const path = require('path');
const serve = require('koa-static');
const Game = require('./game').default;

const server = Server({ games: [Game] });
const port = process.env.PORT || 8000;

// Build path relative to the server.js file
const frontEndAppBuildPath = path.resolve(__dirname, '../build');
server.app.use(serve(frontEndAppBuildPath));

server.run(port, () => {
  server.app.use(async (ctx, next) =>
    serve(frontEndAppBuildPath)(
      Object.assign(ctx, { path: 'index.html' }),
      next
    )
  );
});
