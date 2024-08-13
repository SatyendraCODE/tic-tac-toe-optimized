import React, { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";

const ChatMain = React.lazy(() => import("./chat-main"));

export default function RealTimeChat({ className }: { className?: string }) {
  return (
    <Suspense
      fallback={
        <div className="sm:max-h-[450px]  sm:min-h-[450px] flex flex-col gap-2">
          <Skeleton className="h-[400px] rounded-lg" />
          <Skeleton className="h-[50px] rounded-lg" />
        </div>
      }
    >
      <ChatMain className={className} />
    </Suspense>
  );
}
