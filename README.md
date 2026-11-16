# SOC 2 Document Map

A tiny static site: a map of the security documents with hints on what each one is, when to use it, which SOC 2 criteria it supports, and what it means for each role. Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Files

- `index.html`: the page.
- `style.css`: styles (light and dark).
- `app.js`: search, role filter and cards.
- `data.js`: all the content. This is the only file you normally edit.
- `.nojekyll`: tells GitHub Pages to publish the files as they are.

## Run locally

Open `index.html` in a browser. Nothing to install.

## Publish on GitHub Pages

1. Create a repository (for example `soc2-document-map`) and push these files to the root of the `main` branch.
2. In the repository: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`, then Save.
3. After a minute or two the site is at `https://<account>.github.io/<repository>/`.

Every later push to `main` republishes the site automatically.

## Update the content

Edit `data.js`:

- Add or change a document in the `docs` list (copy an existing entry). Use the existing `group` ids.
- Add a situation to `situations` for the Quick answers block.
- Change what each role should do in `roleGuides`.
- Update `asOf` at the top when you review the map.

## Important: the site is public

GitHub Pages is readable by anyone on the internet, even when the repository is private. Keep the content general: purpose, audience and criteria. Do not publish time limits (SLAs), tool or vendor names, people's names, known weaknesses, exceptions, or the documents themselves. The page asks search engines not to index it (`noindex`), but that is not access control.
