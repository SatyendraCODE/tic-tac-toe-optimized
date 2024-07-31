"use client";

import React from "react";

import { TypewriterEffect } from "@/components/ui/typewriter-effect";

const TitleHeader = () => {
  return (
    <TypewriterEffect
      words={"Just Tic Tac Toe !".split(" ").map((text) => ({ text }))}
    />
  );
};

export default TitleHeader;
