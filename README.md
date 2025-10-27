# FSU All Goods Directory

A fully featured Florida State University–branded merchandise directory showcasing 500 curated items spanning apparel, accessories, home goods, office supplies, and promotional products. The catalog delivers polished Seminole styling, advanced search, filtering, sorting, pagination, and rich item detail views suitable for production deployment on Netlify.

## ✨ Highlights

- **Comprehensive catalog** – 500 hand-crafted FSU items with detailed metadata (sizes, colors, materials, availability, release dates, images, and tags)
- **Rich browsing experience** – responsive masonry grid with hover interactions, showcase hero, and curated new-arrivals spotlight
- **Powerful discovery tools** – full-text search, multi-select category and color filters, adjustable price range, and sortable results (price, name, category, newest)
- **Detailed product pages** – immersive image galleries, availability indicators, material breakdowns, highlight tags, related-item recommendations, and smooth anchor navigation
- **Branded UI** – Tailwind CSS, shadcn/ui components, and Radix primitives combined with the official garnet (#782F40) and gold (#CEB888) palette
- **Production ready** – Vite + TypeScript build pipeline, SPA-friendly Netlify configuration, and hash-based smooth scrolling for deployed environments

## 🧱 Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for lightning-fast dev/build workflows
- [Tailwind CSS](https://tailwindcss.com/) with custom theming and utility layers
- [shadcn/ui](https://ui.shadcn.com/) components (Button, Select, Card, Badge, Checkbox, etc.) built on Radix UI primitives
- [React Router](https://reactrouter.com/) for SPA routing and item detail pages

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Create a production build (output in dist/)
npm run build
```

The application boots on [`http://localhost:5173`](http://localhost:5173) by default. All catalog data lives in `src/data/items.ts`, so no additional APIs or services are required.

## 📁 Key Structure

```text
src/
├─ components/
│  ├─ catalog/          # Catalog cards & pagination
│  ├─ layout/           # Header, footer, hash scrolling helpers
│  └─ ui/               # shadcn/ui component implementations
├─ data/
│  └─ items.ts          # Item interfaces and generated 500-item dataset
├─ pages/
│  ├─ catalog-page.tsx  # Home catalog experience
│  ├─ item-detail-page.tsx
│  └─ not-found-page.tsx
├─ lib/
│  └─ utils.ts          # Utility helpers (cn, currency/date formatters)
└─ index.css            # Tailwind base layers, custom utilities, theming
```

## 🌐 Deployment

The repository includes a `netlify.toml` configured for a Vite SPA:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Deploy by connecting the repository to Netlify (or running `netlify deploy`) and pointing to the `dist` directory produced by `npm run build`. Smooth hash-based scrolling is enabled for anchor links after deployment.

## 📄 License

This project was created to satisfy the "FSU All Goods Directory" ticket specification and can be adapted or extended for Florida State University merchandising initiatives.
