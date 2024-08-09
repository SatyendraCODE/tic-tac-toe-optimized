import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const ParagraphVariants = cva(
  "inline-flex items-center px-4 py-2 justify-center word-break h-auto rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ",
  {
    variants: {
      variant: {
        default: "bg-blue-100 dark:bg-blue-700 ",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background",
        secondary: "bg-secondary text-secondary-foreground",
        link: "text-primary underline-offset-4size",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof ParagraphVariants> {
  asChild?: boolean;
  right?: boolean;
  time?: string;
  playerName?: string;
}

const MessageParagraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  (
    { playerName, right, time, className, variant, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "p";
    return (
      <div
        className={cn(
          "w-full flex items-center relative",
          right ? "flex-row-reverse" : "flex-row"
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-1",
            right ? "items-end" : "items-start"
          )}
        >
          <div className="flex items-center gap-1 text-xs font-normal text-gray-800 dark:text-gray-300">
            {playerName && <span>{playerName},</span>}
            <span className=" px-1 rounded-full w-fit">{time}</span>
          </div>
          <Comp
            className={cn(ParagraphVariants({ variant, className }))}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);
MessageParagraph.displayName = "p";

export { MessageParagraph, ParagraphVariants };
