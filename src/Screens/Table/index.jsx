import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import Card from '../../Game/Card';
import Play from '../../Game/Play';
import PlayerView from './playerView';
import History from './history';
import Results from './results';

function Table(props) {
  const { G, ctx, playerID, isActive, moves, matchData, playAgain, exitGame } =
    props;

  const playerNames = matchData.map((player) => player.name);

  return (
    <>
      <Results
        playAgain={playAgain}
        exitGame={exitGame}
        gameover={ctx.gameover}
        matchData={matchData}
        playerID={playerID}
      />
      <div style={{ backgroundColor: '#35654d', minHeight: '100vh' }}>
        <Row
          align="middle"
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
            playerID={Number(playerID)}
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
    lastPlay: PropTypes.object,
    playersInRound: PropTypes.arrayOf(PropTypes.string),
    playersInGame: PropTypes.arrayOf(PropTypes.string),
    winOrder: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  ctx: PropTypes.shape({
    currentPlayer: PropTypes.string,
    numPlayers: PropTypes.number,
    gameover: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  }).isRequired,
  moves: PropTypes.shape({
    Pass: PropTypes.func,
    MakeMove: PropTypes.func,
  }).isRequired,
  matchData: PropTypes.arrayOf(PropTypes.any),
  isActive: PropTypes.bool.isRequired,
  playAgain: PropTypes.func.isRequired,
  exitGame: PropTypes.func.isRequired,
  playerID: PropTypes.string,
};

Table.defaultProps = {
  playerID: null,
  matchData: [
    { name: 'Adri' },
    { name: 'Binh' },
    { name: 'Chris' },
    { name: 'Drake' },
  ],
};

export default Table;
