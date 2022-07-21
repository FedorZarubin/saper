function Square (props) {
    const w = props.isWin ? " win" : "";
    return (
      <button className={"square"+w} onClick={props.onClick}>
        {props.value}
      </button>
    );  
  }

  export default Square