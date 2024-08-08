import { doc, setDoc } from "firebase/firestore";
import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

import { useAuthStore } from "@/app/store/auth-store";
import { GameMessageType, useGameChatStore } from "@/app/store/chat-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/i-input";
import { db } from "@/lib/firebase-app";
import { getFormattedTime } from "@/lib/time";

type Inputs = {
  message: string;
};

export default function ChatInput() {
  const parmas: { id: string } = useParams();

  const { user } = useAuthStore();
  const { gameMessage } = useGameChatStore();

  const { register, handleSubmit, resetField } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.message.length === 0) return;

    if (user?.uid && parmas?.id) {
      const message: GameMessageType = {
        message: data.message,
        createdTime: getFormattedTime(Date.now()),
        createdTimeStamp: Date.now(),
        playerUid: user?.uid,
      };
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
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full items-center space-x-2"
    >
      <Input
        type="message"
        placeholder="Type your message..."
        className="bg-white dark:bg-slate-900"
        {...register("message")}
      />
      <Button
        type="submit"
        className="bg-blue-600 dark:bg-blue-600 dark:text-white"
      >
        <Send width={20} height={20} />
      </Button>
    </form>
  );
}
