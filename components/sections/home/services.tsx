"use client"

import { type KeyboardEvent, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { Plus } from "lucide-react"

import { Link } from "@/i18n/navigation"
import { Reveal } from "@/components/ui/reveal"
import { SignalDot } from "@/components/ui/signal-dot"
import { ForwardMark } from "@/components/ui/forward-mark"
import { cn } from "@/lib/utils"

type ServiceItem = {
  title: string
  eyebrow?: string
  badge?: string
  description: string
  features?: string[]
}

type Category = {
  label: string
  items: ServiceItem[]
}

const NUMBER = "w-8 shrink-0 pt-1 font-mono text-[13px] leading-none tracking-[0.1em] text-signal"

export function Services() {
  const t = useTranslations("home.services")
  const categories = t.raw("categories") as Category[]
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const toggle = (key: string) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }))

  const onTabsKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return
    e.preventDefault()
    const last = categories.length - 1
    let next = active
    if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1
    if (e.key === "Home") next = 0
    if (e.key === "End") next = last
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <header className="max-w-2xl">
            <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
              <SignalDot size="sm" />
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 font-sans text-4xl font-medium tracking-tight md:text-6xl">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t("support")}
            </p>
          </header>
        </Reveal>

        <Reveal variant="fade-up">
          <div
            role="tablist"
            aria-label={t("categoryLabel")}
            onKeyDown={onTabsKeyDown}
            className="mt-12 flex [scrollbar-width:none] gap-x-8 overflow-x-auto border-b border-obsidian/10 md:mt-16 [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category, i) => (
              <button
                key={category.label}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`services-tab-${i}`}
                aria-selected={active === i}
                aria-controls={`services-panel-${i}`}
                onClick={() => setActive(i)}
                className={cn(
                  "-mb-px shrink-0 border-b-2 border-transparent px-1 pt-2 pb-4 font-sans text-sm font-medium tracking-tight whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal md:text-base",
                  active === i
                    ? "border-signal text-foreground"
                    : "text-muted-foreground hover:text-signal"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 md:mt-8">
          {categories.map((category, ci) => (
            <div
              key={category.label}
              role="tabpanel"
              id={`services-panel-${ci}`}
              aria-labelledby={`services-tab-${ci}`}
              hidden={active !== ci}
            >
              <ol>
                {category.items.map((item, ii) => {
                  const key = `${ci}:${ii}`
                  const isOpen = Boolean(open[key])
                  const isMain = Boolean(item.eyebrow)
                  const features = item.features ?? []
                  const hasFeatures = features.length > 0
                  const panelId = `services-detail-${ci}-${ii}`
                  const number = String(ii + 1).padStart(2, "0")

                  return (
                    <li
                      key={item.title}
                      className={cn(
                        "border-b border-obsidian/10",
                        isOpen && "bg-obsidian/[0.03]"
                      )}
                    >
                      {hasFeatures ? (
                        <>
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            onClick={() => toggle(key)}
                            className={cn(
                              "group flex w-full items-start gap-x-4 text-left transition-colors duration-300 hover:bg-obsidian/[0.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal md:gap-x-6 lg:gap-x-8",
                              isOpen ? "pt-5 pb-4 md:pt-6 md:pb-5" : "py-5 md:py-6"
                            )}
                          >
                            <span className={NUMBER}>{number}</span>

                            <span className="min-w-0 flex-1">
                              {item.eyebrow && (
                                <span className="block font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                                  {item.eyebrow}
                                </span>
                              )}

                              <span className="mt-2 flex items-center justify-between gap-6">
                                <span className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
                                  <span
                                    className={cn(
                                      "tracking-tight text-foreground transition-colors duration-300 group-hover:text-signal",
                                      isMain
                                        ? "text-2xl md:text-[1.75rem]"
                                        : "text-xl md:text-2xl"
                                    )}
                                  >
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <span className="inline-flex shrink-0 items-center rounded-full border border-signal/60 px-2.5 py-0.5 font-mono text-[11px] tracking-[0.16em] text-signal uppercase">
                                      {item.badge}
                                    </span>
                                  )}
                                </span>
                                <span
                                  aria-hidden
                                  className={cn(
                                    "flex size-10 shrink-0 items-center justify-center rounded-full border border-obsidian/15 text-muted-foreground transition-colors duration-300 group-hover:border-signal group-hover:text-signal",
                                    isOpen && "border-signal text-signal"
                                  )}
                                >
                                  <Plus
                                    strokeWidth={1.5}
                                    className={cn(
                                      "size-5 transition-transform duration-300",
                                      isOpen && "rotate-45"
                                    )}
                                  />
                                </span>
                              </span>

                              <span className="mt-4 block max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                                {item.description}
                              </span>
                            </span>
                          </button>

                          {isOpen && (
                            <div id={panelId} className="animate-fade-up-in pb-6 md:pb-8">
                              <div className="border-t border-obsidian/10 pl-12 md:pl-14 lg:pl-16">
                                <p className="pt-5 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                                  {t("includedLabel")}
                                </p>
                                <ul className="mt-4 grid max-w-3xl gap-x-12 gap-y-3 sm:grid-cols-2 md:gap-x-16">
                                  {features.map((feature) => (
                                    <li
                                      key={feature}
                                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground md:text-base"
                                    >
                                      <span
                                        aria-hidden
                                        className="mt-2.5 size-1.5 shrink-0 rounded-full border border-signal"
                                      />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex items-start gap-x-4 py-5 md:gap-x-6 md:py-6 lg:gap-x-8">
                          <span className={NUMBER}>{number}</span>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-sans text-lg font-medium tracking-tight text-foreground md:text-xl">
                              {item.title}
                            </h3>
                            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      )}
                    </li>
                  )
                })}
              </ol>
            </div>
          ))}
        </div>

        <Reveal variant="fade-up">
          <div className="mt-20 flex flex-col gap-8 border-t border-obsidian/10 pt-14 md:mt-24 md:flex-row md:items-end md:justify-between md:pt-16">
            <p className="max-w-2xl font-sans text-3xl leading-tight font-medium tracking-tight md:text-4xl">
              {t("cta.title")}
            </p>
            <Link href="/contact" className="cta-primary shrink-0">
              {t("cta.action")}
              <ForwardMark className="cta-forward" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
