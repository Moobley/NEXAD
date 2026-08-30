# i18n Routing + Static Export + GitHub Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `master` deployable to GitHub Pages via static export with locale-prefixed URLs (`/es/`, `/en/`, `/it/`), env-driven `basePath` (`/NEXO` only on GitHub Pages), and a client-side root language redirect — while keeping local dev free of `/NEXO` and the codebase ready for a future custom domain.

**Architecture:** Keep the existing `app/[locale]` structure and next-intl `Link`/`useRouter` helpers. Switch `localePrefix` to `"always"`, drop the middleware (`proxy.ts`) which is unsupported by static export, export statically with `output: "export"`, drive `basePath` from `NEXT_PUBLIC_BASE_PATH` (empty locally, `/NEXO` in CI), and serve a tiny `public/index.html` at `/` that detects `navigator.language` and redirects to the right locale (fallback `es`; `<noscript>` → `/es/`).

**Tech Stack:** Next.js 16 (App Router), next-intl v4, TypeScript (strict), GitHub Actions Pages deploy.

## Global Constraints

- Locales: `es` (default), `en`, `it`. `localePrefix: "always"` — every URL always carries the locale.
- No hardcoded `/NEXO` anywhere in source; basePath comes from `NEXT_PUBLIC_BASE_PATH` at build time.
- No `proxy.ts` / middleware / rewrites / redirects / server runtime — incompatible with `output: "export"`.
- `out/` is the export directory. `trailingSlash: true` (GitHub Pages needs `/es/index.html`).
- Images already use `unoptimized` + `asset()` helper; add global `images.unoptimized` to guard future images.
- Do NOT touch design, copy, animations, or layout.
- Do NOT delete the remote `feature/gh-pages` branch — just make it obsolete.
- Scripts: `npm run lint`, `npm run typecheck`, `npm run build`. Node 22 in CI.

---

### Task 1: Static export + env-driven basePath in `next.config.ts`

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Edit `next.config.ts`**

```ts
import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default withNextIntl(nextConfig)
```

- [ ] **Step 2: Verify**

Run `npm run typecheck`. Expected: PASS. `next.config.ts` is not type-checked by `tsc` (it is a config file) but must be syntactically valid.

### Task 2: Force locale prefix in `i18n/routing.ts`

**Files:**
- Modify: `i18n/routing.ts`

- [ ] **Step 1: Edit**

Change `localePrefix: "as-needed"` → `localePrefix: "always"`.

- [ ] **Step 2: Verify**

`npm run typecheck` → PASS.

### Task 3: Remove middleware `proxy.ts`

**Files:**
- Delete: `proxy.ts`

- [ ] **Step 1: Delete the file** (`git rm proxy.ts`).

Rationale: static export does not support Proxy/middleware (Next 16 docs). Locale-prefixed routing no longer needs it; root redirect is handled by `public/index.html`.

- [ ] **Step 2: Verify** — `npm run build` in Task 7 succeeds (proxy would fail it).

### Task 4: Root `/` client-side language redirect

**Files:**
- Create: `public/index.html`

- [ ] **Step 1: Write `public/index.html`**

Tiny page: inline head script reads `navigator.languages`/`navigator.language`, maps to `es|en|it` (fallback `es`), and does `location.replace("./<locale>/")` (relative → works under any basePath). `<noscript>` meta-refresh + link → `/es/`.

- [ ] **Step 2: Verify** — see Task 8 (dev root) and Task 9 (export root).

### Task 5: GitHub Actions workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Write workflow**

Trigger: push on `master` + `workflow_dispatch`. Permissions `pages: write`/`id-token: write`. Concurrency group `pages`. Build job: checkout, setup-node 22 + npm cache, `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build` with `NEXT_PUBLIC_BASE_PATH: /NEXO`, upload `out/` via `actions/upload-pages-artifact@v3`. Deploy job: `actions/deploy-pages@v4` with `github-pages` environment.

### Task 6: Update AGENTS.md (stale i18n/deploy facts)

**Files:**
- Modify: `AGENTS.md`

Update the i18n section: `localePrefix: "always"`, no `proxy.ts`, static export + `NEXT_PUBLIC_BASE_PATH`.

### Task 7: Verify local + GitHub Pages builds

- [ ] `npm run lint` → PASS
- [ ] `npm run typecheck` → PASS
- [ ] `npm run build` (no env) → PASS, exports to `out/`
- [ ] `NEXT_PUBLIC_BASE_PATH=/NEXO npm run build` → PASS, `_next/static` + links prefixed with `/NEXO`
- [ ] Inspect `out/` for `es/`, `en/`, `it/`, subpages, case-study routes, `404.html`, `index.html`

### Task 8: Verify dev mode

- [ ] `npm run dev` → `/es/` renders (no `/NEXO`), `/` serves the redirect stub

### Task 9: Verify served static output & internal links

- [ ] Serve `out/` locally, confirm `/NEXO/es/services/` and asset paths resolve; grep exported HTML for bad hrefs (`/NEXO/NEXO`, locale-less internal links)

### Task 10: Commit on `master`

- [ ] `git add` the changed files, commit with a clear message, `git push origin master`

---

## Self-Review

**Spec coverage:**
1. Always locale-prefixed URLs → Task 2. 2. Root redirect → Task 4. 3. basePath via env → Task 1 + Task 5. 4. Static export → Task 1. 5. Dev without `/NEXO` → Task 1 (empty basePath) + Task 8. 6. Workflow from master → Task 5. 7. Design untouched → no component edits. 8. Assets → `asset()` helper already correct, no source changes needed. 9. Tests → Task 7/8/9. 10. `feature/gh-pages` obsolete → removed proxy/static-export gap; branch left alone.

**Placeholder scan:** no TBDs; all steps concrete.

**Type consistency:** `NEXT_PUBLIC_BASE_PATH` is the single source of truth, consumed both by `next.config.ts` (basePath) and `lib/asset.ts` (asset prefix) — consistent.