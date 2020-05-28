import React from 'react';
import PropTypes from 'prop-types';
import { Button, Result, Row } from 'antd';
import Card from '../Card';
import Play from '../Play';
import PlayerView from '../Components/playerView';
import History from '../Components/history';

function Table(props) {
  const { G, ctx, playerID, isActive, moves, exitGame } = props;

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

  return (
    <div style={{ backgroundColor: '#35654d', minHeight: '100vh' }}>
      <Row
        align="center"
        style={{
          minHeight: '50vh',
        }}
      >
        <History log={G.log} />
      </Row>
      {playerID !== null && (
        <PlayerView
          cards={G.players[playerID]}
          currentPlayer={ctx.currentPlayer}
          playersIn={G.playersInRound}
          isActive={isActive}
          moves={moves}
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
  playerID: PropTypes.string,
  isActive: PropTypes.bool.isRequired,
  exitGame: PropTypes.func.isRequired,
};

Table.defaultProps = {
  playerID: null,
};

export default Table;
