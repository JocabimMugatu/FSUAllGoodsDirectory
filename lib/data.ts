import type { Availability, Category, Image, Item, Price, Size } from './types';

const categories: Category[] = [
  'Apparel',
  'Accessories',
  'Home Goods',
  'Headwear',
  'Drinkware',
  'Decals',
  'Office',
  'Tailgate',
];

const nameSeeds: Record<Category, string[]> = {
  Apparel: [
    'FSU Garnet Tee',
    'FSU Seminoles Hoodie',
    'FSU Performance Polo',
    'FSU Crewneck Sweatshirt',
    'FSU Retro Jersey',
    'FSU Ladies V-Neck Tee',
    'FSU Kids Tee',
    'FSU Long Sleeve Tee',
    'FSU Tank Top',
  ],
  Accessories: [
    'FSU Lanyard',
    'FSU Keychain',
    'FSU Phone Case',
    'FSU Scarf',
    'FSU Socks',
    'FSU Belt',
    'FSU Sunglasses',
    'FSU Wallet',
  ],
  'Home Goods': [
    'FSU Throw Blanket',
    'FSU Pillow',
    'FSU Coaster Set',
    'FSU Wall Flag',
    'FSU Doormat',
    'FSU Picture Frame',
    'FSU Candle',
    'FSU Clock',
  ],
  Headwear: [
    'FSU Adjustable Cap',
    'FSU Beanie',
    'FSU Visor',
    'FSU Trucker Hat',
    'FSU Snapback',
  ],
  Drinkware: [
    'FSU Mug',
    'FSU Tumbler',
    'FSU Water Bottle',
    'FSU Stein',
    'FSU Wine Glass',
  ],
  Decals: [
    'FSU Car Decal',
    'FSU Laptop Sticker',
    'FSU Magnet',
    'FSU Bumper Sticker',
    'FSU Window Cling',
  ],
  Office: [
    'FSU Notebook',
    'FSU Pen Set',
    'FSU Desk Mat',
    'FSU Mouse Pad',
    'FSU Planner',
  ],
  Tailgate: [
    'FSU Cornhole Set',
    'FSU Folding Chair',
    'FSU Cooler',
    'FSU Grill Set',
    'FSU Can Cooler',
  ],
};

const apparelSizes: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const headwearSizes: Size[] = ['Adjustable', 'One Size'];
const drinkwareSizes: Size[] = ['12oz', '16oz', '20oz'];

function seededRandom(seed: number) {
  let s = seed % 2147483647;
  return () => (s = (s * 48271) % 2147483647) / 2147483647;
}

function priceForCategory(cat: Category, rnd: () => number): Price {
  const base = {
    Apparel: 24,
    Accessories: 12,
    'Home Goods': 22,
    Headwear: 26,
    Drinkware: 18,
    Decals: 6,
    Office: 16,
    Tailgate: 40,
  }[cat];
  const variance = base * 0.6 * rnd();
  const amount = Math.round((base + variance) * 100) / 100;
  return { currency: 'USD', amount };
}

function availability(rnd: () => number): Availability {
  const r = rnd();
  if (r < 0.75) return 'InStock';
  if (r < 0.9) return 'Limited';
  if (r < 0.97) return 'PreOrder';
  return 'OutOfStock';
}

function sizesForCategory(cat: Category): Size[] | undefined {
  switch (cat) {
    case 'Apparel':
      return apparelSizes;
    case 'Headwear':
      return headwearSizes;
    case 'Drinkware':
      return drinkwareSizes;
    default:
      return undefined;
  }
}

function imageFor(id: number, title: string): Image {
  const url = `https://picsum.photos/seed/fsu-${id}/600/600`;
  return { url, alt: `${title} image`, width: 600, height: 600 };
}

export function generateCatalog(count = 560): Item[] {
  const items: Item[] = [];
  const rnd = seededRandom(20241020);

  for (let i = 0; i < count; i++) {
    const cat = categories[i % categories.length];
    const seedList = nameSeeds[cat];
    const baseName = seedList[i % seedList.length];
    const variant = (i % 7) + 1;
    const title = `${baseName} — Garnet/Gold ${variant}`;
    const id = i + 1;

    const price = priceForCategory(cat, rnd);
    const avail = availability(rnd);
    const sizes = sizesForCategory(cat);

    const item: Item = {
      id: `item-${id.toString().padStart(3, '0')}`,
      sku: `FSU-${cat.substring(0, 3).toUpperCase()}-${(10000 + id).toString(36).toUpperCase()}`,
      title,
      description: `Officially inspired Florida State University ${cat.toLowerCase()} featuring garnet and gold styling. Durable, fan-approved.`,
      category: cat,
      price,
      sizes,
      availability: avail,
      images: [imageFor(id, title)],
      tags: ['FSU', 'Seminoles', 'Garnet', 'Gold', cat],
      rating: Math.round(seededRandom(id)() * 40) / 10 + 1, // 1.0 - 5.0
    };
    items.push(item);
  }
  return items;
}

export const DATASET: Item[] = generateCatalog();
