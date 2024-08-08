import React from "react";

import { MessageCircle } from "lucide-react";

import RealTimeChat from "../body/tic-tac-toe/real-time-chat/real-time-chat";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ChatWithFriend() {
  return (
    <div className="lg:hidden">
    <Dialog >
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"auto"}
          className="w-fit h-fit p-2 rounded-md  flex gap-1"
        >
          Chat <MessageCircle size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chat with opponent</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <RealTimeChat />
        <DialogFooter />
      </DialogContent>
    </Dialog>
    </div>
  );
}
