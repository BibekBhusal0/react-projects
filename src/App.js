import "./App.css";
import { useState } from "react";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function checkIfDraw(board) {
  return !board.some((mark) => mark === "");
}

function Square({ value, clickFunction }) {
  return (
    <div className="square" onClick={clickFunction}>
      <span className={value}>{value}</span>
    </div>
  );
}

function Board() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [x, changeTurn] = useState(true);
  const [winner, changeWinner] = useState(null);
  const [draw, checkDraw] = useState(false);

  const handleClick = (index) => {
    if (board[index] === "" && !winner && !draw) {
      const temp_board = [...board];
      temp_board[index] = x ? "X" : "O";
      changeTurn(!x);
      setBoard(temp_board);
      changeWinner(calculateWinner(temp_board));
      checkDraw(checkIfDraw(temp_board));
    }
  };

  const reset = () => {
    setBoard(Array(9).fill(""));
    changeWinner(null);
    checkDraw(false);
  };

  return (
    <main>
      <div className="info">
        {winner
          ? `${winner} wins`
          : `${draw ? "It's a draw" : `${x ? "X" : "O"}'s turn`}`}
      </div>
      <div className="board">
        {[0, 1, 2].map((row) => {
          return (
            <div key={row} className="row">
              {[0, 1, 2].map((col) => {
                const cell = row * 3 + col;
                return (
                  <Square
                    key={cell}
                    clickFunction={() => handleClick(cell)}
                    value={board[cell]}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <button onClick={reset}>Reset </button>
    </main>
  );
}

function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
