import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "sm" | "lg" | "full";
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full px-4 sm:px-6 lg:px-8",
          {
            "max-w-4xl": size === "sm",
            "max-w-6xl": size === "default",
            "max-w-7xl": size === "lg",
            "max-w-none": size === "full",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

export { Container };
