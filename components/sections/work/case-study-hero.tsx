import { getTranslations } from "next-intl/server"
import Image from "next/image"

import { Reveal } from "@/components/ui/reveal"
import { asset } from "@/lib/asset"

export async function CaseStudyHero() {
  const t = await getTranslations("projects.corazon.caseStudy.hero")
  const tm = await getTranslations("projects.corazon.caseStudy.meta")
  const tp = await getTranslations("projects.corazon")
  const tags = t.raw("tags") as string[]

  return (
    <section className="pt-24 md:pt-32">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <Reveal trigger="load" variant="fade-up">
          <div className="flex items-center justify-between gap-8 border-b border-obsidian/10 pb-10">
            <Image
              src={asset("/projects/corazon/logoCN.webp")}
              alt={tm("client")}
              width={700}
              height={201}
              unoptimized
              className="h-6 w-auto md:h-8"
            />
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {tp("clientLabel")} — {tp("location")}
            </p>
          </div>
        </Reveal>

        <h1 className="mt-14 font-sans text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.03em]">
          <Reveal trigger="load" variant="mask-up" as="span" className="block">
            {tm("client")}
          </Reveal>
        </h1>

        <Reveal trigger="load" variant="fade-up" delay={160}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("definition")}
          </p>
        </Reveal>

        <Reveal trigger="load" variant="fade-up" delay={240}>
          <div className="mt-10 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="border border-obsidian/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
