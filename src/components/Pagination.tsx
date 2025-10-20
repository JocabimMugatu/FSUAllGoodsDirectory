import React from 'react'
import { cn } from '@/lib/utils'

export function Pagination({
  page,
  total,
  pageSize,
  onPageChange,
  className,
}: {
  page: number
  total: number
  pageSize: number
  onPageChange: (page: number) => void
  className?: string
}) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const canPrev = page > 1
  const canNext = page < pageCount

  // Build a compact pagination range
  const pages: (number | 'dots')[] = []
  const add = (p: number | 'dots') => pages.push(p)
  const siblings = 1
  const start = Math.max(1, page - siblings)
  const end = Math.min(pageCount, page + siblings)

  add(1)
  if (start > 2) add('dots')
  for (let p = start; p <= end; p++) if (p !== 1 && p !== pageCount) add(p)
  if (end < pageCount - 1) add('dots')
  if (pageCount > 1) add(pageCount)

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <button
        className={cn(
          'select-none rounded-md border px-3 py-1 text-sm',
          canPrev ? 'hover:bg-muted' : 'opacity-50 cursor-not-allowed',
        )}
        onClick={() => canPrev && onPageChange(page - 1)}
        disabled={!canPrev}
      >
        Prev
      </button>
      <div className="flex items-center gap-1">
        {pages.map((p, i) => (
          <button
            key={`${p}-${i}`}
            disabled={p === 'dots'}
            onClick={() => p !== 'dots' && onPageChange(p)}
            className={cn(
              'min-w-[2rem] select-none rounded-md border px-2 py-1 text-sm',
              p === page && 'bg-primary text-primary-foreground border-transparent',
              p !== page && p !== 'dots' && 'hover:bg-muted',
              p === 'dots' && 'opacity-50 cursor-default',
            )}
          >
            {p === 'dots' ? '…' : p}
          </button>
        ))}
      </div>
      <button
        className={cn(
          'select-none rounded-md border px-3 py-1 text-sm',
          canNext ? 'hover:bg-muted' : 'opacity-50 cursor-not-allowed',
        )}
        onClick={() => canNext && onPageChange(page + 1)}
        disabled={!canNext}
      >
        Next
      </button>
    </div>
  )
}
