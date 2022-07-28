import React from 'react';
// import mine from '../img/mine.png';
import flag from '../img/flag.png'

class Square extends React.Component {
    // const w = props.isWin ? " win" : "";
    render () {
      // const isMine = this.props.isMine ? <img src={mine} alt="X"/> : "";
      const value = this.props.value ? <img src={flag} alt="P"/> : null;
      return (
        <button 
          className={"square"} 
          onClick={this.props.handleClick} 
          onContextMenu={this.props.handleClick}
          >
          {value}
        </button>
      );  
    }
  }

  export default Square