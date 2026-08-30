import Image from "next/image"

import { cn } from "@/lib/utils"
import { asset } from "@/lib/asset"

type MobileFrameProps = {
  src: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}

/**
 * Minimal mobile product frame for real product screenshots: a hairline
 * border, a thin top inset and the screenshot filling its natural aspect.
 * No device mockup — the product UI is the protagonist.
 */
export function MobileFrame({
  src,
  alt,
  className,
  sizes,
  priority,
}: MobileFrameProps) {
  return (
    <div className={cn("overflow-hidden border border-obsidian/15 bg-ivory", className)}>
      <div aria-hidden className="h-6 border-b border-obsidian/10 bg-[#e7e2d5]" />
      <Image
        src={asset(src)}
        alt={alt}
        width={390}
        height={844}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full"
      />
    </div>
  )
}