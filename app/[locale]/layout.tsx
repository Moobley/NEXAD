import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Space_Grotesk, IBM_Plex_Mono, Instrument_Serif } from "next/font/google"

import { routing } from "@/i18n/routing"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { cn } from "@/lib/utils"

import "../globals.css"

const grotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const instrument = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
})

const geistMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const t = await getTranslations("nav")

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        "font-sans",
        grotesk.variable,
        instrument.variable,
        geistMono.variable
      )}
    >
      <body className="min-h-svh bg-background text-foreground antialiased">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only z-[100] rounded-none bg-obsidian px-5 py-3 text-sm font-medium text-ivory focus:not-sr-only focus:fixed focus:left-6 focus:top-6"
          >
            {t("skip")}
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}