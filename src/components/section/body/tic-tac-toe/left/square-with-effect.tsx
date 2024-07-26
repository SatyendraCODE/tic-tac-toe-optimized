"use client";

import React from "react";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { SquareProps } from "./square";
import { CoolMode } from "@/components/ui/base-partical";
import { COLORS_VARIANTS_HSL } from "@/app/const";

const CLASS_NAME =
  "w-20 h-20 cursor-pointer border border-gray-300 dark:border-gray-500 shadow-md rounded-lg text-white";

export function ThreeDCardDemo({
  value,
  onSquareClick,
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
    <CardContainer
      onClick={onSquareClick}
      className={`${colorVariants(value, xSelectedColor, oSelectedColor)} ...`}
    >
      <CardBody className=" relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] w-full h-full ">
        <CardItem
          translateZ="20"
          className="w-full h-full flex items-center justify-center"
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
        </CardItem>
      </CardBody>
    </CardContainer>
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
