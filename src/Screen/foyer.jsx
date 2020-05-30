import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Space, Spin } from 'antd';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import FoyerBuddies from '../Components/foyerBuddies';
import Game from '../game';
import Table from './table';
import keys from '../keys';

function Foyer(props) {
  const { roomID, player, exitFoyer } = props;
  const { playerID, playerToken } = player;
  const [areReady, updateAreReady] = React.useState(false);
  const [startGame, updateStartGame] = React.useState(false);

  const exitGame = () => {
    updateStartGame(false);
    exitFoyer();
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
        gameID={roomID}
        playerID={playerID.toString()}
        credentials={playerToken}
        exitGame={exitGame}
      />
    );
  }

  return (
    <>
      <h2 style={{ padding: 10, textAlign: 'center' }}>Room: {roomID}</h2>
      <Row align="top" justify="center">
        <FoyerBuddies roomID={roomID} notifyReady={updateAreReady} />
      </Row>
      <Row align="bottom" justify="center" style={{ padding: 10 }}>
        <Space>
          <Button
            type="primary"
            disabled={!areReady}
            onClick={() => updateStartGame(true)}
          >
            Play!
          </Button>
          <Button onClick={exitFoyer}>Back to Lobby</Button>
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
  exitFoyer: PropTypes.func.isRequired,
};

export default Foyer;
