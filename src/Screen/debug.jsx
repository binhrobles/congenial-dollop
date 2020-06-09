import React from 'react';
import { Local } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import Game from '../game';
import Table from './table';

function Debug() {
  const DebugClient = Client({
    game: Game,
    board: Table,
    numPlayers: 4,
    multiplayer: Local(),
    debug: true,
  });

  return <DebugClient playerID="0" exitGame={null} />;
}

export default Debug;
