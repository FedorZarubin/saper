import React from 'react';
import Board from './Board';
import FieldSettings from './FieldSettings';

class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cellMap: null,
        gameStatus: "Let's begin!",
        minesLeft: null
      };
      this.handleClick = this.handleClick.bind(this);
      this.handleSettings = this.handleSettings.bind(this)
    }
  
    handleClick (r,c,e) {
      e.preventDefault();
      const button = e.button;
      if (button===2) {
        const flag = this.state.cellMap[r][c][1];
        const minesLeft = flag ? this.state.minesLeft+1 : this.state.minesLeft-1;
        const newMap = JSON.parse(JSON.stringify(this.state.cellMap));
        newMap[r][c][1] = !flag;
        this.setState({
          cellMap:newMap,
          minesLeft: minesLeft
        })
      }

    }

    handleSettings (e) {
      e.preventDefault();
      const size = {
        w: Number(e.target.w.value),
        h: Number(e.target.h.value)
      };
      const difclt = e.target.d.value;
      const shuffle = function (array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1)); 
          [array[i], array[j]] = [array[j], array[i]];
        };
        return array;
      };
      const mineCount = Math.round(size.h*size.w*difclt/100);
      const mineMask = shuffle(Array(size.h*size.w).fill([true,false],0,mineCount).fill([false,false],mineCount));
      const cellMap = [];
      for (let i=0; i<mineMask.length; i+=size.w) {
        cellMap.push(mineMask.slice(i,i+size.w));
      }
      console.log(cellMap);
      this.setState({
        cellMap: cellMap,
        minesLeft: mineCount
      })
    }
      
    render() {
      const cellMap = this.state.cellMap;
      const gameStatus = this.state.gameStatus;
      const minesLeft = this.state.minesLeft;
      
      if (!cellMap) {
        return (
          <FieldSettings
          handleSettings={this.handleSettings}
          defDifclt={15}
          />
        );
      };
      return (
        <div className="game">
          <div className="game-board">
              <Board 
              cellMap={cellMap}
              handleClick={this.handleClick}
              />
          </div>
          <div className="game-info">
            <div>{gameStatus}</div>
            <div>Mines left: {minesLeft}</div>
          </div>
        </div>
      );
    }
  }

  export default Game;