"use client";

import React, { useEffect } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useAuthStore } from "../store/auth-store";

const queryClient = new QueryClient();

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setUser, removeUser } = useAuthStore();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        setUser({ uid: user.uid });
        // ...
      } else {
        // User is signed out
        removeUser();
        // ...
      }
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
