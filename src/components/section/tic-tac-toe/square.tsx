import React from "react";
import { motion } from "framer-motion";
import { COLORS_VARIANTS } from "@/app/const";

type SquareProps = {
  value: string;
  onSquareClick: () => void;
  xSelectedColor: number;
  oSelectedColor: number;
};
const CLASS_NAME = "w-14 h-14 border border-gray-300 rounded-lg";

export default function Square({
  value,
  onSquareClick,
  xSelectedColor,
  oSelectedColor,
}: SquareProps) {
  const colorVariants = (value: string) => {
    if (!!value) {
      console.log("_dd value", value);

      return value.toLowerCase() === "x"
        ? `${CLASS_NAME} bg-${COLORS_VARIANTS[xSelectedColor].bg}-600 hover:bg-${COLORS_VARIANTS[xSelectedColor].bg}-500`
        : `${CLASS_NAME} bg-${COLORS_VARIANTS[oSelectedColor].bg}-600 hover:bg-${COLORS_VARIANTS[oSelectedColor].bg}-500`;
    } else return `${CLASS_NAME} `;
  };

  return (
    <td className={`${colorVariants(value)} ...`}>
      <motion.button
        whileHover={{ scale: 1.2, rotate: 360, className: "bg-white" }}
        whileTap={{ scale: 0.8 }}
        className="w-full h-full font-bold"
        onClick={onSquareClick}
      >
        {value}
      </motion.button>
    </td>
  );
}
