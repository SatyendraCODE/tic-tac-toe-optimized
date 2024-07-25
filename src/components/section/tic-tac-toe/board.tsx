import React from "react";
import Square from "./square";
import { CARD_CLASS, COLORS_VARIANTS } from "@/app/const";

type BoardProps = {
  xIsNext: boolean;
  squares: string[];
  onPlay: (squares: string[]) => void;
  calculateWinner: (squares: string[]) => string | null;
};

const CLASS_NAME = "w-5 h-5 rounded-full";

export default function Board({
  xIsNext,
  squares,
  onPlay,
  calculateWinner,
}: BoardProps) {
  const [xSelectedColor, setXSelectedColor] = React.useState(1);
  const [oSelectedColor, setOSelectedColor] = React.useState(2);

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

  const colorVariants = (
    value: { bg: string; text: string },
    selectedIndex: number
  ) => {
    console.log("_dd value", value);

    return `${CLASS_NAME} bg-${value.bg}-600 hover:bg-${value.bg}-500 ${
      value.bg === COLORS_VARIANTS[selectedIndex].bg
        ? "outline outline-2 outline-gray-200 "
        : ""
    }`;
  };

  return (
    <>
      <div className="grid grid-row-2 gap-2">
        <div className={CARD_CLASS}>
          <table className="border-separate">
            <tbody className="">
              <tr className="">
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
              <tr className="">
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
              <tr className="">
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
          </table>
        </div>

        <div className={CARD_CLASS}>
          <div className="flex items-center gap-1.5">
            <p>X -</p>
            {COLORS_VARIANTS.map((color, index) => (
              <button
                key={index}
                className={colorVariants(color, xSelectedColor)}
                onClick={() => setXSelectedColor(index)}
              />
            ))}
          </div>
        </div>
        <div className={CARD_CLASS}>
          <div className="flex items-center gap-1.5">
            <p>O -</p>
            {COLORS_VARIANTS.map((color, index) => (
              <button
                key={index}
                className={colorVariants(color, oSelectedColor)}
                onClick={() => setOSelectedColor(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
