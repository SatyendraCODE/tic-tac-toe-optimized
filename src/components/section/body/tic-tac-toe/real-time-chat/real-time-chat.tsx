import React, { Suspense } from "react";

import { LoaderCircle } from "lucide-react";

const MessagePopover = React.lazy(() => import("./message-popover"));

export default function RealTimeChat() {
  return (
    <>
      <Suspense
        fallback={
          <LoaderCircle className="animate-spin absolute bottom-5 left-5" />
        }
      >
        <MessagePopover />
      </Suspense>
    </>
  );
}
