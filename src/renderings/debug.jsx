import React from 'react';
import PropTypes from 'prop-types';
import { INVALID_MOVE } from 'boardgame.io/core';
import Card from '../Card';
import Hand from '../Hand';

export default class Debug extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCardIds: [],
    };

    this.deselectCard = this.deselectCard.bind(this);
    this.selectCard = this.selectCard.bind(this);
    this.playMove = this.playMove.bind(this);
    this.pass = this.pass.bind(this);
    this.clear = this.clear.bind(this);
  }

  deselectCard(id) {
    this.setState((state) => {
      return {
        ...state,
        selectedCardIds: state.selectedCardIds.filter((x) => x !== id),
      };
    });
  }

  selectCard(id) {
    this.setState((state) => {
      return {
        ...state,
        selectedCardIds: state.selectedCardIds.concat(id),
      };
    });
  }

  clear() {
    this.setState((state) => {
      return {
        ...state,
        selectedCardIds: [],
      };
    });
  }

  playMove() {
    const { moves } = this.props;

    this.setState((state) => {
      const moveResult = moves.MakeMove(state.selectedCardIds);

      if (moveResult !== INVALID_MOVE) {
        return {
          ...state,
          selectedCardIds: [],
        };
      }

      return state;
    });
  }

  pass() {
    const { moves } = this.props;

    moves.Pass();
  }

  render() {
    const { G, ctx, playerID, isActive } = this.props;
    const { selectedCardIds } = this.state;

    return (
      <div>
        <h1>Shitty Thirteen</h1>
        <h2>You are Player {playerID}</h2>
        <h3>
          {playerID && playerID === ctx.currentPlayer
            ? 'On you'
            : `On Player ${ctx.currentPlayer}`}
        </h3>
        <div>
          <h3>{G.lastPlay ? 'to beat:' : 'to open.'}</h3>
          {G.lastPlay && <Hand cards={G.lastPlay.cards} />}
        </div>
        <br />
        {/* TODO: Needs to refresh underlying Hand ids when selectedCardIds changes */}
        <div visibility={isActive ? 'visible' : 'hidden'}>
          <h3>Your Selection</h3>
          <Hand
            cards={
              playerID
                ? G.hands[playerID].filter((_, idx) =>
                    selectedCardIds.includes(idx)
                  )
                : []
            }
            isActive={isActive}
            selectable
            onSelect={this.deselectCard}
          />
        </div>
        <br />
        <h3>Your Hand</h3>
        <Hand
          cards={playerID ? G.hands[playerID] : []}
          isActive={isActive}
          selectable
          onSelect={this.selectCard}
        />
        <br />
        <div>
          {/* TODO: get some better style */}
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
