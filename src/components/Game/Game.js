import React, { Component } from "react";
import { Board } from "../Board/Board";
import Switch from "react-switch";
import {
  calculateWinner,
  indexToRowCol,
  calculateWinnerIndex,
  isDraw
} from "../../utils";
import "./Game.css";

export class Game extends Component {
  state = {
    history: [
      {
        squares: Array(9).fill(null),
        prevMove: null
      }
    ],
    stepNumber: 0,
    xIsnext: true,
    isActive: false,
    checked: false
  };

  handleClick(i) {
    const { xIsNext, stepNumber } = this.state;
    const history = this.state.history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = xIsNext ? "X" : "O";
    this.setState({
      history: [...history, { squares, prevMove: i }],
      stepNumber: history.length,
      xIsNext: !xIsNext,
      isActive: false
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 1,
      isActive: true
    });
  }

  handleChange() {
    this.setState({ checked: !this.state.checked });
  }

  render() {
    const { history, stepNumber, isActive, checked } = this.state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    let moves = history.map((step, move) => {
      const desc = move
        ? "Go to move #" +
          move +
          ` in coords. (${indexToRowCol(step.prevMove, 3)})`
        : "Go to game start";
      return (
        <li key={move}>
          <button
            className={`btn-history ${
              isActive && stepNumber === move ? "active" : ""
            }`}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    moves = checked ? moves.reverse() : moves;
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (isDraw(current.squares)) {
      status = "Draw!!!";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            isWinner={calculateWinnerIndex(current.squares)}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <label htmlFor="material-switch">
            <Switch
              checked={this.state.checked}
              onChange={() => this.handleChange()}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="material-switch"
            />
            <span className="game-reverse"> Reverse </span>
          </label>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
