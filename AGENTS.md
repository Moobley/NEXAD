<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# NEXO — Digital Studio

Next.js 16 + React 19 + TypeScript (strict) site for a digital strategy studio in Gran Canaria. **This folder is the git repo** — run git and npm commands here, not from the parent `NEXO/` directory.

## Commands
- `npm run dev` / `npm run build` / `npm run start`
- `npm run lint` (eslint) · `npm run typecheck` (`tsc --noEmit`) · `npm run format` (prettier on `**/*.{ts,tsx}`)
- No test suite is configured.

## i18n (next-intl v4) — check before touching routes/navigation
- Locales `es` (default), `en`, `it`; `localePrefix: "always"` — every URL is prefixed (`/es/`, `/en/`, `/it/`), see `i18n/routing.ts`. No `proxy.ts`/middleware (incompatible with static export).
- Static export: `output: "export"` + `trailingSlash: true` in `next.config.ts`. The `basePath` comes from `NEXT_PUBLIC_BASE_PATH` (`/NEXO` only in the GitHub Pages build; empty locally). Never hardcode `/NEXO`.
- Root `/` is a static `public/index.html` that redirects by `navigator.language` (fallback `es`).
- Import `Link`, `useRouter`, `usePathname`, `redirect` from `@/i18n/navigation` — never from `next/link` / `next/navigation`.
- Pages live under `app/[locale]/`. Every page/layout must call `setRequestLocale(locale)` and await `params` (it's a Promise). Use `generateStaticParams()` for locales.

## Content lives in messages, not components
- All UI copy is in `messages/{en,es,it}.json` — keep the three locale files in sync. Never hardcode user-facing copy in components.
- `content/projects.ts` defines project data whose `ns` fields point into the `projects.*` message namespaces.

## Design tokens
- Custom colors in `app/globals.css`: `obsidian`, `ivory`, `lilac`, `iris`.
- Fonts (`next/font/google`, exposed as CSS vars): Familjen Grotesk (sans), Instrument Serif (italic display), Geist Mono.

## Path alias
- `@/*` maps to the repo root (e.g. `@/components/ui/...`), so imports look non-standard. `components.json` uses the `base-nova` shadcn style with lucide icons and `@base-ui/react` primitives.
