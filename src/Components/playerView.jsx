import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Layout } from 'antd';
import { INVALID_MOVE } from 'boardgame.io/core';
import Hand from './hand';
import Card from '../Card';

const { Content, Footer } = Layout;

function PlayerView(props) {
  const { cards, currentPlayer, isActive, moves } = props;
  const [selectedCardIds, updateSelectedCardIds] = React.useState([]);
  const [hasError, updateError] = React.useState(false);

  function deselectCard(id) {
    updateSelectedCardIds(selectedCardIds.filter((x) => x !== id));
  }

  function selectCard(id) {
    updateSelectedCardIds(selectedCardIds.concat(id));
  }

  function clear() {
    updateSelectedCardIds([]);
  }

  // should only return IDs
  function playMove() {
    const moveResult = moves.MakeMove(selectedCardIds);

    if (moveResult === INVALID_MOVE) {
      updateError(true);
    } else {
      clear();
    }
  }

  if (hasError) {
    return (
      <Alert
        message="You can't do that"
        type="error"
        closable
        onClose={() => updateError(false)}
      />
    );
  }

  return (
    <Layout>
      <Content style={{ textAlign: 'center' }}>
        {/* TODO: Needs to refresh underlying Hand ids when selectedCardIds changes */}
        {isActive && (
          <div>
            <Hand
              cards={cards.filter((_, idx) => selectedCardIds.includes(idx))}
              isActive={isActive}
              selectable
              onSelect={deselectCard}
            />
            {selectedCardIds.length > 0 ? (
              <div>
                <Button type="primary" onClick={playMove}>
                  Play it!
                </Button>
                <Button type="default" onClick={clear}>
                  Clear
                </Button>
              </div>
            ) : (
              <Button type="default" onClick={moves.Pass}>
                Pass
              </Button>
            )}
          </div>
        )}
        {isActive || <div>On Player {currentPlayer}</div>}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <h3>Your Hand</h3>
        <Hand
          cards={cards}
          isActive={isActive}
          selectable
          onSelect={selectCard}
        />
      </Footer>
    </Layout>
  );
}

PlayerView.propTypes = {
  cards: PropTypes.arrayOf(Card).isRequired,
  currentPlayer: PropTypes.string.isRequired,
  moves: PropTypes.shape({
    Pass: PropTypes.func,
    MakeMove: PropTypes.func,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default PlayerView;
