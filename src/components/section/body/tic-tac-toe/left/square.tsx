"use client";

import { COLORS_VARIANTS_HSL } from "@/app/const";
import { CoolMode } from "@/components/ui/base-partical";
import { motion } from "framer-motion";
import React from "react";

export type SquareProps = {
  value: string;
  onSquareClick: () => void;
  isWinner: boolean;
  xSelectedColor: string;
  oSelectedColor: string;
};

const CLASS_NAME =
  "w-20 h-20 cursor-pointer border border-gray-300 dark:border-gray-500 shadow-md rounded-lg text-white";

export default function Square({
  value,
  onSquareClick,
  isWinner,
  xSelectedColor,
  oSelectedColor,
}: Readonly<SquareProps>) {
  const oColor =
    value?.toLowerCase() === "o" ? COLORS_VARIANTS_HSL?.[oSelectedColor] : "";
  const color =
    value?.toLowerCase() === "x"
      ? COLORS_VARIANTS_HSL?.[xSelectedColor] || ""
      : oColor;

  return (
    <td
      className={`${colorVariants(value, xSelectedColor, oSelectedColor)} ...`}
    >
      <CoolMode
        options={{
          color,
        }}
      >
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          className="w-full h-full text-5xl font-normal"
          onClick={onSquareClick}
        >
          {value}
        </motion.button>
      </CoolMode>
    </td>
  );
}

function colorVariants(
  value: string,
  xSelectedColor: string,
  oSelectedColor: string
) {
  if (value) {
    if (value.toLowerCase() === "x") {
      switch (xSelectedColor) {
        case "red":
          return `${CLASS_NAME} bg-red-600 hover:bg-red-500`;
        case "blue":
          return `${CLASS_NAME} bg-blue-600 hover:bg-blue-500`;
        case "green":
          return `${CLASS_NAME} bg-green-600 hover:bg-green-500`;
        case "amber":
          return `${CLASS_NAME} bg-amber-600 hover:bg-amber-500`;
        default:
          return `${CLASS_NAME} bg-yellow-600 hover:bg-yellow-500`;
      }
    } else {
      switch (oSelectedColor) {
        case "red":
          return `${CLASS_NAME} bg-red-600 hover:bg-red-500`;
        case "blue":
          return `${CLASS_NAME} bg-blue-600 hover:bg-blue-500`;
        case "green":
          return `${CLASS_NAME} bg-green-600 hover:bg-green-500`;
        case "amber":
          return `${CLASS_NAME} bg-amber-600 hover:bg-amber-500`;
        default:
          return `${CLASS_NAME} bg-yellow-600 hover:bg-yellow-500`;
      }
    }
  } else return `${CLASS_NAME} `;
}
