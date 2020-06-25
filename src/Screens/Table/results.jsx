import React from 'react';
import PropTypes from 'prop-types';
import { Button, Space, Modal } from 'antd';
import Emoji from 'a11y-react-emoji';
import { Avatar } from '../../Components';

function Results(props) {
  const { gameover, gameMetadata, playAgain, exitGame, playerID } = props;

  const getResults = () => {
    const trophyEmojis = ['🏆', '🥈', '🥉', '💩'];
    if (gameover && gameover.winOrder) {
      return (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
          }}
        >
          {gameover.winOrder.map((id, position) => {
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

  if (gameover && gameover.winOrder[0] === playerID) {
    return (
      <Modal
        title="Wow you did it"
        style={{ top: 20 }}
        closable={false}
        maskClosable={false}
        visible
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
    );
  }

  if (gameover && gameover.winOrder[0] !== playerID) {
    return (
      <Modal
        title="You're so bad!"
        style={{ top: 20 }}
        closable={false}
        maskClosable={false}
        visible
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
    );
  }

  return <></>;
}

Results.propTypes = {
  gameover: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  gameMetadata: PropTypes.objectOf(PropTypes.any),
  playAgain: PropTypes.func.isRequired,
  exitGame: PropTypes.func.isRequired,
  playerID: PropTypes.string,
};

Results.defaultProps = {
  playerID: null,
  gameMetadata: [
    { name: 'Adri' },
    { name: 'Binh' },
    { name: 'Chris' },
    { name: 'Drake' },
  ],
};

export default Results;
