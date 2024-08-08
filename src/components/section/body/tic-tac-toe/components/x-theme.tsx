import React from "react";

import { CARD_CLASS, COLORS_VARIANTS, COLORS_VARIANTS_HSL } from "@/app/const";
import { CoolMode } from "@/components/ui/base-partical";
import { cn, getColorVariantsClass } from "@/lib/utils";

export type SquaresThemeType = {
  className: string;
  onClick: (color: string) => void;
  selectedColor: string;
};

export default function XTheme({
  className,
  onClick,
  selectedColor,
}: Readonly<SquaresThemeType>) {
  return (
    <div className={cn(CARD_CLASS, className)}>
      <div className="flex items-center gap-1.5">
        <p>X -</p>
        {COLORS_VARIANTS.map((color, index) => (
          <CoolMode
            key={`${color}-${index}`}
            options={{ color: COLORS_VARIANTS_HSL?.[color] }}
          >
            <button
              className={getColorVariantsClass(color, selectedColor)}
              onClick={() => onClick(color)}
            />
          </CoolMode>
        ))}
      </div>
    </div>
  );
}
