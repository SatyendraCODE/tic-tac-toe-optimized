import React from "react";
import { CARD_CLASS } from "@/app/const";
import { WinnerDataType } from "..";
import XTheme from "./x-theme";
import OTheme from "./o-theme";

const CLASS_NAME = "w-5 h-5 rounded-full";
const movesClassName = `${CARD_CLASS} h-full`;

type Props = {
  status: {
    winner: WinnerDataType | null;
    message: string;
  };
  moves: JSX.Element[];
  xSelectedColorState: [
    xSelectedColor: string,
    setXSelectedColor: React.Dispatch<React.SetStateAction<string>>
  ];
  oSelectedColorState: [
    oSelectedColor: string,
    setOSelectedColor: React.Dispatch<React.SetStateAction<string>>
  ];
};

export default function Right({
  status,
  moves,
  xSelectedColorState,
  oSelectedColorState,
}: Readonly<Props>) {
  const [xSelectedColor, setXSelectedColor] = xSelectedColorState;
  const [oSelectedColor, setOSelectedColor] = oSelectedColorState;

  return (
    <div className="flex flex-col gap-2">
      <div className={movesClassName}>
        {moves.length > 1 ? (
          <ol>{moves}</ol>
        ) : (
          <p className="opacity-20">All moves will be visible here!</p>
        )}
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
