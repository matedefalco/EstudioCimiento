import React from 'react';

/**
 * Estudio Cimiento — Card
 * Calm container. Hairline does the separation; shadow only when raised.
 * Optional bronze hairline accent on the top edge for emphasized cards.
 */
export function Card({
  elevation = 'flat',
  accentEdge = false,
  padding = 'var(--sp-6)',
  as = 'div',
  children,
  style = {},
  ...rest
}) {
  const Tag = as;
  const elevations = {
    flat:    { boxShadow: 'none', border: '1px solid var(--border-hairline)' },
    raised:  { boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-hairline)' },
    floating:{ boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-hairline)' },
  };
  return (
    <Tag
      style={{
        position: 'relative',
        background: 'var(--surface-raised)',
        borderRadius: 'var(--radius-lg)',
        padding,
        overflow: 'hidden',
        ...elevations[elevation],
        ...style,
      }}
      {...rest}
    >
      {accentEdge && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'var(--accent)',
          }}
        />
      )}
      {children}
    </Tag>
  );
}
