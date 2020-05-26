import React from 'react';
import { Lobby } from 'boardgame.io/react';
import keys from './keys';
import Debug from './Screen/debug';
import Game from './game';

function App() {
  if (keys.debug) {
    return <Debug />;
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
