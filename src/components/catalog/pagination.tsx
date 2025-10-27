import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  const windowSize = 5
  let start = Math.max(1, currentPage - 2)
  let end = Math.min(totalPages, start + windowSize - 1)

  start = Math.max(1, end - windowSize + 1)

  const pages: number[] = []
  for (let page = start; page <= end; page += 1) {
    pages.push(page)
  }

  const showStartEllipsis = start > 2
  const showEndEllipsis = end < totalPages - 1

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Prev
      </Button>

      {start > 1 ? (
        <Button
          variant={currentPage === 1 ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(1)}
        >
          1
        </Button>
      ) : null}

      {showStartEllipsis ? (
        <span className="px-2 text-sm text-muted-foreground">…</span>
      ) : null}

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      {showEndEllipsis ? (
        <span className="px-2 text-sm text-muted-foreground">…</span>
      ) : null}

      {end < totalPages ? (
        <Button
          variant={currentPage === totalPages ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </Button>
      ) : null}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="gap-2"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
