"use client";

import React from "react";

import { Users } from "lucide-react";
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
      className="font-medium mr-5 flex justify-between gap-2"
    >
      {text ?? "Play with friends"}
      <Users width={20} height={20} />
    </LinkStyled>
  );
}
