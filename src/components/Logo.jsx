/**
 * Monogram mark: an "A" drawn as a node-link graph, echoing the hero globe.
 * Stops read the theme tokens, so it recolours with dark ⇄ light.
 */
export default function Logo({ size = 30 }) {
  const v = { stopColor: 'var(--violet)' };
  const m = { stopColor: 'var(--magenta)' };

  return (
    <svg
      className="nav-logo"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label="Ajay Patel K A — home"
    >
      <defs>
        <linearGradient id="ap-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={v} />
          <stop offset="1" style={m} />
        </linearGradient>
      </defs>

      <rect x="1" y="1" width="30" height="30" rx="9" fill="url(#ap-mark)" opacity=".13" />
      <rect x="1" y="1" width="30" height="30" rx="9" fill="none" stroke="url(#ap-mark)" strokeWidth="1.4" opacity=".55" />

      {/* edges: the two legs + crossbar of an A */}
      <path
        d="M9.5 22.5 L16 9.5 L22.5 22.5 M12.2 17.6 L19.8 17.6"
        fill="none"
        stroke="url(#ap-mark)"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* nodes */}
      <circle cx="16" cy="9.5" r="2.5" fill="url(#ap-mark)" />
      <circle cx="9.5" cy="22.5" r="2" fill="url(#ap-mark)" />
      <circle cx="22.5" cy="22.5" r="2" fill="url(#ap-mark)" />
    </svg>
  );
}
