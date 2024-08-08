"use client";
import React from "react";

import { MessageCircleX } from "lucide-react";

import ChatInput from "./chat-input";

import { useAuthStore } from "@/app/store/auth-store";
import { useGameChatStore } from "@/app/store/chat-store";
import { MessageParagraph } from "@/components/ui/message-box";

export default function ChatMain() {
  const { user } = useAuthStore();
  const { gameMessage } = useGameChatStore();

  return (
    <div className="h-full max-h-[450px]  w-full flex flex-col gap-3 select-text">
      <div className="flex flex-col-reverse  p-2 rounded-md bg-white dark:bg-slate-950 gap-3 flex-1 overflow-y-auto  scrollbar-thin">
        {gameMessage && gameMessage?.length > 0 ? (
          <>
            {gameMessage?.map((message, index) => (
              <MessageParagraph
                key={`${index}-${message.createdTimeStamp}`}
                variant={
                  user?.uid === message.playerUid ? "default" : "secondary"
                }
                time={message.createdTime}
                playerName={user?.uid === message.playerUid ? "You" : "Other"}
                right={user?.uid === message.playerUid}
              >
                {message.message}
              </MessageParagraph>
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <MessageCircleX size={60} className="opacity-20" />
            <h6 className=" text-2xl font-medium opacity-50">
              No messages yet!
            </h6>
          </div>
        )}
      </div>

      <ChatInput />
    </div>
  );
}
