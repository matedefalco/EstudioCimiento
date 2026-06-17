import React from 'react';

/**
 * Estudio Cimiento — Badge
 * Small status / category marker. Hairline by default; tone fills for status.
 */
export function Badge({ tone = 'neutral', soft = true, children, style = {}, ...rest }) {
  const tones = {
    neutral:  { fg: 'var(--text-secondary)', bg: 'var(--surface-sunken)', bd: 'var(--border-hairline)' },
    accent:   { fg: 'var(--text-accent)', bg: 'var(--surface-accent-wash)', bd: 'var(--border-hairline)' },
    positive: { fg: 'var(--status-positive)', bg: 'rgba(94,122,82,0.12)', bd: 'transparent' },
    warning:  { fg: 'var(--status-warning)', bg: 'rgba(181,134,60,0.14)', bd: 'transparent' },
    danger:   { fg: 'var(--status-danger)', bg: 'rgba(161,75,60,0.12)', bd: 'transparent' },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '3px 10px',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--fs-caption)',
        fontWeight: 'var(--fw-medium)',
        letterSpacing: '0.01em',
        lineHeight: 1.4,
        color: t.fg,
        background: soft ? t.bg : 'transparent',
        border: `1px solid ${soft ? t.bd : t.fg}`,
        borderRadius: 'var(--radius-pill)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
