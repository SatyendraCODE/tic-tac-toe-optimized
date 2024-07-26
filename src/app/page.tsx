import { GitHub } from "@/components/icons";
import { ThreeDCardDemo } from "@/components/section/body/tic-tac-toe/left/square-with-effect";
import TitleHeader from "@/components/section/hearder/title";
import TicTacToe from "@/components/section/body/tic-tac-toe";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Image from "next/image";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { CARD_CLASS } from "./const";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center space-y-20 p-24 overflow-hidden font-sans">
      <header className="z-10 w-full max-w-5xl items-center justify-between  lg:flex">
        <div className={CARD_CLASS}>
          <TitleHeader />
        </div>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <div className="flex justify-between gap-6 p-8 lg:p-0">
            <ThemeModeToggle />
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="https://github.com/SatyendraCODE"
              target="_blank"
            >
              By,
              <AnimatedTooltip
                item={{
                  id: 1,
                  name: "Satyendrasinh Chauhan",
                  designation: "Frontend Developer",
                  image: "/github.png",
                }}
              />
              {/* <GitHub style={{ width: 32, height: 32 }} className="dark:invert" /> */}
            </a>
          </div>
        </div>
      </header>

      <div className="flex justify-center items-center ">
        <TicTacToe />
      </div>
    </main>
  );
}
