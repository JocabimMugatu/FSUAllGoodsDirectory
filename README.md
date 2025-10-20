# SPA Netlify Preview

This branch configures a minimal Vite single-page application with Netlify-friendly SPA redirects and fallback handling for deploy previews.

Key files:
- `netlify.toml` sets the build command and publish directory and enforces SPA redirects.
- `public/_redirects` adds a runtime redirect rule to serve `index.html` for all routes (fallback for preview branches).
- `public/404.html` is a minimal shell that redirects to `/index.html` to guard against preview 404s.
- `vite.config.ts` ensures `base: "/"` and the default `outDir` of `dist`.

Scripts:
- `npm run dev` – start the dev server
- `npm run build` – build to `dist`
- `npm run preview` – preview the production build locally

