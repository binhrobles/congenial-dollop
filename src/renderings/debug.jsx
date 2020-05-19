import React from 'react';
import PropTypes from 'prop-types';
import { INVALID_MOVE } from 'boardgame.io/core';
import Card from '../cards';

function renderCard(card) {
  // could be card.valueOf() indexed lookup into an image array
  return (
    <div>
      {card.suitText} : {card.rankText}
    </div>
  );
}

export default class Debug extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIds: [],
      selectedCards: [],
    };

    this.selectCard = this.selectCard.bind(this);
    this.playMove = this.playMove.bind(this);
    this.pass = this.pass.bind(this);
    this.clear = this.clear.bind(this);
  }

  selectCard(id) {
    const { G, playerID } = this.props;

    this.setState((state) => {
      const card = G.hands[parseInt(playerID, 10)][id];

      const selectedIds = state.selectedIds.concat(id);
      const selectedCards = state.selectedCards.concat(card).sort(Card.Compare);

      return {
        ...state,
        selectedIds,
        selectedCards,
      };
    });
  }

  clear() {
    this.setState((state) => {
      return {
        ...state,
        selectedIds: [],
        selectedCards: [],
      };
    });
  }

  playMove() {
    const { moves } = this.props;
    const { selectedIds } = this.state;

    const moveResult = moves.MakeMove(selectedIds);

    this.setState((state) => {
      if (moveResult !== INVALID_MOVE) {
        return {
          ...state,
          selectedIds: [],
          selectedCards: [],
        };
      }

      alert('Invalid Move');
      return state;
    });
  }

  pass() {
    const { moves } = this.props;

    moves.Pass();
  }

  renderHand(hand, isActive) {
    const rendered_hand = [];

    for (let id = 0; id < hand.length; id += 1) {
      const card = hand[id];
      rendered_hand.push(
        <td>
          <button
            type="button"
            onClick={() => this.selectCard(id)}
            disabled={!isActive}
          >
            {renderCard(card)}
          </button>
        </td>
      );
    }

    return rendered_hand;
  }

  render() {
    const { G, playerID, isActive } = this.props;
    const { selectedCards } = this.state;

    const currentHand = this.renderHand(G.hands[playerID], isActive);

    return (
      <div>
        Player {playerID}
        <table id="board">
          <tbody>{currentHand}</tbody>
        </table>
        Last Play ::: {G.lastPlay && G.lastPlay.combo}{' '}
        {G.lastPlay && G.lastPlay.cards.map(renderCard)}
        Current Selection ::: {selectedCards.map(renderCard)}
        <button type="button" onClick={this.playMove}>
          Play it!
        </button>
        <button type="button" onClick={this.pass}>
          Pass
        </button>
        <button type="button" onClick={this.clear}>
          Clear
        </button>
      </div>
    );
  }
}

Debug.propTypes = {
  G: PropTypes.shape({
    hands: PropTypes.arrayOf(PropTypes.arrayOf(Card)),
    lastPlay: PropTypes.instanceOf(Card),
  }).isRequired,
  ctx: PropTypes.shape({
    numPlayers: PropTypes.number,
    currentPlayer: PropTypes.string,
  }).isRequired,
  moves: PropTypes.shape({
    Pass: PropTypes.func,
    MakeMove: PropTypes.func,
  }).isRequired,
  playerID: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};
