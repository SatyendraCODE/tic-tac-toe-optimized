import React from "react";

import dynamic from "next/dynamic";

import Header from "@/components/section/header";

const TicTacToe = dynamic(
  () => import("@/components/section/body/tic-tac-toe/tic-tac-toe")
);

export default function Page({ params }: Readonly<{ params: { id: string } }>) {
  return (
    <>
      <Header hidePlayWithFriend />
      <main className="flex flex-col items-center space-y-5 mt-5 overflow-hidden ">
        <div className="flex flex-col justify-center items-center pb-10">
          <TicTacToe isMultiplayerEnabled id={params.id} />
        </div>
      </main>
    </>
  );
}
