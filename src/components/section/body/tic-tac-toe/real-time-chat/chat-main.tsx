"use client";
import React from "react";

import ChatInput from "./chat-input";

import { useAuthStore } from "@/app/store/auth-store";
import { MessageParagraph } from "@/components/ui/message-box";
import { GameMessageType, useGameChatStore } from "@/app/store/chat-store";

const messages: GameMessageType[] = [
  {
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    createdTime: "10:00 AM",
    createdTimeStamp: 1680892800000,
    playerUid: "OBUxwlqAEZNU7oX6lxNWqmzMpqt2",
  },
  {
    message: "Lorem ipsum dolor sit amet ",
    createdTime: "10:00 AM",
    createdTimeStamp: 1680892800001,
    playerUid: "Player 2",
  },
];

export default function ChatMain() {
  const { user } = useAuthStore();
  const { gameMessage } = useGameChatStore();

  console.log(gameMessage);

  return (
    <div className="h-ful w-full p-5 rounded-md bg-white dark:bg-slate-950 flex flex-col gap-3">
      <div className="flex flex-col gap-3 flex-1">
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
            <h6 className=" text-2xl font-medium">No chat messages yet!</h6>
            <p className="text-sm text-gray-500">
              Start conversation to see your messages here.
            </p>
          </div>
        )}
      </div>

      <ChatInput />
    </div>
  );
}
