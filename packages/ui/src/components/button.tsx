import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "glass"
    | "destructive"
    | "gold"
    | "navy"
    | "emerald"
    | "subtle";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  shimmer?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      shimmer = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      primary:
        "bg-[hsl(var(--primary))] text-white hover:opacity-90 shadow-md shadow-primary/20 active:scale-[0.98] border border-primary/20",
      secondary:
        "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-opacity-80 active:scale-[0.98]",
      outline:
        "border border-border/70 bg-transparent text-slate-200 hover:bg-white/5 hover:border-slate-500/50 active:scale-[0.98]",
      ghost:
        "text-slate-300 hover:bg-white/5 hover:text-white active:scale-[0.98]",
      glass:
        "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-lg shadow-black/30 active:scale-[0.98]",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md shadow-rose-950/40 active:scale-[0.98]",
      gold:
        "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-bold border border-amber-300/40 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:brightness-105 active:scale-[0.98]",
      navy:
        "bg-slate-900 border border-amber-500/30 text-amber-300 hover:bg-slate-800 hover:border-amber-400/60 shadow-md shadow-slate-950/50 active:scale-[0.98]",
      emerald:
        "bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-600/25 active:scale-[0.98] border border-emerald-500/30",
      subtle:
        "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 active:scale-[0.98]",
    };

    const sizeClasses = {
      sm: "h-8 px-3 text-xs rounded-md gap-1.5",
      md: "h-10 px-4 py-2 text-sm rounded-lg gap-2",
      lg: "h-12 px-6 text-base rounded-xl font-medium gap-2.5",
      icon: "h-10 w-10 rounded-lg flex items-center justify-center p-0",
    };

    const isButtonDisabled = disabled || loading;

    const baseClasses = cn(
      "relative inline-flex items-center justify-center font-medium transition-all duration-150 select-none overflow-hidden group",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
      "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    if (asChild) {
      return (
        <Slot className={baseClasses} ref={ref} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={baseClasses}
        ref={ref}
        disabled={isButtonDisabled}
        {...props}
      >
        {/* Shimmer light sweep reflection effect */}
        {shimmer && (
          <span
            aria-hidden="true"
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
          />
        )}

        {/* Loading Spinner */}
        {loading && (
          <svg
            className="animate-spin h-4 w-4 text-current flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {/* Left Icon (hidden if loading and no loadingText) */}
        {!loading && leftIcon && (
          <span className="inline-flex flex-shrink-0 transition-transform duration-150 group-hover:-translate-x-0.5">
            {leftIcon}
          </span>
        )}

        {/* Content / Label */}
        <span>{loading && loadingText ? loadingText : children}</span>

        {/* Right Icon */}
        {!loading && rightIcon && (
          <span className="inline-flex flex-shrink-0 transition-transform duration-150 group-hover:translate-x-0.5">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
