"use client";

import React from "react";

import { motion } from "framer-motion";
import { X } from "lucide-react";

import RealTimeChat from "./real-time-chat";

import { CARD_CLASS } from "@/app/const";
import { useChatModalStore } from "@/app/store/chat-modal-store";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
  },
};
export default function ChatModal() {
  const { closeModal, open } = useChatModalStore();

  const stopEventBubbling = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      {open && (
        <div
          className="bg-black/50 absolute top-0 left-0 w-screen h-screen z-[500] flex flex-col items-center justify-center"
          onClick={closeModal}
        >
          <motion.div
            className={cn(
              CARD_CLASS,
              "w-full sm:max-w-[525px] h-full sm:h-auto flex flex-col gap-2 rounded-none sm:rounded-lg overflow-hidden "
            )}
            onClick={stopEventBubbling}
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <div className="w-full flex flex-row-reverse pt-5 sm:p-0">
              <button onClick={closeModal}>
                <X size={20} />
              </button>
            </div>
            <div className="w-full h-full pb-5 sm:p-0">
              <RealTimeChat />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
