import React from 'react';
import PropTypes from 'prop-types';
import { Space } from 'antd';
import Card from '../Card';
import CardComponent from './card';

function Hand(props) {
  const { cards, isActive, onSelect } = props;

  let cardComponents = cards.map((x) => (
    <CardComponent key={x.value} card={x} />
  ));

  if (isActive) {
    cardComponents = cardComponents.map((x) => (
      <button
        style={{
          borderRadius: 8,
          borderWidth: 2,
          padding: 0,
        }}
        key={x.key}
        type="button"
        onClick={() => onSelect(x.key)}
      >
        {x}
      </button>
    ));
  }

  return (
    <Space
      style={{
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
      }}
    >
      {cardComponents}
    </Space>
  );
}

Hand.propTypes = {
  cards: PropTypes.arrayOf(Card).isRequired,
  isActive: PropTypes.bool,
  onSelect: PropTypes.func,
};

Hand.defaultProps = {
  isActive: false,
  onSelect: () => null,
};

export default Hand;
