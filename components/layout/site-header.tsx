"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { Menu, X } from "lucide-react"

import { Link, usePathname } from "@/i18n/navigation"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/work", key: "work" },
  { href: "/services", key: "services" },
  { href: "/studio", key: "studio" },
  { href: "/contact", key: "contact" },
] as const

export function SiteHeader() {
  const t = useTranslations("nav")
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled && "border-b border-obsidian/10 bg-ivory/85 backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:h-20 md:px-10">
          <Link
            href="/"
            className="font-sans text-[15px] font-semibold tracking-[0.28em] text-foreground"
            onClick={close}
          >
            NEXO
          </Link>

          <nav
            className="hidden items-center gap-9 lg:flex"
            aria-label={t("primary")}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[13px] tracking-[0.08em] transition-colors duration-300",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <LanguageSwitcher className="hidden md:flex" />
            <Link
              href="/contact"
              className="hidden items-center gap-2 bg-obsidian px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ivory transition-opacity duration-300 hover:opacity-80 lg:inline-flex"
            >
              {t("cta")}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t("menuOpen")}
              className="text-foreground lg:hidden"
            >
              <Menu className="size-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="surface-obsidian fixed inset-0 z-[60] flex flex-col">
          <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-6">
            <span className="font-sans text-[15px] font-semibold tracking-[0.28em] text-foreground">
              NEXO
            </span>
            <button
              type="button"
              onClick={close}
              aria-label={t("menuClose")}
              className="text-foreground"
            >
              <X className="size-6" strokeWidth={1.5} />
            </button>
          </div>

          <nav
            className="flex flex-1 flex-col justify-center px-6"
            aria-label={t("primary")}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={cn(
                  "border-b border-border py-5 font-sans text-4xl font-medium tracking-tight transition-opacity",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={close}
              className="mt-10 inline-flex w-fit items-center bg-ivory px-6 py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-obsidian"
            >
              {t("cta")}
            </Link>
          </nav>

          <div className="px-6 pb-10">
            <LanguageSwitcher />
            <p className="mt-6 font-mono text-[11px] tracking-[0.25em] text-stone">
              28.1° N — 15.4° W
            </p>
          </div>
        </div>
      )}
    </>
  )
}