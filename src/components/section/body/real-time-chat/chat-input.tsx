"use client";

import { useState } from "react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { doc, setDoc } from "firebase/firestore";
import GifPicker from "gif-picker-react";
import { Send, Smile } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useForm, SubmitHandler, set } from "react-hook-form";

import { useAuthStore } from "@/app/store/auth-store";
import {
  GameMessageType,
  GifMessageType,
  useGameChatStore,
} from "@/app/store/chat-store";
import { useThemeCustom } from "@/app/store/theme-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { db } from "@/lib/firebase-app";
import { getFormattedTime } from "@/lib/time";

type Inputs = {
  message: string;
  gif: GifMessageType;
};

export default function ChatInput() {
  const parmas: { id: string } = useParams();
  const { customTheme } = useThemeCustom();

  const { user } = useAuthStore();
  const { gameMessage } = useGameChatStore();

  const { register, watch, handleSubmit, resetField, getValues, setValue } =
    useForm<Inputs>();

  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [openGifPicker, setOpenGifPicker] = useState(false);

  const handleGifToggle = () => {
    setOpenGifPicker(!openGifPicker);
  };

  const handleEmojiSelect = (emoji: any) => {
    const message = getValues("message") || "";
    setValue("message", message + emoji?.native);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!data.message?.length && !data.gif) return;

    if (user?.uid && parmas?.id) {
      const message: GameMessageType = {
        createdTime: getFormattedTime(Date.now()),
        createdTimeStamp: Date.now(),
        playerUid: user?.uid,
      };

      if (data.message) message.message = data.message;
      if (data.gif) message.gif = data.gif;

      await setDoc(
        doc(db, `gameSessions`, parmas.id),
        {
          message: [message, ...(gameMessage || [])],
        },
        { merge: true }
      )
        .then(() => {
          // console.log("Document successfully written!");
          resetField("message");
          resetField("gif");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full items-end space-x-2"
    >
      <div className="flex w-full flex-col rounded-md border bg-white dark:bg-slate-900">
        {watch("gif") && (
          <div className="px-2 pt-2">
            <Image
              src={getValues("gif").url}
              alt="gif"
              width={getValues("gif").width}
              height={getValues("gif").height}
            />
          </div>
        )}

        <div className="flex w-full">
          <Input
            type="message"
            placeholder="Type your message..."
            className="border-none bg-transparent outline-none"
            {...register("message")}
          />

          <Popover open={openEmojiPicker} onOpenChange={setOpenEmojiPicker}>
            <PopoverTrigger className="mr-2 select-none" title="Emoji">
              <Smile className="text-gray-700 dark:text-inherit" />
            </PopoverTrigger>
            <PopoverContent className="z-[501] w-full border-none p-0 bg-none ">
              <Picker
                data={data}
                onEmojiSelect={handleEmojiSelect}
                theme={customTheme}
                className="w-full"
              />
            </PopoverContent>
          </Popover>

          <Popover open={openGifPicker} onOpenChange={setOpenGifPicker}>
            <PopoverTrigger className="mr-2 select-none" title="GIF Picker">
              GIF
            </PopoverTrigger>
            <PopoverContent className="z-[501] w-full border-none p-0 bg-none ">
              <GifPicker
                tenorApiKey={process.env.NEXT_PUBLIC_REACT_APP_TENO_KEY || ""}
                theme={customTheme}
                {...register("gif")}
                onGifClick={(gif) => {
                  setValue("gif", { ...gif.preview, alt: gif.description });
                  handleGifToggle();
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Button
        type="submit"
        className="bg-blue-600 dark:bg-blue-600 dark:text-white"
        title="Send message"
      >
        <Send width={20} height={20} />
      </Button>
    </form>
  );
}
