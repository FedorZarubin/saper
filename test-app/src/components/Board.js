import React from 'react';
import Square from "./Square";

class Board extends React.Component {
    renderSquare(i,rX,cX) {
     return (
        <Square 
          // isMine={false}
          value={i[1]}
          handleClick={ (e) => {this.props.handleClick(rX,cX,e)} }
          key={rX+"/"+cX}
        />
      );
    }
    
    renderRow(i,rowIndex) {
      const sqSet = i.map((n,cellIndex) => {
        return this.renderSquare(n,rowIndex,cellIndex)
      });
      return React.createElement(
        'div',
        {className: 'board-row',key: rowIndex},
        sqSet
      );
    }
  
    render() { 
      const cellMap = this.props.cellMap;
      const rowSet = cellMap.map((n,rowIndex) => {
        return this.renderRow(n,rowIndex)
      });
      return React.createElement(
        "div",
        null,
        rowSet
      )
      
    }
  }

  export default Board;