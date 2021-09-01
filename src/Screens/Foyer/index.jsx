import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Space, Spin } from 'antd';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import FoyerBuddies from './foyerBuddies';
import Game from '../../Game';
import Table from '../Table';
import keys from '../../keys';
import PlayerContext from '../../Contexts/PlayerContext';

function Foyer(props) {
  const { playAgain, exitFoyer } = props;
  const { playerID, playerToken, roomID } = React.useContext(PlayerContext);

  const [areReady, updateAreReady] = React.useState(false);
  const [startGame, updateStartGame] = React.useState(false);

  const exitGame = () => {
    updateStartGame(false);
    exitFoyer();
  };

  const playAgainProxy = () => {
    updateStartGame(false);
    playAgain();
  };

  if (startGame) {
    const ThirteenClient = Client({
      game: Game,
      board: Table,
      loading: Spin,
      multiplayer: SocketIO({ server: keys.serverUri }),
    });

    return (
      <ThirteenClient
        matchID={roomID}
        playerID={playerID.toString()}
        credentials={playerToken}
        exitGame={exitGame}
        playAgain={playAgainProxy}
      />
    );
  }

  return (
    <>
      <h2 style={{ padding: 10, textAlign: 'center' }}>
        Room: {roomID.slice(0, 4)}
      </h2>
      <Row align="top" justify="center">
        <FoyerBuddies notifyReady={updateAreReady} />
      </Row>
      <Row align="bottom" justify="center" style={{ padding: 10 }}>
        <Space>
          <Button onClick={exitFoyer}>Back to Lobby</Button>
          <Button
            type="primary"
            disabled={!areReady}
            onClick={() => updateStartGame(true)}
          >
            Play!
          </Button>
        </Space>
      </Row>
    </>
  );
}

Foyer.propTypes = {
  playAgain: PropTypes.func.isRequired,
  exitFoyer: PropTypes.func.isRequired,
};

export default Foyer;
