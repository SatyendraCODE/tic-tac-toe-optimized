import React from "react";
import { ThreeDCardDemo } from "./square-with-effect";

export default function BoardEffected({
  xSelectedColor,
  oSelectedColor,
  squares,
  handleClick,
}: any) {
  return (
    <tbody className="flex  flex-col gap-[5px]">
      <tr className=" flex flex-row  gap-[5px]">
        <ThreeDCardDemo
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
        />
        <ThreeDCardDemo
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
        />
        <ThreeDCardDemo
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
        />
      </tr>
      <tr className="flex flex-row  gap-[5px]">
        <ThreeDCardDemo
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
        />
        <ThreeDCardDemo
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
        />
        <ThreeDCardDemo
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
        />
      </tr>
      <tr className="flex flex-row gap-[5px]">
        <ThreeDCardDemo
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
        />
        <ThreeDCardDemo
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
        />
        <ThreeDCardDemo
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
        />
      </tr>
    </tbody>
  );
}