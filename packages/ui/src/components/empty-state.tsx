import * as React from "react";
import { cn } from "../lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  titleBn?: string;
  description?: string;
  descriptionBn?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  titleBn,
  description,
  descriptionBn,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-lg border border-dashed border-border bg-card/50 min-h-[220px]",
        className
      )}
    >
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-3">
          {icon}
        </div>
      )}
      <h3 className="text-sm font-semibold text-foreground">
        {title}
        {titleBn && (
          <span className="block text-xs font-normal text-muted-foreground mt-0.5">
            {titleBn}
          </span>
        )}
      </h3>
      {(description || descriptionBn) && (
        <p className="text-xs text-muted-foreground mt-1 max-w-sm">
          {description}
          {descriptionBn && (
            <span className="block mt-0.5">{descriptionBn}</span>
          )}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
