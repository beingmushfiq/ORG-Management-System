import * as React from "react";
import { cn } from "../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "destructive" | "glass";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantClasses = {
    default: "bg-[hsl(var(--primary))] text-white border-transparent",
    secondary: "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] border-transparent",
    outline: "text-foreground border-border",
    success: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-500 border-amber-500/30",
    destructive: "bg-rose-500/15 text-rose-500 border-rose-500/30",
    glass: "bg-white/10 backdrop-blur-md border-white/20 text-white",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
