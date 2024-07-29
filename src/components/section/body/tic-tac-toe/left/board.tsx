import React from "react";
import Square from "./square";

export default function Board({
  xSelectedColor,
  oSelectedColor,
  winnerSquares,
  squares,
  handleClick,
}: any) {
  return (
    <tbody className="flex  flex-col gap-[8px]">
      <tr className=" flex flex-row  gap-[8px]">
        <Square
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          isWinner={winnerSquares?.includes(0)}
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
        />
        <Square
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          isWinner={winnerSquares?.includes(1)}
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
        />
        <Square
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          isWinner={winnerSquares?.includes(2)}
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
        />
      </tr>
      <tr className=" flex flex-row  gap-[8px]">
        <Square
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          isWinner={winnerSquares?.includes(3)}
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
        />
        <Square
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          isWinner={winnerSquares?.includes(4)}
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
        />
        <Square
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          isWinner={winnerSquares?.includes(5)}
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
        />
      </tr>
      <tr className=" flex flex-row  gap-[8px]">
        <Square
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          isWinner={winnerSquares?.includes(6)}
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
        />
        <Square
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          isWinner={winnerSquares?.includes(7)}
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
        />
        <Square
          xSelectedColor={xSelectedColor}
          oSelectedColor={oSelectedColor}
          isWinner={winnerSquares?.includes(8)}
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
        />
      </tr>
    </tbody>
  );
}
