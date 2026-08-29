"use client"

import { useLocale, useTranslations } from "next-intl"

import { usePathname, useRouter } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { cn } from "@/lib/utils"

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations("language")

  return (
    <div
      className={cn(
        "flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]",
        className
      )}
      role="group"
      aria-label={t("label")}
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          aria-current={loc === locale ? "true" : undefined}
          className={cn(
            "px-1.5 py-1 transition-colors duration-300",
            loc === locale
              ? "text-foreground underline underline-offset-4"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  )
}