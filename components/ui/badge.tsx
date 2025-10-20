import * as React from 'react';

export function Badge({ className = '', children, variant = 'default' }: React.PropsWithChildren<{ className?: string; variant?: 'default' | 'garnet' }>) {
  const classes = ['badge', className, variant === 'garnet' ? 'garnet' : ''].filter(Boolean).join(' ');
  return <span className={classes}>{children}</span>;
}
