# Netlify Ready React + Vite Starter

This repository contains a production-ready React 19 + TypeScript application bootstrapped with Vite and Tailwind CSS. All build artefacts, configuration files, and source code are committed so Netlify can install dependencies and build the site without additional setup.

## Getting Started

```bash
npm install
npm run dev
```

The development server will be available at http://localhost:5173.

## Available Scripts

- `npm run dev` – Start the Vite development server.
- `npm run build` – Type-check, create an optimized production build, and verify that hashed bundles were emitted.
- `npm run preview` – Preview the production build locally.
- `npm run lint` – Run ESLint on the project.

## Project Structure

```
├── index.html            # Application entry
├── package.json          # Scripts and dependencies
├── postcss.config.js     # Tailwind + PostCSS configuration
├── tailwind.config.js    # Tailwind content paths and theme overrides
├── tsconfig*.json        # TypeScript configurations
├── vite.config.ts        # Vite configuration
└── src
    ├── App.tsx           # Example React component using Tailwind
    ├── index.css         # Tailwind directives and base styles
    └── main.tsx          # React entry point
```

## Deployment

Netlify automatically installs dependencies from `package.json` and runs the `npm run build` script. Because all required files—including `package-lock.json`, Vite configuration, TypeScript configs, Tailwind setup, and the entire `src` directory—are tracked in version control, Netlify will no longer encounter `ENOENT` errors caused by missing files.
