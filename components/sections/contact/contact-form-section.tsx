import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { ContactForm } from "@/components/sections/contact/contact-form"

// TODO(contact): add public NEXAD email once the mailbox is active.
// TODO(contact): add call-booking CTA once calendar URL is available.
// TODO(contact): add WhatsApp contact once the commercial number is defined.
// TODO(contact): enable CAPTCHA/spam protection before scaling paid traffic.
// TODO(legal): add final privacy notice/consent once Privacy Policy is implemented.

export async function ContactFormSection() {
  const t = await getTranslations("contactPage.intro")

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  {t("eyebrow")}
                </p>
                <h2 className="mt-3 font-sans text-3xl font-medium tracking-tight md:text-4xl">
                  {t("heading")}
                </h2>
                <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
                  {t("body")}
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}