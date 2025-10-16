import { CATEGORY_DEFINITIONS, COLOR_HEXES, SIZE_OPTIONS } from "./constants";
import type {
  CatalogSnapshot,
  CategoryId,
  ImageAsset,
  MerchCategory,
  MerchItem,
  PriceMetadata,
  PriceTier,
  SizeGroup,
  SizeOption
} from "./types";

interface GenerateCatalogOptions {
  seed: number;
  categoryDefinitions?: readonly MerchCategory[];
  sizeOptions?: readonly SizeOption[];
}

interface ProductTemplate {
  categoryId: CategoryId;
  baseName: string;
  synopsis: string;
  detailPhrases: readonly string[];
  basePrice: number;
  sizeGroup: SizeGroup;
  tags: readonly string[];
  materials: readonly string[];
  featurePhrases: readonly string[];
  imageSlug: string;
  skuPrefix: string;
  variations: number;
  colorFamilies?: readonly string[];
}

interface Colorway {
  primary: string;
  secondary: string;
  accent: string;
}

const DEFAULT_COLORWAYS: readonly Colorway[] = [
  { primary: "Garnet", secondary: "Gold", accent: "White" },
  { primary: "Garnet", secondary: "Black", accent: "Gold" },
  { primary: "Matte Black", secondary: "Garnet", accent: "White" },
  { primary: "Heritage Garnet", secondary: "Cream", accent: "Gold" },
  { primary: "Charcoal", secondary: "Garnet", accent: "Stadium Silver" },
  { primary: "Garnet", secondary: "Seminole Tan", accent: "Victory Gold" },
  { primary: "Maroon", secondary: "Victory Gold", accent: "White" },
  { primary: "Midnight Garnet", secondary: "Gold", accent: "Graphite" },
  { primary: "Matte Gold", secondary: "Garnet", accent: "Cream" },
  { primary: "Garnet", secondary: "Stadium Silver", accent: "White" },
  { primary: "Speckled Granite", secondary: "Seminole Tan", accent: "Victory Gold" }
] as const;

const ADJECTIVES = [
  "Heritage",
  "Prime",
  "Legacy",
  "Elite",
  "Nole",
  "Victory",
  "Gameday",
  "Signature",
  "Classic",
  "Renegade",
  "Seminole",
  "Frontline",
  "Triumph",
  "Unconquered",
  "Torch"
] as const;

const MOTIFS = [
  "Spear",
  "Seminole Head",
  "Block FSU",
  "Script Noles",
  "Flying F",
  "Doak Campbell",
  "Fear the Spear",
  "Marching Chiefs",
  "Tomahawk",
  "Renegade"
] as const;

const RELEASE_SEASONS = [
  "Spring 2024",
  "Summer 2024",
  "Fall 2024",
  "Winter 2024",
  "Holiday 2024",
  "Spring 2025"
] as const;

const STORY_TAGS = [
  "New Arrival",
  "Staff Favorite",
  "Player Inspired",
  "Sustainable",
  "Premium",
  "Limited Edition",
  "Sideline Issued",
  "Stadium Essential",
  "Hand Finished"
] as const;

const DETAIL_CONNECTORS = [
  "and brings a confident on-field look",
  "with finishing touches loyal fans appreciate",
  "ensuring it's ready for campus and beyond",
  "making it a staple for alumni weekends",
  "to keep the Garnet & Gold spirit visible"
] as const;

const DEFAULT_FEATURES = [
  "moisture-wicking comfort",
  "UV 40+ protection",
  "anti-odor yarn",
  "reinforced seams",
  "four-way stretch",
  "sustainably sourced fibers",
  "premium embroidery",
  "bold collegiate graphics"
] as const;

const MATERIAL_FALLBACKS = [
  "Recycled Fibers",
  "Organic Cotton",
  "Performance Mesh",
  "Brushed Fleece",
  "Durable Canvas",
  "Tempered Steel",
  "Stoneware"
] as const;

