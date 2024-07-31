"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Left from "./left";
import { triggerConfetti } from "@/components/ui/confetti";
import Right from "./right";
import ShinyButton from "@/components/ui/shine-button";
import { COLORS_VARIANTS } from "@/app/const";

export type WinnerDataType = {
  player: string;
  won: boolean;
  squares: number[];
};

export default function TicTacToe() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xSelectedColor, setXSelectedColor] = useState(COLORS_VARIANTS[1]);
  const [oSelectedColor, setOSelectedColor] = useState(COLORS_VARIANTS[2]);

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
    let message;
    if (winner) {
      message = "Winner is " + winner.player;
      triggerConfetti();
    } else {
      message = "Next player --> " + (xIsNext ? "X" : "O");
    }
    return { winner: winner, message: message };
  }, [currentSquares, xIsNext]);

  const moves = useMemo(
    () =>
      history.map((squares, move) => {
        let description;

        if (move === history.length - 1 && status.winner?.won) {
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
                        status.winner?.won || move === 0
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
    [currentMove, history, status.winner?.won]
  );

  return (
    <div className="grid sm:grid-cols-2 gap-2 pb-24">
      <Left
        xIsNext={xIsNext}
        squares={currentSquares}
        onPlay={handlePlay}
        status={status}
        xSelectedColor={xSelectedColor}
        oSelectedColor={oSelectedColor}
      />

      <Right
        status={status}
        moves={moves}
        xSelectedColorState={[xSelectedColor, setXSelectedColor]}
        oSelectedColorState={[oSelectedColor, setOSelectedColor]}
      />
    </div>
  );
}

function calculateWinner(squares: string[]): WinnerDataType | null {
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
      return {
        player: squares[a],
        won: true,
        squares: element,
      };
    }
  }
  return null;
}
