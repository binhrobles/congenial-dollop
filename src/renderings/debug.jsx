import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import Card from '../Card';
import Play from '../Play';
import PlayerView from '../Components/playerView';
import History from '../Components/history';

const { Content, Footer } = Layout;

function Debug(props) {
  const { G, ctx, playerID, isActive, moves } = props;

  return (
    <Layout>
      <Content>
        <History log={G.log} />
      </Content>
      {playerID && (
        <Footer style={{ padding: 2 }}>
          <PlayerView
            cards={G.hands[playerID]}
            currentPlayer={ctx.currentPlayer}
            isActive={isActive}
            moves={moves}
          />
        </Footer>
      )}
    </Layout>
    // <div>
    //   <h1>Thirty Shitteen</h1>
    //   <h2>You are Player {playerID}</h2>
    //   <h3>
    //     {playerID && playerID === ctx.currentPlayer
    //       ? 'On you'
    //       : `On Player ${ctx.currentPlayer}`}
    //   </h3>
    //   <div>
    //     <h3>{G.lastPlay ? 'to beat:' : 'to open.'}</h3>
    //     {G.lastPlay && <Hand cards={G.lastPlay.cards} />}
    //   </div>
    //   <br />
    //   <br />
    //   <br />
    // </div>
  );
}

Debug.propTypes = {
  G: PropTypes.shape({
    hands: PropTypes.arrayOf(PropTypes.arrayOf(Card)),
    log: PropTypes.arrayOf(Play),
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

export default Debug;
