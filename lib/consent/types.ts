/**
 * Cookie consent domain model.
 *
 * Categories are privacy-by-default: only `necessary` starts enabled, and it
 * is always on. `analytics` / `advertising` default to `false` and can only
 * become `true` through an explicit user choice (banner or preferences
 * panel). Nothing non-essential is loaded before a choice is persisted.
 */

export const CONSENT_STORAGE_KEY = "nexad_cookie_consent"

export const CONSENT_VERSION = "1"

export const COOKIE_CATEGORIES = [
  "necessary",
  "analytics",
  "advertising",
] as const

export type CookieCategory = (typeof COOKIE_CATEGORIES)[number]

export interface ConsentState {
  version: string
  necessary: boolean
  analytics: boolean
  advertising: boolean
  updatedAt: string
}

export const DEFAULT_CONSENT: ConsentState = {
  version: CONSENT_VERSION,
  necessary: true,
  analytics: false,
  advertising: false,
  updatedAt: "",
}

export type ConsentPreferences = Pick<ConsentState, "analytics" | "advertising">

/** Rejects structurally invalid or out-of-version stored payloads. */
export function isConsentState(value: unknown): value is ConsentState {
  if (typeof value !== "object" || value === null) return false
  const record = value as Record<string, unknown>
  return (
    record.version === CONSENT_VERSION &&
    record.necessary === true &&
    typeof record.analytics === "boolean" &&
    typeof record.advertising === "boolean" &&
    typeof record.updatedAt === "string"
  )
}

export function buildConsentState(
  preferences: Partial<ConsentPreferences>
): ConsentState {
  return {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: preferences.analytics ?? false,
    advertising: preferences.advertising ?? false,
    updatedAt: new Date().toISOString(),
  }
}
