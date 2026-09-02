import { Link } from "@/i18n/navigation"
import { Reveal } from "@/components/ui/reveal"
import { ForwardMark } from "@/components/ui/forward-mark"

type PagePlaceholderProps = {
  eyebrow: string
  title: string
  body: string
  backLabel: string
}

export function PagePlaceholder({
  eyebrow,
  title,
  body,
  backLabel,
}: PagePlaceholderProps) {
  return (
    <section className="flex min-h-svh flex-col justify-center">
      <div className="mx-auto w-full max-w-[1600px] px-6 pb-24 pt-32 md:px-10">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {eyebrow}
          </p>
        </Reveal>
        <Reveal variant="mask-up" delay={80}>
          <h1 className="mt-6 font-sans text-5xl font-medium tracking-tight md:text-7xl">
            {title}
          </h1>
        </Reveal>
        <Reveal variant="fade-up" delay={180}>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
            {body}
          </p>
        </Reveal>
        <Reveal variant="fade-up" delay={260}>
          <Link href="/" className="cta-secondary mt-14">
            {backLabel}
            <ForwardMark className="cta-forward" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}