import { Client } from 'boardgame.io/react';
import React from 'react';

class TicTacToeBoard extends React.Component {
  onClick(id) {
    if (this.isActive(id)) {
      this.props.moves.clickCell(id);
      this.props.events.endTurn();
    }
  }

  isActive(id) {
    if (!this.props.isActive) return false;
    if (this.props.G.cells[id] !== null) return false;
    return true;
  }

  render() {
    let winner = '';
    if (this.props.ctx.gameover) {
      winner =
        this.props.ctx.gameover.winner !== undefined ? (
          <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
        ) : (
          <div id="winner">Draw!</div>
        );
    }

    const cellStyle = {
      border: '1px solid #555',
      width: '50px',
      height: '50px',
      lineHeight: '50px',
      textAlign: 'center',
    };

    let tbody = [];
    for (let i = 0; i < 3; i++) {
      let cells = [];
      for (let j = 0; j < 3; j++) {
        const id = 3 * i + j;
        cells.push(
          <td style={cellStyle} key={id} onClick={() => this.onClick(id)}>
            {this.props.G.cells[id]}
          </td>
        );
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

    return (
      <div>
        <table id="board">
          <tbody>{tbody}</tbody>
        </table>
        {winner}
      </div>
    );
  }
}

// return true if there is a row|col|diag of one player
function IsVictory(cells, lastTurn) {
  if (lastTurn === null) return false;

  const row = Math.floor(lastTurn / 3);
  const col = lastTurn % 3;
  let result = false;

  // check row of lastTurn id
  if (cells[lastTurn - col] === cells[lastTurn - col + 1] &&
      cells[lastTurn - col] === cells[lastTurn - col + 2]) {
    result = true;
  }

  // check col of lastTurn id
  else if (cells[lastTurn - 3 * row] === cells[lastTurn - 3 * (row - 1)] &&
           cells[lastTurn - 3 * row] === cells[lastTurn - 3 * (row - 2)]) {
    result = true;
  }

  // if lastTurn id rests on diag, check diags
  else if (lastTurn % 2 === 0) {
    if ([0, 4, 8].includes(lastTurn) &&
        cells[4] === cells[0] && 
        cells[4] === cells[8]) {
      result = true;
    }
    else if ([2, 4, 6].includes(lastTurn) &&
             cells[4] === cells[2] && 
             cells[4] === cells[6]) {
      result = true;
    }
  }

  return result;
}

// Return true if all `cells` are occupied.
function IsDraw(cells) {
  return cells.filter(c => c === null).length === 0;
}

const TicTacToe = {
  setup: () => ({ 
    cells: Array(9).fill(null),
    lastTurn: null,
  }),

  moves: {
    clickCell: (G, ctx, id) => {
      if (G.cells[id] === null) {
        G.cells[id] = ctx.currentPlayer;
        G.lastTurn = id;
      }
    },
  },

  endIf: (G, ctx) => {
    if (IsVictory(G.cells, G.lastTurn)) {
      console.log(`got a winner: ${ctx.currentPlayer}`);
      return { winner: ctx.currentPlayer };
    }

    if (IsDraw(G.cells)) {
      return { draw: true };
    }
  },
};

const App = Client({ 
  game: TicTacToe,
  board: TicTacToeBoard,
});

export default App;
