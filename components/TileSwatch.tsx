// Drawn tile swatches (original illustrations, not product photos). Decorative only.
type Kind = "large" | "subway" | "marble" | "mosaic" | "hex" | "wood";

export default function TileSwatch({ kind }: { kind: Kind }) {
  const id = `sw-${kind}`;
  return (
    <svg className="bq-swatch" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        {kind === "large" && (
          <pattern id={id} width="80" height="100" patternUnits="userSpaceOnUse">
            <rect width="80" height="100" fill="#e9e6e0" />
            <path d="M0 62 C20 50 40 70 80 44" stroke="#d3cfc7" strokeWidth="1.2" fill="none" />
            <rect width="80" height="100" fill="none" stroke="#bdb8ae" strokeWidth="2" />
          </pattern>
        )}
        {kind === "subway" && (
          <pattern id={id} width="40" height="20" patternUnits="userSpaceOnUse">
            <rect width="40" height="20" fill="#bfc3c8" />
            <rect x="1" y="1" width="38" height="8" rx="1" fill="#fbfbfa" />
            <rect x="-19" y="11" width="38" height="8" rx="1" fill="#fbfbfa" />
            <rect x="21" y="11" width="38" height="8" rx="1" fill="#fbfbfa" />
          </pattern>
        )}
        {kind === "mosaic" && (
          <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
            <rect width="16" height="16" fill="#c9ced3" />
            <rect x="1" y="1" width="6.5" height="6.5" fill="#dfe6ea" />
            <rect x="8.5" y="1" width="6.5" height="6.5" fill="#a9c2cc" />
            <rect x="1" y="8.5" width="6.5" height="6.5" fill="#b9cfd8" />
            <rect x="8.5" y="8.5" width="6.5" height="6.5" fill="#eef3f5" />
          </pattern>
        )}
        {kind === "hex" && (
          <pattern id={id} width="28" height="48.5" patternUnits="userSpaceOnUse">
            <rect width="28" height="48.5" fill="#b9bdc2" />
            <path d="M14 1 27 8.5v15L14 31 1 23.5v-15Z" fill="#f4f4f2" />
            <path d="M0 25.25 14 33.5l14-8.25V48l-14 8.5L0 48Z" fill="#eceae6" transform="translate(0 -4)" />
          </pattern>
        )}
        {kind === "wood" && (
          <pattern id={id} width="160" height="20" patternUnits="userSpaceOnUse">
            <rect width="160" height="20" fill="#6e5a46" />
            <rect y="1" width="160" height="8" fill="#b08a63" />
            <rect y="11" width="160" height="8" fill="#a07c57" />
            <path d="M0 5 C30 2 60 8 100 4 S150 6 160 4" stroke="#8d6c4a" strokeWidth=".8" fill="none" />
            <path d="M0 15 C40 18 80 12 120 16 S150 14 160 16" stroke="#8d6c4a" strokeWidth=".8" fill="none" />
          </pattern>
        )}
        {kind === "marble" && (
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f6f5f3" />
            <stop offset="1" stopColor="#e4e2de" />
          </linearGradient>
        )}
      </defs>
      <rect width="160" height="100" fill={`url(#${id})`} />
      {kind === "marble" && (
        <g fill="none" stroke="#9aa0a6" strokeLinecap="round">
          <path d="M0 78 C30 60 50 88 82 56 S130 40 160 18" strokeWidth="1.6" opacity=".55" />
          <path d="M20 100 C44 78 70 92 96 70 S140 66 160 50" strokeWidth="1" opacity=".4" />
          <path d="M40 0 C52 24 74 22 86 44" strokeWidth="1.1" opacity=".35" />
        </g>
      )}
    </svg>
  );
}
