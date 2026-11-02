<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# booknook-app-client

Next.js 16.4 App Router app (`src/app`), JavaScript only — `.js`/`.jsx`, `jsconfig.json`, no `tsconfig`. Path alias `@/*` → `./src/*`.

## Commands

- `npm run dev` — dev server at `http://localhost:3000`.
- `npm run lint` — runs bare `eslint` (v9 flat config, `.next`/`out`/`build` ignored).
- `npm run build` / `npm start` — production build/serve.
- No tests, no CI, no typecheck command exist. Verify changes with `npm run lint` and a `dev`/`build` run.

## next.config.mjs — non-default flags you must respect

- **`cacheComponents: true` + `partialPrefetching: true`.** Cache Components is the current caching model: data fetching is dynamic by default. Uncached reads (`fetch`, `cookies()`, `headers()`, `connection()`, runtime data) inside a prerendered route must be wrapped in `<Suspense>` or moved under `'use cache'`, or the build fails with a "blocking prerender" error whose output lists labeled fixes. See `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md`.
  - `params` and `searchParams` are Promises — `const { slug } = await params` (or pass the promise down and await it in a child to keep parents blocking-free).
  - Legacy segment configs are removed with this flag: `dynamic`, `dynamicParams`, `revalidate`, `fetchCache` don't work and `runtime` exports are rejected. Use `'use cache'` / `cacheLife` / `cacheTag` instead.
  - Keep both flags explicitly set; removing either changes behavior or triggers warnings.
- **`reactCompiler: true`** auto-memoizes. Don't add `useMemo`/`useCallback` speculatively; use them only for actual dependencies, not as render-hygiene.
- **Turbopack-only pipeline.** No webpack config would apply; Tailwind v4 is wired via `turbopack.rules` with `@tailwindcss/turbopack` (no PostCSS config exists).

## Conventions

- Preserve the managed `<!-- BEGIN/END:nextjs-agent-* -->` blocks in this file; `next dev` rewrites them (this project enables `experimental.agentFeedback`).

## Docs and debugging

- Version-matched Next.js docs live in `node_modules/next/dist/docs/` — prefer them over web/nextjs.org guesses and older training data.
- `next dev` mirrors browser console errors into the terminal. Build/prerender errors list labeled fixes and link to per-error pages at `https://nextjs.org/docs/messages/<error>` (these are agent-written and not bundled in `node_modules`); follow their canonical fix patterns. `npx next build --debug-prerender` enables server source maps and continues past a failed route to surface more issues.
