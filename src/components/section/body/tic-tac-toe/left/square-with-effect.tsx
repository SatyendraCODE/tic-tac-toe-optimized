"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { SquareProps } from "./square";

const CLASS_NAME =
  "w-20 h-20 cursor-pointer border border-gray-300 dark:border-gray-500 shadow-md rounded-lg text-white";

export function ThreeDCardDemo({
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
    <>
      <CardContainer
        onClick={onSquareClick}
        className={`${colorVariants(value)} ...`}
      >
        <CardBody className=" relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] w-full h-full ">
          <CardItem
            translateZ="20"
            className="w-full h-full flex items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="w-full h-full text-5xl font-normal"
              onClick={onSquareClick}
            >
              {value}
            </motion.button>
          </CardItem>
        </CardBody>
      </CardContainer>
    </>
  );
}
