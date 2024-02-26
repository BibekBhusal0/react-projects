import "./App.css";
import React from "react";
import { useState } from "react";

function Square({ val }) {
  const [value, setValue] = useState(val.toUpperCase());

  function handleClick() {
    setValue(value.toUpperCase() === "X" ? "O" : "X");
  }
  return (
    <>
      <button className="square" onClick={handleClick}>
        {value}
      </button>
    </>
  );
}

function Board() {
  const [board, setBoard] = useState(Array(9).fill(""));
  return (
    <div className="board">
      {[0, 1, 2].map((row) => {
        return (
          <div key={row} className="row">
            {[0, 1, 2].map((col) => {
              const cell = row * 3 + col;
              return <Square key={cell} val={board[cell]} />;
            })}
          </div>
        );
      })}
    </div>
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
