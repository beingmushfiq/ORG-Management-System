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
    | "destructive"
    | "institutional"
    | "gold"
    | "navy"
    | "emerald"
    | "glass"
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
      shimmer: _shimmer,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      primary:
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm border border-transparent",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border/40",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost:
        "hover:bg-accent hover:text-accent-foreground text-foreground",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
      institutional:
        "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 shadow-sm",
      gold:
        "bg-amber-600 text-white hover:bg-amber-700 shadow-sm font-medium",
      navy:
        "bg-slate-900 text-slate-100 hover:bg-slate-800 border border-slate-700",
      emerald:
        "bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm font-medium",
      glass:
        "bg-card/90 border border-border text-foreground hover:bg-accent",
      subtle:
        "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground",
    };

    const sizeClasses = {
      sm: "h-8 px-3 text-xs rounded-md gap-1.5",
      md: "h-9 px-4 py-2 text-sm rounded-md gap-2",
      lg: "h-11 px-6 text-base rounded-md font-medium gap-2.5",
      icon: "h-9 w-9 rounded-md flex items-center justify-center p-0",
    };

    const isButtonDisabled = disabled || loading;

    const baseClasses = cn(
      "inline-flex items-center justify-center font-medium transition-colors select-none",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
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

        {!loading && leftIcon && (
          <span className="inline-flex flex-shrink-0">{leftIcon}</span>
        )}

        <span>{loading && loadingText ? loadingText : children}</span>

        {!loading && rightIcon && (
          <span className="inline-flex flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
