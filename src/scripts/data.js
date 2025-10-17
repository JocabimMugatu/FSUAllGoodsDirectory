const BASE_EXPERIENCES = [
  {
    name: "Aurora Ridge Trek",
    location: "Skylit Peaks",
    description:
      "Traverse slow-changing ice paths with seasoned local guides and experience the northern lights under a climate-controlled glass canopy.",
    category: "Adventure",
    intensity: "Moderate",
    duration: "7 days",
    tags: ["Eco certified", "Small group", "Overnight"]
  },
  {
    name: "Verdant Canopy Retreat",
    location: "Emerald Tropics",
    description:
      "Unplug within suspended villas, complete with canopy-level dining, yoga platforms, and biodiverse guided walks.",
    category: "Wellness",
    intensity: "Light",
    duration: "5 days",
    tags: ["Mindful", "Wellness", "Guided"]
  },
  {
    name: "Dune Resonance Camp",
    location: "Saffron Dunes",
    description:
      "Sound bath sessions meet desert astronomy. Enjoy sunset dinners, star-mapping workshops, and dawn dune treks.",
    category: "Culture",
    intensity: "Moderate",
    duration: "4 days",
    tags: ["Immersive", "Culinary", "Night sky"]
  },
  {
    name: "Fjord Coding Voyage",
    location: "Nordic Sound",
    description:
      "Hybrid retreat merging deep work sprints with glacial kayaking, sauna rituals, and Nordic chef pairings.",
    category: "Hybrid Work",
    intensity: "Intense",
    duration: "10 days",
    tags: ["Remote ready", "Mentorship", "Wellness"]
  },
  {
    name: "Terracotta Tableaux",
    location: "Sunset Terraces",
    description:
      "Capture terraced vineyards at golden hour with pro photographers, local ceramicists, and live scoring composers.",
    category: "Creative",
    intensity: "Light",
    duration: "6 days",
    tags: ["Artisan", "Photogenic", "Slow travel"]
  },
  {
    name: "Tidal Forest Immersion",
    location: "Azure Mangroves",
    description:
      "Dive into mangrove rewilding with marine biologists, moonlight paddles, and zero-waste culinary labs.",
    category: "Conservation",
    intensity: "Moderate",
    duration: "8 days",
    tags: ["Sustainable", "Hands-on", "No single-use"]
  },
  {
    name: "Summit Story Forge",
    location: "Cloudbridge Summit",
    description:
      "Legend weaving, interactive theatre, and alpine journaling workshops culminate in a cliffside fireside showcase.",
    category: "Storycraft",
    intensity: "Moderate",
    duration: "5 days",
    tags: ["Narrative", "Collaborative", "Workshop"]
  },
  {
    name: "Luminous Reef Residency",
    location: "Crystal Reef",
    description:
      "Create bio-luminescent sculptures, participate in coral nursery dives, and host evening shoreline galleries.",
    category: "Residency",
    intensity: "Intense",
    duration: "9 days",
    tags: ["Marine", "Artist-led", "Night ops"]
  }
];

const EXPERIENCE_COUNT = 216;
const EXPERIENCE_CHUNK_SIZE = 24;

const pitchModifiers = [
  "Series",
  "Guild",
  "Expedition",
  "Immersion",
  "Collective",
  "Symposium",
  "Residency",
  "Escape"
];

const outcomes = [
  "climate-ready habits",
  "restored creative flow",
  "newfound community",
  "portfolio-ready outputs",
  "renewed wellbeing",
  "elevated leadership",
  "sustainable practice",
  "future-facing rituals"
];

const ratingMatrix = [4.7, 4.8, 4.9, 5.0, 4.6, 4.85, 4.95, 4.75];

const instructors = [
  "Zara Quinn",
  "Noah El-Masri",
  "Imani Brooks",
  "Kai Fujimoto",
  "Maris Vega",
  "Soren Leigh",
  "Amara Chen",
  "Julien Aalto"
];

function selectAsset(index) {
  const variant = (index % 6) + 1;
  return {
    small: `./assets/experiences/experience-${variant}-small.svg`,
    large: `./assets/experiences/experience-${variant}-large.svg`
  };
}

function buildDescription(template, index) {
  const modifier = pitchModifiers[index % pitchModifiers.length];
  const outcome = outcomes[index % outcomes.length];
  return `${template.description} This ${modifier.toLowerCase()} concludes with ${outcome}.`;
}

export function generateExperiences(size = EXPERIENCE_COUNT) {
  const items = [];
  for (let index = 0; index < size; index += 1) {
    const base = BASE_EXPERIENCES[index % BASE_EXPERIENCES.length];
    const sequence = Math.floor(index / BASE_EXPERIENCES.length) + 1;
    const { small, large } = selectAsset(index);
    const iterationLabel = sequence.toString().padStart(2, '0');
    items.push({
      id: index + 1,
      name: `${base.name} ${iterationLabel}`,
      headline: `${base.name} ${pitchModifiers[index % pitchModifiers.length]}`,
      location: base.location,
      description: buildDescription(base, index),
      category: base.category,
      intensity: base.intensity,
      duration: base.duration,
      tags: [...new Set([...base.tags, outcomes[index % outcomes.length].split(" ")[0]])],
      rating: ratingMatrix[index % ratingMatrix.length],
      guide: instructors[index % instructors.length],
      image: {
        small,
        large,
        alt: `${base.name} illustration ${sequence}`
      }
    });
  }
  return items;
}

export { EXPERIENCE_COUNT, EXPERIENCE_CHUNK_SIZE };
