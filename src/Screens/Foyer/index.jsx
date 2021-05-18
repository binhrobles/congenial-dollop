import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Space, Spin } from 'antd';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import FoyerBuddies from './foyerBuddies';
import Game from '../../Game';
import Table from '../Table';
import keys from '../../keys';

function Foyer(props) {
  const { roomID, player, playAgain, exitFoyer } = props;
  const { playerID, playerToken } = player;
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
        <FoyerBuddies roomID={roomID} notifyReady={updateAreReady} />
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
  roomID: PropTypes.string.isRequired,
  player: PropTypes.shape({
    playerToken: PropTypes.string.isRequired,
    playerID: PropTypes.number.isRequired,
  }).isRequired,
  playAgain: PropTypes.func.isRequired,
  exitFoyer: PropTypes.func.isRequired,
};

export default Foyer;
