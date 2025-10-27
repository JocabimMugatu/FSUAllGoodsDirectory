import type { Category, Item } from "@/types/item"

const TOTAL_ITEMS = 500

const adjectives = [
  "Heritage",
  "Seminole",
  "Garnet",
  "Legacy",
  "Victory",
  "Chief",
  "Spirit",
  "Tribe",
  "Warpath",
  "Renegade",
  "Dynasty",
  "Majestic",
  "Summit",
  "Prime",
  "Elite",
  "Maroon",
  "Golden",
  "Signature",
  "Traditions",
  "Legacy",
  "Nole",
  "Valor",
  "Champion",
  "Regal",
  "Cardinal",
  "Radiant",
  "Crown",
  "Herald",
  "Unity",
  "Ignite",
]

const editionSuffixes = [
  "Edition",
  "Collection",
  "Series",
  "Line",
  "Drop",
  "Capsule",
  "Heritage",
  "Signature",
  "Elite",
  "Prime",
]

const sharedDetailPhrases = [
  "crafted in partnership with Florida State University's merchandising studio",
  "tested across campus for lasting durability",
  "accented with the iconic Seminole spear mark",
  "celebrating gameday energy from Doak Campbell Stadium to Landis Green",
  "bringing garnet and gold vibrance to everyday moments",
  "finished with elevated detailing inspired by Osceola and Renegade",
  "built to go from pep rallies to the alumni center with ease",
  "engineered for comfort in Florida's changing seasons",
  "curated as part of the official FSU collegiate collection",
  "designed to celebrate the enduring Seminole spirit",
]

const availabilityOptions: Item["availability"][] = ["In Stock", "Limited", "Preorder"]

const sizeBlueprints: Record<Category, string[][]> = {
  Apparel: [
    ["XS", "S", "M", "L", "XL", "XXL"],
    ["S", "M", "L", "XL", "XXL", "3XL"],
    ["Women's XS", "Women's S", "Women's M", "Women's L", "Women's XL"],
    ["Youth S", "Youth M", "Youth L", "Youth XL"],
  ],
  Accessories: [
    ["Adjustable"],
    ["One Size"],
    ["S/M", "L/XL"],
  ],
  "Home Goods": [
    ["Standard"],
    ["Standard", "Oversized"],
    ["Set of 2"],
  ],
  Office: [
    ["Standard"],
    ["Letter"],
    ["Executive"],
  ],
  Promotional: [
    ["Standard"],
    ["Collector"],
    ["Fan Pack"],
  ],
}

