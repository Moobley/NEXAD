"use client"

import {
  type CSSProperties,
  type ElementType,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"

import { cn } from "@/lib/utils"

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"

type RevealProps = {
  children: ReactNode
  className?: string
  /** Delay in ms before the element reveals. */
  delay?: number
  /**
   * fade — opacity only
   * fade-up — opacity + slight rise
   * mask-up — clipped rise (text lines)
   */
  variant?: "fade" | "fade-up" | "mask-up"
  /** view — reveal on scroll into viewport; load — reveal on mount. */
  trigger?: "view" | "load"
  as?: ElementType
  style?: CSSProperties
}

/**
 * Minimal reveal primitive. No animation library: IntersectionObserver +
 * CSS transitions. Reduced motion is handled in CSS (globals.css) so content
 * is shown statically without any JS involvement.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = "fade-up",
  trigger = "view",
  as: Tag = "div",
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (trigger === "load") {
      const t = window.setTimeout(() => setVisible(true), delay)
      return () => window.clearTimeout(t)
    }

    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [trigger, delay])

  const Comp = Tag as ElementType

  if (variant === "mask-up") {
    /*
      The overflow-hidden line wrapper clips glyphs that exceed the line box
      at tight editorial leading (descenders g/p/q/y/j, accents ó/é/á…). Give
      the clip box em-based vertical glyph allowance, then compensate with
      equal negative margins so the footprint — and therefore line spacing —
      stays pixel-identical. em units scale with the fluid clamp() sizes.
    */
    return (
      <Comp
        ref={ref}
        data-reveal
        className={cn(
          "overflow-hidden pt-[0.1em] pb-[0.12em] -mt-[0.1em] -mb-[0.12em]",
          className
        )}
      >
        <Comp
          data-reveal
          className={cn(
            "transition-transform duration-[1200ms] will-change-transform",
            visible ? "translate-y-0" : "translate-y-[120%]"
          )}
          style={{
            transitionTimingFunction: EASE,
            transitionDelay: `${delay}ms`,
            ...style,
          }}
        >
          {children}
        </Comp>
      </Comp>
    )
  }

  return (
    <Comp
      ref={ref}
      data-reveal
      className={cn(
        "transition-[opacity,transform] duration-1000 will-change-transform",
        visible
          ? "opacity-100 translate-y-0"
          : cn("opacity-0", variant === "fade-up" && "translate-y-7"),
        className
      )}
      style={{
        transitionTimingFunction: EASE,
        transitionDelay: `${delay}ms`,
        ...style,
      }}
    >
      {children}
    </Comp>
  )
}