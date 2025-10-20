import * as React from 'react';

export function Card({ className = '', children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`card ${className}`}>{children}</div>;
}
export function CardHeader({ className = '', children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`card-header ${className}`}>{children}</div>;
}
export function CardTitle({ className = '', children }: React.PropsWithChildren<{ className?: string }>) {
  return <h3 className={`card-title ${className}`}>{children}</h3>;
}
export function CardDescription({ className = '', children }: React.PropsWithChildren<{ className?: string }>) {
  return <p className={`card-subtitle ${className}`}>{children}</p>;
}
export function CardContent({ className = '', children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`card-content ${className}`}>{children}</div>;
}
export function CardFooter({ className = '', children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`card-footer ${className}`}>{children}</div>;
}
