import { generateExperiences, EXPERIENCE_CHUNK_SIZE } from './data.js';

const SELECTORS = {
  themeToggle: '[data-theme-toggle]',
  grid: '[data-experience-grid]',
  sentinel: '[data-load-sentinel]',
  header: '[data-header]',
  count: '[data-experience-count]'
};

const STORAGE_KEY = 'responsive-ux-preferred-theme';
const experiences = generateExperiences();
let renderedCount = 0;
let infiniteObserver;

function qs(selector) {
  return document.querySelector(selector);
}

function applyTheme(theme, toggle) {
  document.documentElement.dataset.theme = theme;
  if (!toggle) return;
  const pressed = theme === 'dark';
  toggle.setAttribute('aria-pressed', pressed ? 'true' : 'false');
  const label = pressed ? 'Activate light theme' : 'Activate dark theme';
  toggle.setAttribute('aria-label', label);
  toggle.setAttribute('title', label);
}

function persistTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (error) {
    console.warn('Unable to persist theme preference', error);
  }
}

function readPersistedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Unable to read theme preference', error);
    return null;
  }
}

function initThemeToggle() {
  const toggle = qs(SELECTORS.themeToggle);
  if (!toggle) return;

  const storedTheme = readPersistedTheme();
  const prefersDark = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  let manualTheme = storedTheme;
  const startingTheme = manualTheme ?? (prefersDark?.matches ? 'dark' : 'light');

  applyTheme(startingTheme, toggle);

  toggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, toggle);
    manualTheme = nextTheme;
    persistTheme(nextTheme);
  });

  if (prefersDark) {
    const handleSystemTheme = (event) => {
      if (manualTheme) return;
      const newTheme = event.matches ? 'dark' : 'light';
      applyTheme(newTheme, toggle);
    };

    if (typeof prefersDark.addEventListener === 'function') {
      prefersDark.addEventListener('change', handleSystemTheme);
    } else if (typeof prefersDark.addListener === 'function') {
      prefersDark.addListener(handleSystemTheme);
    }
  }
}

function createExperienceCard(experience) {
  const article = document.createElement('article');
  article.className = 'experience-card';
  article.setAttribute('role', 'listitem');
  article.dataset.category = experience.category.toLowerCase();

  const media = document.createElement('figure');
  media.className = 'experience-card__media';

  const picture = document.createElement('picture');
  const source = document.createElement('source');
  source.srcset = experience.image.large;
  source.media = '(min-width: 62rem)';
  source.type = 'image/svg+xml';

  const img = document.createElement('img');
  img.src = experience.image.small;
  img.srcset = `${experience.image.small} 1x, ${experience.image.large} 2x`;
  img.sizes = '(min-width: 62rem) 22rem, (min-width: 40rem) 45vw, 90vw';
  img.alt = experience.image.alt;
  img.loading = 'lazy';
  img.decoding = 'async';
  img.width = 320;
  img.height = 220;

  picture.append(source, img);
  media.appendChild(picture);

  const body = document.createElement('div');
  body.className = 'experience-card__body';

  const title = document.createElement('h3');
  title.className = 'experience-card__title';
  title.textContent = experience.headline;

  const description = document.createElement('p');
  description.className = 'experience-card__description';
  description.textContent = experience.description;

  const meta = document.createElement('div');
  meta.className = 'experience-card__meta';
  meta.innerHTML = `
    <span>${experience.location}</span>
    <span>${experience.duration}</span>
    <span>${experience.intensity} pace</span>
    <span>${experience.rating.toFixed(2)} ★</span>
  `;

  const guide = document.createElement('div');
  guide.className = 'experience-card__guide';
  guide.textContent = `Lead guide: ${experience.guide}`;

  const tags = document.createElement('ul');
  tags.className = 'experience-card__tags';
  tags.setAttribute('aria-label', `Tags for ${experience.headline}`);
  experience.tags.forEach((tag) => {
    const item = document.createElement('li');
    item.className = 'experience-card__tag';
    item.textContent = tag;
    tags.appendChild(item);
  });

  const actions = document.createElement('div');
  actions.className = 'experience-card__actions';

  const cta = document.createElement('a');
  cta.className = 'experience-card__cta';
  cta.href = `mailto:experiences@allgoods.example?subject=${encodeURIComponent(experience.headline)}`;
  cta.textContent = 'Reserve a spot';
  cta.setAttribute('aria-label', `Reserve a spot for ${experience.headline}`);

  const bookmark = document.createElement('button');
  bookmark.type = 'button';
  bookmark.className = 'experience-card__cta';

  const setBookmarkState = (active) => {
    bookmark.setAttribute('aria-pressed', active ? 'true' : 'false');
    bookmark.textContent = active ? 'Saved' : 'Save for later';
    bookmark.setAttribute('title', active ? 'Saved to your list' : 'Save this experience');
  };

  setBookmarkState(false);

  bookmark.addEventListener('click', () => {
    const nextState = bookmark.getAttribute('aria-pressed') !== 'true';
    setBookmarkState(nextState);
  });

  actions.append(cta, bookmark);
  body.append(title, description, meta, guide, tags, actions);
  article.append(media, body);

  return article;
}

function renderNextChunk(grid) {
  if (renderedCount >= experiences.length) {
    if (infiniteObserver) {
      infiniteObserver.disconnect();
    }
    return;
  }

  const fragment = document.createDocumentFragment();
  const nextItems = experiences.slice(renderedCount, renderedCount + EXPERIENCE_CHUNK_SIZE);
  nextItems.forEach((experience) => {
    fragment.appendChild(createExperienceCard(experience));
  });
  grid.appendChild(fragment);
  renderedCount += nextItems.length;
}

function initInfiniteScroll(grid, sentinel) {
  if (infiniteObserver) {
    infiniteObserver.disconnect();
  }

  infiniteObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          renderNextChunk(grid);
        }
      });
    },
    {
      rootMargin: '200px'
    }
  );

  infiniteObserver.observe(sentinel);
}

function initHeaderAffordance() {
  const header = qs(SELECTORS.header);
  if (!header) return;
  header.dataset.scrolled = window.scrollY > 8 ? 'true' : 'false';

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    window.requestAnimationFrame(() => {
      header.dataset.scrolled = window.scrollY > 8 ? 'true' : 'false';
      ticking = false;
    });
    ticking = true;
  });
}

function hydrate() {
  const grid = qs(SELECTORS.grid);
  const sentinel = qs(SELECTORS.sentinel);
  const countDisplay = qs(SELECTORS.count);
  if (countDisplay) {
    countDisplay.textContent = experiences.length.toLocaleString();
  }
  if (!grid || !sentinel) return;

  renderNextChunk(grid);
  renderNextChunk(grid);
  initInfiniteScroll(grid, sentinel);
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHeaderAffordance();
  hydrate();
});
