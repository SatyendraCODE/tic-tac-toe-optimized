"use client";

import { lazy, Suspense, useEffect, useMemo, useState } from "react";

import { signInAnonymously } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { COLORS_VARIANTS } from "@/app/const";
import { triggerConfetti } from "@/components/ui/confetti";
import LoaderComponent from "@/components/ui/loader-component";
import ShinyButton from "@/components/ui/shine-button";
import { Skeleton } from "@/components/ui/skeleton";
import { calculateWinner } from "@/lib/calculateWinner";
import { auth, db } from "@/lib/firebase-app";
import { useGameChatStore } from "@/store/chat-store";

const NoGameSessionFound = lazy(
  () => import("./components/no-game-session-found")
);
const Left = lazy(() => import("./left/left"));
const Right = lazy(() => import("./right/right"));

const INIT_HISTORY = [Array(9).fill(null)];
const INIT_MOVE = 0;

type TicTacToeProps = {
  isMultiplayerEnabled?: boolean;
  id?: string;
};

export default function TicTacToe({
  isMultiplayerEnabled,
  id,
}: Readonly<TicTacToeProps>) {
  const router = useRouter();

  const { replaceGameMessage } = useGameChatStore();

  const [currentUser, setCurrentUser] = useState<{
    uid: string;
    login: boolean;
  } | null>(null);

  const [loginPlayerNum, setLoginPlayerNum] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isGameSessionCreated, setIsGameSessionCreated] = useState(false);
  const [history, setHistory] = useState(INIT_HISTORY);
  const [currentMove, setCurrentMove] = useState(INIT_MOVE);
  const [xSelectedColor, setXSelectedColor] = useState(COLORS_VARIANTS[1]);
  const [oSelectedColor, setOSelectedColor] = useState(COLORS_VARIANTS[2]);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  async function handlePlay(nextSquares: string[]) {
    if (!isLoading) {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      const curMove = nextHistory.length - 1;

      const doThis = async (id: string) => {
        setIsLoading(true);

        await setDoc(
          doc(db, "gameSessions", id),
          {
            history: JSON.stringify(nextHistory),
            currentMove: curMove,
          },
          { merge: true }
        );

        setIsLoading(false);

        setHistory(nextHistory);
        setCurrentMove(curMove);
      };

      if (isMultiplayerEnabled && id && currentUser) {
        if (loginPlayerNum === "2" && curMove % 2 === 0) {
          doThis(id);
        }

        if (loginPlayerNum === "1" && curMove % 2 !== 0) {
          doThis(id);
        }
      } else {
        setHistory(nextHistory);
        setCurrentMove(curMove);
      }
    }
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  async function handlePlusBtnTrigger() {
    if (isMultiplayerEnabled && id && currentUser) {
      await setDoc(
        doc(db, "gameSessions", id),
        {
          history: JSON.stringify(INIT_HISTORY),
          currentMove: INIT_MOVE,
        },
        { merge: true }
      );
    }

    setHistory(INIT_HISTORY);
    setCurrentMove(INIT_MOVE);
  }

  function handleLeftBtnTrigger() {
    if (currentMove === 0) {
      return;
    }
    jumpTo(currentMove - 1);
  }

  function handleRightBtnTrigger() {
    if (currentMove === history.length - 1) {
      return;
    }
    jumpTo(currentMove + 1);
  }

  const status = useMemo(() => {
    const winner = calculateWinner(currentSquares);
    let message;
    if (winner) {
      message = "Winner is " + winner.player;
      triggerConfetti();
    } else {
      message = "Next player --> " + (xIsNext ? "X" : "O");
      if (currentMove === 9) {
        message = "Draw";
      }
    }
    return { winner: winner, message: message };
  }, [currentMove, currentSquares, xIsNext]);

  const moves = useMemo(
    () =>
      history.map((_, move) => {
        let description;

        if (move === history.length - 1 && status.winner?.won) {
          description = "Player " + status.winner?.player + " won";
        } else if (move > 0) {
          description = "Go to move #" + move;
        } else {
          description = "Start";
        }

        return (
          <li key={`${move}-x-$${move}`} className="mb-1.5 ">
            {
              <>
                {move === currentMove ? (
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    className="w-full"
                    onClick={() => jumpTo(move)}
                  >
                    <ShinyButton
                      text={
                        status.winner?.won || move === 0
                          ? description
                          : `Move #${move}`
                      }
                      className="w-full h-full px-3 rounded-md shadow-md text-white dark:font-light dark:text-[rgb(255,255,255,90%)]"
                    />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    className="w-full h-full border px-3 rounded-md bg-neutral-100 dark:bg-gray-900 shadow-md text-neutral-700 dark:font-light dark:text-[rgb(255,255,255,90%)]"
                    onClick={() => jumpTo(move)}
                  >
                    {description}
                  </motion.button>
                )}
              </>
            }
          </li>
        );
      }),
    [currentMove, history, status.winner?.player, status.winner?.won]
  );

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const p = params.get("p");

    setLoginPlayerNum(p);

    if (!p) {
      router.push("/");
    }

    if (isMultiplayerEnabled && id && !currentUser && p === "1") {
      setCurrentUser({ uid: id, login: true });
    }

    if (isMultiplayerEnabled && id && !currentUser && p === "2") {
      signInAnonymously(auth).then((d) => {
        // Signed in..
        setCurrentUser({ uid: d.user.uid, login: true });
      });
    }
  }, [id, isMultiplayerEnabled, currentUser, router]);

  useEffect(() => {
    if (isMultiplayerEnabled && id && currentUser) {
      const urlData = id.split("-");

      const docId = urlData[0];

      const unSub = onSnapshot(doc(db, "gameSessions", docId), (doc) => {
        const history = doc.data()?.history;
        const currentMove = doc.data()?.currentMove;

        replaceGameMessage(doc.data()?.message || []);

        if (history) {
          setHistory(JSON.parse(history));
        } else {
          setHistory(INIT_HISTORY);
        }

        setCurrentMove(currentMove || 0);

        // 1 disabled color selection because it doesn't make sense right now
        // const player1 = doc.data()?.player1;
        // const player2 = doc.data()?.player2;
        // if (player1?.color) setXSelectedColor(player1.color);
        // else setXSelectedColor(COLORS_VARIANTS[1]);
        // if (player2?.color) setOSelectedColor(player2.color);
        // else setOSelectedColor(COLORS_VARIANTS[2]);

        setIsPageLoading(false);

        setIsGameSessionCreated(true);
      });

      return () => {
        unSub();

        // signOut(auth);
        // if (id === currentUser?.uid) setCurrentUser(null);
        // deleteDoc(doc(db, "gameSessions", id));
      };
    }
  }, [id, isMultiplayerEnabled, currentUser]);

  const handleSetXSelectedColor = async (color: string) => {
    setXSelectedColor(color);

    // 2 disabled color selection because it doesn't make sense right now
    // if (isMultiplayerEnabled && id && currentUser && loginPlayerNum === "1") {
    //   await setDoc(
    //     doc(db, "gameSessions", id),
    //     {
    //       player1: { uid: id, color: color },
    //     },
    //     { merge: true }
    //   );
    // }
  };

  const handleSetOSelectedColor = async (color: string) => {
    setOSelectedColor(color);

    // 3 disabled color selection because it doesn't make sense right now
    // if (isMultiplayerEnabled && id && currentUser && loginPlayerNum === "2") {
    //   await setDoc(
    //     doc(db, "gameSessions", id),
    //     {
    //       player2: { uid: id, color: color },
    //     },
    //     { merge: true }
    //   );
    // }
  };

  if (isMultiplayerEnabled) {
    return (
      <div className="grid sm:grid-cols-2 gap-2 pb-16 lg:pb-10">
        {isPageLoading ? (
          <LoaderComponent className="col-span-2" />
        ) : (
          <>
            {isGameSessionCreated ? (
              <>
                <Suspense
                  fallback={
                    <div className="flex flex-col gap-2">
                      <Skeleton className="w-[300px] h-[300px] flex items-center justify-center" />
                      <Skeleton className="w-[300px] h-[30px] rounded-lg" />
                      <Skeleton className="w-[300px] h-[30px] rounded-lg" />
                    </div>
                  }
                >
                  <Left
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                    status={status}
                    loginPlayerNum={loginPlayerNum}
                    xSelectedColorState={[
                      xSelectedColor,
                      handleSetXSelectedColor,
                    ]}
                    oSelectedColorState={[
                      oSelectedColor,
                      handleSetOSelectedColor,
                    ]}
                    isMultiplayerEnabled={!!isMultiplayerEnabled}
                  />
                </Suspense>

                <Suspense
                  fallback={
                    <div className="flex flex-col gap-2">
                      <Skeleton className="w-[300px] h-[300px] flex items-center justify-center" />
                      <Skeleton className="w-[300px] h-[30px] rounded-lg" />
                      <Skeleton className="w-[300px] h-[30px] rounded-lg" />
                    </div>
                  }
                >
                  <Right
                    status={status}
                    moves={moves}
                    xSelectedColorState={[
                      xSelectedColor,
                      handleSetXSelectedColor,
                    ]}
                    oSelectedColorState={[
                      oSelectedColor,
                      handleSetOSelectedColor,
                    ]}
                    onPlusBtnTrigger={handlePlusBtnTrigger}
                    loginPlayerNum={loginPlayerNum}
                    onLeftBtnTrigger={handleLeftBtnTrigger}
                    onRightBtnTrigger={handleRightBtnTrigger}
                    isMultiplayerEnabled={!!isMultiplayerEnabled}
                  />
                </Suspense>
              </>
            ) : (
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    Loading...
                  </div>
                }
              >
                <NoGameSessionFound />
              </Suspense>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-2 pb-16 lg:pb-10">
      <Left
        xIsNext={xIsNext}
        squares={currentSquares}
        onPlay={handlePlay}
        status={status}
        xSelectedColorState={[xSelectedColor, handleSetXSelectedColor]}
        oSelectedColorState={[oSelectedColor, handleSetOSelectedColor]}
      />

      <Right
        status={status}
        moves={moves}
        xSelectedColorState={[xSelectedColor, handleSetXSelectedColor]}
        oSelectedColorState={[oSelectedColor, handleSetOSelectedColor]}
        onPlusBtnTrigger={handlePlusBtnTrigger}
        onLeftBtnTrigger={handleLeftBtnTrigger}
        onRightBtnTrigger={handleRightBtnTrigger}
      />
    </div>
  );
}
