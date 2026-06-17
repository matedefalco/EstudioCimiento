import React from 'react';

/**
 * Estudio Cimiento — PhaseList
 * The four-phase service rendered as ascending steps, echoing the brand symbol.
 * Numbered, hairline-separated; the active phase carries the bronze accent.
 */
export function PhaseList({
  phases = [
    { title: 'relevamiento', desc: 'entender cómo funciona hoy el negocio.' },
    { title: 'desarrollo', desc: 'construir el sistema a medida.' },
    { title: 'validación', desc: 'probar con el cliente y ajustar.' },
    { title: 'traspaso', desc: 'enseñarle a sostenerlo solo.' },
  ],
  active = -1,
  style = {},
  ...rest
}) {
  return (
    <ol
      style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-sans)',
        ...style,
      }}
      {...rest}
    >
      {phases.map((p, i) => {
        const isActive = i === active;
        return (
          <li
            key={i}
            style={{
              display: 'flex',
              gap: 'var(--sp-4)',
              alignItems: 'baseline',
              padding: 'var(--sp-4) 0',
              borderTop: i === 0 ? 'none' : '1px solid var(--border-hairline)',
              // ascending indent echoes the rising steps
              paddingLeft: `${i * 14}px`,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--fs-body-sm)',
                color: isActive ? 'var(--text-accent)' : 'var(--text-muted)',
                fontWeight: 'var(--fw-medium)',
                flex: '0 0 auto',
                minWidth: '24px',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <div
                style={{
                  fontSize: 'var(--fs-h4)',
                  fontWeight: 'var(--fw-medium)',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.01em',
                }}
              >
                {p.title}
              </div>
              <div style={{ fontSize: 'var(--fs-body)', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {p.desc}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
