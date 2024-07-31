"use client";

import React from "react";

import { motion } from "framer-motion";

import { COLORS_VARIANTS_HSL } from "@/app/const";
import { CoolMode } from "@/components/ui/base-partical";

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
      className={`${colorVariants(
        value,
        xSelectedColor,
        oSelectedColor,
        isWinner
      )} ...`}
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
  oSelectedColor: string,
  isWinner: boolean
) {
  const className = isWinner
    ? `${CLASS_NAME} animate-[wiggle_2s_ease-in-out_infinite] duration-[1000ms] border-4 border-red-500/70 dark:border-red-500/70 `
    : CLASS_NAME;

  if (value) {
    if (value.toLowerCase() === "x") {
      switch (xSelectedColor) {
        case "red":
          return `${className} bg-red-600 hover:bg-red-500`;
        case "blue":
          return `${className} bg-blue-600 hover:bg-blue-500`;
        case "green":
          return `${className} bg-green-600 hover:bg-green-500`;
        case "amber":
          return `${className} bg-amber-600 hover:bg-amber-500`;
        default:
          return `${className} bg-yellow-600 hover:bg-yellow-500`;
      }
    } else {
      switch (oSelectedColor) {
        case "red":
          return `${className} bg-red-600 hover:bg-red-500`;
        case "blue":
          return `${className} bg-blue-600 hover:bg-blue-500`;
        case "green":
          return `${className} bg-green-600 hover:bg-green-500`;
        case "amber":
          return `${className} bg-amber-600 hover:bg-amber-500`;
        default:
          return `${className} bg-yellow-600 hover:bg-yellow-500`;
      }
    }
  } else return className;
}
