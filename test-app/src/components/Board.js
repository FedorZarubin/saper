import React from 'react';
import Square from "./Square";

class Board extends React.Component {
    renderSquare(i) {
      // console.log(this.props);
      const isWin = this.props.winLine ? this.props.winLine.indexOf(i) >= 0 : false;
      return (
        <Square 
          value={this.props.squares[i]}
          onClick={ () => {this.props.onClick(i)} }
          key={i}
          isWin={isWin}
        />
      );
    }
    
    renderRow(i,x) {
      const sqSet = i.map((n) => {
        return this.renderSquare(n)
      });
      return React.createElement(
        'div',
        {className: 'board-row',key: x},
        sqSet
      );
    }
  
    render() { 
      // let boardMap = [[0,1,2],[3,4,5],[6,7,8]];
      let boardMap = Array(3).fill(Array(3).fill(0)).map((i, index) => { 
        return i.map((j,sIndex) => {return index*3+sIndex}) 
      });
      const rowSet = boardMap.map((n,index) => {
        return this.renderRow(n,index)
      });
      return React.createElement(
        "div",
        null,
        rowSet
      )
      
    //   return (
        // <div>
        //   <div className="board-row">
        //     {this.renderSquare(0)}
        //     {this.renderSquare(1)}
        //     {this.renderSquare(2)}
        //   </div>
    //       <div className="board-row">
    //         {this.renderSquare(3)}
    //         {this.renderSquare(4)}
    //         {this.renderSquare(5)}
    //       </div>
    //       <div className="board-row">
    //         {this.renderSquare(6)}
    //         {this.renderSquare(7)}
    //         {this.renderSquare(8)}
    //       </div>
    //     </div>
    //   );
    }
  }

  export default Board;