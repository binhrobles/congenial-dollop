import React from 'react';
import PropTypes from 'prop-types';
import { Button, Space, Modal } from 'antd';
import Emoji from 'a11y-react-emoji';
import { Avatar } from '../../Components';
import PlayerContext from '../../Contexts/PlayerContext';

function Results(props) {
  const { gameover, matchData, playAgain, exitGame } = props;
  const { playerID, isSpectator } = React.useContext(PlayerContext);

  // governs visibility of results modal
  const [isVisible, setVisible] = React.useState(false);

  if (gameover) {
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
                  <Avatar playerName={matchData[id].name} withName />
                </Space>
              );
            })}
          </div>
        );
      }

      return <></>;
    };

    const message =
      gameover.winOrder[0] === playerID ? 'Wow you did it.' : "You're so bad!";

    // wait a bit so we can see the last play, then pop up the modal
    setTimeout(() => setVisible(true), 3000);

    return (
      <Modal
        title={message}
        style={{ top: 20 }}
        closable={false}
        maskClosable={false}
        visible={isVisible}
        footer={[
          <Button key="back" onClick={exitGame}>
            Back to Lobby
          </Button>,
          ...(isSpectator
            ? []
            : [
                <Button key="playAgain" type="primary" onClick={playAgain}>
                  Run it back
                </Button>,
              ]),
        ]}
      >
        {getResults()}
      </Modal>
    );
  }

  return <></>;
}

Results.propTypes = {
  gameover: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  matchData: PropTypes.arrayOf(PropTypes.any),
  playAgain: PropTypes.func.isRequired,
  exitGame: PropTypes.func.isRequired,
};

Results.defaultProps = {
  matchData: [
    { name: 'Adri' },
    { name: 'Binh' },
    { name: 'Chris' },
    { name: 'Drake' },
  ],
};

export default Results;
