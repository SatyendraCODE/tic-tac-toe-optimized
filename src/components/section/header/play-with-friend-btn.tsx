"use client";

import React from "react";

import { usePathname } from "next/navigation";

import { LinkStyled } from "@/components/ui/link-styled";

type PlayWithFriendBtnProps = {
  text?: string;
};
export default function PlayWithFriendBtn({
  text,
}: Readonly<PlayWithFriendBtnProps>) {
  const pathname = usePathname();

  if (pathname === "/multiplayer") {
    return null;
  }

  return (
    <LinkStyled
      href="/multiplayer"
      variant="outline"
      className="font-sans font-normal mr-5"
    >
      {text ?? "Play with friends"}
    </LinkStyled>
  );
}
