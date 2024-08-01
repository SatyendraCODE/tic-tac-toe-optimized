"use client";

import React, { createContext, useMemo } from "react";

type ContextType = {
  currentUser: {
    uid: string;
    login: boolean;
  } | null;
  setCurrentUser: (
    user: {
      uid: string;
      login: boolean;
    } | null
  ) => void;
  gameId: string | null;
  setGameId: (gameId: string | null) => void;
} | null;

export const ThemeContext = createContext<ContextType>(null);

export default function LoginChecker({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [currentUser, setCurrentUser] = React.useState<{
    uid: string;
    login: boolean;
  } | null>(null);

  const [gameId, setGameId] = React.useState<string | null>(null);

  const data = useMemo(() => {
    return {
      currentUser,
      setCurrentUser,
      gameId,
      setGameId,
    };
  }, [currentUser, gameId]);

  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
}
