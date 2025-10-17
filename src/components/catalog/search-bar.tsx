import { XIcon, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  onClear: () => void
}

export function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <div className="relative flex w-full flex-col gap-2 sm:w-auto sm:min-w-[20rem]">
      <label htmlFor="catalog-search" className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        Search catalog
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          id="catalog-search"
          placeholder="Search by product, category, or badge"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="pl-9 pr-9"
          aria-label="Search catalog items"
        />
        {value ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClear}
            className="absolute right-1.5 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        ) : null}
      </div>
    </div>
  )
}
