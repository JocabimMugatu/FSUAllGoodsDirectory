import * as React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-full border border-fsu-gold/70 bg-white px-4 text-sm text-fsu-charcoal shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsu-garnet focus-visible:ring-offset-2 placeholder:text-fsu-charcoal/50 disabled:cursor-not-allowed disabled:opacity-60",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
