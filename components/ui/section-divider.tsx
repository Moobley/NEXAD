/**
 * Inset editorial section divider.
 *
 * Replaces full-viewport `border-t` section separators with a hairline that
 * aligns to the content container (`max-w-[1600px]` + horizontal padding),
 * so it reads as an intentional editorial rule rather than a stray UI border.
 */
export function SectionDivider() {
  return (
    <div
      aria-hidden
      className="mx-auto w-full max-w-[1600px] px-6 md:px-10"
    >
      <div className="section-divider" />
    </div>
  )
}