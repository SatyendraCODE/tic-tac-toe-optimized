import React from "react";

import { ArrowLeft, ArrowRight, Plus, RotateCcw } from "lucide-react";

import { WinnerDataType } from "..";
import OTheme from "../common/o-theme";
import XTheme from "../common/x-theme";

import { CARD_CLASS } from "@/app/const";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  onPlusBtnTrigger: () => void;
  onLeftBtnTrigger: () => void;
  onRightBtnTrigger: () => void;
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
}: Readonly<Props>) {
  const [xSelectedColor, setXSelectedColor] = xSelectedColorState;
  const [oSelectedColor, setOSelectedColor] = oSelectedColorState;

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
        onClick={(color: string) => setXSelectedColor(color)}
      />

      <OTheme
        className="sm:hidden"
        selectedColor={oSelectedColor}
        onClick={(color: string) => setOSelectedColor(color)}
      />
    </div>
  );
}
