import type { MerchCategory, SizeGroup, SizeOption } from "./types";

export const CATEGORY_DEFINITIONS: readonly MerchCategory[] = [
  {
    id: "apparel",
    name: "Apparel",
    description: "Performance tees, polos, and everyday staples celebrating the Seminoles.",
    heroImage: "https://cdn.nolegear.com/category/apparel/hero.jpg",
    featuredTagline: "Game day ready trims for every fan."
  },
  {
    id: "outerwear",
    name: "Outerwear",
    description: "Layers built for crisp fall kickoffs and late-night campus walks.",
    heroImage: "https://cdn.nolegear.com/category/outerwear/hero.jpg",
    featuredTagline: "Stay warm while you spear the competition."
  },
  {
    id: "headwear",
    name: "Headwear",
    description: "Caps, beanies, and visors featuring iconic FSU marks.",
    heroImage: "https://cdn.nolegear.com/category/headwear/hero.jpg",
    featuredTagline: "Top off your look with Garnet & Gold."
  },
  {
    id: "footwear",
    name: "Footwear",
    description: "Slides, trainers, and sideline-ready kicks with Seminole flair.",
    heroImage: "https://cdn.nolegear.com/category/footwear/hero.jpg",
    featuredTagline: "Stride into Doak Campbell in style."
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Everyday carry essentials and finishing touches in school colours.",
    heroImage: "https://cdn.nolegear.com/category/accessories/hero.jpg",
    featuredTagline: "Small details. Big spirit."
  },
  {
    id: "tailgating",
    name: "Tailgating",
    description: "Tailgate gear built for pregame traditions and campus gatherings.",
    heroImage: "https://cdn.nolegear.com/category/tailgating/hero.jpg",
    featuredTagline: "Fuel the party from Legacy Walk to kickoff."
  },
  {
    id: "home_office",
    name: "Home & Office",
    description: "Décor, drinkware, and desk pieces for Seminole-inspired spaces.",
    heroImage: "https://cdn.nolegear.com/category/home-office/hero.jpg",
    featuredTagline: "Bring Garnet & Gold energy into every room."
  },
  {
    id: "collectibles",
    name: "Collectibles",
    description: "Limited art, signed memorabilia, and showcase pieces for die-hard fans.",
    heroImage: "https://cdn.nolegear.com/category/collectibles/hero.jpg",
    featuredTagline: "Celebrate the legacy and preserve the memories."
  },
  {
    id: "youth",
    name: "Youth",
    description: "Scaled-down favorites for future Seminoles discovering their pride.",
    heroImage: "https://cdn.nolegear.com/category/youth/hero.jpg",
    featuredTagline: "Outfit the next generation of Garnet & Gold."
  }
] as const;

const size = (
  id: string,
  label: string,
  abbreviation: string,
  group: SizeGroup,
  ordinal: number
): SizeOption => ({ id, label, abbreviation, group, ordinal });

export const SIZE_OPTIONS: readonly SizeOption[] = [
  size("adult-xs", "XS", "XS", "adult_unisex_apparel", 0),
  size("adult-sm", "Small", "S", "adult_unisex_apparel", 1),
  size("adult-md", "Medium", "M", "adult_unisex_apparel", 2),
  size("adult-lg", "Large", "L", "adult_unisex_apparel", 3),
  size("adult-xl", "XL", "XL", "adult_unisex_apparel", 4),
  size("adult-2xl", "2XL", "2XL", "adult_unisex_apparel", 5),
  size("adult-3xl", "3XL", "3XL", "adult_unisex_apparel", 6),
  size("women-xs", "Women's XS", "WXS", "women_apparel", 0),
  size("women-sm", "Women's Small", "WS", "women_apparel", 1),
  size("women-md", "Women's Medium", "WM", "women_apparel", 2),
  size("women-lg", "Women's Large", "WL", "women_apparel", 3),
  size("women-xl", "Women's XL", "WXL", "women_apparel", 4),
  size("women-2xl", "Women's 2XL", "W2XL", "women_apparel", 5),
  size("youth-xs", "Youth XS", "YXS", "youth_apparel", 0),
  size("youth-sm", "Youth Small", "YS", "youth_apparel", 1),
  size("youth-md", "Youth Medium", "YM", "youth_apparel", 2),
  size("youth-lg", "Youth Large", "YL", "youth_apparel", 3),
  size("youth-xl", "Youth XL", "YXL", "youth_apparel", 4),
  size("headwear-osfm", "One Size Fits Most", "OSFM", "headwear", 0),
  size("headwear-s-m", "S/M Flex", "S/M", "headwear", 1),
  size("headwear-l-xl", "L/XL Flex", "L/XL", "headwear", 2),
  size("footwear-7", "Men's 7", "7", "footwear", 0),
  size("footwear-8", "Men's 8", "8", "footwear", 1),
  size("footwear-9", "Men's 9", "9", "footwear", 2),
  size("footwear-10", "Men's 10", "10", "footwear", 3),
  size("footwear-11", "Men's 11", "11", "footwear", 4),
  size("footwear-12", "Men's 12", "12", "footwear", 5),
  size("footwear-13", "Men's 13", "13", "footwear", 6),
  size("tailgate-standard", "Standard", "STD", "tailgate", 0),
  size("tailgate-xl", "XL Tailgate", "XL", "tailgate", 1),
  size("accessories-standard", "One Size", "OS", "accessories", 0),
  size("collectible-standard", "Collectors' Size", "COL", "collectibles", 0),
  size("home-office-standard", "Standard", "STD", "home_office", 0)
] as const;

export const COLOR_HEXES: Record<string, string> = {
  Garnet: "#782F40",
  Gold: "#CEB888",
  Black: "#000000",
  White: "#FFFFFF",
  Charcoal: "#3A3A3C",
  Cream: "#F6F0E4",
  Sand: "#CDC2A5",
  Maroon: "#5B1A18",
  "Sunset Gold": "#E4C46A",
  "Matte Black": "#1C1C1C",
  "Matte Gold": "#BFA660",
  "Vintage White": "#F3EDE2",
  "Heritage Garnet": "#6A2432",
  "Midnight Garnet": "#4D0F26",
  "Victory Gold": "#D8B46A",
  "Storm Grey": "#5A6166",
  Graphite: "#45474A",
  "Citrus Flash": "#FFC85C",
  "Stadium Silver": "#D3D6DB",
  "Field Green": "#2E7D32",
  "Seminole Tan": "#B89B72",
  "Speckled Granite": "#8C8475",
  "Matte Garnet": "#6F2E3D"
};
