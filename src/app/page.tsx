import { HEADER_CLASS } from "./const";

import TicTacToe from "@/components/section/body/tic-tac-toe";
import TitleHeader from "@/components/section/hearder/title";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center space-y-5  overflow-hidden font-sans">
      <div className="z-10 w-full max-w-5xl flex items-center justify-between lg:pt-16 lg:px-16 lg:pb-8 lg:flex">
        <div className={HEADER_CLASS}>
          <TitleHeader />
        </div>

        <div className="fixed bottom-0 left-0 flex w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <div className="flex justify-between items-center gap-6 pt-5 pb-1  lg:p-0">
            <ThemeModeToggle />
            <div className=" flex place-items-center gap-2 p-8 lg:p-0">
              By,
              <AnimatedTooltip
                item={{
                  id: 1,
                  name: "Satyendrasinh Chauhan",
                  designation: "Frontend Developer",
                  image: "/github.png",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center pb-10">
        <TicTacToe />
      </div>
    </main>
  );
}
