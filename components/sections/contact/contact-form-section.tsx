import { ContactForm } from "@/components/sections/contact/contact-form"

// TODO(contact): add public NEXAD email once the mailbox is active.
// TODO(contact): add call-booking CTA once calendar URL is available.
// TODO(contact): add WhatsApp contact once the commercial number is defined.
// TODO(contact): enable CAPTCHA/spam protection before scaling paid traffic.
// TODO(legal): add final privacy notice/consent once Privacy Policy is implemented.

export async function ContactFormSection() {
  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-3xl">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}