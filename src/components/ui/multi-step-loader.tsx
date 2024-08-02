"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Copy, CopyCheck } from "lucide-react";

import { LinkStyled } from "./link-styled";

import { CARD_CLASS } from "@/app/const";
import { cn } from "@/lib/utils";

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("w-6 h-6 ", className)}
    >
      <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
};

const CheckFilled = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-6 h-6 ", className)}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

type LoadingState = {
  text: string;
};

const LoaderCore = ({
  loadingStates,
  value = 0,
  player1link,
  player2link,
}: {
  loadingStates: LoadingState[];
  value?: number;
  player1link?: string;
  player2link?: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className="flex relative justify-start mx-auto flex-col mt-40 px-6 whitespace-normal w-full max-w-lg">
      {loadingStates.map((loadingState, index) => {
        const distance = Math.abs(index - value);
        const opacity = Math.max(1 - distance * 0.2, 0); // Minimum opacity is 0, keep it 0.2 if you're sane.

        return (
          <motion.div
            key={index}
            className={cn("text-left flex gap-2 mb-4")}
            initial={{ opacity: 0, y: -(value * 40) }}
            animate={{ opacity: opacity, y: -(value * 40) }}
            transition={{ duration: 0.5 }}
          >
            <div>
              {index > value && (
                <CheckIcon className="text-black dark:text-white" />
              )}
              {index <= value && (
                <CheckFilled
                  className={cn(
                    "text-black dark:text-white",
                    value === index &&
                      "text-black dark:text-lime-500 opacity-100"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-black dark:text-white",
                value === index && "text-black dark:text-lime-500 opacity-100"
              )}
            >
              {loadingState.text}
            </span>
          </motion.div>
        );
      })}

      {value === 2 && (
        <>
          <motion.div
            className={cn(
              CARD_CLASS,
              "gap-3 z-30 text-left flex mb-4 select-all justify-between"
            )}
            initial={{ opacity: 0, y: -(2 * 30) }}
            animate={{ opacity: 1, y: -(2 * 40) }}
            transition={{ duration: 0.8 }}
          >
            <span
              className={cn("select-text overflow-x-auto  whitespace-nowrap  scrollbar-thin")}
            >
              {player2link}
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(player2link ?? "");
                setIsCopied(true);
              }}
            >
              {isCopied ? <CopyCheck /> : <Copy />}
            </button>
          </motion.div>

          <motion.div
            className={cn("z-30 text-left flex gap-2 mb-4 ")}
            initial={{ opacity: 0, y: -(2 * 30) }}
            animate={{ opacity: 1, y: -(2 * 40) }}
            transition={{ duration: 1 }}
          >
            <LinkStyled href={player1link} className="rounded-lg">
              Join the game
            </LinkStyled>
          </motion.div>
        </>
      )}
    </div>
  );
};

export const MultiStepLoader = ({
  loadingStates,
  loading,
  currentState,
  player1link,
  player2link,
}: {
  loadingStates: LoadingState[];
  loading?: boolean;
  currentState: number;
  player1link?: string;
  player2link?: string;
}) => {
  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="h-full fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl"
        >
          <div className="h-96 w-full relative">
            <LoaderCore
              value={currentState}
              loadingStates={loadingStates}
              player1link={player1link}
              player2link={player2link}
            />
          </div>

          <div className="bg-gradient-to-t inset-x-0 z-20 bottom-0 bg-white dark:bg-black h-full absolute [mask-image:radial-gradient(900px_at_center,transparent_30%,white)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
