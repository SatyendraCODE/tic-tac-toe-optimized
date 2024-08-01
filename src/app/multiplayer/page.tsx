"use client";

import React, { useContext, useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { signInAnonymously } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { ThemeContext } from "@/components/login-checker";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { auth, db } from "@/lib/firebase-app";

const loadingStates = [
  {
    text: "Login as anonymous",
  },
  {
    text: "Game session created",
  },
  {
    text: "By visiting below link player 2 can join the game",
  },
];

export default function MultiPlayerPage() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["signIn"],
    queryFn: () => signInAnonymously(auth).then((d) => d.user.uid),
  });
  const theme = useContext(ThemeContext);

  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    if (!isPending && !isError && data) {
      setCurrentState(1);

      (async () => {
        await setDoc(doc(db, "gameSessions", data), {
          player1: { uid: data },
        }).then(() => {
          theme?.setCurrentUser({ uid: data, login: true });
          theme?.setGameId(data);

          setCurrentState(2);
        });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isError, isPending]);

  return (
    <div className=" h-[60vh] flex items-center justify-center">
      <Loader
        loadingStates={loadingStates}
        loading={true}
        currentState={currentState}
        player1link={`/multiplayer/${data}?p=1`}
        player2link={`/multiplayer/${data}?p=2`}
      />
    </div>
  );
}
