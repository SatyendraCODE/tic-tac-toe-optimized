import React from "react";
import BoardEffectSelector from "../left/board-effect-selector";
import { CARD_CLASS } from "@/app/const";

const movesClassName = `${CARD_CLASS} h-full`;

export default function Right({ status, moves, boardEffectState }: any) {
  return (
    <div className=" flex flex-col gap-2">
      <div className={CARD_CLASS}>{status}</div>

      <div className={movesClassName}>
        <ol>{moves}</ol>
      </div>

      <BoardEffectSelector boardEffectState={boardEffectState} />
    </div>
  );
}
