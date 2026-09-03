/**
 * Decorative editorial plate for the home Hero — "Growth, engineered."
 *
 * A single thin horizontal spine (STRATEGY → BUILD → DISTRIBUTE → MEASURE)
 * with PRODUCT / DATA as quiet sub-scale captions. Reads as a continuous
 * technical instrument. Purely decorative (aria-hidden); one signal dot
 * travels slowly along the line.
 */
export function GrowthSystemVisual() {
  return (
    <>
      <svg
        viewBox="0 0 520 280"
        aria-hidden="true"
        className="h-auto w-full select-none"
      >
        <text
          x="0"
          y="20"
          className="fill-obsidian/55 font-mono text-[10px] tracking-[0.25em]"
        >
          SYSTEM / 001
        </text>

        <line
          x1="16"
          y1="124"
          x2="512"
          y2="124"
          className="stroke-obsidian/25"
          strokeWidth="1"
        />

        <g className="stroke-obsidian/45" strokeWidth="1">
          <line x1="104" y1="119" x2="104" y2="129" />
          <line x1="224" y1="119" x2="224" y2="129" />
          <line x1="344" y1="119" x2="344" y2="129" />
          <line x1="464" y1="119" x2="464" y2="129" />
        </g>

        <circle cx="284" cy="124" r="2" className="system-travel fill-signal" />

        <g
          className="fill-obsidian/60 font-mono text-[10px] tracking-[0.2em]"
          textAnchor="middle"
        >
          <text x="104" y="110">
            STRATEGY
          </text>
          <text x="224" y="110">
            BUILD
          </text>
          <text x="344" y="110">
            DISTRIBUTE
          </text>
          <text x="464" y="110">
            MEASURE
          </text>
        </g>

        <g
          className="fill-obsidian/40 font-mono text-[8px] tracking-[0.2em]"
          textAnchor="middle"
        >
          <text x="224" y="152">
            PRODUCT
          </text>
          <text x="464" y="152">
            DATA
          </text>
        </g>
      </svg>

      <style>{`
        @keyframes system-travel {
          0%, 100% { transform: translateX(-180px); }
          50% { transform: translateX(180px); }
        }
        .system-travel {
          animation: system-travel 12s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .system-travel {
            animation: none;
          }
        }
      `}</style>
    </>
  )
}