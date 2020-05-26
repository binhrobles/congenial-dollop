import React from 'react';
import { Local, SocketIO } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import keys from '../keys';
import Game from '../game';
import Table from './table';

const DebugClient = Client({
  game: Game,
  board: Table,
  numPlayers: 4,
  multiplayer: keys.server ? Local() : SocketIO({ server: keys.serverUri }),
  debug: keys.debug || false,
});

function Debug() {
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

    return <DebugClient playerID={playerID} />;
  }
}

export default Debug;
