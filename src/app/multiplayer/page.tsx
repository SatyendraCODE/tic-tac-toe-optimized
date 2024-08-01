"use client";

import React, { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { signInAnonymously } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

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
    text: "By visiting this link player 2 can join the game",
  },
];

const loginUserAsAnonymous = async () => {
  let data;
  await signInAnonymously(auth)
    .then((d) => {
      // Signed in..
      data = d.user.uid;
      console.log("Signed in anonymously");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
  return data;
};

export default function MultiPlayerPage() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["signIn"],
    queryFn: () => signInAnonymously(auth).then((d) => d.user.uid),
  });

  const [currentState, setCurrentState] = useState(0);

  const [record, setRecord] = useState<any>(null);

  const nextLoadingState = () => {
    setCurrentState((prevState) => prevState + 1);
  };

  useEffect(() => {
    if (!isPending && !isError && data) {
      nextLoadingState();
      console.log("data", data);

      (async () => {
        const player1Uid = data;
        const player2Uid = `${data}-2`;
        await setDoc(doc(db, "gameSessions", data), {
          player1: { uid: player1Uid },
          player2: { uid: player2Uid },
        }).then(() => {
          setRecord({ player1Uid, player2Uid });
          nextLoadingState();
        });
      })();
    }
  }, [data, isError, isPending]);

  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <Loader
        loadingStates={loadingStates}
        loading={true}
        currentState={currentState}
        player1link={`/multiplayer/${record?.player1Uid}`}
        player2link={`/multiplayer/${record?.player2Uid}`}
      />
    </div>
  );
}
