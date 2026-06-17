import React from 'react';

/**
 * Estudio Cimiento — Button
 * Architectural, calm. No bounce; press = slight settle. Accent reserved for primary.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  full = false,
  iconLeft = null,
  iconRight = null,
  disabled = false,
  type = 'button',
  children,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: '8px 16px', fontSize: 'var(--fs-body-sm)', gap: '6px' },
    md: { padding: '11px 22px', fontSize: 'var(--fs-body)', gap: '8px' },
    lg: { padding: '15px 30px', fontSize: 'var(--fs-body-lg)', gap: '10px' },
  };

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: full ? '100%' : 'auto',
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--fw-medium)',
    letterSpacing: '0.01em',
    lineHeight: 1,
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: '1px solid transparent',
    transition: 'var(--transition-base)',
    opacity: disabled ? 0.5 : 1,
    whiteSpace: 'nowrap',
    ...sizes[size],
  };

  const variants = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--accent-contrast)',
      borderColor: 'var(--accent)',
    },
    secondary: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-on-inverse)',
      borderColor: 'var(--surface-inverse)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-primary)',
      borderColor: 'var(--border-strong)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-primary)',
      borderColor: 'transparent',
    },
  };

  return (
    <button
      type={type}
      disabled={disabled}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={(e) => {
        if (disabled) return;
        if (variant === 'primary') e.currentTarget.style.background = 'var(--accent-hover)';
        if (variant === 'secondary') e.currentTarget.style.opacity = '0.9';
        if (variant === 'outline') e.currentTarget.style.borderColor = 'var(--accent)';
        if (variant === 'ghost') e.currentTarget.style.background = 'var(--surface-sunken)';
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = variants[variant].background;
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.borderColor = variants[variant].borderColor;
      }}
      {...rest}
    >
      {iconLeft && <span style={{ display: 'inline-flex' }}>{iconLeft}</span>}
      {children}
      {iconRight && <span style={{ display: 'inline-flex' }}>{iconRight}</span>}
    </button>
  );
}
