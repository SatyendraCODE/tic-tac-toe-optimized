"use client";

import { useMemo, useRef, useState } from "react";
import Left from "./left";
import { CARD_CLASS } from "@/app/const";
import BoardEffectSelector from "./left/board-effect-selector";
import { triggerConfetti } from "@/components/ui/confetti";
import Right from "./right";

export default function TicTacToe() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [boardEffect, setBoardEffect] = useState(false);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const status = useMemo(() => {
    const winner = calculateWinner(currentSquares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
      triggerConfetti();
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
    return status;
  }, [currentSquares, xIsNext]);

  return (
    <div className="grid grid-cols-2 gap-2 ">
      <Left
        xIsNext={xIsNext}
        squares={currentSquares}
        onPlay={handlePlay}
        calculateWinner={calculateWinner}
        boardEffect={boardEffect}
      />

      <Right
        status={status}
        moves={moves}
        boardEffectState={[boardEffect, setBoardEffect]}
      />
    </div>
  );
}

function calculateWinner(squares: string[]) {
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
