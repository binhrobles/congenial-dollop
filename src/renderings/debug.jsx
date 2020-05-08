import React from 'react';
import PropTypes from 'prop-types';
import { INVALID_MOVE } from 'boardgame.io/core';
import { Card } from '../cards';

function renderCard(card) {
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
  }

  selectCard(id) {
    const { G, ctx } = this.props;

    this.setState((state) => {
      const card = G.hands[parseInt(ctx.currentPlayer, 10)][id];

      const selectedIds = state.selectedIds.concat(id);
      const selectedCards = state.selectedCards.concat(card).sort(Card.Compare);

      return {
        ...state,
        selectedIds,
        selectedCards,
      };
    });
  }

  playMove() {
    const { moves } = this.props;

    this.setState((state) => {
      if (moves.MakeMove(state.selectedIds) !== INVALID_MOVE) {
        return {
          ...state,
          selectedIds: [],
          selectedCards: [],
        };
      }
      return state;
    });
  }

  renderHands(G, ctx) {
    const currentHands = [];
    const currentPlayer = parseInt(ctx.currentPlayer, 10);

    const header = ['NA'];
    for (let i = 0; i < 13; i += 1) {
      header.push(<td>{i}</td>);
    }
    currentHands.push(<tr>{header}</tr>);

    for (let player = 0; player < ctx.numPlayers; player += 1) {
      const hands = [`Player ${player} ::: `];
      const disabled = currentPlayer !== player;

      for (let id = 0; id < G.hands[player].length; id += 1) {
        const card = G.hands[player][id];
        hands.push(
          <td>
            <button
              type="button"
              onClick={() => this.selectCard(id)}
              disabled={disabled}
            >
              {renderCard(card)}
            </button>
          </td>
        );
      }
      currentHands.push(<tr key={player}>{hands}</tr>);
    }

    return currentHands;
  }

  render() {
    const { G, ctx } = this.props;
    const { selectedCards } = this.state;

    const currentHandsTable = this.renderHands(G, ctx);

    return (
      <div>
        <table id="board">
          <tbody>{currentHandsTable}</tbody>
        </table>
        Last Play ::: {G.lastPlay && G.lastPlay.combo} {G.lastPlay && G.lastPlay.cards.map(renderCard)}
        Current Selection ::: {selectedCards.map(renderCard)}
        <button type="button" onClick={() => this.playMove()}>
          Play it!
        </button>
      </div>
    );
  }
}

Debug.propTypes = {
  G: PropTypes.shape({
    hands: PropTypes.node,
    lastPlay: PropTypes.node,
  }).isRequired,
  ctx: PropTypes.shape({
    numPlayers: PropTypes.number,
    currentPlayer: PropTypes.string,
  }).isRequired,
  moves: PropTypes.shape({
    MakeMove: PropTypes.func,
  }).isRequired,
};
