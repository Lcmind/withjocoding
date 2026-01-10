# withjocoding

Static site deployed via Cloudflare Pages. Pushing to the connected Git branch triggers an automatic deploy (and PRs create preview deployments).

## Local Development

- Quick preview with Python:

```bash
pushd /Volumes/hooddakSSD/withjocoding
python3 -m http.server 3000
```

- Optional: VS Code Live Server extension for one-click preview.

## Workflow

- Edit files (index.html, style.css, main.js)
- Commit and push to the Cloudflare-connected branch (usually `main`).

```bash
git add .
git commit -m "feat: update site"
git push origin main
```

- For preview deployments, open a pull request; Cloudflare will build a preview.

## Cloudflare Settings

- Build command: none (static site).
- Output directory: project root.
- Environment variables: configure in Cloudflare Pages > Settings if needed.

## Branches

- `main`: primary branch (recommended for Cloudflare Pages).
- `gh-pages`: legacy GitHub Pages branch (not required for Cloudflare Pages).
