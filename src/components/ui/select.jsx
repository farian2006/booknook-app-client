"use client";

import * as React from "react"
import { Select } from "@base-ui/react/select"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const selectTrigger = cva(
  "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>[data-slot=select-value]]:line-clamp-1",
)

const SelectRoot = Select.Root
const SelectTrigger = Select.Trigger
const SelectValue = Select.Value
const SelectList = Select.List
const SelectItem = Select.Item

const SelectContent = React.forwardRef(function SelectContent(
  { className, children, ...props },
  ref,
) {
  return (
    <Select.Positioner>
      <Select.Popup
        ref={ref}
        className={cn(
          "z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-(state=open):animate-in data-(state=closed):animate-out data-(state=closed):fade-out-0 data-(state=open):fade-in-8 data-(state=closed):zoom-out-95 data-(state=open):zoom-in-90 data-(side=bottom):translate-y-1 data-(side=left):-translate-x-1 data-(side=right):translate-x-1 data-(side=top):-translate-y-1",
          className,
        )}
        {...props}
      >
        {children}
      </Select.Popup>
    </Select.Positioner>
  )
})
SelectContent.displayName = "SelectContent"

export {
  SelectRoot as Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectList,
  SelectItem,
}
