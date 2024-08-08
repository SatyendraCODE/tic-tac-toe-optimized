import React, { Suspense } from "react";

import { LoaderCircle } from "lucide-react";

const ChatMain = React.lazy(() => import("./chat-main"));

export default function RealTimeChat() {
  return (
    <Suspense fallback={<LoaderCircle className="animate-spin" />}>
      <ChatMain />
    </Suspense>
  );
}
