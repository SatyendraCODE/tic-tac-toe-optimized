import Link from "next/link";

import ShinyButton from "@/components/ui/shine-button";

export default function NoGameSessionFound() {
  return (
    <div className="flex flex-col items-center justify-center col-span-2">
      <div className="text-center text-xl font-bold">No game session found</div>
      <div className="text-center text-sm">
        Please create a game session first
      </div>
      <div className="mt-4 flex justify-center">
        <Link href="/multiplayer">
          <ShinyButton
            text="Create a game session"
            className="w-full h-full px-3 rounded-md shadow-md text-white dark:font-light dark:text-[rgb(255,255,255,90%)]"
          />
        </Link>
      </div>
    </div>
  );
}
