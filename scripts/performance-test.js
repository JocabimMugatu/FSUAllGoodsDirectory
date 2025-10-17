import { performance } from 'perf_hooks';
import { generateExperiences } from '../src/scripts/data.js';

const TEST_SIZE = 6000;
const MAX_GENERATION_MS = 250;
const MAX_RENDER_MS = 400;

function renderToString(experience) {
  const tagsMarkup = experience.tags.map((tag) => `<li>${tag}</li>`).join('');
  return `
    <article>
      <h3>${experience.headline}</h3>
      <p>${experience.description}</p>
      <p>${experience.location} • ${experience.duration} • ${experience.rating.toFixed(2)} ★</p>
      <p>${experience.guide}</p>
      <ul>${tagsMarkup}</ul>
    </article>
  `;
}

const generationStart = performance.now();
const experiences = generateExperiences(TEST_SIZE);
const generationDuration = performance.now() - generationStart;

if (experiences.length !== TEST_SIZE) {
  throw new Error(`Expected ${TEST_SIZE} experiences, received ${experiences.length}.`);
}

if (generationDuration > MAX_GENERATION_MS) {
  throw new Error(`Data generation exceeded ${MAX_GENERATION_MS}ms (actual ${generationDuration.toFixed(2)}ms).`);
}

const renderStart = performance.now();
let totalLength = 0;
for (const exp of experiences) {
  totalLength += renderToString(exp).length;
}
const renderDuration = performance.now() - renderStart;

if (totalLength === 0) {
  throw new Error('String rendering failed to produce output.');
}

if (renderDuration > MAX_RENDER_MS) {
  throw new Error(`Rendering exceeded ${MAX_RENDER_MS}ms (actual ${renderDuration.toFixed(2)}ms).`);
}

console.log(
  `Performance OK — generated ${TEST_SIZE} records in ${generationDuration.toFixed(2)}ms and rendered markup in ${renderDuration.toFixed(2)}ms.`
);
