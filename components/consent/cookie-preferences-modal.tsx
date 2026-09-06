"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Dialog } from "@base-ui/react/dialog"
import { Switch } from "@base-ui/react/switch"
import { X } from "lucide-react"

import { useCookieConsent } from "@/components/consent/consent-provider"

const SECONDARY_BUTTON =
  "inline-flex items-center justify-center border border-ivory/50 px-[1.9rem] py-[1.05rem] text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-ivory transition-colors hover:border-signal hover:text-signal focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-3"

const SWITCH_TRACK =
  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center border border-obsidian/20 transition-colors data-[checked]:bg-signal data-[unchecked]:bg-obsidian/10 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2"

const SWITCH_THUMB =
  "pointer-events-none block size-4 rounded-full bg-foreground shadow-sm transition-transform data-[checked]:translate-x-[22px] data-[unchecked]:translate-x-[3px]"

// Rendered inside Dialog.Portal, so it remounts with every open/close cycle
// and the toggles always start from the current consent state.
function PreferenceToggles() {
  const t = useTranslations("cookies.modal")
  const { consent, acceptAll, rejectAll, savePreferences } = useCookieConsent()

  const [analytics, setAnalytics] = useState(consent.analytics)
  const [advertising, setAdvertising] = useState(consent.advertising)

  return (
    <>
      <div className="flex-1 overflow-y-auto px-6 md:px-10">
        <div className="flex items-start justify-between gap-6 border-b border-ivory/10 py-6">
          <div>
            <p className="font-sans text-base font-medium text-foreground">
              {t("necessaryTitle")}
            </p>
            <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("necessaryBody")}
            </p>
          </div>
          <Switch.Root
            checked
            disabled
            aria-label={t("necessaryTitle")}
            className={SWITCH_TRACK}
          >
            <Switch.Thumb className={SWITCH_THUMB} />
          </Switch.Root>
        </div>

        <div className="flex items-start justify-between gap-6 border-b border-ivory/10 py-6">
          <div>
            <p className="font-sans text-base font-medium text-foreground">
              {t("analyticsTitle")}
            </p>
            <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("analyticsBody")}
            </p>
          </div>
          <Switch.Root
            checked={analytics}
            onCheckedChange={setAnalytics}
            aria-label={t("analyticsTitle")}
            className={SWITCH_TRACK}
          >
            <Switch.Thumb className={SWITCH_THUMB} />
          </Switch.Root>
        </div>

        <div className="flex items-start justify-between gap-6 py-6">
          <div>
            <p className="font-sans text-base font-medium text-foreground">
              {t("advertisingTitle")}
            </p>
            <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("advertisingBody")}
            </p>
          </div>
          <Switch.Root
            checked={advertising}
            onCheckedChange={setAdvertising}
            aria-label={t("advertisingTitle")}
            className={SWITCH_TRACK}
          >
            <Switch.Thumb className={SWITCH_THUMB} />
          </Switch.Root>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-ivory/10 px-6 py-6 sm:flex-row sm:flex-wrap md:px-10">
        <button
          type="button"
          onClick={() => savePreferences({ analytics, advertising })}
          className="cta-primary justify-center"
        >
          {t("save")}
        </button>
        <button type="button" onClick={acceptAll} className={SECONDARY_BUTTON}>
          {t("acceptAll")}
        </button>
        <button type="button" onClick={rejectAll} className={SECONDARY_BUTTON}>
          {t("rejectAll")}
        </button>
      </div>
    </>
  )
}

export function CookiePreferencesModal() {
  const t = useTranslations("cookies.modal")
  const { preferencesOpen, closePreferences } = useCookieConsent()

  return (
    <Dialog.Root
      open={preferencesOpen}
      onOpenChange={(open) => {
        if (!open) closePreferences()
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[80] bg-carbon/70" />
        <Dialog.Popup className="surface-obsidian fixed inset-0 z-[90] m-auto flex h-fit max-h-[85vh] w-[min(92vw,560px)] flex-col overflow-hidden border border-ivory/15 outline-none">
          <div className="flex items-start justify-between gap-6 border-b border-ivory/10 px-6 py-6 md:px-10">
            <Dialog.Title className="font-sans text-2xl font-medium tracking-tight text-foreground">
              {t("title")}
            </Dialog.Title>
            <Dialog.Close
              aria-label={t("close")}
              className="shrink-0 text-muted-foreground transition-colors hover:text-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            >
              <X className="size-5" strokeWidth={1.5} />
            </Dialog.Close>
          </div>

          <Dialog.Description className="sr-only">
            {t("description")}
          </Dialog.Description>

          <PreferenceToggles />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
