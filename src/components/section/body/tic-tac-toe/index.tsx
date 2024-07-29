"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Left from "./left";
import { triggerConfetti } from "@/components/ui/confetti";
import Right from "./right";
import ShinyButton from "@/components/ui/shine-button";

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

  const status = useMemo(() => {
    const winner = calculateWinner(currentSquares);
    let status;
    if (winner) {
      status = "Winner is " + winner;
      triggerConfetti();
    } else {
      status = "Next player --> " + (xIsNext ? "X" : "O");
    }
    return { win: !!winner, message: status };
  }, [currentSquares, xIsNext]);

  const moves = useMemo(
    () =>
      history.map((squares, move) => {
        let description;

        if (move === history.length - 1 && status.win) {
          description = "Game over";
        } else if (move > 0) {
          description = "Go to move #" + move;
        } else {
          description = "Start";
        }

        return (
          <li key={`${move}-x-$${move}`} className="mb-1.5 ">
            {
              <>
                {move === currentMove ? (
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    className="w-full"
                    onClick={() => jumpTo(move)}
                  >
                    <ShinyButton
                      text={
                        status.win || move === 0
                          ? description
                          : `Move #${move} selected`
                      }
                      className="w-full h-full px-3 rounded-md shadow-md text-white dark:font-light dark:text-[rgb(255,255,255,90%)]"
                    />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    className="w-full h-full border px-3 rounded-md bg-neutral-100 dark:bg-gray-900 shadow-md text-neutral-700 dark:font-light dark:text-[rgb(255,255,255,90%)]"
                    onClick={() => jumpTo(move)}
                  >
                    {description}
                  </motion.button>
                )}
              </>
            }
          </li>
        );
      }),
    [currentMove, history, status.win]
  );

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
  for (const element of lines) {
    const [a, b, c] = element;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
