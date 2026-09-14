"use client"

import { type FormEvent, type RefObject, useEffect, useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"
import { ForwardMark } from "@/components/ui/forward-mark"
import { asset } from "@/lib/asset"
import { cn } from "@/lib/utils"
import { trackConversion } from "@/lib/tracking/conversion"

const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID

// The form is OFF by default (pre-launch). It only becomes submittable when
// the feature flag is explicitly "true" AND a Formspree ID is present.
// The flag alone is never enough; neither is the ID alone.
const CONTACT_FORM_ENABLED =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED === "true" && Boolean(FORM_ID)

type FormStatus = "idle" | "submitting" | "success" | "error"

type FieldKey = "name" | "surname" | "phone" | "email" | "message" | "privacy"

type Errors = Partial<Record<FieldKey, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FIELD_BASE =
  "w-full border border-obsidian/15 bg-transparent px-4 py-3.5 text-base text-foreground transition-colors placeholder:text-muted-foreground/60 hover:border-obsidian/40 focus:border-obsidian focus:outline-none focus:ring-2 focus:ring-signal/40"

function isPhoneValid(value: string): boolean {
  // Accept international formats (+, spaces, dashes, dots, parentheses);
  // require at least 7 digits to be a plausible mobile/landline number.
  return value.replace(/\D/g, "").length >= 7
}

function SuccessPanel({ focusRef }: { focusRef: RefObject<HTMLDivElement | null> }) {
  const t = useTranslations("contactPage.success")

  return (
    <div
      ref={focusRef}
      tabIndex={-1}
      className="surface-obsidian border border-ivory/15 p-8 focus:outline-none md:p-12"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        {t("eyebrow")}
      </p>
      <h3 className="mt-4 font-sans text-3xl font-medium tracking-tight text-foreground md:text-4xl">
        {t("heading")}
      </h3>
      <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
        {t("body")}
      </p>
      <Link href="/" className="cta-secondary mt-10 inline-flex">
        {t("cta")}
        <ForwardMark className="cta-forward" />
      </Link>
    </div>
  )
}

function DisabledFormNote() {
  const t = useTranslations("contactPage.disabled")

  return (
    <div className="pb-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        {t("eyebrow")}
      </p>
      <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
        {t("body")}
      </p>
    </div>
  )
}

export function ContactForm() {
  const t = useTranslations("contactPage.form")
  const tPrivacy = useTranslations("contactPage.privacy")
  const locale = useLocale()

  const [status, setStatus] = useState<FormStatus>("idle")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [errors, setErrors] = useState<Errors>({})

  const successRef = useRef<HTMLDivElement>(null)
  const alertRef = useRef<HTMLParagraphElement>(null)
  const gotchaRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (status === "success") successRef.current?.focus()
    if (status === "error") alertRef.current?.focus()
  }, [status])

  function fieldErrors(): Errors {
    const next: Errors = {}
    if (!name.trim()) next.name = t("errors.name")
    if (!surname.trim()) next.surname = t("errors.surname")
    if (!phone.trim()) next.phone = t("errors.phone")
    else if (!isPhoneValid(phone.trim())) next.phone = t("errors.phone")
    if (!email.trim()) next.email = t("errors.email")
    else if (!EMAIL_PATTERN.test(email.trim())) next.email = t("errors.email")
    if (!privacyAccepted) next.privacy = t("errors.privacyConsent")
    return next
  }

  function handleBlur(field: FieldKey) {
    const all = fieldErrors()
    setErrors((prev) => ({ ...prev, [field]: all[field] }))
  }

  function clearError(field: FieldKey) {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Hard guard: never serialize or send form data while the form is
    // disabled. No fetch, no Formspree request, no fallback submission.
    if (!CONTACT_FORM_ENABLED) return
    if (status === "submitting" || status === "success") return

    const next = fieldErrors()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setStatus("submitting")
    const formData = new FormData()
    // Honeypot spam trap: bots fill the hidden field; humans never see it.
    // The value is read from the (invisible) input and must be present in the
    // submitted FormData so Formspree can discard non-empty submissions.
    formData.append("_gotcha", gotchaRef.current?.value ?? "")
    formData.append("name", name.trim())
    formData.append("surname", surname.trim())
    formData.append("phone", phone.trim())
    formData.append("email", email.trim())
    if (message.trim()) formData.append("message", message.trim())
    formData.append("locale", locale)

    try {
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      })
      if (!res.ok) throw new Error(`Formspree request failed (${res.status})`)
      await res.json().catch(() => null)
      setStatus("success")
      trackConversion("contact_form_submit")
      setName("")
      setSurname("")
      setPhone("")
      setEmail("")
      setMessage("")
      setPrivacyAccepted(false)
      setErrors({})
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return <SuccessPanel focusRef={successRef} />
  }

  const submitting = status === "submitting"
  const disabled = !CONTACT_FORM_ENABLED

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={submitting}>
      {/* Formspree honeypot — invisible, out of the tab order, autocomplete
          off. Bots fill it; its value is submitted and Formspree discards
          spam. */}
      <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px] h-px w-px">
        <input
          ref={gotchaRef}
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {disabled && <DisabledFormNote />}
      <fieldset
        disabled={disabled}
        className={cn("min-w-0 border-0 p-0 m-0", disabled && "opacity-60")}
      >
        <div className="grid gap-8 border-t border-obsidian/10 pt-8 md:grid-cols-2 md:gap-6">
          <div>
            <label
              htmlFor="contact-name"
              className="block font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
            >
              {t("nameLabel")} <span aria-hidden className="text-foreground/60">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              autoComplete="given-name"
              placeholder={t("namePlaceholder")}
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                clearError("name")
              }}
              onBlur={() => handleBlur("name")}
              required
              aria-required="true"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              className={cn(FIELD_BASE, "mt-3", errors.name && "border-destructive/60")}
            />
            {errors.name && (
              <p id="contact-name-error" className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-surname"
              className="block font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
            >
              {t("surnameLabel")} <span aria-hidden className="text-foreground/60">*</span>
            </label>
            <input
              id="contact-surname"
              type="text"
              name="surname"
              autoComplete="family-name"
              placeholder={t("surnamePlaceholder")}
              value={surname}
              onChange={(e) => {
                setSurname(e.target.value)
                clearError("surname")
              }}
              onBlur={() => handleBlur("surname")}
              required
              aria-required="true"
              aria-invalid={errors.surname ? true : undefined}
              aria-describedby={errors.surname ? "contact-surname-error" : undefined}
              className={cn(FIELD_BASE, "mt-3", errors.surname && "border-destructive/60")}
            />
            {errors.surname && (
              <p id="contact-surname-error" className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-destructive">
                {errors.surname}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-phone"
              className="block font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
            >
              {t("phoneLabel")} <span aria-hidden className="text-foreground/60">*</span>
            </label>
            <input
              id="contact-phone"
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              placeholder={t("phonePlaceholder")}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                clearError("phone")
              }}
              onBlur={() => handleBlur("phone")}
              required
              aria-required="true"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? "contact-phone-error" : undefined}
              className={cn(FIELD_BASE, "mt-3", errors.phone && "border-destructive/60")}
            />
            {errors.phone && (
              <p id="contact-phone-error" className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-destructive">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
            >
              {t("emailLabel")} <span aria-hidden className="text-foreground/60">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                clearError("email")
              }}
              onBlur={() => handleBlur("email")}
              required
              aria-required="true"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className={cn(FIELD_BASE, "mt-3", errors.email && "border-destructive/60")}
            />
            {errors.email && (
              <p id="contact-email-error" className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-destructive">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 border-t border-obsidian/10 pt-8">
          <label
            htmlFor="contact-message"
            className="block font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
          >
            {t("messageLabel")}
          </label>
          <p id="contact-message-support" className="mt-2 font-mono text-[11px] tracking-[0.15em] text-muted-foreground">
            {t("messageSupport")}
          </p>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            maxLength={5000}
            placeholder={t("messagePlaceholder")}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-describedby="contact-message-support"
            className={cn(FIELD_BASE, "mt-3 resize-y")}
          />
        </div>

        <div className="mt-8 border-t border-obsidian/10 pt-8">
          <div aria-describedby={errors.privacy ? "contact-privacy-error" : undefined}>
            <label className="flex cursor-pointer items-start gap-4">
              <input
                id="contact-privacy"
                type="checkbox"
                name="privacy_accepted"
                checked={privacyAccepted}
                onChange={(e) => {
                  setPrivacyAccepted(e.target.checked)
                  clearError("privacy")
                }}
                onBlur={() => handleBlur("privacy")}
                required
                aria-required="true"
                aria-invalid={errors.privacy ? true : undefined}
                className="peer sr-only"
              />
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-signal/60",
                  privacyAccepted ? "border-signal" : "border-obsidian/25"
                )}
              >
                <span className={cn("h-2 w-2 bg-signal", privacyAccepted ? "block" : "hidden")} />
              </span>
              <span className="text-sm leading-relaxed text-muted-foreground">
                {t.rich("privacyConsent", {
                  policy: (chunks) => (
                    <a
                      href={asset("/legal/privacy.pdf")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="interactive-link underline underline-offset-4"
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </span>
            </label>
            {errors.privacy && (
              <p
                id="contact-privacy-error"
                role="alert"
                className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-destructive"
              >
                {errors.privacy}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      {/* First-layer privacy notice — how data is used, before any consent. */}
      <div className="mt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          {tPrivacy("eyebrow")}
        </p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {tPrivacy("body")}
        </p>
      </div>

      {!disabled && (
        <div className="mt-10 border-t border-obsidian/10 pt-8">
          <button
            type="submit"
            disabled={submitting}
            className={cn("cta-primary", submitting && "cursor-not-allowed opacity-60")}
          >
            {submitting ? t("submitting") : t("submit")}
            <ForwardMark className="cta-forward" />
          </button>

          {status === "error" && (
            <p
              ref={alertRef}
              tabIndex={-1}
              role="alert"
              className="mt-6 max-w-md border-l-2 border-destructive pl-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.15em] text-destructive focus:outline-none"
            >
              {t("submitError")}
            </p>
          )}
        </div>
      )}
    </form>
  )
}
