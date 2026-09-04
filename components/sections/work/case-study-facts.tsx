import { getTranslations } from "next-intl/server"

/**
 * Compact, machine-readable project facts for the Corazón Napoletano case
 * study. Renders only already-approved public data as a semantic `<dl>` so
 * crawlers can extract Client / Type / Location / Scope / Result without
 * relying on decorative elements.
 */
export async function CaseStudyFacts() {
  const tm = await getTranslations("projects.corazon.caseStudy.meta")
  const tp = await getTranslations("projects.corazon")
  const tr = await getTranslations("projects.corazon.caseStudy.result")
  const tf = await getTranslations("projects.corazon.caseStudy.facts")

  const facts = [
    { label: tf("client"), value: tm("client") },
    { label: tf("type"), value: tp("clientLabel") },
    { label: tf("location"), value: tp("location") },
    { label: tf("scope"), value: tp("scope") },
    { label: tf("result"), value: tr("body"), full: true },
  ]

  return (
    <div className="mx-auto w-full max-w-[1600px] px-6 pb-20 md:px-10 lg:pb-28">
      <dl className="grid gap-x-8 gap-y-6 border-t border-obsidian/10 pt-6 sm:grid-cols-2">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className={fact.full ? "sm:col-span-2" : undefined}
          >
            <dt className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {fact.label}
            </dt>
            <dd className="mt-2 max-w-xl text-sm leading-relaxed text-foreground md:text-base">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
