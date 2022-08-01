import React from 'react';
import mine from '../img/mine.png';
import flag from '../img/flag.png'

class Square extends React.Component {
  render () {
      const v = {
        flag: [flag,"P"],
        mine: [mine,"O"]
      };
      // const isMine = this.props.isMine ? <img src={mine} alt="X"/> : "";
      const value = (this.props.value==="flag"||this.props.value==="mine") ? <img src={v[this.props.value][0]} alt={v[this.props.value][1]}/> : this.props.value;
      // console.log(value);
      return (
        <button 
          className={"square"}
          val={String(this.props.value)} 
          onClick={this.props.handleClick} 
          onContextMenu={this.props.handleClick}
          >
          {value===0 ? "" : value}
        </button>
      );  
    }
  }

  export default Square