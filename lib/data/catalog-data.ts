export type InventoryStatus = "in_stock" | "low_stock" | "backorder" | "preorder";

export type CatalogItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  badges: string[];
  inventoryStatus: InventoryStatus;
  imageUrl: string;
};

const categories = [
  "Electronics",
  "Home & Kitchen",
  "Outdoors",
  "Fitness",
  "Toys",
  "Books",
  "Beauty",
  "Office"
];

const adjectives = [
  "Essential",
  "Premium",
  "Compact",
  "Modern",
  "Advanced",
  "Eco",
  "Artisan",
  "Versatile",
  "Signature",
  "Dynamic"
];

const nouns = [
  "Speaker",
  "Cookware Set",
  "Tent",
  "Yoga Mat",
  "Drone",
  "Backpack",
  "Notebook",
  "Lamp",
  "Camera",
  "Headphones",
  "Kettle",
  "Mixer",
  "Router",
  "Monitor",
  "Chair",
  "Bottle",
  "Watch",
  "Scooter",
  "Projector",
  "Printer"
];

const badgePool = [
  "New",
  "Bestseller",
  "Limited",
  "Trending",
  "Sustainable",
  "Staff Pick",
  "Bundle",
  "Online Only"
];

const descriptionSnippets = [
  "crafted for everyday use",
  "engineered for precision",
  "designed with comfort in mind",
  "built to handle real-world adventures",
  "styled to elevate any space",
  "optimized for effortless setup",
  "finished with premium materials",
  "made for multitaskers"
];

const PRICE_BASE = 1800;
const PRICE_VARIANCE = 135;
const PRICE_STEPS = 45;

const toCurrency = (value: number) => Math.round(value / 5) * 5;

export const staticCatalogItems: CatalogItem[] = Array.from({ length: 500 }, (_, index) => {
  const idNumber = index + 1;
  const category = categories[index % categories.length];
  const adjective = adjectives[index % adjectives.length];
  const noun = nouns[index % nouns.length];
  const description = `A ${adjective.toLowerCase()} ${noun.toLowerCase()} ${
    descriptionSnippets[index % descriptionSnippets.length]
  }.`;
  const basePrice = PRICE_BASE + PRICE_VARIANCE * (index % PRICE_STEPS);
  const price = toCurrency(basePrice + (index % 3) * 23 + (index % 7) * 11);
  const rating = 3 + ((index * 7) % 21) / 10;

  let inventoryStatus: InventoryStatus = "in_stock";
  if (index % 17 === 0) {
    inventoryStatus = "backorder";
  } else if (index % 11 === 0) {
    inventoryStatus = "preorder";
  } else if (index % 9 === 0) {
    inventoryStatus = "low_stock";
  }

  const badges = badgePool.filter((_, badgeIndex) => (index + badgeIndex) % 5 === 0).slice(0, 3);
  if (badges.length === 0) {
    badges.push(badgePool[index % badgePool.length]);
  }

  return {
    id: `item-${idNumber}`,
    name: `${adjective} ${noun}`,
    category,
    description,
    price,
    rating: Number(rating.toFixed(1)),
    badges,
    inventoryStatus,
    imageUrl: `https://picsum.photos/seed/catalog-${idNumber}/600/600`
  };
});
