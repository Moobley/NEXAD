/**
 * Deploy base path for assets under `public/`.
 *
 * - Local / master: no `basePath` in next.config.ts → empty string, assets
 *   are served from the root (`/projects/...`).
 * - Published branch (`feature/gh-pages`): `basePath: "/NEXAD"`. Next.js
 *   prefixes `_next/static` and links automatically, but NOT the `src` of
 *   `next/image` (per docs: "you will need to add the basePath in front of
 *   src"). That branch sets `NEXT_PUBLIC_BASE_PATH="/NEXAD"` so this helper
 *   emits `/NEXAD/projects/...`.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

export function asset(path: string): string {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`
}