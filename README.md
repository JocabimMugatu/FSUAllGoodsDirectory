# Responsive Experience Catalogue

This project showcases a polished, responsive catalogue experience tailored for mobile, tablet, and desktop viewports. It highlights accessible interactions, a theme toggle with persisted preferences, lazy-rendered content for large datasets, and optimized static assets.

## Quick start

```bash
npm install
npm run build
```

*The build step creates a minified production bundle in `dist/` that you can open directly in a browser.*

To validate dataset rendering performance:

```bash
npm run test
```

## Project structure

```
.
├── src/
│   ├── assets/                # Optimized SVG illustrations (hero + cards)
│   ├── index.html             # Semantic layout with responsive sections
│   ├── scripts/
│   │   ├── data.js            # Large dataset generator (200+ experiences)
│   │   └── main.js            # Theme toggle, infinite scroll, focus helpers
│   └── styles/
│       └── main.css           # Fluid type/spacing scales and accessibility styles
├── scripts/
│   ├── build.js               # Esbuild-powered bundling + HTML/asset processing
│   └── performance-test.js    # Dataset generation and rendering benchmark
├── dist/                      # Generated after `npm run build`
├── docs/
│   └── future-roadmap.md      # Additional context and enhancement ideas
├── package.json
└── README.md
```

## Design decisions

### Fluid responsive system
- **Breakpoints** at `50rem`, `40rem`, and `62rem` adapt grid density, hero layout, and navigation treatment across mobile/tablet/desktop.
- **Typography and spacing** leverage `clamp()` to scale smoothly without abrupt jumps, preserving comfortable reading width and vertical rhythm.
- **Sticky header refinement** adds translucency, scroll-driven shadow, and compact navigation for smaller screens.

### Accessibility-first interactions
- **Semantic structure** (skip link, `header`/`main`/`footer`, region headings) supports assistive technology navigation.
- **Focus visibility** uses high-contrast outlines with fallbacks for browsers without `color-mix` support.
- **Theme toggle** announces state through `aria-pressed`, updates its accessible label/title, respects `prefers-color-scheme`, and persists user preference in `localStorage`.
- **Reduced motion** support disables non-essential transitions when `prefers-reduced-motion` is enabled.

### Performance & data handling
- **Chunked rendering** progressively appends cards in `24` item batches, keeping initial paint fast even with 200+ experiences.
- **Lazy assets** use `<picture>` with tailored sources, `loading="lazy"`, and `decoding="async"` to avoid blocking critical rendering.
- **Build pipeline** minifies CSS/JS via esbuild, strips redundant HTML whitespace, and copies only the required static assets.
- **Performance tests** generate 6,000 synthetic experiences and render them to strings to guard against regressions with large datasets.

## Asset optimization
- Hero and card illustrations are SVG-based and sized separately for small/large viewports to avoid overserving pixels.
- Card media relies on modern techniques (`srcset`, `sizes`, `loading="lazy"`, `decoding="async"`) to defer work until necessary.
- The build script outputs a production-ready `dist/` directory with minified styles and bundled JavaScript while preserving raw SVGs for crisp scaling.

## Usage notes
- Open `dist/index.html` after running `npm run build` for the optimized experience. During development you can reference files directly from `src/`.
- Saved cards toggle between “Save for later” and “Saved” states, updating `aria-pressed` for assistive technology clarity.
- Theme selection persists between visits. Delete `localStorage.responsive-ux-preferred-theme` to revert to system defaults.

## Future enhancements
- Add filters (category, intensity, duration) with accessible form controls and live region updates.
- Integrate a service worker for offline caching and preloading of subsequent content batches.
- Extend performance tests with Lighthouse/axe automation and integrate into CI.
- Introduce a lightweight development server with hot reloading for local authoring convenience.

## License

MIT © Responsive Experience Catalogue contributors
