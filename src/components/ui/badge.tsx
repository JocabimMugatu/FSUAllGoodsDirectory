import * as React from 'react'
import { cn } from '@/lib/utils'

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'secondary' | 'outline'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors',
        variant === 'default' && 'bg-primary text-primary-foreground border-transparent',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground border-transparent',
        variant === 'outline' && 'text-foreground',
        className,
      )}
      {...props}
    />
  )
}
