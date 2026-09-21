import * as React from "react";
import { cn } from "../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  isGlass?: boolean;
  interactive?: boolean;
  accent?: "gold" | "emerald" | "blue" | "none";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      isGlass = true,
      interactive = false,
      accent = "none",
      children,
      ...props
    },
    ref
  ) => {
    const accentLineClasses = {
      none: "",
      gold: "border-t-2 border-t-amber-400",
      emerald: "border-t-2 border-t-emerald-500",
      blue: "border-t-2 border-t-blue-500",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border text-card-foreground shadow-xl transition-all duration-200 overflow-hidden relative",
          isGlass
            ? "bg-slate-900/60 backdrop-blur-2xl border-white/10"
            : "bg-card border-border",
          interactive &&
            "hover:-translate-y-1 hover:shadow-2xl hover:border-amber-500/30 hover:shadow-black/60 cursor-pointer active:scale-[0.99]",
          accentLineClasses[accent],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-bold leading-none tracking-tight text-white",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
