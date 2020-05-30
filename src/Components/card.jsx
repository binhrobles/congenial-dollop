import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';

function CardComponent(props) {
  const { card } = props;

  return (
    <img
      style={{
        width: 80,
        height: 120,
        borderRadius: 8,
      }}
      src={require(`../../public/assets/cards/${card.rankText}${card.suitText}.png`)}
      alt={`${card.rankText} of ${card.suitText}`}
    />
  );
}

CardComponent.propTypes = {
  card: PropTypes.objectOf(Card).isRequired,
};

export default CardComponent;
