import { cn } from "@/lib/utils"

/**
 * Technical network behind the wordmark. Same 810x180 viewBox as the logo so
 * everything aligns. Quiet margin lines and nodes around the letters; purely
 * decorative. The wordmark itself carries the launch pulse.
 */
export function GatewayNetwork({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 810 180"
      className={cn("block h-auto", className)}
      aria-hidden="true"
      focusable="false"
    >
      {/* Margin lines pointing toward the wordmark */}
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <line x1="30" y1="90" x2="52" y2="90" />
        <line x1="698" y1="90" x2="780" y2="90" />
        <line x1="405" y1="22" x2="405" y2="40" />
        <line x1="405" y1="140" x2="405" y2="158" />
      </g>

      {/* Nodes */}
      <g fill="currentColor">
        <circle cx="30" cy="90" r="2" />
        <circle cx="780" cy="90" r="2" />
        <circle cx="405" cy="22" r="2" />
        <circle cx="405" cy="158" r="2" />
      </g>
    </svg>
  )
}