import React from "react";

import { CARD_CLASS } from "@/app/const";
import { Switch } from "@/components/ui/switch";

type Props = {
  setBoardEffect: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function BoardEffectSelector({
  setBoardEffect,
}: Readonly<Props>) {
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