const categoryBlueprints: Array<{
  category: Category
  baseNames: string[]
  narrative: string
  craftsmanship: string
  priceRange: [number, number]
  colorSets: string[][]
  materials: string[]
  tags: string[]
  features: string[]
}> = [
  {
    category: "Apparel",
    baseNames: [
      "Performance Tee",
      "Heritage Crewneck",
      "Sideline Hoodie",
      "Varsity Jersey",
      "Campus Quarter-Zip",
      "Lightweight Windbreaker",
      "Game Day Polo",
      "Retro Ringer Tee",
      "Premium Jogger",
      "Embroidered Pullover",
      "Layered V-Neck",
      "Athletic Tank",
    ],
    narrative:
      "Our apparel line honors Seminole legacy with modern silhouettes, elevated fabrics, and precise embroidery, perfect for alumni gatherings, student life, and gameday traditions.",
    craftsmanship:
      "Each piece undergoes triple-stitch reinforcement with garnet-and-gold striping, ensuring longevity through seasons of cheering on the Noles.",
    priceRange: [28, 118],
    colorSets: [
      ["Garnet", "Gold"],
      ["Garnet", "White"],
      ["Black", "Garnet"],
      ["Vintage Cream", "Garnet"],
      ["Matte Gold", "Garnet"],
      ["Stone", "Garnet", "Gold"],
    ],
    materials: [
      "Organic Cotton",
      "Recycled Polyester",
      "Performance Mesh",
      "Brushed Fleece",
      "Tri-Blend",
      "Moisture-Wicking Knit",
    ],
    tags: ["Game Day Essential", "Official FSU Gear", "Unisex Fit", "Weather Ready"],
    features: [
      "features breathable micro-mesh paneling for comfort in the Florida sun",
      "is finished with premium tipped ribbing inspired by classic varsity styling",
      "includes UV-guard technology and anti-odor treatment",
      "is detailed with tonal spear embossing across the chest",
      "showcases contrast piping that nods to 1970s garnet-and-gold uniforms",
      "pairs athletic stretch with brushed interior softness",
    ],
  },
  {
    category: "Accessories",
    baseNames: [
      "Heritage Baseball Cap",
      "Canvas Stadium Tote",
      "Premium Knit Beanie",
      "Spirit Scarf",
      "Performance Visor",
      "Signature Duffel",
      "Key Fob",
      "Metal Travel Mug",
      "Resin Ornament",
      "Campus Lanyard",
      "Spear Cuff Bracelet",
      "Everyday Belt Bag",
    ],
    narrative:
      "Accessories that infuse garnet-and-gold pride into every day, designed for campus commutes, alumni reunions, and away-game travel.",
    craftsmanship:
      "Rich textures, embossed logos, and polished metallic accents make each accessory a keepsake worthy of the Garnet & Gold Standard.",
    priceRange: [12, 98],
    colorSets: [
      ["Garnet", "Gold"],
      ["Garnet", "Black"],
      ["Matte Gold", "Ivory"],
      ["Garnet", "Charcoal"],
      ["Sable", "Gold"],
      ["Crimson", "Champagne"],
    ],
    materials: [
      "Brushed Twill",
      "Vegan Leather",
      "Polished Brass",
      "Canvas",
      "Recycled Nylon",
      "Stainless Steel",
      "Textured Resin",
    ],
    tags: ["Tailgate Ready", "Official Emblem", "Travel Friendly", "Everyday Carry"],
    features: [
      "includes laser-engraved spear hardware for subtle shine",
      "offers moisture-wicking sweatbands ideal for long rally days",
      "utilizes reinforced stitching tested for heavy gameday loads",
      "packs flat for away-weekend adventures",
      "features tactile debossed lettering inspired by campus signage",
      "showcases a removable charm celebrating Chief Osceola",
    ],
  },
  {
    category: "Home Goods",
    baseNames: [
      "Luxe Throw Blanket",
      "Stoneware Mug",
      "Stadium Candle",
      "Gallery Wall Art",
      "Woven Table Runner",
      "Velvet Pillow",
      "Heritage Coaster Set",
      "Glass Carafe",
      "Wooden Serving Board",
      "Spirit Lantern",
      "Varsity Banner",
      "Mantle Stocking",
    ],
    narrative:
      "Transform living spaces with garnet warmth, golden accents, and textures that pay homage to Tallahassee traditions.",
    craftsmanship:
      "Home goods are artisan-crafted with hand-finished detailing, sustainable sourcing, and archival graphics from the FSU library.",
    priceRange: [18, 160],
    colorSets: [
      ["Garnet", "Cream"],
      ["Gold", "Ivory"],
      ["Walnut", "Garnet"],
      ["Charcoal", "Gold"],
      ["Maple", "Garnet", "Gold"],
      ["Sandstone", "Garnet"],
    ],
    materials: [
      "Chenille",
      "Bamboo Rayon",
      "Stoneware",
      "Acacia Wood",
      "Velvet",
      "Soy Wax",
      "Linen Blend",
    ],
    tags: ["Homecoming Ready", "Statement Piece", "Artisan Crafted", "Limited Batch"],
    features: [
      "is finished with hand-twisted fringe inspired by the Marching Chiefs",
      "features etched latitude and longitude coordinates for Tallahassee",
      "arrives in keepsake packaging ideal for gifting alumni",
      "is infused with scents of magnolia, pine, and stadium nostalgia",
      "uses double-sided weaving for reversible styling",
      "includes subtle metallic accents reminiscent of the Unconquered statue",
    ],
  },
  {
    category: "Office",
    baseNames: [
      "Executive Notebook",
      "Spear-Trim Desk Pad",
      "Brass Pen Set",
      "Conference Portfolio",
      "Wireless Charging Stand",
      "Planner Agenda",
      "Desktop Organizer",
      "Ceramic Pen Cup",
      "Signature Journal",
      "Matte Mouse Pad",
      "Conference Badge Holder",
      "Presentation Binder",
    ],
    narrative:
      "Office essentials designed to shine in boardrooms, classrooms, and alumni offices with refined garnet-and-gold detailing.",
    craftsmanship:
      "Each piece balances productivity with prestige, integrating archival seals and refined metallic finishes.",
    priceRange: [16, 140],
    colorSets: [
      ["Garnet", "Brass"],
      ["Espresso", "Gold"],
      ["Onyx", "Garnet"],
      ["Ivory", "Gold"],
      ["Graphite", "Garnet"],
      ["Walnut", "Matte Gold"],
    ],
    materials: [
      "Vegan Leather",
      "Recycled Paper",
      "Brass",
      "Walnut Veneer",
      "Anodized Aluminum",
      "Linen",
    ],
    tags: ["Campus Office", "Alumni Gift", "Elevated Workday", "Keepsake"],
    features: [
      "includes a subtle foil-stamped seal of Florida State University",
      "provides organizational layouts approved by the Student Alumni Association",
      "integrates wireless charging optimized for modern devices",
      "offers refillable inserts for sustainable planning",
      "features a magnetic flap inspired by collegiate banners",
      "pairs executive functionality with understated FSU pride",
    ],
  },
  {
    category: "Promotional",
    baseNames: [
      "Cheer Banner",
      "Tailgate Cornhole Set",
      "Collectible Pennant",
      "Spirit Rally Towel",
      "Clear Stadium Bag",
      "Event Pop-Up Tent",
      "Hydration Bottle",
      "Fan Button Pack",
      "Portable Speaker",
      "Reusable Party Cup",
      "LED Wristband",
      "Team Foam Finger",
    ],
    narrative:
      "High-energy promotional pieces built for tailgates, recruitment events, and alumni celebrations across the country.",
    craftsmanship:
      "Each item is stress-tested for stadium regulations, outdoor durability, and all-weather Seminole enthusiasm.",
    priceRange: [6, 220],
    colorSets: [
      ["Garnet", "Gold"],
      ["Translucent", "Garnet"],
      ["Carbon", "Gold"],
      ["Sunset", "Garnet"],
      ["Charcoal", "Gold"],
      ["Ivory", "Garnet"],
    ],
    materials: [
      "Durable Vinyl",
      "Reinforced Nylon",
      "ABS Plastic",
      "Double-Wall Stainless",
      "Poly Canvas",
      "LED Components",
    ],
    tags: ["Tailgate Icon", "Event Ready", "Regulation Approved", "Fan Favorite"],
    features: [
      "meets stadium security guidelines while showcasing FSU pride",
      "folds compactly for transport to away games",
      "includes bold typography pulled from FSU athletics archives",
      "features rechargeable components for reusable celebrations",
      "packs premium sound for pre-game hype playlists",
      "resists Florida humidity and sun exposure for seasons of use",
    ],
  },
]

