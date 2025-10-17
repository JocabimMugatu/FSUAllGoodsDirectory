import { mkdir, rm, readFile, writeFile, readdir, copyFile, stat } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import esbuild from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');

function minifyHtml(html) {
  return html
    .replace(/\n+/g, '\n')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

async function copyDirectory(source, destination) {
  await mkdir(destination, { recursive: true });
  const entries = await readdir(source, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const srcPath = path.join(source, entry.name);
      const destPath = path.join(destination, entry.name);
      if (entry.isDirectory()) {
        await copyDirectory(srcPath, destPath);
      } else {
        await copyFile(srcPath, destPath);
      }
    })
  );
}

async function ensureSourceStructure() {
  const requiredPaths = [
    path.join(srcDir, 'index.html'),
    path.join(srcDir, 'styles', 'main.css'),
    path.join(srcDir, 'scripts', 'main.js')
  ];
  await Promise.all(
    requiredPaths.map(async (candidate) => {
      try {
        await stat(candidate);
      } catch (error) {
        throw new Error(`Missing required source file: ${candidate}`);
      }
    })
  );
}

async function buildAssets() {
  await ensureSourceStructure();
  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });
  await mkdir(path.join(distDir, 'scripts'), { recursive: true });
  await mkdir(path.join(distDir, 'styles'), { recursive: true });

  await esbuild.build({
    entryPoints: [path.join(srcDir, 'scripts', 'main.js')],
    bundle: true,
    minify: true,
    format: 'esm',
    sourcemap: false,
    outfile: path.join(distDir, 'scripts', 'main.js'),
    target: ['es2018'],
    logLevel: 'silent'
  });

  await esbuild.build({
    entryPoints: [path.join(srcDir, 'styles', 'main.css')],
    bundle: true,
    minify: true,
    outfile: path.join(distDir, 'styles', 'main.css'),
    logLevel: 'silent'
  });

  const htmlSource = await readFile(path.join(srcDir, 'index.html'), 'utf8');
  const htmlDist = minifyHtml(htmlSource);
  await writeFile(path.join(distDir, 'index.html'), `${htmlDist}\n`, 'utf8');

  await copyDirectory(path.join(srcDir, 'assets'), path.join(distDir, 'assets'));

  console.log('Build complete: assets optimized and written to dist/.');
}

buildAssets().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
