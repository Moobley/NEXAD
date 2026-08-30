import { getTranslations } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import { Logo } from "@/components/layout/logo"

const NAV_ITEMS = [
  { href: "/work", key: "work" },
  { href: "/services", key: "services" },
  { href: "/studio", key: "studio" },
  { href: "/contact", key: "contact" },
] as const

export async function SiteFooter() {
  const t = await getTranslations("footer")
  const tn = await getTranslations("nav")
  const year = new Date().getFullYear()

  return (
    <footer className="surface-obsidian border-t border-border">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-foreground">
              <Logo variant="ivory" className="h-7" />
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("tagline")}
            </p>
            <a
              href={`mailto:${t("email")}`}
              className="mt-8 inline-block border-b border-current pb-1 text-sm text-foreground transition-opacity hover:opacity-70"
            >
              {t("email")}
            </a>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-stone">
              {t("nav")}
            </p>
            <ul className="mt-6 space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {tn(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-stone">
              {t("social")}
            </p>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t("instagram")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t("linkedin")}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-stone">
              {t("studio")}
            </p>
            <ul className="mt-6 space-y-3">
              <li className="text-sm text-muted-foreground">
                {t("location")}
              </li>
              <li className="font-mono text-[11px] tracking-[0.2em] text-stone">
                {t("coords")}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] tracking-[0.15em] text-stone">
            © {year} NEXO — {t("location")}
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] tracking-[0.15em] text-stone">
            <li>
              <a href="#" className="transition-colors hover:text-foreground">
                {t("privacy")}
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-foreground">
                {t("cookies")}
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-foreground">
                {t("legal")}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}