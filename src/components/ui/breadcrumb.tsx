import * as React from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center text-sm", className)} aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const content = item.href && !item.isCurrent ? (
            <Link
              to={item.href}
              className="rounded-md px-1.5 py-1 transition hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </Link>
          ) : (
            <span className={cn(item.isCurrent && "text-foreground font-medium")}>{
              item.label
            }</span>
          );

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {content}
              {!isLast ? <span className="text-muted-foreground">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
