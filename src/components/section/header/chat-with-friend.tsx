"use client";

import React, { useMemo } from "react";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

import { useAuthStore } from "@/app/store/auth-store";
import { useChatModalStore } from "@/app/store/chat-modal-store";
import { useGameChatStore } from "@/app/store/chat-store";
import { Button } from "@/components/ui/button";

const container = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

export default function ChatWithFriend() {
  const { user } = useAuthStore();
  const { openModal } = useChatModalStore();
  const { gameMessage } = useGameChatStore();

  const unSeenGameMessage = useMemo(() => {
    return gameMessage.filter((m) => m.playerUid !== user?.uid && !m.seen);
  }, [gameMessage, user?.uid]);

  return (
    <Button
      variant={"outline"}
      size={"auto"}
      className="w-fit h-fit p-2 rounded-md  flex gap-1 relative"
      onClick={openModal}
    >
      Chat <MessageCircle size={20} />
      <div className="absolute -top-3 -right-2">
        {unSeenGameMessage.length > 0 && (
          <motion.p
            className="text-xs bg-red-500 text-white rounded-full w-5 h-5 font-medium flex items-center justify-center"
            variants={container}
            initial="hidden"
            animate="visible"
            hidden={unSeenGameMessage.length === 0}
          >
            {unSeenGameMessage.length}
          </motion.p>
        )}
      </div>
    </Button>
  );
}
