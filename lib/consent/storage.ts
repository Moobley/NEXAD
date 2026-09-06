import {
  CONSENT_STORAGE_KEY,
  DEFAULT_CONSENT,
  isConsentState,
  type ConsentState,
} from "./types"

/**
 * Client-side consent store — the single, centralized owner of the
 * `nexad_cookie_consent` key. Components never touch localStorage directly.
 *
 * Exposed as a small external store so React can subscribe via
 * `useSyncExternalStore` (hydration-safe) and non-React code (e.g.
 * `trackConversion`) can read the latest state without subscribing.
 */

let currentConsent: ConsentState = DEFAULT_CONSENT
let consentReady = false

const listeners = new Set<() => void>()

function notifyConsentChange(): void {
  for (const listener of listeners) listener()
}

export function subscribeConsent(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function canUseStorage(): boolean {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  )
}

function readRawStoredConsent(): ConsentState | null {
  if (!canUseStorage()) return null
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    return isConsentState(parsed) ? parsed : null
  } catch {
    return null
  }
}

/**
 * Loads a previously persisted choice. Call once after mount (client only);
 * safe to call repeatedly. Notifies subscribers so the UI settles on the
 * stored state without a hydration mismatch.
 */
export function hydrateConsent(): void {
  if (consentReady) return
  consentReady = true
  const stored = readRawStoredConsent()
  if (stored) currentConsent = stored
  notifyConsentChange()
}

export function getCurrentConsent(): ConsentState {
  return currentConsent
}

/** True once the store has been hydrated (always false during SSR/hydration). */
export function isConsentReady(): boolean {
  return consentReady
}

/** True when the user has expressed any preference (stored payload exists). */
export function hasConsentChoice(): boolean {
  return currentConsent.updatedAt !== ""
}

export function persistConsent(state: ConsentState): void {
  currentConsent = state
  consentReady = true
  if (canUseStorage()) {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Storage unavailable (private mode, quota…): keep the in-memory state
      // so the session still behaves correctly without persisting.
    }
  }
  notifyConsentChange()
}

export function clearConsent(): void {
  currentConsent = DEFAULT_CONSENT
  if (canUseStorage()) {
    try {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY)
    } catch {
      // Ignore: nothing persisted in this session.
    }
  }
  notifyConsentChange()
}
