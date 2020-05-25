import React from 'react';
import PropTypes from 'prop-types';
import { Space } from 'antd';
import Card from '../Card';
import CardComponent from './card';
import './index.css';

const Hand = (props) => {
  const { cards, isActive, onSelect } = props;

  let cardComponents = cards.map((x) => (
    <CardComponent key={x.value} card={x} />
  ));

  if (isActive) {
    cardComponents = cardComponents.map((x, idx) => (
      <button
        className="card"
        key={x.key}
        type="button"
        onClick={() => onSelect(idx)}
        disabled={!isActive}
      >
        {x}
      </button>
    ));
  }

  return <Space className="scrolling-wrapper">{cardComponents}</Space>;
};

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
