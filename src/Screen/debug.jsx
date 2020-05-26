import React from 'react';
import { Local } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import Game from '../game';
import Table from './table';

const DebugClient = Client({
  game: Game,
  board: Table,
  numPlayers: 4,
  multiplayer: Local(),
  debug: true,
});

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

  return <DebugClient playerID={playerID} />;
}

export default Debug;
