import React from "react";

import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";

import OTheme from "../components/o-theme";
import XTheme from "../components/x-theme";

import { CARD_CLASS } from "@/app/const";
import { Button } from "@/components/ui/button";
import { WinnerDataType } from "@/lib/calculateWinner";
import { cn } from "@/lib/utils";

type Props = {
  status: {
    winner: WinnerDataType | null;
    message: string;
  };
  moves: JSX.Element[];
  xSelectedColorState: [
    xSelectedColor: string,
    handleSetXSelectedColor: (color: string) => void
  ];
  oSelectedColorState: [
    oSelectedColor: string,
    handleSetOSelectedColor: (color: string) => void
  ];
  onPlusBtnTrigger: () => void;
  onLeftBtnTrigger: () => void;
  onRightBtnTrigger: () => void;
  loginPlayerNum?: string | null;
  isMultiplayerEnabled?: boolean;
};

const statusClassName = `${CARD_CLASS} text-xl font-medium`;

export default function Right({
  status,
  moves,
  xSelectedColorState,
  oSelectedColorState,
  onPlusBtnTrigger,
  onLeftBtnTrigger,
  onRightBtnTrigger,
  loginPlayerNum,
  isMultiplayerEnabled,
}: Readonly<Props>) {
  const [xSelectedColor, handleSetXSelectedColor] = xSelectedColorState;
  const [oSelectedColor, handleSetOSelectedColor] = oSelectedColorState;

  return (
    <div className="flex flex-col gap-2">
      <div className={statusClassName}>{status.message}</div>

      <div className={CARD_CLASS}>
        <div className="w-full flex items-center justify-center gap-3">
          <Button
            variant="outline"
            title="Go to previous move"
            onClick={onLeftBtnTrigger}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            title="Go to next move"
            onClick={onRightBtnTrigger}
          >
            <ArrowRight />
          </Button>
          <Button
            variant="outline"
            title="Start new game"
            onClick={onPlusBtnTrigger}
          >
            <RotateCcw />
          </Button>
        </div>
      </div>

      <div className={cn(CARD_CLASS, "h-full min-h-24")}>
        {moves.length > 1 ? (
          <ol>{moves}</ol>
        ) : (
          <p className="opacity-20">All moves will be visible here!</p>
        )}
      </div>

      <XTheme
        className="sm:hidden"
        selectedColor={xSelectedColor}
        onClick={handleSetXSelectedColor}
      />

      <OTheme
        className="sm:hidden"
        selectedColor={oSelectedColor}
        onClick={handleSetOSelectedColor}
      />

      {/* {isMultiplayerEnabled ? (
        <>
          {loginPlayerNum === "1" && (
            <XTheme
              className="sm:hidden"
              selectedColor={xSelectedColor}
              onClick={handleSetXSelectedColor}
            />
          )}
        </>
      ) : (
        <XTheme
          className="sm:hidden"
          selectedColor={xSelectedColor}
          onClick={handleSetXSelectedColor}
        />
      )}

      {isMultiplayerEnabled ? (
        <>
          {loginPlayerNum === "2" && (
            <OTheme
              className="sm:hidden"
              selectedColor={oSelectedColor}
              onClick={handleSetOSelectedColor}
            />
          )}
        </>
      ) : (
        <OTheme
          className="sm:hidden"
          selectedColor={oSelectedColor}
          onClick={handleSetOSelectedColor}
        />
      )} */}
    </div>
  );
}
