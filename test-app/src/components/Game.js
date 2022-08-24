import React from 'react';
import Board from './Board';
import FieldSettings from './FieldSettings';

class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cellMap: null,
        gameStatus: "Let's begin!",
        minesLeft: null,
        difficulty: 0
      };
      this.handleClick = this.handleClick.bind(this);
      this.handleSettings = this.handleSettings.bind(this)
      this.handleReset = this.handleReset.bind(this)
    }

    minesAround(r,c,map) {
      let n = 0;
      for (let i=r-1;i<=r+1;i++) {
        if (i<0||i>=map.length) continue;
        for (let j=c-1;j<=c+1;j++){
          if (j<0||j>=map[0].length) continue;
          if (map[i][j][0]==="mine") n++;
        }
      };
      return n
    }

    openCell (r,c,map) {
      const queue = [];
      queue.push([r,c])
      do {
        const [x,y] = queue[0];
        const val = map[x][y][0];
        if (map[x][y][1] !== val) {
          map[x][y][1] = val;
          if (val===0){
            for (let i=x-1;i<=x+1;i++) {
              if (i<0||i>=map.length) continue;
              for (let j=y-1;j<=y+1;j++){
                if (j<0||j>=map[0].length) continue;
                queue.push([i,j])
              }
            }  
          };
        }
        queue.shift()        
      } while (queue.length>0);
      
      return map
    }

    handleClick (r,c,e) {
      e.preventDefault();
      const button = e.button;
      let gameStatus = this.state.gameStatus;
      if (gameStatus !== "Let's begin!") return;
      const val = this.state.cellMap[r][c][1];
      let newMap = JSON.parse(JSON.stringify(this.state.cellMap));
      let minesLeft = this.state.minesLeft;
      if (button===2) {                       //right click
        if (!val&&minesLeft>0) {
          newMap[r][c][1] = "flag";
          minesLeft--
        } else if (val==="flag") {
          newMap[r][c][1] = null;
          minesLeft++
        } else return;
      } else if (button===0){                 //left click
        if (val) return;
        if(newMap[r][c][0]==="mine"){         //mine!
          for (let i=0;i<newMap.length;i++) {
            const row = newMap[i];
            for (let j=0;j<row.length;j++) {
              if(row[j][0]==="mine") row[j][1] = "mine"
            }
          };
          gameStatus = "Booooooom!!!"
        } else {                              // no mine
          newMap = this.openCell(r,c,newMap);
          if (newMap.every((r,i)=>{return r.every((c)=>{return (c[0]==="mine"||c[1]!==null)})})){
            gameStatus = "You win!!!"
          }
        }
      }
      
      this.setState({
        cellMap: newMap,
        minesLeft: minesLeft,
        gameStatus: gameStatus
      })
    }

    handleReset () {
      this.setState(
        {
          cellMap: null,
          gameStatus: "Let's begin!",
          minesLeft: null
        }
      )
    }

    handleSettings (e) {
      console.log(e);
      e.preventDefault();
      const size = {
        w: Number(e.target.w.value),
        h: Number(e.target.h.value)
      };
      const diffclt = e.target.d.value;
      const shuffle = function (array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1)); 
          [array[i], array[j]] = [array[j], array[i]];
        };
        return array;
      };
      const mineCount = Math.round(size.h*size.w*diffclt/100);
      const mineMask = shuffle(Array(size.h*size.w).fill(["mine",null],0,mineCount).fill([null,null],mineCount));
      let cellMap = [];
      for (let i=0; i<mineMask.length; i+=size.w) {
        cellMap.push(mineMask.slice(i,i+size.w));
      };

      cellMap = cellMap.map((r,i)=>{ return r.map((c,j)=>{
        return [
          c[0]==="mine" ? "mine" : this.minesAround(i,j,cellMap),
          null
        ]
      })})

      this.setState({
        cellMap: cellMap,
        minesLeft: mineCount,
        difficulty: diffclt,
        gameStatus: "Let's begin!"
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
          defDiffclt={15}
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
            <div><br/></div>
            <div><button onClick={this.handleReset}>Start new game</button></div>
            <div><br/></div>
            <div><button onClick={() => {
              const w = this.state.cellMap[0].length;
              const h = this.state.cellMap.length;
              const d = this.state.difficulty;
              const e = {
                preventDefault: function () {
                  return null
                },
                target: {
                  w: {value: w},
                  h: {value: h},
                  d: {value: d}
                }
              };
              this.handleSettings(e)
              }}>Start new same  game</button></div>
          </div>
        </div>
      );
    }
  }

  export default Game;