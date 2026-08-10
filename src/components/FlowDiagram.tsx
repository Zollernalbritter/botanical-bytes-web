// Infografik: der Messkreislauf als ruhiges SVG-Diagramm. Dekorativ markiert —
// die zugängliche Beschreibung trägt der beschriftete Wrapper in HowItWorks.
// Farben kommen aus den Design-Tokens, DM Mono als Label-Schrift.
export function FlowDiagram({
  nodes,
  measureLabel,
  loopLabel,
}: {
  nodes: string[];
  measureLabel: string;
  loopLabel: string;
}) {
  const slotWidth = 168;
  const gap = 40;
  const y = 70;
  const height = 56;
  const positions = nodes.map((_, i) => 20 + i * (slotWidth + gap));

  return (
    <svg viewBox="0 0 1040 236" aria-hidden="true" className="w-full min-w-[720px]">
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="var(--color-muted)" />
        </marker>
      </defs>

      {/* Messtakt gehört an die Mess-Kante (Pflanze → Platine) */}
      <text
        x={positions[0] + slotWidth + gap / 2}
        y="54"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="13"
        fill="var(--color-muted)"
      >
        {measureLabel}
      </text>

      {nodes.map((label, i) => {
        const x = positions[i];
        const accent = i === 3;
        return (
          <g key={label}>
            <rect
              x={x}
              y={y}
              width={slotWidth}
              height={height}
              rx={height / 2}
              fill={accent ? "var(--color-moss-tint)" : "#ffffff"}
              stroke={accent ? "var(--color-moss)" : "rgb(18 12 8 / 0.14)"}
              strokeWidth="1.5"
            />
            <text
              x={x + slotWidth / 2}
              y={y + height / 2 + 5}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="16"
              fill={accent ? "var(--color-moss-deep)" : "var(--color-ink)"}
            >
              {label}
            </text>
            {i < nodes.length - 1 && (
              <line
                x1={x + slotWidth + 6}
                y1={y + height / 2}
                x2={x + slotWidth + gap - 8}
                y2={y + height / 2}
                stroke="var(--color-muted)"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />
            )}
          </g>
        );
      })}

      {/* Rückführung Empfehlung → Pflanze: gestrichelt, weil noch Roadmap */}
      <path
        d={`M ${positions[4] + slotWidth / 2} ${y + height + 8}
            L ${positions[4] + slotWidth / 2} 188
            L ${positions[0] + slotWidth / 2} 188
            L ${positions[0] + slotWidth / 2} ${y + height + 14}`}
        fill="none"
        stroke="var(--color-muted)"
        strokeWidth="1.5"
        strokeDasharray="5 5"
        markerEnd="url(#arrow)"
      />
      <text
        x="520"
        y="212"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="13"
        fill="var(--color-muted)"
      >
        {loopLabel}
      </text>
    </svg>
  );
}
