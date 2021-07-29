import Board from "./Board";
import { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[history.length - 1];

  const winner = calculateWinner(current.squares);
  if (winner != null) {
    alert(winner);
  }

  const currentPlayer = xIsNext ? "X" : "O";

  function calculateWinner(currentStatus: any) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];

      if (
        currentStatus[a] &&
        currentStatus[a] === currentStatus[b] &&
        currentStatus[a] === currentStatus[c]
      ) {
        return currentStatus[a];
      }
    }
    return null;
  }

  function handleSquareClick(index: number) {
    const newSquares = [...current.squares];
    newSquares[index] = currentPlayer;
    // Update histry
    setHistory((previouseState) =>
      previouseState.concat([{ squares: newSquares }])
    );

    if (xIsNext) {
      setXIsNext(false);
    } else {
      setXIsNext(true);
    }
  }

  return (
    <>
      <p>Current player: {currentPlayer}</p>
      <Board squares={current.squares} boardClick={handleSquareClick} />
    </>
  );
}
