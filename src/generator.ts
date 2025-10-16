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
  shortDescription: string;
  detailedDescription: string;
  basePrice: number;
  sizeGroup: SizeGroup;
  tags: readonly string[];
  materials: readonly string[];
  featurePhrases: readonly string[];
  imageSlug: string;
  skuPrefix: string;
  variationCount: number;
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
  { primary: "Garnet", secondary: "White", accent: "Victory Gold" },
  { primary: "Charcoal", secondary: "Garnet", accent: "Stadium Silver" },
  { primary: "Garnet", secondary: "Seminole Tan", accent: "Victory Gold" },
  { primary: "Maroon", secondary: "Victory Gold", accent: "White" },
  { primary: "Midnight Garnet", secondary: "Gold", accent: "Graphite" },
  { primary: "Garnet", secondary: "Stadium Silver", accent: "White" },
  { primary: "Matte Gold", secondary: "Garnet", accent: "Cream" },
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
  "Chief",
  "Triumph",
  "War Path",
  "Unconquered",
  "Legacy",
  "Frontline",
  "Spearhead",
  "Torch",
  "Cypress"
] as const;

const MOTIFS = [
  "Spear",
  "Seminole Head",
  "Block FSU",
  "Script Noles",
  "Flying F",
  "Doak Campbell",
  "Unconquered",
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
  "Recycled",
  "Hand Finished"
] as const;

const DEFAULT_FEATURES = [
  "moisture-wicking comfort",
  "UV 40+ protection",
  "anti-odor technology",
  "reinforced seams",
  "four-way stretch flexibility",
  "sustainably sourced materials",
  "game day tested durability",
  "a soft-hand finish",
  "premium embroidery",
  "bold collegiate graphics"
] as const;

