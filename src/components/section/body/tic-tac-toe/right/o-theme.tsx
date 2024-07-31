import React from "react";
import { CARD_CLASS, COLORS_VARIANTS, COLORS_VARIANTS_HSL } from "@/app/const";
import { CoolMode } from "@/components/ui/base-partical";

export default function OTheme({ colorVariants, onClick, selectedColor }: any) {
  return (
    <div className={CARD_CLASS}>
      <div className="flex items-center gap-1.5">
        <p>O -</p>
        {COLORS_VARIANTS.map((color, index) => (
          <CoolMode
            key={`${color}-${index}`}
            options={{ color: COLORS_VARIANTS_HSL?.[color] }}
          >
            <button
              key={`${color}-${index}`}
              className={colorVariants(color, selectedColor)}
              onClick={() => onClick(color)}
            />
          </CoolMode>
        ))}
      </div>
    </div>
  );
}
