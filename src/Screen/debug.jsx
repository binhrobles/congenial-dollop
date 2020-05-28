import React from 'react';
import { Local } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import Game from '../game';
import Table from './table';

function Debug() {
  const [playerID, updatePlayerID] = React.useState(null);

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

  const reset = () => {
    updatePlayerID(null);
  };

  const DebugClient = Client({
    game: Game,
    board: Table,
    numPlayers: 4,
    multiplayer: Local(),
    debug: true,
  });

  return <DebugClient playerID={playerID} exitGame={reset} />;
}

export default Debug;
