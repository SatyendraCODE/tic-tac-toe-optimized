"use client";

import React from "react";
import { motion } from "framer-motion";
import { COLORS_VARIANTS } from "@/app/const";

export type SquareProps = {
  value: string;
  onSquareClick: () => void;
  xSelectedColor: string;
  oSelectedColor: string;
};

const CLASS_NAME =
  "w-20 h-20 cursor-pointer border border-gray-300 dark:border-gray-500 shadow-md rounded-lg text-white";

export default function Square({
  value,
  onSquareClick,
  xSelectedColor,
  oSelectedColor,
}: SquareProps) {
  const colorVariants = (value: string) => {
    if (!!value) {
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
  };

  return (
    <td className={`${colorVariants(value)} ...`}>
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        className="w-full h-full text-5xl font-normal"
        onClick={onSquareClick}
      >
        {value}
      </motion.button>
    </td>
  );
}
