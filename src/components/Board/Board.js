import React, { Component } from "react";
import Square from "../Square/Square";
import "./Board.css";

const BoardRow = ({ children }) => <div className="board-row">{children}</div>;

export class Board extends Component {
  createBoard() {
    const { isWinner, squares, onClick } = this.props;

    let board = [];
    for (let row = 0; row < 3; row++) {
      let rows = [];
      for (let col = 0; col < 3; col++) {
        const index = row * 3 + col;
        rows.push(
          <Square
            key={index}
            value={squares[index]}
            onClick={() => onClick(index)}
            className={isWinner.includes(index) ? " isWinner" : ""}
          />
        );
      }
      board.push(<BoardRow key={"row-" + row}>{rows}</BoardRow>);
    }

    return board;
  }

  render() {
    return <div>{this.createBoard()}</div>;
  }
}
