"use client";

import React from "react";
import Square from "./square";
import { CARD_CLASS, COLORS_VARIANTS } from "@/app/const";
import { ThreeDCardDemo } from "./square-with-effect";
import XTheme from "./x-theme";
import OTheme from "./o-theme";
import Board from "./board";
import BoardEffectSelector from "./board-effect-selector";
import BoardEffected from "./board-effected";

type BoardProps = {
  xIsNext: boolean;
  squares: string[];
  onPlay: (squares: string[]) => void;
  calculateWinner: (squares: string[]) => string | null;
};

const CLASS_NAME = "w-5 h-5 rounded-full";

export default function Left({
  xIsNext,
  squares,
  onPlay,
  calculateWinner,
}: BoardProps) {
  const [xSelectedColor, setXSelectedColor] = React.useState(
    COLORS_VARIANTS[1]
  );
  const [oSelectedColor, setOSelectedColor] = React.useState(
    COLORS_VARIANTS[2]
  );

  const [boardEffect, setBoardEffect] = React.useState(false);

  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
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

  const colorVariants = (color: string, selectedColor: string) => {
    switch (color) {
      case "red":
        return color === selectedColor
          ? `${CLASS_NAME} bg-red-600 hover:bg-red-500 outline outline-2 outline-gray-200`
          : `${CLASS_NAME} bg-red-600 hover:bg-red-500 `;
      case "blue":
        return color === selectedColor
          ? `${CLASS_NAME} bg-blue-600 hover:bg-blue-500 outline outline-2 outline-gray-200`
          : `${CLASS_NAME} bg-blue-600 hover:bg-blue-500 `;
      case "green":
        return color === selectedColor
          ? `${CLASS_NAME} bg-green-600 hover:bg-green-500 outline outline-2 outline-gray-200`
          : `${CLASS_NAME} bg-green-600 hover:bg-green-500 `;
      case "amber":
        return color === selectedColor
          ? `${CLASS_NAME} bg-amber-600 hover:bg-amber-500 outline outline-2 outline-gray-200`
          : `${CLASS_NAME} bg-amber-600 hover:bg-amber-500 `;
      default:
        return color === selectedColor
          ? `${CLASS_NAME} bg-yellow-600 hover:bg-yellow-500 outline outline-2 outline-gray-200`
          : `${CLASS_NAME} bg-yellow-600 hover:bg-yellow-500 `;
    }
  };

  return (
    <>
      <div className="grid grid-row-2 gap-2">
        <div className={CARD_CLASS}>
          <table className="border-separate select-none">
            {boardEffect ? (
              <BoardEffected
                xSelectedColor={xSelectedColor}
                oSelectedColor={oSelectedColor}
                squares={squares}
                handleClick={handleClick}
              />
            ) : (
              <Board
                xSelectedColor={xSelectedColor}
                oSelectedColor={oSelectedColor}
                squares={squares}
                handleClick={handleClick}
              />
            )}
          </table>
        </div>

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

        <BoardEffectSelector boardEffectState={[boardEffect, setBoardEffect]} />
      </div>
    </>
  );
}
