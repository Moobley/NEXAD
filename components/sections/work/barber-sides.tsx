import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { Flow } from "@/components/ui/flow"

type Side = {
  label: string
  flow: string[]
  body: string
}

export async function BarberSides() {
  const t = await getTranslations("projects.barber.lab.sides")
  const customer = t.raw("customer") as Side
  const business = t.raw("business") as Side

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:gap-0">
          <Reveal>
            <article className="border-t border-obsidian/10 pt-8 md:border-r md:pr-12 lg:pr-16">
              <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                01 · {customer.label}
              </p>
              <h2 className="mt-4 font-sans text-3xl font-medium tracking-tight md:text-4xl">
                {customer.label}
              </h2>
              <Flow steps={customer.flow} className="mt-8" />
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                {customer.body}
              </p>
            </article>
          </Reveal>

          <Reveal delay={120}>
            <article className="border-t border-obsidian/10 pt-8 md:pl-12 lg:pl-16">
              <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                02 · {business.label}
              </p>
              <h2 className="mt-4 font-sans text-3xl font-medium tracking-tight md:text-4xl">
                {business.label}
              </h2>
              <Flow steps={business.flow} className="mt-8" />
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                {business.body}
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}