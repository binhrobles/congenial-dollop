import React from 'react';
import PropTypes from 'prop-types';
import { Space } from 'antd';

function Avatar(props) {
  const { playerName, withName, cardCount, style } = props;
  const defaultStyle = {
    borderRadius: '30%',
    width: 70,
    height: 70,
  };

  const compositeStyle = {
    ...defaultStyle,
    ...style,
  };

  return (
    <Space align="center" direction="vertical" style={{ padding: 10 }}>
      <img
        src={`https://api.adorable.io/avatars/150/${playerName}.png`}
        alt={playerName}
        style={compositeStyle}
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
  style: PropTypes.objectOf(PropTypes.any),
};

Avatar.defaultProps = {
  withName: false,
  cardCount: null,
  style: {},
};

export default Avatar;
