import { cn } from "@/lib/utils"

/**
 * Technical network behind the wordmark. Same 720x180 viewBox as the logo so
 * everything aligns. Nodes sit in the margins around the letters; the X is the
 * hub (pulse ring); a connector runs from the X to the O's edge with a
 * traveling impulse that triggers the O rotation. Purely decorative.
 */
export function GatewayNetwork({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 180"
      className={cn("block h-auto", className)}
      aria-hidden="true"
      focusable="false"
    >
      {/* Margin lines pointing toward the wordmark */}
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <line x1="30" y1="90" x2="52" y2="90" />
        <line x1="618" y1="90" x2="690" y2="90" />
        <line x1="375" y1="22" x2="375" y2="40" />
        <line x1="375" y1="140" x2="375" y2="158" />
      </g>

      {/* Nodes */}
      <g fill="currentColor">
        <circle cx="30" cy="90" r="2" />
        <circle cx="690" cy="90" r="2" />
        <circle cx="375" cy="22" r="2" />
        <circle cx="375" cy="158" r="2" />
      </g>

      {/* Connector X -> O with the traveling impulse */}
      <line
        className="gateway-connector"
        x1="420"
        y1="90"
        x2="462"
        y2="90"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle className="gateway-traveler" cx="420" cy="90" r="2.5" fill="currentColor" />

      {/* X pulse ring */}
      <circle
        className="gateway-x-ring"
        cx="375"
        cy="90"
        r="8"
        fill="none"
        strokeWidth="1"
      />
    </svg>
  )
}