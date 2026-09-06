"use client"

import { useEffect } from "react"

import { useCookieConsent } from "@/components/consent/consent-provider"

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID

/**
 * Google Ads + Google Consent Mode.
 *
 * Privacy-by-default, Consent Mode v2 compatible:
 * - the default state (all storage denied) is pushed to the dataLayer before
 *   anything else;
 * - gtag.js is NOT injected until the user grants advertising consent;
 * - on consent change the state is updated; denied categories stay denied;
 * - without `NEXT_PUBLIC_GOOGLE_ADS_ID` the component is a complete no-op.
 */
export function GoogleConsentManager() {
  const { consent } = useCookieConsent()

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!window.gtag) {
      window.gtag = (...args: unknown[]) => {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push(args)
      }
    }
    // Default Consent Mode state: everything denied until the user chooses.
    // Pushed before any tag loads so tag behaviour is gated from the start.
    push("consent", "default", {
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    })
  }, [])

  useEffect(() => {
    if (!GOOGLE_ADS_ID) return
    push("consent", "update", {
      ad_storage: consent.advertising ? "granted" : "denied",
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_user_data: consent.advertising ? "granted" : "denied",
      ad_personalization: consent.advertising ? "granted" : "denied",
    })
  }, [consent.advertising, consent.analytics])

  useEffect(() => {
    if (!GOOGLE_ADS_ID || !consent.advertising) return
    if (document.querySelector("script[data-nexad-google-ads]")) return

    const script = document.createElement("script")
    script.async = true
    script.dataset.nexadGoogleAds = ""
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`
    document.head.appendChild(script)
    push("js", new Date())
    push("config", GOOGLE_ADS_ID)
  }, [consent.advertising])

  return null
}

function push(...args: unknown[]): void {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(args)
}
