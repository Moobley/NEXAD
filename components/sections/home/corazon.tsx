import { getTranslations } from "next-intl/server"
import Image from "next/image"

import { Reveal } from "@/components/ui/reveal"
import { CaseMedia } from "@/components/ui/case-media"
import { ForwardMark } from "@/components/ui/forward-mark"
import { asset } from "@/lib/asset"

export async function Corazon() {
  const tc = await getTranslations("projects.corazon")

  return (
    <div className="surface-obsidian">
      <div aria-hidden className="h-14 w-full bg-gradient-to-b from-ivory to-transparent md:h-24" />

      <div className="mx-auto w-full max-w-[1600px] px-6 pb-24 pt-14 md:px-10 md:pb-32 md:pt-20">
        <Reveal>
          <div className="flex items-center justify-between border-b border-border pb-6">
            <span className="flex items-center gap-4">
              <Image
                src={asset("/projects/corazon/logoCN.webp")}
                alt={tc("title")}
                width={700}
                height={201}
                unoptimized
                className="h-6 w-auto"
              />
            </span>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {tc("clientLabel")} / {tc("category")}
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14 md:mt-20">
          <h2 className="max-w-5xl font-sans text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.98] tracking-[-0.02em] text-foreground">
            {tc("headline")}
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {tc("support")}
          </p>
          <p className="mt-6 font-mono text-[11px] uppercase leading-loose tracking-[0.22em] text-foreground/60">
            {tc("scope")}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <CaseMedia
              label={tc("brandLabel")}
              tone="light"
              className="aspect-[4/3]"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(130%_130%_at_70%_15%,#e7e3d6_0%,#f2efe8_48%,#d8d2c3_100%)] p-10 md:p-16">
                <Image
                  src={asset("/projects/corazon/logoCNxNexo.png")}
                  alt={tc("title")}
                  width={1187}
                  height={266}
                  unoptimized
                  className="h-auto w-full max-w-lg object-contain"
                />
              </div>
            </CaseMedia>
          </Reveal>

          <div className="grid grid-cols-2 gap-6 lg:col-span-5 lg:grid-cols-1 lg:gap-8">
            <Reveal delay={120} className="lg:mt-10">
              <CaseMedia
                label={tc("contentLabel")}
                tone="dark"
                watermark={tc("contentLabel")}
                className="aspect-[4/3] lg:aspect-[16/10]"
              />
            </Reveal>
            <Reveal delay={200}>
              <CaseMedia
                label={tc("websiteLabel")}
                tone="light"
                watermark={tc("websiteLabel")}
                className="aspect-[4/3] lg:aspect-[16/10]"
              />
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-12 lg:items-end">
          <Reveal variant="mask-up" className="lg:col-span-8">
            <p className="font-sans text-[clamp(4rem,12vw,10rem)] font-medium leading-none tracking-[-0.03em] text-foreground">
              {tc("resultAmount")}
            </p>
            <p className="mt-4 font-sans text-2xl font-medium tracking-tight text-foreground md:text-3xl">
              {tc("resultLabel")}
            </p>
          </Reveal>

          <Reveal
            variant="fade-up"
            delay={180}
            className="lg:col-span-4 lg:justify-self-end"
          >
            <a
              href={`https://${tc("url")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-secondary inline-flex"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
                {tc("url")}
              </span>
              <ForwardMark className="cta-forward" />
            </a>
          </Reveal>
        </div>
      </div>

      <div aria-hidden className="h-14 w-full bg-gradient-to-b from-transparent to-ivory md:h-24" />
    </div>
  )
}