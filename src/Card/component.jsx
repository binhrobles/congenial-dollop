import React from 'react';
import PropTypes from 'prop-types';
import Card from './index';
import { CARD_WIDTH, CARD_HEIGHT } from './constants';

const CardComponent = (props) => {
  const { card } = props;

  return (
    <img
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 8,
      }}
      src={require(`../../public/assets/cards/${card.rankText}${card.suitText}.png`)}
      alt={`${card.rankText} of ${card.suitText}`}
    />
  );
};

CardComponent.propTypes = {
  card: PropTypes.objectOf(Card).isRequired,
};

export default CardComponent;
