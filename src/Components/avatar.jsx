import React from 'react';
import PropTypes from 'prop-types';
import { Space } from 'antd';
import PlayerContext from '../Contexts/PlayerContext';

function Avatar(props) {
  const { playerName } = React.useContext(PlayerContext);
  const { withName, cardCount, style } = props;
  const defaultStyle = {
    width: '150px',
    height: '150px',
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
