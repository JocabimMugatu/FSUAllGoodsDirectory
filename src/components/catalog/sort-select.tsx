import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc'

export const sortOptionLabels: Record<SortOption, string> = {
  featured: 'Featured',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  'rating-desc': 'Rating: High to Low',
  'name-asc': 'Name: A to Z',
}

export type SortSelectProps = {
  value: SortOption
  onChange: (option: SortOption) => void
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="catalog-sort">Sort</Label>
      <Select
        id="catalog-sort"
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
      >
        {Object.entries(sortOptionLabels).map(([option, label]) => (
          <option key={option} value={option}>
            {label}
          </option>
        ))}
      </Select>
    </div>
  )
}
