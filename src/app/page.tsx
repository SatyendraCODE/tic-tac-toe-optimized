import TicTacToe from "@/components/section/body/tic-tac-toe/tic-tac-toe";
import Header from "@/components/section/header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center space-y-5 mt-5 overflow-hidden ">
        <div className="flex justify-center items-center pb-10">
          <TicTacToe />
        </div>
      </main>
    </>
  );
}
