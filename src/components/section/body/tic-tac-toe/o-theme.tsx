import { CARD_CLASS, COLORS_VARIANTS } from "@/app/const";
import React from "react";

export default function OTheme({ colorVariants, onClick, selectedColor }: any) {
  return (
    <div className={CARD_CLASS}>
      <div className="flex items-center gap-1.5">
        <p>O -</p>
        {COLORS_VARIANTS.map((color, index) => (
          <button
            key={index}
            className={colorVariants(color, selectedColor)}
            onClick={() => onClick(color)}
          />
        ))}
      </div>
    </div>
  );
}
