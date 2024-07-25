"use client";

import React from "react";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

const TitleHeader = () => {
  return (
    <TypewriterEffect
      words={"Tic Tac Toe Game !".split(" ").map((text) => ({ text }))}
      className="font-thin"
    />
  );
};

export default TitleHeader;
