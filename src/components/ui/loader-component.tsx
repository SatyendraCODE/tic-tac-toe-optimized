import React from "react";

import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

export default function LoaderComponent({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <div
      className={cn("flex items-center justify-center gap-1 w-fit", className)}
    >
      <LoaderCircle className="animate-spin" /> Loading...
    </div>
  );
}
