import * as React from "react";
import { cn } from "../lib/utils";

export interface PageHeaderProps {
  title: string;
  titleBn?: string;
  description?: string;
  descriptionBn?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: Array<{ label: string; labelBn?: string; href?: string }>;
  className?: string;
}

export function PageHeader({
  title,
  titleBn,
  description,
  descriptionBn,
  badge,
  actions,
  breadcrumbs,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 pb-6 border-b border-border mb-6",
        className
      )}
    >
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span>/</span>}
              {crumb.href ? (
                <a
                  href={crumb.href}
                  className="hover:text-foreground transition-colors"
                >
                  {crumb.label}
                </a>
              ) : (
                <span className="text-foreground font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              {title}
            </h1>
            {badge}
          </div>
          {titleBn && (
            <p className="text-xs font-medium text-muted-foreground">{titleBn}</p>
          )}
          {(description || descriptionBn) && (
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl pt-0.5">
              {description}
              {descriptionBn && (
                <span className="block text-xs mt-0.5 text-muted-foreground/80">
                  {descriptionBn}
                </span>
              )}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>
        )}
      </div>
    </div>
  );
}
