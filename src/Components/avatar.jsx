import React from 'react';
import PropTypes from 'prop-types';

function Avatar(props) {
  const { playerName, style } = props;

  return (
    <img
      src={`https://api.adorable.io/avatars/150/${playerName}.png`}
      alt={playerName}
      style={style}
    />
  );
}

Avatar.propTypes = {
  playerName: PropTypes.string.isRequired,
  style: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Avatar;
