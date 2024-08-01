"use client";

import React, { useState } from "react";

import OTheme from "../common/o-theme";
import XTheme from "../common/x-theme";

import Board from "./board";
import BoardEffectSelector from "./board-effect-selector";
import BoardEffected from "./board-effected";

import { CARD_CLASS } from "@/app/const";
import ShineBorder from "@/components/ui/shine-border";
import { WinnerDataType } from "@/lib/calculateWinner";

type Props = {
  xIsNext: boolean;
  squares: string[];
  status: {
    winner: WinnerDataType | null;
    message: string;
  };
  onPlay: (squares: string[]) => void;
  xSelectedColorState: [
    xSelectedColor: string,
    handleSetXSelectedColor: (color: string) => void
  ];
  oSelectedColorState: [
    oSelectedColor: string,
    handleSetOSelectedColor: (color: string) => void
  ];
  loginPlayerNum: string | null;
  isMultiplayerEnabled: boolean;
};

export default function Left({
  xIsNext,
  squares,
  status,
  onPlay,
  xSelectedColorState,
  oSelectedColorState,
  loginPlayerNum,
  isMultiplayerEnabled,
}: Readonly<Props>) {
  const [xSelectedColor, handleSetXSelectedColor] = xSelectedColorState;
  const [oSelectedColor, handleSetOSelectedColor] = oSelectedColorState;

  const [boardEffect, setBoardEffect] = useState(false);

  function handleClick(i: number) {
    if (status.winner?.won || squares[i]) {
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
        <table className="border-separate  z-10">
          {boardEffect ? (
            <BoardEffected
              xSelectedColor={xSelectedColor}
              oSelectedColor={oSelectedColor}
              winnerSquares={status.winner?.squares}
              squares={squares}
              handleClick={handleClick}
            />
          ) : (
            <Board
              xSelectedColor={xSelectedColor}
              oSelectedColor={oSelectedColor}
              winnerSquares={status.winner?.squares}
              squares={squares}
              handleClick={handleClick}
            />
          )}
        </table>
      </ShineBorder>

      {isMultiplayerEnabled ? (
        <>
          {loginPlayerNum === "1" && (
            <XTheme
              className="hidden sm:flex"
              selectedColor={xSelectedColor}
              onClick={handleSetXSelectedColor}
            />
          )}
        </>
      ) : (
        <XTheme
          className="hidden sm:flex"
          selectedColor={xSelectedColor}
          onClick={handleSetXSelectedColor}
        />
      )}

      {isMultiplayerEnabled ? (
        <>
          {loginPlayerNum === "2" && (
            <XTheme
              className="hidden sm:flex"
              selectedColor={oSelectedColor}
              onClick={handleSetOSelectedColor}
            />
          )}
        </>
      ) : (
        <OTheme
          className="hidden sm:flex"
          selectedColor={oSelectedColor}
          onClick={handleSetOSelectedColor}
        />
      )}

      <BoardEffectSelector setBoardEffect={setBoardEffect} />
    </div>
  );
}
