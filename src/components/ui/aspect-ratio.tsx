import * as React from "react";

import { cn } from "@/lib/utils";

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 16 / 9, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden rounded-md", className)}
        {...props}
      >
        <div style={{ paddingBottom: `${100 / ratio}%` }} />
        <div className="absolute inset-0 h-full w-full">{children}</div>
      </div>
    );
  }
);
AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
