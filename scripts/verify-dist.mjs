#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const distDir = join(process.cwd(), 'dist')
const assetsDir = join(distDir, 'assets')
const indexHtmlPath = join(distDir, 'index.html')

if (!existsSync(distDir)) {
  throw new Error('The Vite build output directory (dist) does not exist. Run "npm run build" first.')
}

if (!existsSync(indexHtmlPath)) {
  throw new Error('Missing dist/index.html. Ensure Vite finished bundling the HTML entry point.')
}

const html = readFileSync(indexHtmlPath, 'utf8')

if (html.includes('/src/main.tsx')) {
  throw new Error('Production index.html should not reference /src/main.tsx. The HTML entry was not transformed by Vite.')
}

if (!existsSync(assetsDir)) {
  throw new Error('Missing dist/assets directory. Bundled assets were not generated.')
}

const assetEntries = readdirSync(assetsDir, { withFileTypes: true }).filter((entry) => entry.isFile())

if (assetEntries.length === 0) {
  throw new Error('dist/assets is empty. Vite did not emit any production bundles.')
}

const hashedFilePattern = /-[\w-]{6,}\.[a-z0-9]+$/i
const jsBundles = assetEntries.filter((entry) => entry.name.endsWith('.js'))
const cssBundles = assetEntries.filter((entry) => entry.name.endsWith('.css'))

if (jsBundles.length === 0) {
  throw new Error('No JavaScript bundles were produced in dist/assets.')
}

if (!jsBundles.some((entry) => hashedFilePattern.test(entry.name))) {
  throw new Error('JavaScript bundles are missing content hashes. Expected filenames such as index-[hash].js.')
}

if (cssBundles.length > 0 && !cssBundles.some((entry) => hashedFilePattern.test(entry.name))) {
  throw new Error('CSS bundles are missing content hashes. Expected filenames such as index-[hash].css.')
}

if (!/\/assets\//.test(html)) {
  throw new Error('dist/index.html is not referencing bundled assets from the /assets directory.')
}

console.log('✓ Verified production build: hashed bundles detected and index.html references compiled assets.')
