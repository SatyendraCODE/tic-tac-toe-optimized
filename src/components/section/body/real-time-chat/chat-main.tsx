"use client";
import React, { useEffect } from "react";

import { doc, setDoc } from "firebase/firestore";
import { MessageCircleX } from "lucide-react";
import { useParams } from "next/navigation";

import ChatInput from "./chat-input";

import { useAuthStore } from "@/app/store/auth-store";
import { useGameChatStore } from "@/app/store/chat-store";
import { MessageParagraph } from "@/components/ui/message-box";
import { db } from "@/lib/firebase-app";
import { getFormattedTime } from "@/lib/time";
import { cn } from "@/lib/utils";

export default function ChatMain({ className }: { className?: string }) {
  const parmas: { id: string } = useParams();

  const { user } = useAuthStore();
  const { gameMessage } = useGameChatStore();

  useEffect(() => {
    (async () => {
      if (gameMessage.length === 0) return;

      if (user?.uid && parmas?.id) {
        const updatedGameMessage = gameMessage.map((m) => {
          if (m.playerUid !== user?.uid && !m.seen)
            return {
              ...m,
              seen: true,
              seenTime: getFormattedTime(Date.now()),
            };
          else return m;
        });

        await setDoc(
          doc(db, `gameSessions`, parmas.id),
          {
            message: updatedGameMessage,
          },
          { merge: true }
        )
          .then(() => {
            // console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      }
    })();
  }, [gameMessage, parmas.id, user?.uid]);

  return (
    <div
      className={cn(
        "h-full sm:max-h-[450px]  sm:min-h-[450px] w-full flex flex-col gap-3 select-text",
        className
      )}
    >
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
