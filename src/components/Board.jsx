import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i) {
    const winningArray = this.props.winningSquares.filter((sq) => sq === i);
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isWinning={winningArray.length ? true : false}
      />
    );
  }

  render() {
    let counter = 0;
    let grid = [];
    for (let i = 0; i < 3; i++) {
      let squares = [];
      for (let j = 0; j < 3; j++, counter++) {
        squares.push(this.renderSquare(counter));
      }
      grid.push(
        React.createElement("div", { className: "board-row" }, squares)
      );
    }

    return grid;
  }
}

export default Board;
