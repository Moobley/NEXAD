import { getTranslations, setRequestLocale } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import { localizedPathname, siteUrl } from "@/lib/seo"

type Props = {
  params: Promise<{ locale: string }>
}

/**
 * The standalone Services page has been folded into the home page, which
 * already carries the full offer (packages, one-offs, web). This route now
 * only exists so existing `/services` links resolve instead of 404ing; it
 * redirects to the localized home.
 *
 * `output: "export"` does not turn a `redirect()` into a server response, so
 * we emit the redirect as a `<meta http-equiv="refresh">` tag (hoisted into
 * <head> by React) plus a JS-safe fallback link. The target is built with
 * `siteUrl` so origin + basePath (GitHub Pages /NEXAD) stay correct.
 */
export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("pages")
  const tn = await getTranslations("nav")

  const target = siteUrl(localizedPathname(locale, "/"))

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          {tn("services")}
        </p>
        <p className="max-w-md text-base leading-relaxed text-muted-foreground">
          {t("servicesMoved")}
        </p>
        <Link href="/" className="cta-primary">
          {t("back")}
        </Link>
      </main>
    </>
  )
}