const materialsByCategory = categoryBlueprints.reduce<Record<Category, string[]>>(
  (acc, blueprint) => {
    acc[blueprint.category] = blueprint.materials
    return acc
  },
  {
    Apparel: [],
    Accessories: [],
    "Home Goods": [],
    Office: [],
    Promotional: [],
  }
)

const colorUniverse = Array.from(
  new Set(categoryBlueprints.flatMap((config) => config.colorSets).flat())
)

function generateReleaseDate(index: number) {
  const now = new Date()
  const monthsBack = (index * 3) % 24
  const release = new Date(now)
  release.setMonth(now.getMonth() - monthsBack)
  release.setDate(((index * 11) % 28) + 1)
  return release.toISOString().split("T")[0]
}

function pickColors(category: Category, index: number) {
  const config = categoryBlueprints.find((item) => item.category === category)!
  return config.colorSets[(index + config.colorSets.length) % config.colorSets.length]
}

function pickSizes(category: Category, index: number) {
  const options = sizeBlueprints[category]
  return options[(index + options.length) % options.length]
}

function pickMaterials(category: Category, index: number) {
  const materials = materialsByCategory[category]
  const first = materials[(index * 3) % materials.length]
  const second = materials[(index * 5 + 2) % materials.length]
  return Array.from(new Set([first, second]))
}

function buildDescription(
  name: string,
  blueprint: (typeof categoryBlueprints)[number],
  feature: string,
  index: number
) {
  const detail = sharedDetailPhrases[index % sharedDetailPhrases.length]
  return `${name} ${feature}. ${blueprint.narrative} ${blueprint.craftsmanship} ${detail}.`
}

export const items: Item[] = Array.from({ length: TOTAL_ITEMS }, (_, index) => {
  const blueprint = categoryBlueprints[index % categoryBlueprints.length]
  const adjective = adjectives[index % adjectives.length]
  const suffix = editionSuffixes[(index + 7) % editionSuffixes.length]
  const baseName = blueprint.baseNames[(index * 5 + 3) % blueprint.baseNames.length]

  const name = `${adjective} ${baseName} ${suffix}`
  const feature = blueprint.features[(index * 7) % blueprint.features.length]

  const [minPrice, maxPrice] = blueprint.priceRange
  const spread = maxPrice - minPrice
  const relative = ((index * 37 + blueprint.category.length * 11) % 100) / 100
  const computedPrice = minPrice + relative * spread
  const roundedPrice = Math.round(computedPrice * 2) / 2
  const boundedPrice = Math.min(maxPrice, Math.max(minPrice, roundedPrice))
  const price = Number(boundedPrice.toFixed(2))

  const colors = pickColors(blueprint.category, index)
  const sizes = pickSizes(blueprint.category, index)
  const materials = pickMaterials(blueprint.category, index)

  const releaseDate = generateReleaseDate(index)
  const rating = 3.5 + (((index * 13) % 16) / 10)
  const availability = availabilityOptions[(index * 5) % availabilityOptions.length]

  const tags = Array.from(
    new Set([
      ...blueprint.tags,
      suffix + " Drop",
      `${blueprint.category} Essential`,
      colors[0] ?? "Garnet",
    ])
  )

  const description = buildDescription(name, blueprint, feature, index)

  const id = `fsu-${(index + 1).toString().padStart(3, "0")}`
  const sku = `FSU-${blueprint.category.substring(0, 2).toUpperCase()}-${(index + 1010)
    .toString()
    .padStart(4, "0")}`

  const images = Array.from({ length: 3 }, (_, imageIndex) =>
    `https://picsum.photos/seed/${blueprint.category.replace(/\s+/g, "-")}-${index}-${imageIndex}/800/800`
  )

  return {
    id,
    sku,
    name,
    description,
    category: blueprint.category,
    price,
    sizes,
    colors,
    materials,
    tags,
    images,
    releaseDate,
    rating: Number(rating.toFixed(1)),
    featured: index % 24 === 0,
    availability,
  }
})

export const categories: Category[] = categoryBlueprints.map((item) => item.category)
export const colorOptions = colorUniverse
