import React from "react";

import TicTacToe from "@/components/section/body/tic-tac-toe";
import Header from "@/components/section/header";

export default function Page({ params }: Readonly<{ params: { id: string } }>) {
  return (
    <>
      <Header hidePlayWithFriend />
      <main className="flex flex-col items-center space-y-5 mt-5 lg:mt-0 overflow-hidden ">
        <div className="flex justify-center items-center pb-10">
          <TicTacToe isMultiplayerEnabled id={params.id} />
        </div>
      </main>
    </>
  );
}
