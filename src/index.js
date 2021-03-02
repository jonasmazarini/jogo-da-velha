import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Board from "./components/Board.jsx";
import calculateWinner from "./components/calculateWinner";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          clicked: null,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          clicked: i,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const row = Math.floor(step.clicked / 3) + 1;
      const col = (step.clicked % 3) + 1;
      const player = move % 2 === 0 ? "O" : "X";
      const desc = move
        ? "Ir para a jogada #" +
          move +
          " Jogador: " +
          player +
          "; Coluna: " +
          col +
          "; Linha: " +
          row +
          "."
        : "Ir para o início do jogo";
      const currentStyle =
        move === this.state.stepNumber ? { color: "red" } : { color: "white" };

      return (
        <li key={move} style={currentStyle}>
          <button
            className="botao"
            onClick={() => this.jumpTo(move)}
            style={currentStyle}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    let winningSquares = [];
    if (winner) {
      status = "Vencedor: " + winner.player;
      winningSquares = winner.line;
    } else if (this.state.history.length === 10) {
      status = "Empate!";
    } else {
      status = "Próximo: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winningSquares={winningSquares}
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

ReactDOM.render(<Game />, document.getElementById("root"));
