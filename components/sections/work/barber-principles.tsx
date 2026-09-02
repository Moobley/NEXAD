import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"

type Principle = {
  title: string
  body: string
}

export async function BarberPrinciples() {
  const t = await getTranslations("projects.barber.lab.principles")
  const list = t.raw("list") as Principle[]

  return (
    <section className="surface-obsidian">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-28 md:px-10 md:py-44">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  {t("eyebrow")}
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="border-t border-border">
              {list.map((principle) => (
                <li key={principle.title} className="border-b border-border py-10 md:py-12">
                  <Reveal variant="fade-up">
                    <div>
                      <h3 className="font-sans text-2xl font-medium tracking-tight md:text-3xl">
                        {principle.title}
                      </h3>
                      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                        {principle.body}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}