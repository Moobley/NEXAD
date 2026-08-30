# Next.js template

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

## Environment — Contact form

The Contact page submits to [Formspree](https://formspree.io) and requires a
public form ID at build time:

- Copy `.env.example` to `.env.local` and set
  `NEXT_PUBLIC_FORMSPREE_FORM_ID=<your-form-id>` for local development.
- For the GitHub Pages deploy, add the same value as a **repository variable**
  named `NEXT_PUBLIC_FORMSPREE_FORM_ID`
  (`Settings → Secrets and variables → Actions → Variables`). It is a public
  value (it ships in the page bundle), so a variable — not a secret — is the
  correct choice. The deploy workflow injects it during `npm run build`.
- Without the ID the page still builds and renders; submitting shows a
  controlled "not configured" state instead of pretending the message was sent.
- The Formspree recipient email is configured inside Formspree, not in the
  repository.
