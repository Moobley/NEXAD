"use client"

import { useEffect } from "react"

import { useCookieConsent } from "@/components/consent/consent-provider"

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

/**
 * Meta Pixel loader.
 *
 * The pixel script is only fetched after the user has granted advertising
 * consent and a pixel ID is configured; otherwise it is never created.
 * On revocation (`advertising` true → false) no further events are sent by
 * `trackConversion` and Meta Consent Mode is told to `revoke`.
 *
 * Known technical limit: once the pixel script has loaded, Meta has already
 * received the events sent up to the revocation point; it is not possible to
 * retroactively delete them from the client.
 */
export function MetaPixel() {
  const { consent } = useCookieConsent()

  useEffect(() => {
    if (!META_PIXEL_ID || !consent.advertising) return
    if (document.querySelector("script[data-nexad-meta-pixel]")) return

    window.fbq =
      window.fbq ||
      function push(...args: unknown[]) {
        window._fbq = window._fbq || []
        window._fbq.push(args)
      }

    const script = document.createElement("script")
    script.async = true
    script.dataset.nexadMetaPixel = ""
    script.src = "https://connect.facebook.net/en_US/fbevents.js"
    document.head.appendChild(script)

    window.fbq("init", META_PIXEL_ID)
    window.fbq("track", "PageView")
  }, [consent.advertising])

  useEffect(() => {
    if (!META_PIXEL_ID || !window.fbq) return
    window.fbq("consent", consent.advertising ? "grant" : "revoke")
  }, [consent.advertising])

  return null
}
