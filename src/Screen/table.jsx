import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import 'antd/dist/antd.css';
import Card from '../Card';
import Play from '../Play';
import PlayerView from '../Components/playerView';
import History from '../Components/history';

function Table(props) {
  const { G, ctx, playerID, isActive, moves } = props;

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
      {playerID && (
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
    players: PropTypes.arrayOf(PropTypes.arrayOf(Card)),
    log: PropTypes.arrayOf(Play),
    lastPlay: PropTypes.instanceOf(Card),
    playersInRound: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  ctx: PropTypes.shape({
    numPlayers: PropTypes.number,
    currentPlayer: PropTypes.string,
  }).isRequired,
  moves: PropTypes.shape({
    Pass: PropTypes.func,
    MakeMove: PropTypes.func,
  }).isRequired,
  playerID: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Table;
