export interface CatalogItem {
  id: string;
  name: string;
  price: number;
  description: string;
  categories: string[];
  images: string[];
  specifications: Array<{ label: string; value: string }>;
  sku: string;
  availability: "in-stock" | "backorder" | "discontinued";
  rating: number;
  reviews: number;
  releaseDate: string;
}

export const catalogItems: CatalogItem[] = [
  {
    id: "aurora-smart-speaker",
    name: "Aurora Smart Speaker",
    price: 249,
    description:
      "Experience immersive audio with adaptive room tuning, voice assistant integration, and multi-room pairing for perfect harmony at home.",
    categories: ["Audio", "Smart Home"],
    images: [
      "https://images.unsplash.com/photo-1581167762151-1bb132f84f25?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: [
      { label: "Connectivity", value: "Wi-Fi 6, Bluetooth 5.3" },
      { label: "Assistant", value: "Aurora Voice with multilingual support" },
      { label: "Battery", value: "Portable mode up to 10 hours" },
      { label: "Dimensions", value: "180mm x 120mm" },
    ],
    sku: "AR-SPK-01",
    availability: "in-stock",
    rating: 4.8,
    reviews: 382,
    releaseDate: "2024-03-14",
  },
  {
    id: "lumen-dslr-camera",
    name: "Lumen Mirrorless Camera",
    price: 1899,
    description:
      "A professional-grade mirrorless camera with 8K video recording, advanced autofocus, and dual image stabilization for creators on the move.",
    categories: ["Photography", "Professional"],
    images: [
      "https://images.unsplash.com/photo-1519183071298-a2962be90b8e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: [
      { label: "Sensor", value: "45MP Full Frame" },
      { label: "Video", value: "8K at 60fps, 4K at 120fps" },
      { label: "Storage", value: "Dual CFexpress Type B" },
      { label: "Weight", value: "720g body only" },
    ],
    sku: "LM-CAM-09",
    availability: "backorder",
    rating: 4.6,
    reviews: 125,
    releaseDate: "2023-11-02",
  },
  {
    id: "zenith-ultrabook",
    name: "Zenith Ultrabook 14",
    price: 1399,
    description:
      "Ultra-lightweight performance with a 14-inch OLED display, all-day battery life, and AI-accelerated workflows for productivity anywhere.",
    categories: ["Computers", "Ultrabooks"],
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: [
      { label: "Processor", value: "Intel Core Ultra 7" },
      { label: "Memory", value: "32GB LPDDR5X" },
      { label: "Storage", value: "1TB NVMe SSD" },
      { label: "Display", value: '14" 3K OLED Touch' },
    ],
    sku: "ZN-ULT-14",
    availability: "in-stock",
    rating: 4.9,
    reviews: 541,
    releaseDate: "2024-01-26",
  },
];
