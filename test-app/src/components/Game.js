import React from 'react';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares:[]
        }],
        turnNumber: 0,
        isXNext: true,
        winner: [false, null, null]
      };
      this.handleClick = this.handleClick.bind(this)
    }
  
    handleClick (i) {
      const history = this.state.history;
      const cur_squares = history[history.length -1].squares;
      const squares = cur_squares.slice();
      if (this.state.winner[0] || squares[i]) {
        return
      };
      squares[i] = this.state.isXNext ? "X" : "O";
      const winner = this.calculateWinner(squares);
      this.setState({
        history: history.concat([{squares:squares}]), 
        turnNumber: history.length,
        isXNext: !this.state.isXNext,
        winner: winner
      })
    }
  
    jumpTo (num) {
      const history = this.state.history;
      // console.log(history.slice(0,num));
      this.setState({
        history: history.slice(0,num+1),
        turnNumber: num,
        isXNext: (num % 2) === 0,
        winner: [false, null, null]
      })
    }
  
    calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return [true, squares[a],lines[i]];
        }
      }
      return [false, null, null];
    }
  
    hilight(line){
      document.querySelectorAll()
    }
  
    render() {
      const history = this.state.history;
      const cur_squares = history[history.length -1].squares;
      let status;
      if (this.state.winner[0]) {
        status = this.state.winner[1] + " won!"
      } else if (history.length>9) {
        status = "Draw!"
      } else {
        status = 'Next player: ' + (this.state.isXNext ? "X" : "O")
      }
      const moves = history.map((turn, turnNum) => {
        if (turnNum !== 0) {
          const descr = turnNum === 1 ? "Back to Start" : "Back to turn #" + (turnNum);
          return (
            <li key={turnNum}>
            <button onClick={() => this.jumpTo(turnNum-1)}>{descr}</button>
          </li>
          );
        }
      });
  
      return (
        <div className="game">
          <div className="game-board">
              <Board 
              squares={cur_squares}
              onClick={this.handleClick}
              winLine={this.state.winner[2]}
              />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  export default Game;