const PRODUCT_TEMPLATES: readonly ProductTemplate[] = [
  {
    categoryId: "apparel",
    baseName: "Performance Tee",
    synopsis: "Lightweight tee built for hot kickoff afternoons.",
    detailPhrases: [
      "breathable mesh panelling keeps air flowing",
      "stretch knit moves with every chant",
      "flatlock seams minimise distraction"
    ],
    basePrice: 34,
    sizeGroup: "adult_unisex_apparel",
    tags: ["tee", "performance", "lightweight"],
    materials: ["Performance Polyester", "Mesh Vents"],
    featurePhrases: ["laser-cut underarms", "athletic crew collar", "vented side split"],
    imageSlug: "performance-tee",
    skuPrefix: "APP01",
    variations: 26
  },
  {
    categoryId: "apparel",
    baseName: "Heritage Polo",
    synopsis: "Sideline-inspired polo with moisture control.",
    detailPhrases: [
      "micro-pique fabric keeps things crisp",
      "contrast collar tipping highlights team colours",
      "three-button placket dresses up tailgate looks"
    ],
    basePrice: 62,
    sizeGroup: "adult_unisex_apparel",
    tags: ["polo", "sideline", "heritage"],
    materials: ["Stretch Pique", "Cooling Yarn"],
    featurePhrases: ["laser ventilation", "contrast collar", "locker loop"],
    imageSlug: "heritage-polo",
    skuPrefix: "APP02",
    variations: 24
  },
  {
    categoryId: "apparel",
    baseName: "Script Hoodie",
    synopsis: "Midweight fleece hoodie with tonal script logo.",
    detailPhrases: [
      "double-layer hood blocks the evening breeze",
      "kangaroo pocket stores gameday essentials",
      "rib trims keep the profile tidy"
    ],
    basePrice: 72,
    sizeGroup: "adult_unisex_apparel",
    tags: ["hoodie", "script", "midweight"],
    materials: ["Cotton Fleece", "Poly Blend"],
    featurePhrases: ["contrast drawcord", "soft brushed interior", "locker patch"],
    imageSlug: "script-hoodie",
    skuPrefix: "APP03",
    variations: 24
  },
  {
    categoryId: "apparel",
    baseName: "Retro Crew",
    synopsis: "Vintage crewneck celebrating classic campus art.",
    detailPhrases: [
      "garment wash gives an already-loved feel",
      "chenille patchwork nods to championship banners",
      "drop shoulder fit layers easily"
    ],
    basePrice: 68,
    sizeGroup: "adult_unisex_apparel",
    tags: ["crewneck", "vintage", "fleece"],
    materials: ["Ring-Spun Cotton", "Brushed Fleece"],
    featurePhrases: ["rib cuffs", "heritage patches", "contrast stitching"],
    imageSlug: "retro-crew",
    skuPrefix: "APP04",
    variations: 20
  },
  {
    categoryId: "apparel",
    baseName: "Campus Jogger",
    synopsis: "Athletic jogger ready for sunrise practice and travel days.",
    detailPhrases: [
      "zippered media pocket protects small tech",
      "articulated knees keep movement natural",
      "cuffed hems show off your favorite sneakers"
    ],
    basePrice: 58,
    sizeGroup: "adult_unisex_apparel",
    tags: ["pants", "athleisure", "jogger"],
    materials: ["Double-Knit Fleece", "Recycled Nylon"],
    featurePhrases: ["zip pocket", "drawcord waistband", "articulated knees"],
    imageSlug: "campus-jogger",
    skuPrefix: "APP05",
    variations: 20
  },
  {
    categoryId: "apparel",
    baseName: "Game Day Tank",
    synopsis: "Lightweight tank for sunny tailgate sessions.",
    detailPhrases: [
      "mesh racerback keeps airflow moving",
      "soft-hand print stays vibrant wash after wash",
      "scalloped hem flatters layered looks"
    ],
    basePrice: 36,
    sizeGroup: "women_apparel",
    tags: ["tank", "women", "lightweight"],
    materials: ["Poly Mesh", "Soft Jersey"],
    featurePhrases: ["laser racerback", "scalloped hem", "flat seams"],
    imageSlug: "game-day-tank",
    skuPrefix: "APP06",
    variations: 20
  },
  {
    categoryId: "outerwear",
    baseName: "Sideline Puffer",
    synopsis: "Insulated puffer tuned for cold night kickoffs.",
    detailPhrases: [
      "lightweight fill traps heat without bulk",
      "storm guard hood cinches tight",
      "zip chest pocket stashes passes"
    ],
    basePrice: 142,
    sizeGroup: "adult_unisex_apparel",
    tags: ["puffer", "sideline", "cold"],
    materials: ["Synthetic Down", "Ripstop Shell"],
    featurePhrases: ["storm hood", "zip chest pocket", "bungee hem"],
    imageSlug: "sideline-puffer",
    skuPrefix: "OUT01",
    variations: 16
  },
  {
    categoryId: "outerwear",
    baseName: "Storm Anorak",
    synopsis: "Weather-ready anorak with stealth branding.",
    detailPhrases: [
      "water-beading finish shakes off surprise showers",
      "packable hood pops up in seconds",
      "welded seams stop the wind"
    ],
    basePrice: 108,
    sizeGroup: "adult_unisex_apparel",
    tags: ["anorak", "weather", "layer"],
    materials: ["Performance Nylon", "Seam Tape"],
    featurePhrases: ["packable hood", "welded seams", "zip pouch"],
    imageSlug: "storm-anorak",
    skuPrefix: "OUT02",
    variations: 16
  },
  {
    categoryId: "outerwear",
    baseName: "Coaches Jacket",
    synopsis: "Snap-front jacket with satin lining and bold back graphic.",
    detailPhrases: [
      "striped rib trims mirror archival pieces",
      "snap front makes on-off easy between drills",
      "subtle interior pocket hides credentials"
    ],
    basePrice: 96,
    sizeGroup: "adult_unisex_apparel",
    tags: ["coaches", "heritage", "sideline"],
    materials: ["Nylon Shell", "Satin Lining"],
    featurePhrases: ["striped rib", "snap front", "interior pocket"],
    imageSlug: "coaches-jacket",
    skuPrefix: "OUT03",
    variations: 14
  },
  {
    categoryId: "headwear",
    baseName: "Structured Cap",
    synopsis: "Structured fitted cap with raised embroidery.",
    detailPhrases: [
      "moisture-wicking band keeps comfort dialed in",
      "contrast undervisor cuts glare",
      "structured crown keeps its shape"
    ],
    basePrice: 42,
    sizeGroup: "headwear",
    tags: ["cap", "fitted", "on-field"],
    materials: ["Poly Wool Blend", "Performance Sweatband"],
    featurePhrases: ["raised embroidery", "contrast undervisor", "fused crown"],
    imageSlug: "structured-cap",
    skuPrefix: "HDW01",
    variations: 16
  },
  {
    categoryId: "headwear",
    baseName: "Trucker Snapback",
    synopsis: "Mesh-back snapback with rope bill detail.",
    detailPhrases: [
      "breathable mesh keeps air moving",
      "rope accent adds throwback flair",
      "adjustable snap customises the fit"
    ],
    basePrice: 32,
    sizeGroup: "headwear",
    tags: ["snapback", "mesh", "rope"],
    materials: ["Cotton Twill", "Poly Mesh"],
    featurePhrases: ["rope bill", "mesh panels", "adjustable snap"],
    imageSlug: "trucker-snapback",
    skuPrefix: "HDW02",
    variations: 16
  },
  {
    categoryId: "headwear",
    baseName: "Performance Visor",
    synopsis: "Lightweight visor for midday practices.",
    detailPhrases: [
      "laser perforations keep heat off the crown",
      "hook-and-loop strap adjusts in seconds",
      "sweatband handles long rally chants"
    ],
    basePrice: 28,
    sizeGroup: "headwear",
    tags: ["visor", "sideline", "lightweight"],
    materials: ["Performance Polyester", "Laser Panels"],
    featurePhrases: ["laser perforations", "moisture band", "hook strap"],
    imageSlug: "performance-visor",
    skuPrefix: "HDW03",
    variations: 14
  },
  {
    categoryId: "footwear",
    baseName: "Campus Trainer",
    synopsis: "Lightweight trainer tuned for campus commutes.",
    detailPhrases: [
      "responsive foam cushions every step",
      "engineered knit breathes with ease",
      "TPU heel clip locks in support"
    ],
    basePrice: 98,
    sizeGroup: "footwear",
    tags: ["trainer", "sneaker", "lightweight"],
    materials: ["Engineered Knit", "Responsive Foam", "TPU Clip"],
    featurePhrases: ["foam midsole", "knit upper", "woven heel tab"],
    imageSlug: "campus-trainer",
    skuPrefix: "FTW01",
    variations: 18
  },
  {
    categoryId: "footwear",
    baseName: "Doak Slides",
    synopsis: "Molded slides inspired by stadium seating.",
    detailPhrases: [
      "textured footbed grips after pool sessions",
      "dual-density foam softens landings",
      "strap embossing shows team pride"
    ],
    basePrice: 46,
    sizeGroup: "footwear",
    tags: ["slides", "casual", "comfort"],
    materials: ["EVA Foam", "Textured Footbed"],
    featurePhrases: ["embossed strap", "dual foam", "water friendly"],
    imageSlug: "doak-slides",
    skuPrefix: "FTW02",
    variations: 16
  },
  {
    categoryId: "footwear",
    baseName: "Luxe High-Top",
    synopsis: "Premium lifestyle high-top with leather overlays.",
    detailPhrases: [
      "full-grain leather breaks in beautifully",
      "suede heel counter adds depth",
      "speckled midsole nods to garnet confetti"
    ],
    basePrice: 138,
    sizeGroup: "footwear",
    tags: ["sneaker", "premium", "lifestyle"],
    materials: ["Full-Grain Leather", "Suede Overlays", "Rubber Cupsole"],
    featurePhrases: ["metal eyelets", "suede heel", "speckled midsole"],
    imageSlug: "luxe-high-top",
    skuPrefix: "FTW03",
    variations: 16
  },
  {
    categoryId: "accessories",
    baseName: "Clear Stadium Tote",
    synopsis: "Stadium-approved tote with reinforced trims.",
    detailPhrases: [
      "weather-treated edging adds structure",
      "contrast straps highlight school colours",
      "zip pocket secures loose items"
    ],
    basePrice: 32,
    sizeGroup: "accessories",
    tags: ["bag", "stadium", "clear"],
    materials: ["Clear TPU", "Reinforced Nylon"],
    featurePhrases: ["weather zip", "contrast straps", "detachable pouch"],
    imageSlug: "clear-stadium-tote",
    skuPrefix: "ACC01",
    variations: 16
  },
  {
    categoryId: "accessories",
    baseName: "Seminole Duffel",
    synopsis: "Travel-ready duffel sized for weekend trips.",
    detailPhrases: [
      "coated canvas repels light rain",
      "reinforced base handles heavy loads",
      "shoe garage keeps cleats separate"
    ],
    basePrice: 94,
    sizeGroup: "accessories",
    tags: ["bag", "travel", "duffel"],
    materials: ["Coated Canvas", "Metal Hardware"],
    featurePhrases: ["removable strap", "shoe garage", "embossed handles"],
    imageSlug: "seminole-duffel",
    skuPrefix: "ACC02",
    variations: 16
  },
  {
    categoryId: "accessories",
    baseName: "Heritage Scarf",
    synopsis: "Soft knit scarf with jacquard graphics.",
    detailPhrases: [
      "double-sided artwork shows love from every angle",
      "fringe ends add movement",
      "soft yarn keeps warmth close"
    ],
    basePrice: 28,
    sizeGroup: "accessories",
    tags: ["scarf", "winter", "knit"],
    materials: ["Acrylic Knit", "Fringe Detailing"],
    featurePhrases: ["jacquard art", "double sided", "tassel fringe"],
    imageSlug: "heritage-scarf",
    skuPrefix: "ACC03",
    variations: 16
  },
  {
    categoryId: "accessories",
    baseName: "Campus Lanyard",
    synopsis: "Durable lanyard for IDs and keys.",
    detailPhrases: [
      "satin webbing feels smooth against the skin",
      "detachable buckle hands off badges fast",
      "metal swivel clip secures passes"
    ],
    basePrice: 12,
    sizeGroup: "accessories",
    tags: ["lanyard", "essentials", "gift"],
    materials: ["Polyester Webbing", "Metal Hardware"],
    featurePhrases: ["detachable buckle", "double print", "swivel clasp"],
    imageSlug: "campus-lanyard",
    skuPrefix: "ACC04",
    variations: 16
  },
  {
    categoryId: "tailgating",
    baseName: "Tailgate Canopy",
    synopsis: "10x10 canopy with weather-treated fabric.",
    detailPhrases: [
      "powder-coated frame pops up in minutes",
      "UV-blocking fabric keeps the party shaded",
      "logoed peak stands tall in the sea of fans"
    ],
    basePrice: 244,
    sizeGroup: "tailgate",
    tags: ["canopy", "tailgate", "outdoor"],
    materials: ["Steel Frame", "Weather Polyester"],
    featurePhrases: ["push button frame", "UV fabric", "roller bag"],
    imageSlug: "tailgate-canopy",
    skuPrefix: "TLG01",
    variations: 18
  },
  {
    categoryId: "tailgating",
    baseName: "Insulated Cooler",
    synopsis: "Soft cooler with leakproof lining and spear graphic.",
    detailPhrases: [
      "heat-sealed seams prevent melting messes",
      "front pocket stores bottle openers",
      "adjustable strap swings comfortably"
    ],
    basePrice: 86,
    sizeGroup: "tailgate",
    tags: ["cooler", "insulated", "tailgate"],
    materials: ["600D Polyester", "Leakproof Liner"],
    featurePhrases: ["heat-sealed liner", "dual straps", "accessory pocket"],
    imageSlug: "insulated-cooler",
    skuPrefix: "TLG02",
    variations: 18
  },
  {
    categoryId: "tailgating",
    baseName: "Cornhole Set",
    synopsis: "Tournament-grade cornhole boards with custom bags.",
    detailPhrases: [
      "regulation sizing encourages serious play",
      "folding legs make storage simple",
      "resin-filled bags land with satisfying thunks"
    ],
    basePrice: 268,
    sizeGroup: "tailgate",
    tags: ["games", "cornhole", "tailgate"],
    materials: ["Birch Hardwood", "Canvas Bags"],
    featurePhrases: ["folding legs", "UV graphics", "resin bags"],
    imageSlug: "cornhole-set",
    skuPrefix: "TLG03",
    variations: 16
  },
  {
    categoryId: "home_office",
    baseName: "Campus Throw",
    synopsis: "Oversized jacquard throw featuring campus landmarks.",
    detailPhrases: [
      "loom-knit artwork pops on any sofa",
      "fringe edging nods to heritage pieces",
      "soft touch keeps chill away"
    ],
    basePrice: 76,
    sizeGroup: "home_office",
    tags: ["blanket", "home", "decor"],
    materials: ["Jacquard Knit", "Brushed Acrylic"],
    featurePhrases: ["fringe edge", "double sided", "loom knit"],
    imageSlug: "campus-throw",
    skuPrefix: "HOM01",
    variations: 16
  },
  {
    categoryId: "home_office",
    baseName: "Stoneware Mug",
    synopsis: "16oz stoneware mug with layered glazes.",
    detailPhrases: [
      "reactive glaze creates one-of-a-kind patterns",
      "medallion badge shows off the crest",
      "sturdy handle handles early classes"
    ],
    basePrice: 28,
    sizeGroup: "home_office",
    tags: ["mug", "drinkware", "stoneware"],
    materials: ["Stoneware", "Reactive Glaze"],
    featurePhrases: ["hand-applied medallion", "dishwasher safe", "microwave ready"],
    imageSlug: "stoneware-mug",
    skuPrefix: "HOM02",
    variations: 16
  },
  {
    categoryId: "home_office",
    baseName: "Script Desk Mat",
    synopsis: "Extended desk mat with micro-weave surface.",
    detailPhrases: [
      "anti-fray stitching survives long study nights",
      "rubber backing stays planted",
      "micro-weave tracks mice smoothly"
    ],
    basePrice: 34,
    sizeGroup: "home_office",
    tags: ["desk", "workspace", "gaming"],
    materials: ["Micro-Weave Fabric", "Rubber Backing"],
    featurePhrases: ["anti-fray edges", "non-slip base", "colourfast print"],
    imageSlug: "script-desk-mat",
    skuPrefix: "HOM03",
    variations: 16
  },
  {
    categoryId: "collectibles",
    baseName: "Signed Mini Helmet",
    synopsis: "Autographed mini helmet in protective display case.",
    detailPhrases: [
      "tamper-proof hologram verifies authenticity",
      "mirrored base reflects every angle",
      "numbered plaque marks the series"
    ],
    basePrice: 242,
    sizeGroup: "collectibles",
    tags: ["signed", "helmet", "limited"],
    materials: ["Polycarbonate Shell", "Acrylic Case"],
    featurePhrases: ["tamper hologram", "mirrored base", "numbered plaque"],
    imageSlug: "signed-mini-helmet",
    skuPrefix: "COL01",
    variations: 14
  },
  {
    categoryId: "collectibles",
    baseName: "Championship Banner",
    synopsis: "Wool felt banner celebrating title seasons.",
    detailPhrases: [
      "embroidered lettering honours the legacy",
      "felt construction looks premium in any office",
      "hanging tabs make installation easy"
    ],
    basePrice: 96,
    sizeGroup: "collectibles",
    tags: ["banner", "felt", "display"],
    materials: ["Wool Felt", "Embroidery"],
    featurePhrases: ["embroidered text", "felt body", "hanging tabs"],
    imageSlug: "championship-banner",
    skuPrefix: "COL02",
    variations: 14
  },
  {
    categoryId: "collectibles",
    baseName: "Turf Display",
    synopsis: "Framed slice of game-used turf with engraved plaque.",
    detailPhrases: [
      "UV acrylic shields the piece from fading",
      "etched brass plate details the opponent",
      "hardwood frame slots into trophy walls"
    ],
    basePrice: 288,
    sizeGroup: "collectibles",
    tags: ["turf", "display", "premium"],
    materials: ["Hardwood", "UV Acrylic"],
    featurePhrases: ["etched plaque", "UV guard", "display stand"],
    imageSlug: "turf-display",
    skuPrefix: "COL03",
    variations: 14
  },
  {
    categoryId: "youth",
    baseName: "Future Nole Tee",
    synopsis: "Soft youth tee for the next generation.",
    detailPhrases: [
      "tagless neck stops itch",
      "soft-hand ink stays bright",
      "youth cut keeps it playful"
    ],
    basePrice: 22,
    sizeGroup: "youth_apparel",
    tags: ["youth", "tee", "soft"],
    materials: ["Cotton Blend", "Soft Ink"],
    featurePhrases: ["tagless neck", "soft ink", "youth fit"],
    imageSlug: "future-nole-tee",
    skuPrefix: "YTH01",
    variations: 12
  },
  {
    categoryId: "youth",
    baseName: "Youth Zip Hoodie",
    synopsis: "Cozy zip hoodie scaled for younger fans.",
    detailPhrases: [
      "split kangaroo pocket warms hands",
      "rib cuffs stay put on the playground",
      "lined hood feels plush"
    ],
    basePrice: 44,
    sizeGroup: "youth_apparel",
    tags: ["youth", "hoodie", "fleece"],
    materials: ["Brushed Fleece", "Poly Cotton"],
    featurePhrases: ["split pocket", "rib cuffs", "lined hood"],
    imageSlug: "youth-zip-hoodie",
    skuPrefix: "YTH02",
    variations: 12
  }
] as const;

