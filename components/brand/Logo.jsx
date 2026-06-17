import React from 'react';

/**
 * Estudio Cimiento — Logo
 * The brand symbol (steps ascending from a base) with optional lowercase wordmark.
 * Accent (stroke + "estudio") follows the active theme: bronze in día, copper in noche.
 */
export function Logo({ variant = 'full', size = 42, color, style = {}, ...rest }) {
  const accent = color || 'var(--text-accent)';
  const ink = 'var(--text-primary)';
  const symbolH = Math.round(size * 1.1);
  const symbolW = Math.round(symbolH * (62 / 46));

  const Symbol = (
    <svg width={symbolW} height={symbolH} viewBox="0 0 62 46" aria-hidden="true" style={{ flex: '0 0 auto' }}>
      <path d="M3 42 H59" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 40 V27 H25 V14 H43 V3 H59" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  if (variant === 'symbol') {
    return <span style={{ display: 'inline-flex', ...style }} {...rest}>{Symbol}</span>;
  }

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: `${Math.round(size * 0.42)}px`, fontFamily: 'var(--font-sans)', ...style }} {...rest}>
      {Symbol}
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontSize: `${Math.max(11, size * 0.31)}px`, letterSpacing: 'var(--ls-overline)', color: accent }}>estudio</span>
        <span style={{ fontSize: `${size}px`, fontWeight: 'var(--fw-medium)', letterSpacing: '0.01em', color: ink, marginTop: '3px' }}>cimiento</span>
      </span>
    </span>
  );
}
