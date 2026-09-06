"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react"

import {
  buildConsentState,
  type ConsentPreferences,
  type ConsentState,
} from "@/lib/consent/types"
import {
  getCurrentConsent,
  hydrateConsent,
  isConsentReady,
  persistConsent,
  subscribeConsent,
} from "@/lib/consent/storage"

interface CookieConsentContextValue {
  consent: ConsentState
  hasConsentChoice: boolean
  consentReady: boolean
  acceptAll: () => void
  rejectAll: () => void
  savePreferences: (preferences: ConsentPreferences) => void
  openPreferences: () => void
  closePreferences: () => void
  preferencesOpen: boolean
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null
)

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  // Server-safe external store: the server and the first client render both
  // see the privacy-by-default state, then hydration settles the real value.
  const consent = useSyncExternalStore(
    subscribeConsent,
    getCurrentConsent,
    getCurrentConsent
  )
  const ready = useSyncExternalStore(
    subscribeConsent,
    isConsentReady,
    () => false
  )
  const [preferencesOpen, setPreferencesOpen] = useState(false)

  useEffect(() => {
    hydrateConsent()
  }, [])

  const apply = useCallback((next: ConsentState) => {
    persistConsent(next)
    setPreferencesOpen(false)
  }, [])

  const acceptAll = useCallback(
    () => apply(buildConsentState({ analytics: true, advertising: true })),
    [apply]
  )

  const rejectAll = useCallback(
    () => apply(buildConsentState({ analytics: false, advertising: false })),
    [apply]
  )

  const savePreferences = useCallback(
    (preferences: ConsentPreferences) => apply(buildConsentState(preferences)),
    [apply]
  )

  const openPreferences = useCallback(() => setPreferencesOpen(true), [])
  const closePreferences = useCallback(() => setPreferencesOpen(false), [])

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      hasConsentChoice: consent.updatedAt !== "",
      consentReady: ready,
      acceptAll,
      rejectAll,
      savePreferences,
      openPreferences,
      closePreferences,
      preferencesOpen,
    }),
    [
      consent,
      ready,
      acceptAll,
      rejectAll,
      savePreferences,
      openPreferences,
      closePreferences,
      preferencesOpen,
    ]
  )

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent(): CookieConsentContextValue {
  const context = useContext(CookieConsentContext)
  if (!context) {
    throw new Error(
      "useCookieConsent must be used within CookieConsentProvider"
    )
  }
  return context
}
