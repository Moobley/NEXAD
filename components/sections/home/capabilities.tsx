"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

import { Reveal } from "@/components/ui/reveal"
import { cn } from "@/lib/utils"

const CORE = new Set([0, 1, 2])

export function Capabilities() {
  const t = useTranslations("home.capabilities")
  const list = t.raw("list") as { title: string; description: string }[]
  const [active, setActive] = useState(0)
  const current = list[active]

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <header>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {t("index")}
            </p>
            <h2 className="mt-3 font-sans text-4xl font-medium tracking-tight md:text-6xl">
              {t("title")}
            </h2>
          </header>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <ol className="border-t border-obsidian/10">
              {list.map((item, i) => (
                <li key={i} className="border-b border-obsidian/10">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-expanded={active === i}
                    className={cn(
                      "block w-full py-7 text-left transition-colors duration-300 md:py-8",
                      active === i
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-signal"
                    )}
                  >
                    <span className="flex items-baseline gap-5">
                      <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                        0{i + 1}
                      </span>
                      <span
                        className={cn(
                          "font-sans tracking-tight transition-all duration-300",
                          CORE.has(i)
                            ? "text-2xl font-medium md:text-[1.75rem]"
                            : "text-xl md:text-2xl"
                        )}
                      >
                        {item.title}
                      </span>
                    </span>
                    <span className="mt-3 block pl-[2.4rem] text-sm leading-relaxed text-muted-foreground lg:hidden">
                      {item.description}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div
                className="border border-obsidian/15 border-t-2 border-t-signal"
                aria-live="polite"
              >
                <div className="flex h-10 items-center justify-between border-b border-obsidian/10 px-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    {t("panel")}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                    0{active + 1} / 0{list.length}
                  </span>
                </div>
                <div key={active} className="animate-fade-up-in p-8 md:p-10">
                  <p className="font-sans text-3xl font-medium tracking-tight">
                    {current.title}
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    {current.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}