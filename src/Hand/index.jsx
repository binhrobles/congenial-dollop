import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import CardComponent from '../Card/component';

const Hand = (props) => {
  const { cards, isActive, selectable, onSelect } = props;

  let cardComponents = cards.map((x) => (
    <CardComponent key={x.value} card={x} />
  ));

  if (selectable) {
    cardComponents = cardComponents.map((x, idx) => (
      <button
        key={x.key}
        type="button"
        onClick={() => onSelect(idx)}
        disabled={!isActive}
      >
        {x}
      </button>
    ));
  }

  return (
    <table id="hand">
      <tbody>
        <tr>
          <td>{cardComponents}</td>
        </tr>
      </tbody>
    </table>
  );
};

Hand.propTypes = {
  cards: PropTypes.arrayOf(Card).isRequired,
  isActive: PropTypes.bool,
  selectable: PropTypes.bool,
  onSelect: PropTypes.func,
};

Hand.defaultProps = {
  isActive: false,
  selectable: false,
  onSelect: () => null,
};

export default Hand;
