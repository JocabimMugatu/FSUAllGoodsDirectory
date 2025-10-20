Deploy preview log summary (local verification)

- Publish directory: dist
- Files uploaded (local build): 5
  - dist/index.html
  - dist/_redirects
  - dist/404.html
  - dist/assets/index-*.js
  - dist/assets/index-*.css
- Root path / will return index.html with status 200 by virtue of:
  - netlify.toml [[redirects]] rule from /* to /index.html with status = 200
  - public/_redirects fallback rule "/* /index.html 200" copied to dist

Local build output (vite):

vite v5 build summary:
- dist/index.html
- dist/assets/index-*.css
- dist/assets/index-*.js

