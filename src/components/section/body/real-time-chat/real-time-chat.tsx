import React, { Suspense } from "react";

import { LoaderCircle } from "lucide-react";

const ChatMain = React.lazy(() => import("./chat-main"));

export default function RealTimeChat({className}: {className?: string}) {
  return (
    <Suspense fallback={<LoaderCircle className="animate-spin" />}>
      <ChatMain className={className} />
    </Suspense>
  );
}
