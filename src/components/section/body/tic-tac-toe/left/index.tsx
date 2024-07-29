"use client";

import React from "react";
import { CARD_CLASS, COLORS_VARIANTS } from "@/app/const";
import XTheme from "./x-theme";
import OTheme from "./o-theme";
import Board from "./board";
import BoardEffected from "./board-effected";
import ShineBorder from "@/components/ui/shine-border";
import { WinnerDataType } from "..";

type Props = {
  xIsNext: boolean;
  squares: string[];
  onPlay: (squares: string[]) => void;
  winnerData: WinnerDataType | null;
  boardEffect: boolean;
};

const CLASS_NAME = "w-5 h-5 rounded-full";

export default function Left({
  xIsNext,
  squares,
  onPlay,
  winnerData,
  boardEffect,
}: Readonly<Props>) {
  const [xSelectedColor, setXSelectedColor] = React.useState(
    COLORS_VARIANTS[1]
  );
  const [oSelectedColor, setOSelectedColor] = React.useState(
    COLORS_VARIANTS[2]
  );

  function handleClick(i: number) {
    if (winnerData?.won || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  return (
    <div className="grid grid-row-2 gap-2">
      <ShineBorder
        borderWidth={2}
        className={CARD_CLASS}
        color={["#A07CFE", "#FE8FB5", "#FFBE7B", "#d32525f1"]}
      >
        <table className="border-separate select-none z-10">
          {boardEffect ? (
            <BoardEffected
              xSelectedColor={xSelectedColor}
              oSelectedColor={oSelectedColor}
              winnerSquares={winnerData?.squares}
              squares={squares}
              handleClick={handleClick}
            />
          ) : (
            <Board
              xSelectedColor={xSelectedColor}
              oSelectedColor={oSelectedColor}
              winnerSquares={winnerData?.squares}
              squares={squares}
              handleClick={handleClick}
            />
          )}
        </table>
      </ShineBorder>

      <XTheme
        selectedColor={xSelectedColor}
        colorVariants={colorVariants}
        onClick={(color: string) => setXSelectedColor(color)}
      />

      <OTheme
        selectedColor={oSelectedColor}
        colorVariants={colorVariants}
        onClick={(color: string) => setOSelectedColor(color)}
      />
    </div>
  );
}

function colorVariants(color: string, selectedColor: string) {
  switch (color) {
    case "red":
      return color === selectedColor
        ? `${CLASS_NAME} bg-red-600 hover:bg-red-500 outline outline-offset-1 outline-2 outline-blue-400/70 dark:outline-blue-500/70 `
        : `${CLASS_NAME} bg-red-600 hover:bg-red-500 `;
    case "blue":
      return color === selectedColor
        ? `${CLASS_NAME} bg-blue-600 hover:bg-blue-500 outline outline-offset-1 outline-2 outline-blue-400/70 dark:outline-blue-500/70 `
        : `${CLASS_NAME} bg-blue-600 hover:bg-blue-500 `;
    case "green":
      return color === selectedColor
        ? `${CLASS_NAME} bg-green-600 hover:bg-green-500 outline outline-offset-1 outline-2 outline-blue-400/70 dark:outline-blue-500/70 `
        : `${CLASS_NAME} bg-green-600 hover:bg-green-500 `;
    case "amber":
      return color === selectedColor
        ? `${CLASS_NAME} bg-amber-600 hover:bg-amber-500 outline outline-offset-1 outline-2 outline-blue-400/70 dark:outline-blue-500/70 `
        : `${CLASS_NAME} bg-amber-600 hover:bg-amber-500 `;
    default:
      return color === selectedColor
        ? `${CLASS_NAME} bg-yellow-600 hover:bg-yellow-500 outline outline-offset-1 outline-2 outline-blue-400/70 dark:outline-blue-500/70 `
        : `${CLASS_NAME} bg-yellow-600 hover:bg-yellow-500 `;
  }
}
