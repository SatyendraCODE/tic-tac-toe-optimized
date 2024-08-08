"use client";

import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import { MessageCircleMore } from "lucide-react";

import ChatInput from "./chat-input";
import ChatMain from "./chat-main";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useAuthStore } from "@/app/store/auth-store";
import { MessageParagraph } from "@/components/ui/message-box";
import { GameMessageType, useGameChatStore } from "@/app/store/chat-store";
import { MessageCircleDashed, MessageCircleX } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MessagePopover() {
  const { user } = useAuthStore();
  const { gameMessage } = useGameChatStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // const chatBoxRef = useRef<HTMLDivElement>(null);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setIsClicked(true);
    }
    setIsOpen(isOpen);
  };

  // useEffect(() => {
  //   chatBoxRef.current?.scrollTo(0, chatBoxRef.current?.scrollHeight);
  //   console.log("_dd dddddddddddddd");
  // });

  return (
    <>
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetTrigger asChild>
          {/* <Button variant="outline">Open</Button> */}
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="w-fit h-full ml-5 text-5xl font-normal"
          >
            <Button
              variant="outline"
              size="auto"
              className={cn(
                "rounded-full mb-2 p-2",
                !isClicked && !isOpen ? "animate-bounce" : ""
              )}
              // onClick={handleOpenChange}
            >
              <MessageCircleMore className="h-8 w-8 dark:text-gray-300" />
            </Button>
          </motion.div>
        </SheetTrigger>
        <SheetContent>
          {/* <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader> */}
          <div className="relative">
            <div
              // ref={chatBoxRef}
              className="z-50 px-3 pb-3 rounded-md bg-white dark:bg-slate-950 flex flex-col-reverse gap-3 h-[86vh] overflow-y-scroll scrollbar-thin scroll-smooth"
            >
              {gameMessage && gameMessage?.length > 0 ? (
                <>
                  {gameMessage?.map((message, index) => (
                    <MessageParagraph
                      key={`${index}-${message.createdTimeStamp}`}
                      variant={
                        user?.uid === message.playerUid
                          ? "default"
                          : "secondary"
                      }
                      time={message.createdTime}
                      playerName={
                        user?.uid === message.playerUid ? "You" : "Other"
                      }
                      right={user?.uid === message.playerUid}
                    >
                      {message.message}
                    </MessageParagraph>
                  ))}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center w-full min-h-[200px]">
                  <MessageCircleX className="opacity-20" size={60} />
                  <h6 className=" text-2xl font-medium opacity-80">
                    No chat messages yet!
                  </h6>
                  <p className="text-sm opacity-40">
                    Start conversation to see your messages here.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="my-2">
            <SheetFooter>
              <ChatInput />
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
