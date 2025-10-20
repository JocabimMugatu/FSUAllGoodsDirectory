import './style.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <main>
    <h1>Vite SPA</h1>
    <p>This is a minimal single-page app configured for Netlify deploy previews.</p>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About (simulated SPA route)</a>
    </nav>
  </main>
`;
