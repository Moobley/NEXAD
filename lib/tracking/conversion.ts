import { getCurrentConsent } from "@/lib/consent/storage"

/**
 * Conversion tracking facade.
 *
 * Single entry point for business events. Every send is gated on the
 * persisted consent state and on the presence of the relevant tag ID, so the
 * site stays a safe no-op when:
 * - no Google Ads / Meta Pixel ID is configured, or
 * - the user has not granted advertising consent.
 *
 * Future events (cta_click, …) only need their name added to `ConversionEvent`.
 */

export type ConversionEvent =
  "contact_form_submit" | "newsletter_opt_in" | "cta_click"

declare global {
  interface Window {
    dataLayer?: unknown[][]
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown[][]
  }
}

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

function sendToGoogle(event: ConversionEvent): void {
  if (typeof window === "undefined") return
  window.gtag?.("event", event)
}

function sendToMeta(event: ConversionEvent): void {
  if (typeof window === "undefined") return
  window.fbq?.("trackCustom", event)
}

export function trackConversion(event: ConversionEvent): void {
  const consent = getCurrentConsent()

  if (GOOGLE_ADS_ID && consent.advertising) {
    sendToGoogle(event)
  }

  if (META_PIXEL_ID && consent.advertising) {
    sendToMeta(event)
  }
}
