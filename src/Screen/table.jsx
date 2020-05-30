import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Row } from 'antd';
import Card from '../Card';
import Play from '../Play';
import PlayerView from '../Components/playerView';
import History from '../Components/history';

function Table(props) {
  const { G, ctx, playerID, isActive, moves, gameMetadata, exitGame } = props;

  const playerNames = gameMetadata.map((player) => player.name);

  const getResults = () => {
    const lastPlayerId = Object.keys(G.players).filter(
      (player) => !G.winOrder.includes(player)
    );
    return (
      <>
        <p>🏆 {gameMetadata[G.winOrder[0]].name}</p>
        <p>🥈 {gameMetadata[G.winOrder[1]].name}</p>
        <p>🥉 {gameMetadata[G.winOrder[2]].name}</p>
        <p>💩 {gameMetadata[lastPlayerId].name}</p>
      </>
    );
  };

  return (
    <>
      <Modal
        title="Wow you did it"
        style={{ top: 20 }}
        closable={false}
        maskClosable={false}
        visible={ctx.gameover && ctx.gameover.winner === playerID}
        footer={[
          <Button key="back" onClick={exitGame}>
            Back to Lobby
          </Button>,
        ]}
      >
        {getResults()}
      </Modal>
      <Modal
        title="You're bad!"
        style={{ top: 20 }}
        closable={false}
        maskClosable={false}
        visible={ctx.gameover && ctx.gameover.winner !== playerID}
        footer={[
          <Button key="back" onClick={exitGame}>
            Back to Lobby
          </Button>,
        ]}
      >
        {getResults()}
      </Modal>
      <div style={{ backgroundColor: '#35654d', minHeight: '100vh' }}>
        <Row
          align="center"
          style={{
            minHeight: '50vh',
          }}
        >
          <History log={G.log} playerNames={playerNames} />
        </Row>
        {playerID !== null && (
          <PlayerView
            lastPlay={G.lastPlay}
            cards={G.players}
            playerID={playerID}
            currentPlayer={ctx.currentPlayer}
            playersIn={G.playersInRound}
            isActive={isActive}
            moves={moves}
            playerNames={playerNames}
          />
        )}
      </div>
    </>
  );
}

Table.propTypes = {
  G: PropTypes.shape({
    players: PropTypes.objectOf(PropTypes.arrayOf(Card)),
    log: PropTypes.arrayOf(Play),
    lastPlay: PropTypes.instanceOf(Card),
    playersInRound: PropTypes.arrayOf(PropTypes.string),
    winOrder: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  ctx: PropTypes.shape({
    currentPlayer: PropTypes.string,
    numPlayers: PropTypes.number,
    gameover: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  moves: PropTypes.shape({
    Pass: PropTypes.func,
    MakeMove: PropTypes.func,
  }).isRequired,
  gameMetadata: PropTypes.objectOf(PropTypes.any),
  isActive: PropTypes.bool.isRequired,
  exitGame: PropTypes.func.isRequired,
  playerID: PropTypes.string,
};

Table.defaultProps = {
  playerID: null,
  gameMetadata: [
    { name: 'Adri' },
    { name: 'Binh' },
    { name: 'Chris' },
    { name: 'Drake' },
  ],
};

export default Table;
