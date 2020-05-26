import React from 'react';
import { Local, SocketIO } from 'boardgame.io/multiplayer';
import { Client, Lobby } from 'boardgame.io/react';
import keys from './keys';
import Debug from './renderings/debug';
import Game from './game';

const ThirteenClient = Client({
  game: Game,
  board: Debug,
  numPlayers: 4,
  multiplayer: keys.debug ? Local() : SocketIO({ server: keys.serverUri }),
  debug: keys.debug || false,
});

function App() {
  const [playerID, updatePlayerID] = React.useState(null);

  if (keys.debug) {
    if (playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <button type="button" onClick={() => updatePlayerID('0')}>
            Player 0
          </button>
          <button type="button" onClick={() => updatePlayerID('1')}>
            Player 1
          </button>
          <button type="button" onClick={() => updatePlayerID('2')}>
            Player 2
          </button>
          <button type="button" onClick={() => updatePlayerID('3')}>
            Player 3
          </button>
        </div>
      );
    }

    return <ThirteenClient playerID={playerID} />;
  }
  return (
    <Lobby
      gameServer={keys.serverUri}
      lobbyServer={keys.serverUri}
      gameComponents={[{ game: Game, board: Debug }]}
    />
  );
}

export default App;
