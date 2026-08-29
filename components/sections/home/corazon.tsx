import { getTranslations } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import { Reveal } from "@/components/ui/reveal"
import { ProjectVisual } from "@/components/ui/project-visual"
import { projects } from "@/content/projects"

export async function Corazon() {
  const tc = await getTranslations("projects.corazon")
  const ts = await getTranslations("home.shared")
  const tsv = await getTranslations("services")

  const project = projects.find((p) => p.kind === "integrated")!
  const services = project.services.map((s) => tsv(s))

  return (
    <div className="surface-obsidian border-t border-border">
      <div aria-hidden className="h-14 w-full bg-gradient-to-b from-ivory to-transparent md:h-24" />

      <div className="mx-auto w-full max-w-[1600px] px-6 pb-24 pt-14 md:px-10 md:pb-32 md:pt-20">
        <Reveal>
          <div className="flex items-center justify-between border-b border-border pb-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {tc("index")}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {tc("caseStudyLabel")}
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14 md:mt-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <h2 className="font-sans text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.95] tracking-[-0.02em] text-foreground">
                {project.client}
              </h2>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {tc("sector")}
              </p>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-foreground">
                {tc("intro")}
              </p>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                {tc("support")}
              </p>
            </div>

            <div className="lg:col-span-5 lg:pt-4">
              <dl className="space-y-3 font-mono text-[11px] tracking-[0.15em]">
                <div className="flex justify-between gap-8 border-t border-border pt-3">
                  <dt className="text-muted-foreground">{ts("client")}</dt>
                  <dd className="text-right text-foreground">{project.client}</dd>
                </div>
                <div className="flex justify-between gap-8 border-t border-border pt-3">
                  <dt className="text-muted-foreground">{ts("sector")}</dt>
                  <dd className="text-right text-foreground">{tc("sector")}</dd>
                </div>
                <div className="flex justify-between gap-8 border-t border-border pt-3">
                  <dt className="text-muted-foreground">{ts("location")}</dt>
                  <dd className="text-right text-foreground">{project.location}</dd>
                </div>
                <div className="flex justify-between gap-8 border-t border-border pt-3">
                  <dt className="text-muted-foreground">{ts("services")}</dt>
                  <dd className="text-right text-foreground">{services.join(" · ")}</dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140} className="mt-16 md:mt-20">
          <Link href={`/work/${project.slug}`} className="group block">
            <ProjectVisual
              index={project.index}
              label={project.client}
              tone={project.cover.tone}
              surface="dark"
              className="aspect-[16/9] md:aspect-[21/9]"
            />
          </Link>
        </Reveal>

        <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-12 lg:items-end">
          <Reveal variant="mask-up" className="lg:col-span-7">
            <div>
              <p className="font-sans text-[clamp(4.5rem,13vw,10.5rem)] font-medium leading-none tracking-[-0.03em] text-foreground">
                {tc("resultAmount")}
              </p>
              <p className="mt-4 font-sans text-2xl font-medium tracking-tight text-foreground md:text-4xl">
                {tc("resultLabel")}
              </p>
            </div>
          </Reveal>
          <Reveal
            variant="fade-up"
            delay={180}
            className="lg:col-span-5 lg:justify-self-end"
          >
            <p className="max-w-sm text-base leading-relaxed text-muted-foreground md:text-right">
              {tc("resultNote")}
            </p>
          </Reveal>
        </div>
      </div>

      <div aria-hidden className="h-14 w-full bg-gradient-to-b from-transparent to-ivory md:h-24" />
    </div>
  )
}