const colorwaysForTemplate = (template: ProductTemplate): readonly Colorway[] => {
  if (!template.colorFamilies || template.colorFamilies.length === 0) {
    return DEFAULT_COLORWAYS;
  }
  const palette = template.colorFamilies;
  const match = DEFAULT_COLORWAYS.filter(
    (way) => palette.includes(way.primary) || palette.includes(way.secondary)
  );
  return match.length > 0 ? match : DEFAULT_COLORWAYS;
};

const createMulberry32 = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), a | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const pick = <T>(values: readonly T[], rng: () => number): T => {
  const index = Math.floor(rng() * values.length);
  return values[index];
};

const shuffle = <T>(input: readonly T[], rng: () => number): T[] => {
  const result = [...input];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const roundCurrency = (value: number): number => Math.round(value * 100) / 100;

const computePriceTier = (price: number): PriceTier => {
  if (price >= 180) return "Limited";
  if (price >= 90) return "Premium";
  if (price >= 45) return "Core";
  return "Value";
};

const unique = <T>(values: Iterable<T>): T[] => {
  const seen = new Set<T>();
  const result: T[] = [];
  for (const value of values) {
    if (!seen.has(value)) {
      seen.add(value);
      result.push(value);
    }
  }
  return result;
};

const buildImageAsset = (
  template: ProductTemplate,
  variationIndex: number,
  descriptor: string,
  size: { width: number; height: number },
  color: string
): ImageAsset => {
  const padded = String(variationIndex + 1).padStart(2, "0");
  const url = `https://cdn.nolegear.com/products/${template.categoryId}/${template.imageSlug}-${padded}-${descriptor}.jpg`;
  return {
    url,
    alt: `${template.baseName} in ${color} - ${descriptor}`,
    width: size.width,
    height: size.height,
    dominantColor: COLOR_HEXES[color] ?? "#782F40"
  };
};

const groupSizeOptions = (
  options: readonly SizeOption[]
): Map<SizeGroup, SizeOption[]> => {
  const map = new Map<SizeGroup, SizeOption[]>();
  for (const option of options) {
    const bucket = map.get(option.group);
    if (bucket) {
      bucket.push(option);
    } else {
      map.set(option.group, [option]);
    }
  }
  for (const [, group] of map.entries()) {
    group.sort((a, b) => a.ordinal - b.ordinal);
  }
  return map;
};

export const generateCatalogSnapshot = ({
  seed,
  categoryDefinitions = CATEGORY_DEFINITIONS,
  sizeOptions = SIZE_OPTIONS
}: GenerateCatalogOptions): CatalogSnapshot => {
  const rng = createMulberry32(seed);
  const sizeOptionsByGroup = groupSizeOptions(sizeOptions);
  const items: MerchItem[] = [];
  const randomizedStoryTags = shuffle(STORY_TAGS, rng);
  const baseTimestamp = Date.UTC(2023, 6, 1);

  PRODUCT_TEMPLATES.forEach((template, templateIndex) => {
    const colorways = colorwaysForTemplate(template);
    for (let variant = 0; variant < template.variations; variant += 1) {
      const colorway = pick(colorways, rng);
      const adjective = pick(ADJECTIVES, rng);
      const motif = pick(MOTIFS, rng);
      const feature = pick(template.featurePhrases, rng);
      const auxiliaryFeature = pick(DEFAULT_FEATURES, rng);
      const details = shuffle(template.detailPhrases, rng).slice(0, 2);

      const fullName = `${adjective} ${template.baseName}`;
      const colorDescriptor = `${colorway.primary}/${colorway.secondary}`;
      const sku = `FSU-${template.skuPrefix}${String(variant + 1).padStart(3, "0")}`;
      const slug = `${slugify(`${fullName}-${motif}-${colorDescriptor}`)}-${variant + 1}`;
      const id = `merch-${String(items.length + 1).padStart(4, "0")}`;

      const basePrice = template.basePrice + (rng() - 0.5) * 12;
      const listPrice = roundCurrency(Math.max(10, basePrice));
      const onSale = rng() > 0.72;
      const salePrice = onSale
        ? roundCurrency(listPrice * (0.82 + rng() * 0.1))
        : undefined;
      const memberPrice = salePrice
        ? roundCurrency(Math.max(5, salePrice * (0.9 - rng() * 0.08)))
        : rng() > 0.82
        ? roundCurrency(Math.max(5, listPrice * (0.94 - rng() * 0.06)))
        : undefined;
      const loyaltyPoints = Math.round(listPrice * (1.5 + rng() * 0.7));
      const priceTier = computePriceTier(listPrice);
      const discountPercent = salePrice
        ? roundCurrency(100 - (salePrice / listPrice) * 100)
        : undefined;
      const onlineExclusive = rng() > 0.84;
      const lastUpdated = new Date(
        baseTimestamp + Math.floor(rng() * 420) * 86_400_000
      ).toISOString();

      const price: PriceMetadata = {
        currency: "USD",
        listPrice,
        salePrice,
        memberPrice,
        discountPercent,
        loyaltyPoints,
        priceTier,
        isOnSale: Boolean(salePrice),
        onlineExclusive,
        lastUpdated
      };

      const availableSizes = sizeOptionsByGroup.get(template.sizeGroup) ?? [];
      const availableSizeIds = availableSizes.map((option) => option.id);

      const quantity = Math.max(4, Math.round(26 + rng() * 190));
      const isLimited = price.priceTier === "Limited" || rng() > 0.9;
      const status = quantity < 12 ? "preorder" : quantity < 32 ? "low_stock" : "in_stock";
      const restockDate =
        status === "preorder"
          ? new Date(baseTimestamp + Math.floor(rng() * 120) * 86_400_000).toISOString()
          : undefined;

      const ratingAverage = roundCurrency(4 + rng() * 1);
      const ratingCount = Math.round(28 + rng() * 340);
      const releaseSeason = pick(RELEASE_SEASONS, rng);
      const introducedAt = new Date(
        baseTimestamp + Math.floor(rng() * 520) * 86_400_000
      ).toISOString();

      const primaryImage = buildImageAsset(template, variant, "primary", { width: 1600, height: 1600 }, colorway.primary);
      const alt1 = buildImageAsset(template, variant, "alt-1", { width: 1400, height: 1400 }, colorway.secondary);
      const alt2 = buildImageAsset(template, variant, "detail", { width: 1200, height: 1200 }, colorway.accent);
      const gallery: ImageAsset[] = [primaryImage, alt1, alt2];

      const materials = unique([
        ...template.materials,
        pick(MATERIAL_FALLBACKS, rng)
      ]);

      const tags = unique([
        ...template.tags,
        motif,
        colorway.primary,
        colorway.secondary,
        feature,
        auxiliaryFeature,
        randomizedStoryTags[(templateIndex + variant) % randomizedStoryTags.length]
      ]);

      const flags = unique([
        price.isOnSale ? "On Sale" : undefined,
        onlineExclusive ? "Online Exclusive" : undefined,
        isLimited ? "Limited Release" : undefined,
        quantity > 120 ? "Bulk Ready" : undefined,
        releaseSeason === "Fall 2024" ? "Fall Feature" : undefined
      ]).filter((flag): flag is string => Boolean(flag));

      const shortDescription = template.synopsis;
      const description = `${template.synopsis} ${details[0]}. ${details[1]} ${pick(DETAIL_CONNECTORS, rng)} featuring ${feature} and ${auxiliaryFeature}.`;

      const item: MerchItem = {
        id,
        sku,
        slug,
        name: `${fullName} (${motif})`,
        shortDescription,
        description,
        categoryId: template.categoryId,
        tags,
        colors: unique([colorway.primary, colorway.secondary, colorway.accent]).filter(
          (color): color is string => Boolean(color)
        ),
        materials,
        sizeGroup: template.sizeGroup,
        availableSizeIds,
        price,
        primaryImage,
        gallery,
        rating: { average: ratingAverage, count: ratingCount },
        releaseSeason,
        inventory: {
          quantity,
          status,
          restockDate
        },
        flags,
        isLimited,
        introducedAt
      };

      items.push(item);
    }
  });

  if (items.length < 500) {
    throw new Error(`Catalog generation failed expected >=500 items, received ${items.length}`);
  }

  const generatedAt = new Date(Date.UTC(2024, 7, 15, 12, 0, 0)).toISOString();

  return {
    seed,
    generatedAt,
    items: items as readonly MerchItem[],
    categories: categoryDefinitions,
    sizeOptions: sizeOptions
  };
};
