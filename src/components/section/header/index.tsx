import React from "react";

import Link from "next/link";

import PlayWithFriendBtn from "./play-with-friend-btn";
import TitleHeader from "./title";

import { HEADER_CLASS } from "@/app/const";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

type HeaderProps = {
  hidePlayWithFriend?: boolean;
};

export default function Header({ hidePlayWithFriend }: Readonly<HeaderProps>) {
  return (
    <header className="z-10 w-full m-auto max-w-5xl flex items-center justify-between lg:pt-14 lg:px-16 lg:pb-8 lg:flex ">
      <Link href="/" className={HEADER_CLASS}>
        <h1 className="invisible absolute">Just Tic Tac Toe !</h1>
        <TitleHeader />
      </Link>

      <div className="z-20 fixed bottom-0 left-0 flex w-full items-center justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black  lg:static lg:size-auto lg:bg-none">
        <div className="flex justify-between items-center gap-3  mb-8 lg:mb-0 pt-5 pb-1 lg:p-0">
          {!hidePlayWithFriend && <PlayWithFriendBtn />}
          <ThemeModeToggle />
          <div className=" flex place-items-center gap-2 p-0">
            By,
            <AnimatedTooltip
              item={{
                id: 1,
                name: "Satyendrasinh Chauhan",
                designation: "Frontend Developer",
                image: "/github.svg",
                blurDataURL: "/github-blur.png",
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
