import type { Category, Item, Price, Size } from '../types'

// Categories
export const categories: Category[] = [
  { id: 'apparel', name: 'Apparel', slug: 'apparel' },
  { id: 'jerseys', name: 'Jerseys', slug: 'jerseys' },
  { id: 'hats', name: 'Hats', slug: 'hats' },
  { id: 'accessories', name: 'Accessories', slug: 'accessories' },
  { id: 'home-office', name: 'Home & Office', slug: 'home-office' },
  { id: 'tailgating', name: 'Tailgating', slug: 'tailgating' },
  { id: 'kids', name: 'Kids', slug: 'kids' },
  { id: 'memorabilia', name: 'Memorabilia', slug: 'memorabilia' }
]

const apparelSizes: Size[] = ['XS','S','M','L','XL','XXL']
const hatSizes: Size[] = ['S/M','L/XL','One Size']
const kidsSizes: Size[] = ['Youth']
const oneSize: Size[] = ['One Size']

const apparelNames = [
  'Garnet Performance Tee',
  'Gold Performance Tee',
  'Seminoles Hoodie',
  'FSU Logo Crewneck',
  'Vintage Script Tee',
  'Quarter-Zip Pullover',
  'Lightweight Windbreaker',
  'Athletic Shorts',
  'Track Pants',
  'Game Day Polo'
]

const jerseyNames = [
  'Home Jersey #1',
  'Away Jersey #1',
  'Alternate Jersey #1',
  'Home Jersey #10',
  'Away Jersey #10'
]

const hatNames = [
  'Classic Cap',
  'Trucker Hat',
  'Vintage Snapback',
  'Knit Beanie',
  'Sideline Visor'
]

const accessoryNames = [
  'Stadium Clear Bag',
  'Lanyard',
  'Keychain',
  'Phone Case',
  'Water Bottle',
  'Scarf',
  'Socks',
  'Wristband'
]

const homeNames = [
  'Throw Blanket',
  'Coffee Mug',
  'Coasters Set',
  'Wall Pennant',
  'Desk Mat',
  'Garden Flag'
]

const tailgateNames = [
  'Cornhole Board Set',
  'Grill Mitt',
  'Cooler',
  'Folding Chair',
  'Can Koozie'
]

const kidsNames = [
  'Toddler Tee',
  'Youth Hoodie',
  'Onesie',
  'Youth Cap'
]

const memorabiliaNames = [
  'Autographed Football',
  'Signed Mini Helmet',
  'Framed Photo',
  'Commemorative Coin',
  'Championship Poster'
]

function pickImage(id: number): { url: string; alt: string } {
  const url = `https://picsum.photos/seed/fsu-${id}/400/400`
  return { url, alt: `FSU product image ${id}` }
}

function priceForCategory(catId: string): Price {
  const rnd = (min: number, max: number) => Math.round((Math.random() * (max - min) + min) * 100) / 100
  switch (catId) {
    case 'apparel': return { value: rnd(19, 89), currency: 'USD' }
    case 'jerseys': return { value: rnd(79, 149), currency: 'USD' }
    case 'hats': return { value: rnd(18, 45), currency: 'USD' }
    case 'accessories': return { value: rnd(5, 35), currency: 'USD' }
    case 'home-office': return { value: rnd(10, 60), currency: 'USD' }
    case 'tailgating': return { value: rnd(12, 180), currency: 'USD' }
    case 'kids': return { value: rnd(12, 45), currency: 'USD' }
    case 'memorabilia': return { value: rnd(35, 250), currency: 'USD' }
    default: return { value: rnd(10, 99), currency: 'USD' }
  }
}

function sizesForCategory(catId: string): Size[] | undefined {
  switch (catId) {
    case 'apparel': return apparelSizes
    case 'jerseys': return apparelSizes
    case 'hats': return hatSizes
    case 'kids': return kidsSizes
    case 'accessories':
    case 'home-office':
    case 'tailgating':
    case 'memorabilia':
      return oneSize
    default:
      return undefined
  }
}

function titleForCategory(catId: string, index: number): string {
  const prefix = ['FSU', 'Florida State', 'Seminoles'][index % 3]
  switch (catId) {
    case 'apparel': return `${prefix} ${apparelNames[index % apparelNames.length]}`
    case 'jerseys': return `${prefix} ${jerseyNames[index % jerseyNames.length]}`
    case 'hats': return `${prefix} ${hatNames[index % hatNames.length]}`
    case 'accessories': return `${prefix} ${accessoryNames[index % accessoryNames.length]}`
    case 'home-office': return `${prefix} ${homeNames[index % homeNames.length]}`
    case 'tailgating': return `${prefix} ${tailgateNames[index % tailgateNames.length]}`
    case 'kids': return `${prefix} ${kidsNames[index % kidsNames.length]}`
    case 'memorabilia': return `${prefix} ${memorabiliaNames[index % memorabiliaNames.length]}`
    default: return `${prefix} Item ${index}`
  }
}

export const items: Item[] = (() => {
  const out: Item[] = []
  let idCounter = 1
  const loopsPerCategory = 70 // 8 * 70 = 560 items
  for (const cat of categories) {
    for (let i = 0; i < loopsPerCategory; i++) {
      const id = idCounter++
      const title = titleForCategory(cat.id, i)
      const sku = `FSU-${cat.slug}-${String(i + 1).padStart(3, '0')}`
      const image = pickImage(id)
      const price = priceForCategory(cat.id)
      const sizes = sizesForCategory(cat.id)
      const quantity = Math.floor(Math.random() * 50) + 1
      const item: Item = {
        id: String(id),
        sku,
        title,
        description: `${title} featuring official colors and marks. High quality materials suitable for game day and everyday wear.`,
        categories: [cat.name],
        price,
        sizes,
        availability: { inStock: quantity > 0, quantity },
        images: [{ url: image.url, alt: image.alt, width: 400, height: 400 }],
        tags: ['FSU', 'Seminoles']
      }
      out.push(item)
    }
  }
  return out
})()
