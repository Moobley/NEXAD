import Image from "next/image"

import { cn } from "@/lib/utils"
import { asset } from "@/lib/asset"

type LogoProps = {
  /** carbon — for light backgrounds; ivory — for dark backgrounds. */
  variant?: "carbon" | "ivory"
  className?: string
  priority?: boolean
}

export function Logo({
  variant = "carbon",
  className,
  priority,
}: LogoProps) {
  return (
    <Image
      src={asset(`/logos/nexad-wordmark-${variant}.svg`)}
      alt="NEXAD"
      width={810}
      height={180}
      unoptimized
      priority={priority}
      className={cn("h-5 w-auto", className)}
    />
  )
}