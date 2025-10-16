# FSU Directory UI

A Vite + React + TypeScript application bootstrap for Florida State University's branded directory experience. The project ships with Tailwind CSS, ShadCN UI, and React Router pre-configured to accelerate feature development.

## Getting started

```bash
npm install
npm run dev
```

The app runs on [http://localhost:5173](http://localhost:5173) by default.

## Tech stack

- **Vite + TypeScript** for fast local development and type safety.
- **Tailwind CSS** with Seminole-themed design tokens defined in `tailwind.config.ts` and `src/index.css`.
- **ShadCN UI** component patterns, including a shared theme provider (`next-themes`) and the base button component.
- **React Router v7** with an application shell, overview landing page, catalog placeholder, and item detail placeholder routes.

## Project structure

```
src/
├── components/
│   ├── layout/         # App shell, header, and footer
│   ├── theme-provider  # next-themes wrapper
│   ├── theme-toggle.tsx
│   └── ui/             # ShadCN-based primitives (button, etc.)
├── lib/utils.ts        # Tailwind className helper
├── routes/             # Route-level pages (home, catalog, item detail)
├── router.tsx          # Route map and layout wiring
└── main.tsx            # Entry point with ThemeProvider
```

## Next steps

- Connect the catalog route to real directory data sources.
- Add search, filtering, and personalization flows.
- Expand the ShadCN component library with navigation, cards, tables, and forms tailored to FSU's brand.
