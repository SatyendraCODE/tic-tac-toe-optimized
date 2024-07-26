import React from "react";
import { CARD_CLASS } from "@/app/const";
import { Switch } from "@/components/ui/switch";

export default function BoardEffectSelector({ boardEffectState }: any) {
  const [boardEffect, setBoardEffect] = boardEffectState;

  return (
      <div className={CARD_CLASS}>
        <div className="flex items-center gap-1.5">
          <p>Enable 3D Effects -</p>
          <Switch onClick={() => setBoardEffect(!boardEffect)} />
        </div>
      </div>
  );
}