const PRODUCT_TEMPLATES: readonly ProductTemplate[] = [
  {
    categoryId: "apparel",
    baseName: "Performance Tee",
    shortDescription: "Lightweight unisex tee built for the next big game.",
    detailedDescription:
      "Stay cool from first whistle to final drive with breathable mesh panels and an athletic cut inspired by the players.",
    basePrice: 34,
    sizeGroup: "adult_unisex_apparel",
    tags: ["tee", "performance", "lightweight"],
    materials: ["Performance Polyester", "Mesh Ventilation", "Recycled Fibers"],
    featurePhrases: [
      "mesh underarm gussets",
      "heat-transfer Seminole crest",
      "vented side split hem",
      "flatlock seam construction"
    ],
    imageSlug: "performance-tee",
    skuPrefix: "APP01",
    variationCount: 16,
    colorFamilies: ["Garnet", "Victory Gold", "Charcoal", "Matte Black"]
  },
  {
    categoryId: "apparel",
    baseName: "Heritage Polo",
    shortDescription: "Sideline-approved polo with moisture control.",
    detailedDescription:
      "Engineered with stretch pique fabric and subtle tonal striping for elevated campus-ready polish.",
    basePrice: 62,
    sizeGroup: "adult_unisex_apparel",
    tags: ["polo", "sideline", "heritage"],
    materials: ["Stretch Pique", "Cooling Yarn Blend"],
    featurePhrases: [
      "taped shoulder seams",
      "three-button placket",
      "contrast collar tipping",
      "laser-cut ventilation"
    ],
    imageSlug: "heritage-polo",
    skuPrefix: "APP02",
    variationCount: 14,
    colorFamilies: ["Garnet", "White", "Graphite", "Victory Gold"]
  },
  {
    categoryId: "apparel",
    baseName: "Retro Crewneck",
    shortDescription: "Brushed fleece crew celebrating iconic campus art.",
    detailedDescription:
      "Vintage-inspired chenille patches and garment-washed softness deliver a throwback feel with modern warmth.",
    basePrice: 68,
    sizeGroup: "adult_unisex_apparel",
    tags: ["crewneck", "vintage", "fleece"],
    materials: ["Ring-Spun Cotton", "Brushed Fleece", "Recycled Polyester"],
    featurePhrases: [
      "rib-knit cuffs",
      "drop shoulder silhouette",
      "garment-dyed finish",
      "heritage chenille patches"
    ],
    imageSlug: "retro-crewneck",
    skuPrefix: "APP03",
    variationCount: 12,
    colorFamilies: ["Heritage Garnet", "Cream", "Matte Black"]
  },
  {
    categoryId: "apparel",
    baseName: "Campus Jogger",
    shortDescription: "Athletic joggers designed for all-day Seminole pride.",
    detailedDescription:
      "Streamlined modern fit with zippered media pockets and a brushed interior that keeps you ready for any rally.",
    basePrice: 58,
    sizeGroup: "adult_unisex_apparel",
    tags: ["pants", "athleisure", "joggers"],
    materials: ["Double-Knit Fleece", "Recycled Nylon Panels"],
    featurePhrases: [
      "zippered utility pocket",
      "articulated knees",
      "elastic cuffs",
      "waist drawcord eyelets"
    ],
    imageSlug: "campus-jogger",
    skuPrefix: "APP04",
    variationCount: 12,
    colorFamilies: ["Matte Black", "Charcoal", "Garnet"]
  },
  {
    categoryId: "apparel",
    baseName: "Script Hoodie",
    shortDescription: "Midweight hoodie with plush interior and script logo.",
    detailedDescription:
      "Elevated fleece hoodie featuring a double-layer hood, tonal embroidery, and premium rib details for an on-trend fit.",
    basePrice: 74,
    sizeGroup: "adult_unisex_apparel",
    tags: ["hoodie", "midweight", "script"],
    materials: ["Cotton Fleece", "Poly Blend Lining"],
    featurePhrases: [
      "kangaroo media pocket",
      "lined hood",
      "embroidered script logo",
      "contrast drawcord"
    ],
    imageSlug: "script-hoodie",
    skuPrefix: "APP05",
    variationCount: 14,
    colorFamilies: ["Garnet", "Matte Black", "White", "Graphite"]
  },
  {
    categoryId: "apparel",
    baseName: "Varsity Long Sleeve",
    shortDescription: "Breathable long sleeve tee with varsity striping.",
    detailedDescription:
      "Slub jersey fabric and vintage sleeve striping make this a layered staple when the breeze rolls into the stadium.",
    basePrice: 42,
    sizeGroup: "adult_unisex_apparel",
    tags: ["long sleeve", "varsity", "layering"],
    materials: ["Slub Cotton", "Poly Jersey Blend"],
    featurePhrases: [
      "applique sleeve stripes",
      "athletic rib collar",
      "locker loop detail",
      "side split hem"
    ],
    imageSlug: "varsity-long-sleeve",
    skuPrefix: "APP06",
    variationCount: 10,
    colorFamilies: ["Garnet", "Cream", "Victory Gold"]
  },
  {
    categoryId: "apparel",
    baseName: "Gameday Tank",
    shortDescription: "Lightweight tank ready for midday kickoffs.",
    detailedDescription:
      "Sweat-wicking fabric, mesh racerback panels, and bold collegiate graphics combine for hot-day tailgates.",
    basePrice: 36,
    sizeGroup: "women_apparel",
    tags: ["tank", "women", "lightweight"],
    materials: ["Poly Mesh", "Soft Touch Jersey"],
    featurePhrases: [
      "laser-cut racerback",
      "scalloped hem",
      "flat seam binding"
    ],
    imageSlug: "gameday-tank",
    skuPrefix: "APP07",
    variationCount: 10,
    colorFamilies: ["Garnet", "White", "Citrus Flash"]
  },
  {
    categoryId: "apparel",
    baseName: "Club Quarter-Zip",
    shortDescription: "Layerable quarter-zip with breathable paneling.",
    detailedDescription:
      "Contrast woven overlays and an athletic mock neck deliver a modern sideline aesthetic for transitional weather.",
    basePrice: 64,
    sizeGroup: "adult_unisex_apparel",
    tags: ["quarter zip", "layering", "sideline"],
    materials: ["Tech Fleece", "Woven Overlays"],
    featurePhrases: [
      "concealed kangaroo pocket",
      "thumbhole cuffs",
      "reflective piping",
      "drop-tail hem"
    ],
    imageSlug: "club-quarter-zip",
    skuPrefix: "APP08",
    variationCount: 12,
    colorFamilies: ["Garnet", "Charcoal", "Matte Black"]
  },
  {
    categoryId: "apparel",
    baseName: "Heritage Baseball Tee",
    shortDescription: "Two-tone raglan built for relaxed spirit wear.",
    detailedDescription:
      "Ring-spun cotton softness, contrast raglan sleeves, and a throwback print honouring championship seasons.",
    basePrice: 38,
    sizeGroup: "adult_unisex_apparel",
    tags: ["raglan", "heritage", "casual"],
    materials: ["Ring-Spun Cotton", "Heathered Jersey"],
    featurePhrases: [
      "contrast raglan sleeves",
      "locker patch detail",
      "vintage soft-hand ink"
    ],
    imageSlug: "heritage-baseball-tee",
    skuPrefix: "APP09",
    variationCount: 10,
    colorFamilies: ["Garnet", "Victory Gold", "Vintage White"]
  },
  {
    categoryId: "apparel",
    baseName: "Velocity Compression Top",
    shortDescription: "Engineered compression for training days.",
    detailedDescription:
      "Strategically placed ventilation zones and four-way stretch keep you moving with unstoppable energy.",
    basePrice: 48,
    sizeGroup: "adult_unisex_apparel",
    tags: ["compression", "training", "performance"],
    materials: ["Nylon Elastane", "Vent Mesh"],
    featurePhrases: [
      "body-mapped ventilation",
      "ergonomic seaming",
      "anti-slip hem",
      "reflective spear motif"
    ],
    imageSlug: "velocity-compression-top",
    skuPrefix: "APP10",
    variationCount: 12,
    colorFamilies: ["Matte Black", "Garnet", "Charcoal"]
  },
  {
    categoryId: "outerwear",
    baseName: "Sideline Puffer",
    shortDescription: "Insulated puffer ready for cold night kickoffs.",
    detailedDescription:
      "Layer up with lightweight synthetic insulation, weather-resistant shell fabric, and bold sideline branding.",
    basePrice: 142,
    sizeGroup: "adult_unisex_apparel",
    tags: ["puffer", "cold weather", "sideline"],
    materials: ["Synthetic Down", "Ripstop Shell"],
    featurePhrases: [
      "storm guard hood",
      "zippered chest pocket",
      "stadium pass pocket",
      "bungee hem adjustment"
    ],
    imageSlug: "sideline-puffer",
    skuPrefix: "OUT01",
    variationCount: 12,
    colorFamilies: ["Garnet", "Storm Grey", "Matte Black"]
  },
  {
    categoryId: "outerwear",
    baseName: "Varsity Letterman",
    shortDescription: "Wool-blend varsity jacket with chenille appliqué.",
    detailedDescription:
      "Classic varsity styling meets modern tailoring with leather sleeves and limited-edition back embroidery.",
    basePrice: 198,
    sizeGroup: "adult_unisex_apparel",
    tags: ["letterman", "limited", "collector"],
    materials: ["Wool Blend", "Genuine Leather", "Poly Satin Lining"],
    featurePhrases: [
      "contrast leather sleeves",
      "embroidered championship years",
      "snap front closure",
      "custom woven labels"
    ],
    imageSlug: "varsity-letterman",
    skuPrefix: "OUT02",
    variationCount: 8,
    colorFamilies: ["Heritage Garnet", "Matte Black"]
  },
  {
    categoryId: "outerwear",
    baseName: "Storm Anorak",
    shortDescription: "Water-resistant anorak built for unpredictable forecasts.",
    detailedDescription:
      "Half-zip silhouette with welded seams, packable hood, and tonal branding for stealth support in the stands.",
    basePrice: 110,
    sizeGroup: "adult_unisex_apparel",
    tags: ["anorak", "weatherproof", "layering"],
    materials: ["Performance Nylon", "Seam Seal Tape"],
    featurePhrases: [
      "zippered kangaroo pouch",
      "adjustable cuffs",
      "packable hood",
      "water-beading finish"
    ],
    imageSlug: "storm-anorak",
    skuPrefix: "OUT03",
    variationCount: 10,
    colorFamilies: ["Charcoal", "Garnet", "Stadium Silver"]
  },
  {
    categoryId: "outerwear",
    baseName: "Legacy Coaches Jacket",
    shortDescription: "Snap-front jacket with satin lining and bold back graphic.",
    detailedDescription:
      "Inspired by 90s sideline archives, this jacket features striped rib trims and a statement Seminoles wordmark.",
    basePrice: 96,
    sizeGroup: "adult_unisex_apparel",
    tags: ["coaches jacket", "heritage", "sideline"],
    materials: ["Nylon Shell", "Satin Lining"],
    featurePhrases: [
      "striped rib cuffs",
      "storm flap",
      "snap front",
      "embroidered back graphic"
    ],
    imageSlug: "legacy-coaches-jacket",
    skuPrefix: "OUT04",
    variationCount: 10,
    colorFamilies: ["Garnet", "Matte Black", "Victory Gold"]
  },
  {
    categoryId: "outerwear",
    baseName: "Cypress Sherpa",
    shortDescription: "Ultra-soft sherpa fleece with tonal overlays.",
    detailedDescription:
      "Cozy sherpa warmth pairs with water-resistant overlays and a subtle spear patch on the chest pocket.",
    basePrice: 98,
    sizeGroup: "adult_unisex_apparel",
    tags: ["sherpa", "cozy", "fall"],
    materials: ["High-Pile Sherpa", "Ripstop Overlay"],
    featurePhrases: [
      "secure chest pocket",
      "elastic binding",
      "stand collar",
      "contrast overlay panels"
    ],
    imageSlug: "cypress-sherpa",
    skuPrefix: "OUT05",
    variationCount: 8,
    colorFamilies: ["Cream", "Garnet", "Seminole Tan"]
  },
  {
    categoryId: "headwear",
    baseName: "Heritage 59FIFTY Cap",
    shortDescription: "Structured fitted cap with raised embroidery.",
    detailedDescription:
      "Official on-field silhouette featuring moisture-wicking banding and an iconic raised spear embroidery.",
    basePrice: 42,
    sizeGroup: "headwear",
    tags: ["cap", "fitted", "on-field"],
    materials: ["Poly Wool Blend", "Moisture Wicking Headband"],
    featurePhrases: [
      "fused crown",
      "raised embroidery",
      "contrast undervisor",
      "built-in sweatband"
    ],
    imageSlug: "heritage-59fifty",
    skuPrefix: "HDW01",
    variationCount: 12,
    colorFamilies: ["Garnet", "Matte Black", "Victory Gold"]
  },
  {
    categoryId: "headwear",
    baseName: "Trucker Snapback",
    shortDescription: "Mesh back snapback with campus patch.",
    detailedDescription:
      "Breathable mesh back panels, a rope-accent bill, and a vintage campus shield patch command attention.",
    basePrice: 32,
    sizeGroup: "headwear",
    tags: ["snapback", "rope", "mesh"],
    materials: ["Cotton Twill", "Poly Mesh"],
    featurePhrases: [
      "contrast rope bill",
      "adjustable snap",
      "mesh back panels",
      "woven campus patch"
    ],
    imageSlug: "trucker-snapback",
    skuPrefix: "HDW02",
    variationCount: 10,
    colorFamilies: ["Garnet", "Cream", "Matte Black"]
  },
  {
    categoryId: "headwear",
    baseName: "Sideline Visor",
    shortDescription: "Lightweight visor built for hot game days.",
    detailedDescription:
      "Stretch-fit visor with laser perforations and a raised spear hit on the crown for coaches' vibes.",
    basePrice: 28,
    sizeGroup: "headwear",
    tags: ["visor", "sideline", "lightweight"],
    materials: ["Performance Polyester", "Laser Cut Panels"],
    featurePhrases: [
      "laser perforated crown",
      "moisture-wick band",
      "hook-and-loop closure"
    ],
    imageSlug: "sideline-visor",
    skuPrefix: "HDW03",
    variationCount: 10,
    colorFamilies: ["White", "Garnet", "Victory Gold"]
  },
  {
    categoryId: "headwear",
    baseName: "Cuffed Beanie",
    shortDescription: "Rib knit beanie with woven Seminole label.",
    detailedDescription:
      "Cold weather essential featuring a soft fleece lining and tonal woven label pulled from the Spirit collection.",
    basePrice: 30,
    sizeGroup: "headwear",
    tags: ["beanie", "winter", "rib knit"],
    materials: ["Acrylic Knit", "Fleece Lining"],
    featurePhrases: [
      "fleece interior",
      "woven front label",
      "double cuff",
      "contrast pom"
    ],
    imageSlug: "cuffed-beanie",
    skuPrefix: "HDW04",
    variationCount: 10,
    colorFamilies: ["Garnet", "Cream", "Charcoal"]
  },
  {
    categoryId: "headwear",
    baseName: "Performance Bucket Hat",
    shortDescription: "360° sun coverage with Seminole flair.",
    detailedDescription:
      "All-conditions bucket hat constructed with quick-dry fabric, mesh eyelets, and an adjustable toggle.",
    basePrice: 36,
    sizeGroup: "headwear",
    tags: ["bucket", "sun", "performance"],
    materials: ["Ripstop Nylon", "Mesh Eyelets"],
    featurePhrases: [
      "adjustable crown toggle",
      "UPF-rated fabric",
      "sweatband lining",
      "stitched brim detail"
    ],
    imageSlug: "performance-bucket",
    skuPrefix: "HDW05",
    variationCount: 12,
    colorFamilies: ["Garnet", "Field Green", "Charcoal"]
  },
  {
    categoryId: "footwear",
    baseName: "Garnet Trainer",
    shortDescription: "Lightweight trainer tuned for campus commutes.",
    detailedDescription:
      "Responsive cushioning, breathable knit uppers, and no-slip laces help you sprint between classes and kickoff."
      ,
    basePrice: 98,
    sizeGroup: "footwear",
    tags: ["trainer", "sneaker", "lightweight"],
    materials: ["Engineered Knit", "TPU Heel Clip", "Responsive Foam"],
    featurePhrases: [
      "responsive foam midsole",
      "engineered knit upper",
      "sem translucent outsole",
      "waxed lace system"
    ],
    imageSlug: "garnet-trainer",
    skuPrefix: "FTW01",
    variationCount: 12,
    colorFamilies: ["Garnet", "Matte Black", "Stadium Silver"]
  },
  {
    categoryId: "footwear",
    baseName: "Doak Slides",
    shortDescription: "Comfort slides inspired by stadium seating.",
    detailedDescription:
      "Molded footbeds with texture mapping and spear debossing deliver comfort whether you're poolside or tailgating.",
    basePrice: 48,
    sizeGroup: "footwear",
    tags: ["slides", "comfort", "casual"],
    materials: ["EVA Foam", "Textured Footbed"],
    featurePhrases: [
      "textured footbed",
      "embossed strap logo",
      "dual-density foam",
      "water-friendly design"
    ],
    imageSlug: "doak-slides",
    skuPrefix: "FTW02",
    variationCount: 10,
    colorFamilies: ["Garnet", "White", "Graphite"]
  },
  {
    categoryId: "footwear",
    baseName: "Sideline Cleat",
    shortDescription: "Practice-ready cleat with Seminole detailing.",
    detailedDescription:
      "Lightweight synthetic upper and plate built to mirror player-issued gear with tonal spear hits on each quarter.",
    basePrice: 125,
    sizeGroup: "footwear",
    tags: ["cleat", "sideline", "performance"],
    materials: ["Synthetic Upper", "Carbon Plate"],
    featurePhrases: [
      "carbon-infused plate",
      "internal bootie",
      "lace lock system",
      "aggressive stud pattern"
    ],
    imageSlug: "sideline-cleat",
    skuPrefix: "FTW03",
    variationCount: 12,
    colorFamilies: ["Matte Black", "Garnet", "Victory Gold"]
  },
  {
    categoryId: "footwear",
    baseName: "Luxe Hypercourt",
    shortDescription: "High-top lifestyle sneaker with premium trims.",
    detailedDescription:
      "Full-grain leather uppers, suede overlays, and metallic eyelets elevate this lifestyle build with campus heritage cues.",
    basePrice: 142,
    sizeGroup: "footwear",
    tags: ["sneaker", "premium", "lifestyle"],
    materials: ["Full-Grain Leather", "Suede Overlays", "Rubber Cupsole"],
    featurePhrases: [
      "metal aglets",
      "suede heel counter",
      "speckled midsole",
      "embroidered tongue patch"
    ],
    imageSlug: "luxe-hypercourt",
    skuPrefix: "FTW04",
    variationCount: 14,
    colorFamilies: ["Garnet", "Seminole Tan", "Matte Black"]
  },
  {
    categoryId: "accessories",
    baseName: "Stadium Tote",
    shortDescription: "Clear tote meeting stadium entry guidelines.",
    detailedDescription:
      "Reinforced edges, tonal straps, and weatherproof zipper help you bring the essentials through security with ease.",
    basePrice: 32,
    sizeGroup: "accessories",
    tags: ["bag", "stadium compliant", "clear bag"],
    materials: ["Clear TPU", "Reinforced Nylon"],
    featurePhrases: [
      "reinforced seams",
      "weatherproof zipper",
      "contrast straps",
      "detachable pouch"
    ],
    imageSlug: "stadium-tote",
    skuPrefix: "ACC01",
    variationCount: 10,
    colorFamilies: ["Garnet", "Victory Gold", "Charcoal"]
  },
  {
    categoryId: "accessories",
    baseName: "Heritage Scarf",
    shortDescription: "Knit scarf with jacquard logos and fringe.",
    detailedDescription:
      "Soft-touch yarns and oversized team graphics keep you warm while chanting down the opponent section.",
    basePrice: 28,
    sizeGroup: "accessories",
    tags: ["scarf", "winter", "knit"],
    materials: ["Acrylic Knit", "Fringe Detailing"],
    featurePhrases: [
      "jacquard logos",
      "double-sided design",
      "tassel fringe",
      "soft brushed feel"
    ],
    imageSlug: "heritage-scarf",
    skuPrefix: "ACC02",
    variationCount: 10,
    colorFamilies: ["Garnet", "Victory Gold", "Cream"]
  },
  {
    categoryId: "accessories",
    baseName: "Campus Lanyard",
    shortDescription: "Durable lanyard with detachable clip and key ring.",
    detailedDescription:
      "Satin finish webbing and sublimated graphics ensure your FSU credentials stay close on campus and on the road.",
    basePrice: 12,
    sizeGroup: "accessories",
    tags: ["lanyard", "essentials", "gift"],
    materials: ["Polyester Webbing", "Metal Hardware"],
    featurePhrases: [
      "detachable buckle",
      "double-sided print",
      "metal swivel clasp"
    ],
    imageSlug: "campus-lanyard",
    skuPrefix: "ACC03",
    variationCount: 10,
    colorFamilies: ["Garnet", "Victory Gold", "Black"]
  },
  {
    categoryId: "accessories",
    baseName: "Seminole Duffel",
    shortDescription: "Carryall duffel sized for weekend trips.",
    detailedDescription:
      "Water-resistant canvas, reinforced base, and oversized spear embroidery make this bag a conversation starter.",
    basePrice: 94,
    sizeGroup: "accessories",
    tags: ["bag", "travel", "duffel"],
    materials: ["Coated Canvas", "Reinforced Base", "Metal Hardware"],
    featurePhrases: [
      "removable shoulder strap",
      "shoe garage",
      "embossed handles",
      "oversized embroidery"
    ],
    imageSlug: "seminole-duffel",
    skuPrefix: "ACC04",
    variationCount: 8,
    colorFamilies: ["Garnet", "Matte Black", "Seminole Tan"]
  },
  {
    categoryId: "accessories",
    baseName: "Legacy Belt",
    shortDescription: "Full-grain leather belt with etched buckle.",
    detailedDescription:
      "Hand-finished leather and a custom nickel buckle etched with the block FSU seal elevate daily uniforms.",
    basePrice: 46,
    sizeGroup: "accessories",
    tags: ["belt", "leather", "premium"],
    materials: ["Full-Grain Leather", "Nickel Buckle"],
    featurePhrases: [
      "laser-etched buckle",
      "burnished edges",
      "contrast stitching"
    ],
    imageSlug: "legacy-belt",
    skuPrefix: "ACC05",
    variationCount: 8,
    colorFamilies: ["Seminole Tan", "Matte Black", "Garnet"]
  },
  {
    categoryId: "accessories",
    baseName: "Spear Wristband",
    shortDescription: "Sweat-wicking wristband pair for practice and games.",
    detailedDescription:
      "Stretch terry construction with woven spear tab delivers dependable support during intense workouts.",
    basePrice: 16,
    sizeGroup: "accessories",
    tags: ["wristband", "athletic", "sweat"],
    materials: ["Stretch Terry", "Moisture Control Fibers"],
    featurePhrases: [
      "woven spear tab",
      "compression fit",
      "double-layer terry"
    ],
    imageSlug: "spear-wristband",
    skuPrefix: "ACC06",
    variationCount: 6,
    colorFamilies: ["Garnet", "White", "Victory Gold"]
  },
  {
    categoryId: "tailgating",
    baseName: "Tailgate Canopy",
    shortDescription: "10x10 canopy with weather-treated fabric.",
    detailedDescription:
      "Quick-deploy frame, UV-blocking fabric, and bold top panel graphics set the tone for pre-game gatherings.",
    basePrice: 248,
    sizeGroup: "tailgate",
    tags: ["canopy", "tailgate", "outdoor"],
    materials: ["Powder-Coated Steel", "Weather-Treated Polyester"],
    featurePhrases: [
      "push-button frame",
      "UV 50+ fabric",
      "double-stitched seams",
      "roller carry bag"
    ],
    imageSlug: "tailgate-canopy",
    skuPrefix: "TLG01",
    variationCount: 8,
    colorFamilies: ["Garnet", "Victory Gold", "Field Green"]
  },
  {
    categoryId: "tailgating",
    baseName: "Spirit Chair",
    shortDescription: "Foldable tailgate chair with cup holders.",
    detailedDescription:
      "Powder-coated frame, double cup holders, and a breathable back panel keep the cheers rolling quarters deep.",
    basePrice: 68,
    sizeGroup: "tailgate",
    tags: ["chair", "portable", "tailgate"],
    materials: ["Steel Frame", "Polyester Fabric"],
    featurePhrases: [
      "dual cup holders",
      "mesh back panel",
      "reinforced feet",
      "shoulder carry bag"
    ],
    imageSlug: "spirit-chair",
    skuPrefix: "TLG02",
    variationCount: 10,
    colorFamilies: ["Garnet", "Victory Gold", "Matte Black"]
  },
  {
    categoryId: "tailgating",
    baseName: "Insulated Cooler",
    shortDescription: "Soft cooler with leakproof lining and spear graphic.",
    detailedDescription:
      "Keeps beverages icy thanks to high-density foam insulation and fully sealed seams with tonal embroidery.",
    basePrice: 88,
    sizeGroup: "tailgate",
    tags: ["cooler", "insulated", "tailgate"],
    materials: ["600D Polyester", "Leakproof Liner"],
    featurePhrases: [
      "heat-sealed liner",
      "dual carry straps",
      "front accessory pocket",
      "bottle opener clip"
    ],
    imageSlug: "insulated-cooler",
    skuPrefix: "TLG03",
    variationCount: 10,
    colorFamilies: ["Garnet", "Charcoal", "Victory Gold"]
  },
  {
    categoryId: "tailgating",
    baseName: "Premium Cornhole Set",
    shortDescription: "Tournament-grade cornhole boards with custom bags.",
    detailedDescription:
      "Regulation size with UV-protected prints, collapsible legs, and dual-colour bags featuring team wordmarks.",
    basePrice: 278,
    sizeGroup: "tailgate",
    tags: ["games", "cornhole", "tailgate"],
    materials: ["Birch Hardwood", "Canvas Bags"],
    featurePhrases: [
      "reinforced frame",
      "folding legs",
      "resin-filled bags",
      "UV-protected artwork"
    ],
    imageSlug: "premium-cornhole",
    skuPrefix: "TLG04",
    variationCount: 8,
    colorFamilies: ["Garnet", "Victory Gold", "Matte Black"]
  },
  {
    categoryId: "tailgating",
    baseName: "Spirit Flag",
    shortDescription: "Durable flag with double-stitched edges.",
    detailedDescription:
      "Weather-resistant polyester and brass grommets keep this flag flying whether on RVs, porches, or campus greens.",
    basePrice: 38,
    sizeGroup: "tailgate",
    tags: ["flag", "outdoor", "decor"],
    materials: ["Weather-Resistant Polyester", "Brass Grommets"],
    featurePhrases: [
      "double-stitched edges",
      "fade-resistant ink",
      "two-sided graphics"
    ],
    imageSlug: "spirit-flag",
    skuPrefix: "TLG05",
    variationCount: 12,
    colorFamilies: ["Garnet", "Victory Gold", "White"]
  },
  {
    categoryId: "tailgating",
    baseName: "Legacy Grilling Set",
    shortDescription: "Three-piece grilling set with laser-etched logos.",
    detailedDescription:
      "Stainless tools with wooden handles house iconic marks and arrive in a durable roll-up carry case for gameday chefs.",
    basePrice: 74,
    sizeGroup: "tailgate",
    tags: ["grilling", "gift", "tailgate"],
    materials: ["Stainless Steel", "Hardwood Handles"],
    featurePhrases: [
      "laser-etched logos",
      "hanging loops",
      "padded carry roll"
    ],
    imageSlug: "legacy-grilling-set",
    skuPrefix: "TLG06",
    variationCount: 12,
    colorFamilies: ["Seminole Tan", "Garnet", "Matte Black"]
  },
  {
    categoryId: "home_office",
    baseName: "Campus Throw Blanket",
    shortDescription: "Oversized throw with woven campus landmarks.",
    detailedDescription:
      "Soft jacquard weave captures beloved campus icons and adds instant Garnet & Gold to the living room.",
    basePrice: 78,
    sizeGroup: "home_office",
    tags: ["blanket", "home", "decor"],
    materials: ["Jacquard Knit", "Brushed Acrylic"],
    featurePhrases: [
      "fringe edging",
      "double-sided design",
      "loom-knit construction"
    ],
    imageSlug: "campus-throw",
    skuPrefix: "HOM01",
    variationCount: 10,
    colorFamilies: ["Garnet", "Cream", "Victory Gold"]
  },
  {
    categoryId: "home_office",
    baseName: "Doak Blueprint Poster",
    shortDescription: "18x24 poster of Doak Campbell Stadium blueprint.",
    detailedDescription:
      "Printed on archival paper with metallic foil accents, this blueprint elevates wall space with architectural pride.",
    basePrice: 42,
    sizeGroup: "home_office",
    tags: ["poster", "art", "collectible"],
    materials: ["Archival Paper", "Foil Accents"],
    featurePhrases: [
      "archival inks",
      "metallic foil",
      "hand-numbered"
    ],
    imageSlug: "doak-blueprint",
    skuPrefix: "HOM02",
    variationCount: 8,
    colorFamilies: ["Garnet", "Matte Black", "Stadium Silver"]
  },
  {
    categoryId: "home_office",
    baseName: "Script Desk Mat",
    shortDescription: "Extended desk mat with micro-weave surface.",
    detailedDescription:
      "Precision-stitched edges, rubberised backing, and a script Noles motif add spirit to workstations.",
    basePrice: 36,
    sizeGroup: "home_office",
    tags: ["desk", "workspace", "gaming"],
    materials: ["Micro-Weave Fabric", "Rubber Backing"],
    featurePhrases: [
      "anti-fray stitching",
      "colourfast print",
      "non-slip backing"
    ],
    imageSlug: "script-desk-mat",
    skuPrefix: "HOM03",
    variationCount: 10,
    colorFamilies: ["Garnet", "Matte Black", "Stadium Silver"]
  },
  {
    categoryId: "home_office",
    baseName: "Seminole Stoneware Mug",
    shortDescription: "16oz stoneware mug with layered glazes.",
    detailedDescription:
      "Kiln-fired mug featuring a hand-applied Seminole crest medallion and reactive glaze that makes each piece unique.",
    basePrice: 28,
    sizeGroup: "home_office",
    tags: ["drinkware", "mug", "stoneware"],
    materials: ["Stoneware", "Reactive Glaze"],
    featurePhrases: [
      "hand-applied medallion",
      "microwave safe",
      "dishwasher safe"
    ],
    imageSlug: "seminole-mug",
    skuPrefix: "HOM04",
    variationCount: 10,
    colorFamilies: ["Garnet", "Cream", "Speckled Granite"]
  },
  {
    categoryId: "home_office",
    baseName: "Legacy Clock",
    shortDescription: "Wood mantle clock with brass spear inlay.",
    detailedDescription:
      "Rich walnut stain, brass accents, and precision quartz movement make this a heirloom-quality office accent.",
    basePrice: 118,
    sizeGroup: "home_office",
    tags: ["decor", "clock", "premium"],
    materials: ["Hardwood", "Brass Inlay", "Quartz Movement"],
    featurePhrases: [
      "brass spear inlay",
      "quartz movement",
      "engraved name plate"
    ],
    imageSlug: "legacy-clock",
    skuPrefix: "HOM05",
    variationCount: 8,
    colorFamilies: ["Seminole Tan", "Garnet", "Matte Black"]
  },
  {
    categoryId: "home_office",
    baseName: "Speckled Planter",
    shortDescription: "Ceramic planter with engraved spear badge.",
    detailedDescription:
      "Matte glaze exterior and drainage-ready base make this planter a subtle nod to Garnet & Gold in any room.",
    basePrice: 34,
    sizeGroup: "home_office",
    tags: ["planter", "home", "gift"],
    materials: ["Ceramic", "Matte Glaze"],
    featurePhrases: [
      "integrated drainage",
      "laser-etched badge",
      "foam base"
    ],
    imageSlug: "speckled-planter",
    skuPrefix: "HOM06",
    variationCount: 8,
    colorFamilies: ["Speckled Granite", "Cream", "Seminole Tan"]
  },
  {
    categoryId: "collectibles",
    baseName: "Signed Mini Helmet",
    shortDescription: "Autographed mini helmet in protective display case.",
    detailedDescription:
      "Limited run mini helmets signed by program legends, complete with tamper-proof authentication and mirrored base.",
    basePrice: 248,
    sizeGroup: "collectibles",
    tags: ["signed", "helmet", "limited"],
    materials: ["Polycarbonate Shell", "Acrylic Case"],
    featurePhrases: [
      "tamper-proof hologram",
      "mirrored base",
      "hand-signed",
      "limited numbering"
    ],
    imageSlug: "signed-mini-helmet",
    skuPrefix: "COL01",
    variationCount: 8,
    colorFamilies: ["Garnet", "Victory Gold", "Matte Black"]
  },
  {
    categoryId: "collectibles",
    baseName: "Game-Used Turf Display",
    shortDescription: "Framed turf slice from historic matchups.",
    detailedDescription:
      "Encased slice of authenticated Doak Campbell turf paired with laser-engraved plaques recounting unforgettable wins.",
    basePrice: 298,
    sizeGroup: "collectibles",
    tags: ["game used", "display", "premium"],
    materials: ["Acrylic", "Hardwood Frame"],
    featurePhrases: [
      "laser-etched plaques",
      "authenticated turf",
      "limited edition"
    ],
    imageSlug: "game-used-turf",
    skuPrefix: "COL02",
    variationCount: 8,
    colorFamilies: ["Garnet", "Seminole Tan", "Matte Black"]
  },
  {
    categoryId: "collectibles",
    baseName: "Championship Ticket Shadowbox",
    shortDescription: "Display shadowbox celebrating historic games.",
    detailedDescription:
      "Digitally remastered ticket artwork and metallic foil stamping create a centerpiece for trophy rooms.",
    basePrice: 216,
    sizeGroup: "collectibles",
    tags: ["shadowbox", "ticket", "heritage"],
    materials: ["Shadowbox Frame", "Foil Stamping"],
    featurePhrases: [
      "museum-grade mat",
      "foil stamped titles",
      "UV acrylic front"
    ],
    imageSlug: "ticket-shadowbox",
    skuPrefix: "COL03",
    variationCount: 8,
    colorFamilies: ["Garnet", "Victory Gold", "Matte Black"]
  },
  {
    categoryId: "collectibles",
    baseName: "Program Cover Art Print",
    shortDescription: "Limited art print of classic program covers.",
    detailedDescription:
      "Giclée prints on heavyweight stock, individually numbered and packaged with certificate of authenticity.",
    basePrice: 128,
    sizeGroup: "collectibles",
    tags: ["art", "print", "limited"],
    materials: ["Giclée Paper", "Archival Inks"],
    featurePhrases: [
      "hand-numbered",
      "debossed seal",
      "certificate of authenticity"
    ],
    imageSlug: "program-art-print",
    skuPrefix: "COL04",
    variationCount: 8,
    colorFamilies: ["Garnet", "Cream", "Victory Gold"]
  },
  {
    categoryId: "collectibles",
    baseName: "Bowden Legacy Coin",
    shortDescription: "Collectible coin honouring Coach Bowden.",
    detailedDescription:
      "Antique brass coin with etched details and presentation box commemorating a coaching legend.",
    basePrice: 88,
    sizeGroup: "collectibles",
    tags: ["coin", "legacy", "premium"],
    materials: ["Antique Brass", "Velvet Box"],
    featurePhrases: [
      "etched profile",
      "velvet display box",
      "numbered series"
    ],
    imageSlug: "bowden-legacy-coin",
    skuPrefix: "COL05",
    variationCount: 8,
    colorFamilies: ["Matte Gold", "Garnet", "Seminole Tan"]
  },
  {
    categoryId: "collectibles",
    baseName: "Championship Banner Set",
    shortDescription: "Set of felt banners recognising title seasons.",
    detailedDescription:
      "Wool felt banners with embroidered details celebrate the program's biggest wins across decades.",
    basePrice: 96,
    sizeGroup: "collectibles",
    tags: ["banner", "felt", "display"],
    materials: ["Wool Felt", "Embroidery"],
    featurePhrases: [
      "embroidered details",
      "heirloom craftsmanship",
      "custom display rods"
    ],
    imageSlug: "championship-banner",
    skuPrefix: "COL06",
    variationCount: 8,
    colorFamilies: ["Garnet", "Victory Gold", "Cream"]
  },
  {
    categoryId: "youth",
    baseName: "Future Nole Tee",
    shortDescription: "Soft youth tee celebrating future Seminoles.",
    detailedDescription:
      "Kid-friendly graphics and ultra-soft fabrics celebrate the next generation of Garnet & Gold legends.",
    basePrice: 22,
    sizeGroup: "youth_apparel",
    tags: ["youth", "tee", "soft"],
    materials: ["Cotton Blend", "Soft Hand Ink"],
    featurePhrases: [
      "tagless neck",
      "taped shoulders",
      "youth-specific fit"
    ],
    imageSlug: "future-nole-tee",
    skuPrefix: "YTH01",
    variationCount: 10,
    colorFamilies: ["Garnet", "Victory Gold", "White"]
  },
  {
    categoryId: "youth",
    baseName: "Mini Cheer Set",
    shortDescription: "Two-piece cheer set for spirited gamedays.",
    detailedDescription:
      "Pleated skirt and sleeveless top with glitter accents deliver cheer squad magic for the youngest fans.",
    basePrice: 48,
    sizeGroup: "youth_apparel",
    tags: ["youth", "cheer", "set"],
    materials: ["Poly Stretch", "Glitter Appliqué"],
    featurePhrases: [
      "glitter detailing",
      "elastic waistband",
      "lined bodice"
    ],
    imageSlug: "mini-cheer-set",
    skuPrefix: "YTH02",
    variationCount: 8,
    colorFamilies: ["Garnet", "Victory Gold", "White"]
  },
  {
    categoryId: "youth",
    baseName: "Youth Zip Hoodie",
    shortDescription: "Cozy zip hoodie sized for younger fans.",
    detailedDescription:
      "Brushed interior, split kangaroo pocket, and tonal graphics scale down essential Seminole style.",
    basePrice: 46,
    sizeGroup: "youth_apparel",
    tags: ["youth", "hoodie", "fleece"],
    materials: ["Brushed Fleece", "Poly Cotton Blend"],
    featurePhrases: [
      "split kangaroo pocket",
      "lined hood",
      "soft brushed interior"
    ],
    imageSlug: "youth-zip-hoodie",
    skuPrefix: "YTH03",
    variationCount: 8,
    colorFamilies: ["Garnet", "Charcoal", "White"]
  },
  {
    categoryId: "youth",
    baseName: "Junior Varsity Jogger",
    shortDescription: "Joggers sized for future playmakers.",
    detailedDescription:
      "Soft fleece, rib cuffs, and bold leg graphics deliver day-long comfort for young Seminoles on the go.",
    basePrice: 36,
    sizeGroup: "youth_apparel",
    tags: ["youth", "pants", "jogger"],
    materials: ["Fleece", "Rib Trim"],
    featurePhrases: [
      "elastic cuffs",
      "adjustable waistband",
      "contrast leg print"
    ],
    imageSlug: "junior-varsity-jogger",
    skuPrefix: "YTH04",
    variationCount: 6,
    colorFamilies: ["Garnet", "Victory Gold", "Charcoal"]
  }
] as const;

