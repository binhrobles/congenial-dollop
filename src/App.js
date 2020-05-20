import React from 'react';
import { Local } from 'boardgame.io/multiplayer';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import Debug from './renderings/debug';
import Game from './game';

const ThirteenClient = Client({
  game: Game,
  board: Debug,
  numPlayers: 4,
  multiplayer: process.env.DEBUG
    ? Local()
    : SocketIO({ server: 'http://localhost:8000/' }),
  debug: process.env.DEBUG || false,
});

class App extends React.Component {
  state = { playerID: null };

  render() {
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

    return (
      <div>
        <ThirteenClient playerID={this.state.playerID} />
      </div>
    );
  }
}

export default App;
