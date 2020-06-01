import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Row, Space } from 'antd';
import Emoji from 'a11y-react-emoji';
import Card from '../Card';
import Play from '../Play';
import Avatar from '../Components/avatar';
import PlayerView from '../Components/playerView';
import History from '../Components/history';

function Table(props) {
  const {
    G,
    ctx,
    playerID,
    isActive,
    moves,
    gameMetadata,
    playAgain,
    exitGame,
  } = props;

  const playerNames = gameMetadata.map((player) => player.name);

  const getResults = () => {
    const trophyEmojis = ['🏆', '🥈', '🥉', '💩'];
    if (ctx.gameover && ctx.gameover.winOrder) {
      return (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
          }}
        >
          {ctx.gameover.winOrder.map((id, position) => {
            return (
              <Space size="small" key={id}>
                <Emoji symbol={trophyEmojis[position]} label={position} />
                <Avatar playerName={gameMetadata[id].name} withName />
              </Space>
            );
          })}
        </div>
      );
    }

    return <></>;
  };

  return (
    <>
      <Modal
        title="Wow you did it"
        style={{ top: 20 }}
        closable={false}
        maskClosable={false}
        visible={ctx.gameover && ctx.gameover.winOrder[0] === playerID}
        footer={[
          <Button key="back" onClick={exitGame}>
            Back to Lobby
          </Button>,
          <Button key="playAgain" type="primary" onClick={playAgain}>
            Run it back
          </Button>,
        ]}
      >
        {getResults()}
      </Modal>
      <Modal
        title="You're so bad!"
        style={{ top: 20 }}
        closable={false}
        maskClosable={false}
        visible={ctx.gameover && ctx.gameover.winOrder[0] !== playerID}
        footer={[
          <Button key="back" onClick={exitGame}>
            Back to Lobby
          </Button>,
          <Button key="playAgain" type="primary" onClick={playAgain}>
            Run it back
          </Button>,
        ]}
      >
        {getResults()}
      </Modal>
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
  gameMetadata: PropTypes.objectOf(PropTypes.any),
  isActive: PropTypes.bool.isRequired,
  playAgain: PropTypes.func.isRequired,
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
