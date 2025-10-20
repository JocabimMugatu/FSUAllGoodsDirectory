const app = document.getElementById('app');
app.innerHTML = `
  <main style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; padding: 2rem; line-height: 1.5;">
    <h1>Vite SPA on Netlify</h1>
    <p>If you can see this, the build output is being served from <code>dist</code> and SPA redirects are configured.</p>
    <nav style="margin-top: 1rem;">
      <a href="/" style="margin-right: 1rem;">Home</a>
      <a href="/deep/link/example">Deep Link Example</a>
    </nav>
    <p style="margin-top: 2rem; color: #555;">Try visiting a deep link directly: <code>/deep/link/example</code>. Netlify should serve <code>/index.html</code> with status 200.</p>
  </main>
`;
