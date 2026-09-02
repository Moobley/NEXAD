"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { Menu, X } from "lucide-react"

import { Link, usePathname } from "@/i18n/navigation"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { Logo } from "@/components/layout/logo"
import { ForwardMark } from "@/components/ui/forward-mark"
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
            className="inline-flex items-center text-foreground"
            onClick={close}
          >
            <Logo priority className="h-7 md:h-8" />
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
                  "nav-link text-[13px] tracking-[0.08em]",
                  pathname === item.href && "text-foreground"
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
              className="header-cta hidden lg:inline-flex"
            >
              {t("cta")}
              <ForwardMark className="cta-forward" />
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
            <span className="inline-flex items-center text-foreground">
              <Logo variant="ivory" className="h-7 md:h-8" />
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
                  "nav-link border-b border-border py-5 font-sans text-4xl font-medium tracking-tight",
                  pathname === item.href && "text-foreground"
                )}
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={close}
              className="menu-cta mt-10"
            >
              {t("cta")}
              <ForwardMark className="cta-forward" />
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