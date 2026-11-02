import React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", decorative, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role={decorative ? undefined : "separator"}
        aria-orientation={orientation}
        className={cn(separatorVariants({ orientation }), className)}
        {...props}
      />
    );
  },
);
Separator.displayName = "Separator";

const separatorVariants = cva("relative shrink-0 bg-border", {
  variants: {
    orientation: {
      horizontal: "h-[1px] w-full",
      vertical: "h-full w-[1px]",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export { Separator, separatorVariants }
