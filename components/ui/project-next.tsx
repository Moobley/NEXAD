import { Link } from "@/i18n/navigation"
import { Reveal } from "@/components/ui/reveal"
import { ForwardMark } from "@/components/ui/forward-mark"

type ProjectNextProps = {
  label: string
  title: string
  cta: string
  href: string
  backLabel: string
}

/**
 * Cross-navigation footer shown at the end of a project detail page:
 * the next project (Client Work ↔ NEXAD Lab) plus a return link.
 */
export function ProjectNext({
  label,
  title,
  cta,
  href,
  backLabel,
}: ProjectNextProps) {
  return (
    <section className="surface-obsidian">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-32 text-center md:px-10 md:py-40">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {label}
          </p>
          <h2 className="mx-auto mt-6 max-w-3xl font-sans text-4xl font-medium tracking-tight md:text-6xl">
            {title}
          </h2>
          <Link href={href} className="cta-primary mt-12">
            {cta}
            <ForwardMark className="cta-forward" />
          </Link>
        </Reveal>
        <Reveal delay={120}>
          <Link href="/work" className="cta-secondary mt-16">
            {backLabel}
            <ForwardMark className="cta-forward" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}