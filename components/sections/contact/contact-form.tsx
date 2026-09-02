"use client"

import { type FormEvent, type RefObject, useEffect, useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"
import { ForwardMark } from "@/components/ui/forward-mark"
import { cn } from "@/lib/utils"

const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID

// The form is OFF by default (pre-launch). It only becomes submittable when
// the feature flag is explicitly "true" AND a Formspree ID is present.
// The flag alone is never enough; neither is the ID alone.
const CONTACT_FORM_ENABLED =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED === "true" && Boolean(FORM_ID)

type Option = { value: string; label: string }

type FormStatus = "idle" | "submitting" | "success" | "error"

type FieldKey = "name" | "email" | "business" | "stage" | "message"

type Errors = Partial<Record<FieldKey, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FIELD_BASE =
  "w-full border border-obsidian/15 bg-transparent px-4 py-3.5 text-base text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-obsidian focus:outline-none focus:ring-2 focus:ring-signal/40"

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
        <ForwardMark className="arrow size-4" />
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
  const locale = useLocale()
  const stageOptions = t.raw("stageOptions") as Option[]
  const serviceOptions = t.raw("servicesOptions") as Option[]

  const [status, setStatus] = useState<FormStatus>("idle")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [business, setBusiness] = useState("")
  const [stage, setStage] = useState("")
  const [services, setServices] = useState<string[]>([])
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<Errors>({})

  const successRef = useRef<HTMLDivElement>(null)
  const alertRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (status === "success") successRef.current?.focus()
    if (status === "error") alertRef.current?.focus()
  }, [status])

  function fieldErrors(): Errors {
    const next: Errors = {}
    if (!name.trim()) next.name = t("errors.name")
    if (!email.trim()) next.email = t("errors.email")
    else if (!EMAIL_PATTERN.test(email.trim())) next.email = t("errors.email")
    if (!business.trim()) next.business = t("errors.business")
    if (!stage) next.stage = t("errors.stage")
    if (!message.trim()) next.message = t("errors.message")
    return next
  }

  function handleBlur(field: FieldKey) {
    const all = fieldErrors()
    setErrors((prev) => ({ ...prev, [field]: all[field] }))
  }

  function clearError(field: FieldKey) {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
  }

  function toggleService(value: string) {
    setServices((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
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
    formData.append("name", name.trim())
    formData.append("email", email.trim())
    formData.append("business", business.trim())
    formData.append("business_stage", stage)
    if (services.length > 0) formData.append("services", services.join(", "))
    formData.append("message", message.trim())
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
      setName("")
      setEmail("")
      setBusiness("")
      setStage("")
      setServices([])
      setMessage("")
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
            autoComplete="name"
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
          htmlFor="contact-business"
          className="block font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
        >
          {t("businessLabel")} <span aria-hidden className="text-foreground/60">*</span>
        </label>
        <input
          id="contact-business"
          type="text"
          name="business"
          placeholder={t("businessPlaceholder")}
          value={business}
          onChange={(e) => {
            setBusiness(e.target.value)
            clearError("business")
          }}
          onBlur={() => handleBlur("business")}
          required
          aria-required="true"
          aria-invalid={errors.business ? true : undefined}
          aria-describedby={errors.business ? "contact-business-error" : undefined}
          className={cn(FIELD_BASE, "mt-3", errors.business && "border-destructive/60")}
        />
        {errors.business && (
          <p id="contact-business-error" className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-destructive">
            {errors.business}
          </p>
        )}
      </div>

      <fieldset className="mt-8 border-t border-obsidian/10 pt-8">
        <legend className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {t("stageLabel")} <span aria-hidden className="text-foreground/60">*</span>
        </legend>
        <div className="mt-4" aria-describedby={errors.stage ? "contact-stage-error" : undefined}>
          {stageOptions.map((opt, i) => {
            const checked = stage === opt.value
            return (
              <label
                key={opt.value}
                className="flex cursor-pointer items-center gap-4 border-b border-obsidian/10 py-4 transition-colors has-checked:text-foreground"
              >
                <input
                  type="radio"
                  name="business_stage"
                  value={opt.value}
                  checked={checked}
                  onChange={() => {
                    setStage(opt.value)
                    clearError("stage")
                  }}
                  onBlur={() => handleBlur("stage")}
                  className="peer sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-signal/60",
                    checked ? "border-obsidian" : "border-obsidian/25"
                  )}
                >
                  <span className={cn("h-2 w-2 bg-obsidian", checked ? "block" : "hidden")} />
                </span>
                <span className="text-sm text-foreground md:text-base">{opt.label}</span>
                <span aria-hidden className="ml-auto font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                  0{i + 1}
                </span>
              </label>
            )
          })}
        </div>
        {errors.stage && (
          <p id="contact-stage-error" role="alert" className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-destructive">
            {errors.stage}
          </p>
        )}
      </fieldset>

      <fieldset className="mt-8 border-t border-obsidian/10 pt-8">
        <legend className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {t("servicesLabel")}
        </legend>
        <p id="contact-services-support" className="mt-2 font-mono text-[11px] tracking-[0.15em] text-muted-foreground">
          {t("servicesSupport")}
        </p>
        <div
          className="mt-2 grid gap-x-10 md:grid-cols-2"
          aria-describedby="contact-services-support"
        >
          {serviceOptions.map((opt) => {
            const checked = services.includes(opt.value)
            return (
              <label
                key={opt.value}
                className="flex cursor-pointer items-center gap-4 border-b border-obsidian/10 py-4 transition-colors has-checked:text-foreground"
              >
                <input
                  type="checkbox"
                  name="services"
                  value={opt.value}
                  checked={checked}
                  onChange={() => toggleService(opt.value)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-signal/60",
                    checked ? "border-obsidian" : "border-obsidian/25"
                  )}
                >
                  <span className={cn("h-2 w-2 bg-obsidian", checked ? "block" : "hidden")} />
                </span>
                <span className="text-sm text-foreground md:text-base">{opt.label}</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-8 border-t border-obsidian/10 pt-8">
        <label
          htmlFor="contact-message"
          className="block font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
        >
          {t("messageLabel")} <span aria-hidden className="text-foreground/60">*</span>
        </label>
        <p id="contact-message-support" className="mt-2 font-mono text-[11px] tracking-[0.15em] text-muted-foreground">
          {t("messageSupport")}
        </p>
        <textarea
          id="contact-message"
          name="message"
          rows={7}
          maxLength={5000}
          placeholder={t("messagePlaceholder")}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
            clearError("message")
          }}
          onBlur={() => handleBlur("message")}
          required
          aria-required="true"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={cn(
            "contact-message-support",
            errors.message && "contact-message-error"
          )}
          className={cn(FIELD_BASE, "mt-3 resize-y", errors.message && "border-destructive/60")}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-destructive">
            {errors.message}
          </p>
        )}
        </div>
      </fieldset>

      {!disabled && (
        <div className="mt-10 border-t border-obsidian/10 pt-8">
          <button
            type="submit"
            disabled={submitting}
            className={cn("cta-primary", submitting && "cursor-not-allowed opacity-60")}
          >
            {submitting ? t("submitting") : t("submit")}
            <ForwardMark className="arrow size-4" />
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