import React from 'react';
import PropTypes from 'prop-types';
import { Button, Result, Row } from 'antd';
import Card from '../Card';
import Play from '../Play';
import PlayerView from '../Components/playerView';
import History from '../Components/history';

function Table(props) {
  const { G, ctx, playerID, isActive, moves, gameMetadata, exitGame } = props;

  if (ctx.gameover) {
    if (ctx.gameover.winner === playerID) {
      return (
        <Result
          status="success"
          title="Wow you did it"
          extra={
            <Button type="primary" onClick={exitGame}>
              Back to Lobby
            </Button>
          }
        />
      );
    }

    return (
      <Result
        status="403"
        title="You're bad!"
        extra={
          <Button type="primary" onClick={exitGame}>
            Back to Lobby
          </Button>
        }
      />
    );
  }

  const playerNames = gameMetadata.map((player) => player.name);

  return (
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
          cards={G.players[playerID]}
          currentPlayer={ctx.currentPlayer}
          playersIn={G.playersInRound}
          isActive={isActive}
          moves={moves}
          playerNames={playerNames}
        />
      )}
    </div>
  );
}

Table.propTypes = {
  G: PropTypes.shape({
    players: PropTypes.objectOf(PropTypes.arrayOf(Card)),
    log: PropTypes.arrayOf(Play),
    lastPlay: PropTypes.instanceOf(Card),
    playersInRound: PropTypes.arrayOf(PropTypes.string),
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
