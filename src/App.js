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

class App extends React.Component {
  state = { playerID: null };

  render() {
    if (keys.debug) {
      if (this.state.playerID === null) {
        return (
          <div>
            <p>Play as</p>
            <button onClick={() => this.setState({ playerID: '0' })}>
              Player 0
            </button>
            <button onClick={() => this.setState({ playerID: '1' })}>
              Player 1
            </button>
            <button onClick={() => this.setState({ playerID: '2' })}>
              Player 2
            </button>
            <button onClick={() => this.setState({ playerID: '3' })}>
              Player 3
            </button>
          </div>
        );
      }

      return <ThirteenClient playerID={this.state.playerID} />;
    }
    return (
      <Lobby
        gameServer={keys.serverUri}
        lobbyServer={keys.serverUri}
        gameComponents={[{ game: Game, board: Debug }]}
      />
    );
  }
}

export default App;
