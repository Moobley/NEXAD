import { getTranslations } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import { Reveal } from "@/components/ui/reveal"
import { ProjectVisual } from "@/components/ui/project-visual"
import { projects } from "@/content/projects"

export async function Technology() {
  const t = await getTranslations("home.technology")
  const ts = await getTranslations("home.shared")
  const tsv = await getTranslations("services")
  const tp = await getTranslations("projects.placeholder")

  const project = projects.find((p) => p.kind === "platform")!
  const tb = await getTranslations(project.ns)
  const services = project.services.map((s) => tsv(s))

  return (
    <section className="border-t border-obsidian/10">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <header className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {t("index")}
            </p>
            <h2 className="mt-3 font-sans text-4xl font-medium tracking-tight md:text-6xl">
              {t("title")}
            </h2>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {t("principleLabel")} — {t("principle")}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t("support")}
            </p>
          </header>
        </Reveal>

        <Reveal delay={140} className="mt-16 md:mt-20">
          <article>
            <Link href={`/work/${project.slug}`} className="group block">
              <ProjectVisual
                index={project.index}
                label={tb("title")}
                tone={project.cover.tone}
                surface="light"
                className="aspect-[16/9] md:aspect-[21/9]"
              />
            </Link>

            <div className="mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
                  {project.index}
                </p>
                <h3 className="mt-4 font-sans text-3xl font-medium tracking-tight md:text-5xl">
                  {tb("title")}
                </h3>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {tb("sector")}
                </p>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {tb("intro")}
                </p>
              </div>

              <dl className="grid shrink-0 grid-cols-2 gap-x-12 gap-y-5 md:grid-cols-1 md:gap-y-2 md:text-right">
                <div>
                  <dt className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                    {ts("client")}
                  </dt>
                  <dd className="mt-1 font-mono text-[11px] tracking-[0.15em] text-foreground">
                    {tp("client")}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                    {ts("services")}
                  </dt>
                  <dd className="mt-1 font-mono text-[11px] tracking-[0.15em] text-foreground">
                    {services.join(" · ")}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                    {ts("year")}
                  </dt>
                  <dd className="mt-1 font-mono text-[11px] tracking-[0.15em] text-foreground">
                    {tp("year")}
                  </dd>
                </div>
              </dl>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}