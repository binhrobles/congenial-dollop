import React from 'react';
import PropTypes from 'prop-types';
import { Space } from 'antd';

function Avatar(props) {
  const { playerName, withName, cardCount, style } = props;
  const defaultStyle = {
    width: '130px',
    height: '130px',
  };

  const compositeStyle = {
    ...style,
    ...defaultStyle,
  };

  return (
    <Space align="center" direction="vertical" style={{ padding: 10 }}>
      <img
        src={`https://avatars.dicebear.com/api/human/${playerName}.svg`}
        alt={playerName}
        style={compositeStyle}
      />
      <Space>
        {withName && playerName}
        {cardCount !== null && `• ${cardCount}`}
      </Space>
    </Space>
  );
}

Avatar.propTypes = {
  playerName: PropTypes.string,
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
