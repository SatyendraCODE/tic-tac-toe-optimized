import React from "react";

import { CARD_CLASS } from "@/app/const";
import { Switch } from "@/components/ui/switch";

export default function BoardEffectSelector({
  setBoardEffect,
}: {
  setBoardEffect: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="hidden md:block">
      <div className={CARD_CLASS}>
        <div className="flex items-center gap-1.5 ">
          <p>Enable 3D Effects -</p>
          <Switch onClick={() => setBoardEffect((p: boolean) => !p)} />
        </div>
      </div>
    </div>
  );
}
