import React from "react";
import Square from "./square";

export default function Board({
  xSelectedColor,
  oSelectedColor,
  squares,
  handleClick,
}: any) {
  return (
    <tbody className="flex  flex-col gap-[8px]">
      <tr className=" flex flex-row  gap-[8px]">
        <Square
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
        />
        <Square
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
        />
        <Square
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
        />
      </tr>
      <tr className=" flex flex-row  gap-[8px]">
        <Square
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
        />
        <Square
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
        />
        <Square
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
        />
      </tr>
      <tr className=" flex flex-row  gap-[8px]">
        <Square
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
        />
        <Square
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
        />
        <Square
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
        />
      </tr>
    </tbody>
  );
}
