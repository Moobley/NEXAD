import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"

type Member = {
  initial: string
  name: string
  role: string
  description: string
  capabilities: string
}

export async function StudioTeam() {
  const t = await getTranslations("studioPage.team")
  const members = t.raw("members") as Member[]

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <header className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 font-sans text-4xl font-medium tracking-tight md:text-6xl">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t("intro")}
            </p>
          </header>
        </Reveal>

        <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-2 md:gap-8">
          {members.map((member, i) => (
            <Reveal key={member.name} delay={i * 120}>
              <article className="border border-obsidian/15">
                <div className="flex items-end justify-between border-b border-obsidian/10 px-6 py-6 md:px-8">
                  <span
                    aria-hidden
                    className="font-serif text-6xl italic leading-none md:text-7xl"
                  >
                    {member.initial}
                  </span>
                </div>
                <div className="px-6 py-8 md:px-8">
                  <h3 className="font-sans text-3xl font-medium tracking-tight md:text-4xl">
                    {member.name}
                  </h3>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {member.role}
                  </p>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                    {member.description}
                  </p>
                  <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70">
                    {member.capabilities}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}