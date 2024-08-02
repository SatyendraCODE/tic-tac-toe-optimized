import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import Link from "next/link";

import { buttonVariants } from "./button";

import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const LinkStyled = React.forwardRef<HTMLAnchorElement, ButtonProps>(
  ({ href, className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <Link
        href={href || ""}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
LinkStyled.displayName = "linkStyled";

export { LinkStyled };
