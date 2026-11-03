import * as React from "react";
import { cn } from "../../lib/utils";

const Field = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("space-y-2", className)} {...props} />;
});

Field.displayName = "Field";

const FieldGroup = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("space-y-6", className)} {...props} />;
});

FieldGroup.displayName = "FieldGroup";

const FieldLabel = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  );
});

FieldLabel.displayName = "FieldLabel";

const FieldDescription = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});

FieldDescription.displayName = "FieldDescription";

const FieldSeparator = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("h-px w-full bg-border", className)}
      {...props}
    />
  );
});

FieldSeparator.displayName = "FieldSeparator";

export { Field, FieldGroup, FieldLabel, FieldDescription, FieldSeparator };
