"use client";

import React from "react";

import { usePathname } from "next/navigation";

import { LinkStyled } from "@/components/ui/link-styled";

export default function PlayWithFriendBtn() {
  const pathname = usePathname();

  console.log("_dd pathname", pathname);

  if (pathname === "/multiplayer") {
    return null;
  }

  return (
    <LinkStyled
      href="/multiplayer"
      variant="outline"
      className="font-sans font-normal mr-5"
    >
      Play with friends
    </LinkStyled>
  );
}
