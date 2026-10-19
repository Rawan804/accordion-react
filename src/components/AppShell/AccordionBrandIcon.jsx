/**
 * AccordionBrandIcon — inline SVG brand mark.
 *
 * Design: three stacked accordion panels.
 * Each panel = a solid header row + a lighter content row beneath it.
 * Clean, geometric, immediately recognisable as a collapsible-panel / component-library icon.
 * Uses currentColor so it inherits the CSS color of its parent.
 */
export default function AccordionBrandIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* ── Panel 1 (open) ── */}
      {/* header row — full opacity */}
      <rect x="0" y="0"   width="20" height="4" rx="1.5" fill="currentColor" />
      {/* content row — softer */}
      <rect x="0" y="5"   width="20" height="2.5" rx="1"   fill="currentColor" opacity="0.28" />

      {/* ── Panel 2 (closed) ── */}
      <rect x="0" y="9.5"  width="20" height="4" rx="1.5" fill="currentColor" opacity="0.6" />
      <rect x="0" y="14.5" width="20" height="2" rx="1"   fill="currentColor" opacity="0.18" />

      {/* ── Panel 3 (closed) ── */}
      <rect x="0" y="18"  width="20" height="2" rx="1"   fill="currentColor" opacity="0.35" />
    </svg>
  );
}
