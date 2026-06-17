import React from 'react';

/**
 * Estudio Cimiento — Tag
 * Lightweight keyword chip. Optional removable affordance.
 */
export function Tag({ children, onRemove = null, style = {}, ...rest }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 12px',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--fs-body-sm)',
        color: 'var(--text-primary)',
        background: 'var(--surface-raised)',
        border: '1px solid var(--border-hairline)',
        borderRadius: 'var(--radius-sm)',
        ...style,
      }}
      {...rest}
    >
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          aria-label="quitar"
          style={{
            border: 0,
            background: 'transparent',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '15px',
            lineHeight: 1,
            padding: 0,
          }}
        >
          ×
        </button>
      )}
    </span>
  );
}
