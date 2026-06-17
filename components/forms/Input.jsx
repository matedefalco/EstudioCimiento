import React from 'react';

/**
 * Estudio Cimiento — Input (with optional label + hint)
 * Calm field: hairline border, bronze focus ring. Sentence-case labels.
 */
export function Input({
  label = '',
  hint = '',
  error = '',
  type = 'text',
  id,
  style = {},
  ...rest
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const hasError = Boolean(error);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-sans)' }}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-medium)', color: 'var(--text-primary)' }}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        style={{
          width: '100%',
          padding: '11px 14px',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--fs-body)',
          color: 'var(--text-primary)',
          background: 'var(--surface-raised)',
          border: `1px solid ${hasError ? 'var(--status-danger)' : 'var(--border-strong)'}`,
          borderRadius: 'var(--radius-md)',
          outline: 'none',
          transition: 'var(--transition-base)',
          boxSizing: 'border-box',
          ...style,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--accent)';
          e.target.style.boxShadow = '0 0 0 3px var(--focus-ring)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = hasError ? 'var(--status-danger)' : 'var(--border-strong)';
          e.target.style.boxShadow = 'none';
        }}
        {...rest}
      />
      {(hint || error) && (
        <span style={{ fontSize: 'var(--fs-caption)', color: hasError ? 'var(--status-danger)' : 'var(--text-muted)' }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
