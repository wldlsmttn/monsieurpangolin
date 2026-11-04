# Monsieur Pangolin

Personal site built on the [Growing Galaxy](https://github.com/OwenCedaric/GrowingGalaxy) theme (MIT), adapted to deploy on **Netlify**.

- Blog (MDX + KaTeX), photo gallery, travel "traces" with maps, projects, about page
- Static search with [Pagefind](https://pagefind.app/)
- Astro 7, React 19, Tailwind CSS 4, Motion

## Commands

| Command | Action |
| :-- | :-- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Dev server at `localhost:4321` |
| `pnpm build` | Build to `./dist/` and generate the Pagefind index |
| `pnpm preview` | Preview the production build |
| `pnpm check` | Type check |

Requires Node.js 22.22+ and pnpm.

## Deploying to Netlify

`netlify.toml` sets the build command (`pnpm run build`), the publish directory (`dist`) and the Node version. Netlify detects pnpm from `pnpm-lock.yaml`.

## Customising

- **Site settings** (title, URL, navigation, footer, order of the "Ma sélection" categories, Amazon Partner notice): `src/config.ts`.
- **Logo / favicon**: `public/favicon.svg` (used as a mask, so a single-colour shape works best).
- **Content** lives in `src/content/`. Each folder has a commented French template whose name starts with `_` (ignored by the site): copy it without the `_` and fill it in.

| Section | URL | Where | Template |
| :-- | :-- | :-- | :-- |
| Blog | `/blog` | `src/content/blog/<year>/<slug>.md` | `_modele-article.md` |
| Galerie | `/galerie` | `src/content/photos/<year>/<slug>.md` | `_modele-album.md` |
| Courses | `/courses` | `src/content/courses/<year>/<slug>.md` | `_modele-course.md` |
| Projets | `/projets` | `src/content/projects/<slug>.md` | `_modele-projet.md` |
| Ma sélection | `/selection` | `src/content/selection.yaml` | example in the file |
| À propos | `/a-propos` | `src/content/pages/a-propos.md` | — |

Courses compute the pace (min/km) for running and trail, and the average speed (km/h) for cycling, from `distance` and `temps`.

Old English URLs (`/gallery`, `/traces`, `/projects`, `/elsewhere`, `/search`, `/about`) redirect to the French ones (see `netlify.toml`).

- Markdown extensions are documented in `MARKDOWN_SYNTAX.md`.

## Differences from the upstream theme

The upstream theme ships a Cloudflare Worker that serves AI semantic search (MCP + Cloudflare Vectorize). That backend does not run on Netlify, so it was removed: the Worker, `wrangler.json`, the embedding script and the Cloudflare deploy workflow. The "AI Intel" search tab is hidden (`aiSearch: false` in `src/config.ts`); keyword search via Pagefind works as before.
