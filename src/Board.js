import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // create the rows
    for (let i = 0; i < nrows; i++) {
      let row = [];
      // create the columns inside the rows
      for (let j = 0; j < ncols; j++) {
        row[j] = Math.random() < chanceLightStartsOn;
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // Check if all values in the board are false
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
  
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on the board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };
  
      // Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);
  
      // Flip the selected cell and its neighbors
      flipCell(y, x, boardCopy);
      flipCell(y - 1, x, boardCopy); // top
      flipCell(y + 1, x, boardCopy); // bottom
      flipCell(y, x - 1, boardCopy); // left
      flipCell(y, x + 1, boardCopy); // right
  
      return boardCopy;
    });
  }

    return (
    <div className="Board">
        <h1>Light Game</h1>
        {hasWon() ? <p>You Won!</p> :
        <div className="Board-Game">
            <table><tbody>
            {board.map((row, rowIndex) => (
                <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                    <Cell
                    key={cellIndex}
                    flipCellsAroundMe={() => flipCellsAround(rowIndex + "-" + cellIndex)}
                    isLit={cell}
                    />
                ))}
                </tr>
            ))}
            </tbody></table>
        </div>
        }
    </div>
    );
}


export default Board;
