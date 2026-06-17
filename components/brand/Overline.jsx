import React from 'react';

/**
 * Estudio Cimiento — Overline
 * The wide-tracked lowercase label, echoing the "estudio" treatment in the logo.
 * Use above headings to mark a section.
 */
export function Overline({ children, as = 'div', style = {}, ...rest }) {
  const Tag = as;
  return (
    <Tag
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--fs-overline)',
        letterSpacing: 'var(--ls-overline)',
        textTransform: 'lowercase',
        fontWeight: 'var(--fw-medium)',
        color: 'var(--text-accent)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
