"use client";

import React, { useState } from "react";

import { ArrowLeft, ArrowRight, Plus } from "lucide-react";

import { WinnerDataType } from "..";

import Board from "./board";
import BoardEffectSelector from "./board-effect-selector";
import BoardEffected from "./board-effected";

import { CARD_CLASS } from "@/app/const";
import { Button } from "@/components/ui/button";
import ShineBorder from "@/components/ui/shine-border";

type Props = {
  xIsNext: boolean;
  squares: string[];
  status: {
    winner: WinnerDataType | null;
    message: string;
  };
  onPlay: (squares: string[]) => void;
  xSelectedColor: string;
  oSelectedColor: string;
};

const statusClassName = `${CARD_CLASS} text-xl font-medium`;

export default function Left({
  xIsNext,
  squares,
  status,
  onPlay,
  xSelectedColor,
  oSelectedColor,
}: Readonly<Props>) {
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
        <table className="border-separate select-none z-10">
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

      <div className={statusClassName}>{status.message}</div>

      <div className={statusClassName}>
        <div className="w-full flex items-center justify-center gap-3">
          <Button variant="outline">
            <Plus />
          </Button>
          <Button variant="outline">
            <ArrowLeft />
          </Button>
          <Button variant="outline">
            <ArrowRight />
          </Button>
        </div>
      </div>

      <BoardEffectSelector setBoardEffect={setBoardEffect} />
    </div>
  );
}
