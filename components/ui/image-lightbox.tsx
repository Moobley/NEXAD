"use client"

import { Dialog } from "@base-ui/react/dialog"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { X } from "lucide-react"
import type { ReactNode } from "react"

import { asset } from "@/lib/asset"
import { cn } from "@/lib/utils"

type ImageLightboxProps = {
  /** Raw asset path (basePath-safe via `asset()`). */
  src: string
  alt: string
  /** Intrinsic dimensions of the source image, used for the enlarged view. */
  width: number
  height: number
  className?: string
  /** In-page image, rendered unchanged inside the trigger button. */
  children: ReactNode
}

export function ImageLightbox({
  src,
  alt,
  width,
  height,
  className,
  children,
}: ImageLightboxProps) {
  const t = useTranslations("common.lightbox")

  return (
    <Dialog.Root>
      <Dialog.Trigger
        type="button"
        aria-label={`${t("enlarge")}: ${alt}`}
        className={cn(
          "block w-full cursor-zoom-in appearance-none bg-transparent p-0 text-left",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
          className
        )}
      >
        {children}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="lightbox-backdrop fixed inset-0 z-[80] bg-carbon/70" />
        <Dialog.Popup className="lightbox-popup fixed inset-0 z-[90] flex items-center justify-center p-4 outline-none md:p-8">
          <Dialog.Title className="sr-only">
            {t("enlarge")}: {alt}
          </Dialog.Title>
          <Image
            src={asset(src)}
            alt={alt}
            width={width}
            height={height}
            sizes="90vw"
            unoptimized
            className="h-auto max-h-[88vh] w-auto max-w-[90vw] object-contain"
          />
          <Dialog.Close
            aria-label={t("close")}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-ivory/80 transition-colors hover:bg-ivory/10 hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal md:right-6 md:top-6"
          >
            <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}