import React from "react";
import BoardEffectSelector from "../left/board-effect-selector";
import { CARD_CLASS } from "@/app/const";

const statusClassName = `${CARD_CLASS} text-xl font-medium`;
const movesClassName = `${CARD_CLASS} h-full`;

type Props = {
  status: {
    win: boolean;
    message: string;
  };
  moves: JSX.Element[];
  boardEffectState: [
    boardEffect: boolean,
    setBoardEffect: React.Dispatch<React.SetStateAction<boolean>>
  ];
};

export default function Right({
  status,
  moves,
  boardEffectState,
}: Readonly<Props>) {
  return (
    <div className="flex flex-col gap-2">
      <div className={statusClassName}>{status.message}</div>

      <div className={movesClassName}>
        <ol>{moves}</ol>
      </div>

      <BoardEffectSelector boardEffectState={boardEffectState} />
    </div>
  );
}
