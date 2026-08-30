import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { Flow } from "@/components/ui/flow"

export async function ContactPhilosophy() {
  const t = await getTranslations("contactPage.philosophy")
  const flow = t.raw("flow") as string[]

  return (
    <section className="surface-obsidian">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-28 md:px-10 md:py-40">
        <Reveal>
          <Flow steps={flow} surface="dark" />
          <p className="mt-12 max-w-2xl font-serif text-2xl italic leading-snug md:text-3xl">
            {t("support")}
          </p>
        </Reveal>
      </div>
    </section>
  )
}