const colorwaysForTemplate = (template: ProductTemplate): readonly Colorway[] => {
  if (!template.colorFamilies || template.colorFamilies.length === 0) {
    return DEFAULT_COLORWAYS;
  }
  const palette = template.colorFamilies;
  const base = DEFAULT_COLORWAYS.filter((way) =>
    palette.includes(way.primary) || palette.includes(way.secondary)
  );
  return base.length > 0 ? base : DEFAULT_COLORWAYS;
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
  const cloned = [...input];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
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
  const items: MerchItem[] = [];
  const randomizedStoryTags = shuffle(STORY_TAGS, rng);
  const sizeOptionsByGroup = groupSizeOptions(sizeOptions);

  const baseTimestamp = Date.UTC(2023, 6, 1);

  PRODUCT_TEMPLATES.forEach((template, templateIndex) => {
    const colorways = colorwaysForTemplate(template);
    const materialPool = template.materials;
    const features = template.featurePhrases;

    for (let variant = 0; variant < template.variationCount; variant += 1) {
      const colorway = pick(colorways, rng);
      const adjective = pick(ADJECTIVES, rng);
      const motif = pick(MOTIFS, rng);
      const feature = pick(features, rng);
      const auxiliaryFeature = pick(DEFAULT_FEATURES, rng);
      const materials = unique([
        pick(materialPool, rng),
        pick(materialPool, rng),
        pick(["Organic Cotton", "Recycled Fibers", "Performance Mesh"], rng)
      ]);

      const fullName = `${adjective} ${template.baseName}`;
      const colorDescriptor = `${colorway.primary}/${colorway.secondary}`;
      const sku = `FSU-${template.skuPrefix}${String(variant + 1).padStart(3, "0")}`;
      const slug = `${slugify(`${fullName}-${motif}-${colorDescriptor}`)}-${variant + 1}`;
      const id = `merch-${String(items.length + 1).padStart(4, "0")}`;

      const basePrice = template.basePrice + (rng() - 0.5) * 14;
      const listPrice = roundCurrency(Math.max(12, basePrice));
      const onSale = rng() > 0.72;
      const salePrice = onSale
        ? roundCurrency(listPrice * (0.8 + rng() * 0.12))
        : undefined;
      const memberPrice = salePrice
        ? roundCurrency(Math.max(5, salePrice * (0.9 - rng() * 0.08)))
        : rng() > 0.82
        ? roundCurrency(Math.max(5, listPrice * (0.94 - rng() * 0.06)))
        : undefined;
      const loyaltyPoints = Math.round(listPrice * (1.6 + rng() * 0.6));
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

      const quantity = Math.max(4, Math.round(24 + rng() * 220));
      const isLimited = price.priceTier === "Limited" || rng() > 0.9;
      const status = quantity < 12 ? "preorder" : quantity < 32 ? "low_stock" : "in_stock";
      const restockDate =
        status === "preorder"
          ? new Date(baseTimestamp + Math.floor(rng() * 120) * 86_400_000).toISOString()
          : undefined;
      const inventory = {
        quantity,
        status,
        restockDate
      } as const;

      const ratingAverage = roundCurrency(4.1 + rng() * 0.8);
      const ratingCount = Math.round(32 + rng() * 350);
      const releaseSeason = pick(RELEASE_SEASONS, rng);
      const introducedAt = new Date(
        baseTimestamp + Math.floor(rng() * 520) * 86_400_000
      ).toISOString();

      const primaryImage = buildImageAsset(template, variant, "primary", { width: 1600, height: 1600 }, colorway.primary);
      const alt1 = buildImageAsset(template, variant, "alt-1", { width: 1400, height: 1400 }, colorway.secondary);
      const alt2 = buildImageAsset(template, variant, "detail", { width: 1200, height: 1200 }, colorway.accent);
      const gallery: ImageAsset[] = [primaryImage, alt1, alt2];

      const tags = unique([
        ...template.tags,
        motif,
        colorway.primary,
        colorway.secondary,
        colorway.accent,
        feature.replace(/[^a-z]+/gi, " ").trim(),
        auxiliaryFeature.replace(/[^a-z]+/gi, " ").trim(),
        randomizedStoryTags[(templateIndex + variant) % randomizedStoryTags.length]
      ]).filter((tag): tag is string => Boolean(tag));

      const flags = unique([
        price.isOnSale ? "On Sale" : undefined,
        onlineExclusive ? "Online Exclusive" : undefined,
        isLimited ? "Limited Release" : undefined,
        quantity > 120 ? "Bulk Ready" : undefined,
        releaseSeason === "Fall 2024" ? "Fall Feature" : undefined
      ]).filter((flag): flag is string => Boolean(flag));

      const shortDescription = `${template.shortDescription} Featuring ${motif} art and ${feature}.`;
      const description = `${template.detailedDescription} Finished with ${feature} and ${auxiliaryFeature} for true Garnet & Gold spirit.`;

      const item: MerchItem = {
        id,
        sku,
        slug,
        name: `${fullName} (${motif})`,
        shortDescription,
        description,
        categoryId: template.categoryId,
        tags,
        colors: unique([colorway.primary, colorway.secondary, colorway.accent]).filter((color): color is string => Boolean(color)),
        materials,
        sizeGroup: template.sizeGroup,
        availableSizeIds,
        price,
        primaryImage,
        gallery,
        rating: { average: ratingAverage, count: ratingCount },
        releaseSeason,
        inventory,
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
