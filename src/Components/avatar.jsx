import React from 'react';
import PropTypes from 'prop-types';
import { Space } from 'antd';

function Avatar(props) {
  const { playerName, withName, cardCount, style } = props;

  return (
    <Space align="center" direction="vertical" style={{ padding: 10 }}>
      <img
        src={`https://api.adorable.io/avatars/150/${playerName}.png`}
        alt={playerName}
        style={style}
      />
      {withName && playerName}
      {cardCount !== null && cardCount}
    </Space>
  );
}

Avatar.propTypes = {
  playerName: PropTypes.string.isRequired,
  withName: PropTypes.bool,
  cardCount: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.any).isRequired,
};

Avatar.defaultProps = {
  withName: false,
  cardCount: null,
};

export default Avatar;
