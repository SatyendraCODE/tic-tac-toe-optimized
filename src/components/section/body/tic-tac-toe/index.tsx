"use client";

import { useMemo, useState } from "react";

import { motion } from "framer-motion";

import Left from "./left";
import Right from "./right";

import { COLORS_VARIANTS } from "@/app/const";
import { triggerConfetti } from "@/components/ui/confetti";
import ShinyButton from "@/components/ui/shine-button";
import { calculateWinner } from "@/lib/calculateWinner";

const INIT_HISTORY = [Array(9).fill(null)];
const INIT_MOVE = 0;

export default function TicTacToe() {
  const [history, setHistory] = useState(INIT_HISTORY);
  const [currentMove, setCurrentMove] = useState(INIT_MOVE);
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

  function handlePlusBtnTrigger() {
    setHistory(INIT_HISTORY);
    setCurrentMove(INIT_MOVE);
  }

  function handleLeftBtnTrigger() {
    if (currentMove === 0) {
      return;
    }
    jumpTo(currentMove - 1);
  }

  function handleRightBtnTrigger() {
    if (currentMove === history.length - 1) {
      return;
    }
    jumpTo(currentMove + 1);
  }

  const status = useMemo(() => {
    const winner = calculateWinner(currentSquares);
    let message;
    if (winner) {
      message = "Winner is " + winner.player;
      triggerConfetti();
    } else {
      message = "Next player --> " + (xIsNext ? "X" : "O");
      if (currentMove === 9) {
        message = "Draw";
      }
    }
    return { winner: winner, message: message };
  }, [currentMove, currentSquares, xIsNext]);

  const moves = useMemo(
    () =>
      history.map((_, move) => {
        let description;

        if (move === history.length - 1 && status.winner?.won) {
          description = "Player " + status.winner?.player + " won";
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
                          : `Move #${move}`
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
    [currentMove, history, status.winner?.player, status.winner?.won]
  );

  return (
    <div className="grid sm:grid-cols-2 gap-2 pb-24 lg:pb-10">
      <Left
        xIsNext={xIsNext}
        squares={currentSquares}
        onPlay={handlePlay}
        status={status}
        xSelectedColorState={[xSelectedColor, setXSelectedColor]}
        oSelectedColorState={[oSelectedColor, setOSelectedColor]}
      />

      <Right
        status={status}
        moves={moves}
        xSelectedColorState={[xSelectedColor, setXSelectedColor]}
        oSelectedColorState={[oSelectedColor, setOSelectedColor]}
        onPlusBtnTrigger={handlePlusBtnTrigger}
        onLeftBtnTrigger={handleLeftBtnTrigger}
        onRightBtnTrigger={handleRightBtnTrigger}
      />
    </div>
  );
}
