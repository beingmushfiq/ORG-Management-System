import * as React from "react";
import { cn } from "../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "success"
    | "warning"
    | "destructive"
    | "glass"
    | "gold"
    | "cyan";
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
  dot?: boolean;
}

function Badge({
  className,
  variant = "default",
  size = "md",
  pulse = false,
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const variantClasses = {
    default: "bg-[hsl(var(--primary))] text-white border-transparent",
    secondary:
      "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] border-transparent",
    outline: "text-slate-200 border-slate-700/80 bg-slate-900/40",
    success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    destructive: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    glass: "bg-white/10 backdrop-blur-md border-white/20 text-white",
    gold: "bg-amber-500/15 text-amber-300 border-amber-400/40 shadow-sm shadow-amber-500/10",
    cyan: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30",
  };

  const dotColorClasses = {
    default: "bg-blue-400",
    secondary: "bg-slate-400",
    outline: "bg-slate-400",
    success: "bg-emerald-400",
    warning: "bg-amber-400",
    destructive: "bg-rose-400",
    glass: "bg-white",
    gold: "bg-amber-400",
    cyan: "bg-cyan-400",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px] gap-1",
    md: "px-2.5 py-0.5 text-xs gap-1.5",
    lg: "px-3 py-1 text-xs font-bold gap-2",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border font-semibold transition-all duration-150 select-none",
        variantClasses[variant],
        sizeClasses[size],
        pulse && "animate-pulse",
        className
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          {pulse && (
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                dotColorClasses[variant]
              )}
            />
          )}
          <span
            className={cn(
              "relative inline-flex rounded-full h-2 w-2",
              dotColorClasses[variant]
            )}
          />
        </span>
      )}
      {children}
    </div>
  );
}

export { Badge };
