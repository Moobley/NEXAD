import Image from "next/image"

import { cn } from "@/lib/utils"

type LogoProps = {
  /** obsidian — for light backgrounds; ivory — for dark backgrounds. */
  variant?: "obsidian" | "ivory"
  className?: string
  priority?: boolean
}

export function Logo({
  variant = "obsidian",
  className,
  priority,
}: LogoProps) {
  return (
    <Image
      src={`/logos/nexo-wordmark-${variant}.svg`}
      alt="NEXO"
      width={720}
      height={180}
      unoptimized
      priority={priority}
      className={cn("h-5 w-auto", className)}
    />
  )
}