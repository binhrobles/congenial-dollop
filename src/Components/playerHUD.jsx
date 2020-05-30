import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './avatar';

function PlayerHUD(props) {
  const { currentPlayer, playersIn, playerNames } = props;

  // const renderPlayerStatus = (player) => {
  //   return (
  //     <Avatar playerName=
  //   );
  // };

  // const statusBar = (
  //   <Space>
  //     <div>
  //       In: {playersIn.map((id) => playerNames[parseInt(id, 10)]).join(', ')}
  //     </div>
  //     <div>Waiting on {playerNames[parseInt(currentPlayer, 10)]}</div>
  //   </Space>
  // );
  const cardPlaceholder = <div style={{ minHeight: 130 }} />;

  return cardPlaceholder;
}

PlayerHUD.propTypes = {
  currentPlayer: PropTypes.string.isRequired,
  playersIn: PropTypes.arrayOf(PropTypes.number).isRequired,
  playerNames: PropTypes.arrayOf(PropTypes.string),
};

PlayerHUD.defaultProps = {
  playerNames: ['Adri', 'Binh', 'Chris', 'Drake'],
};

export default PlayerHUD;
