/* Estudio Cimiento — process section (the four phases) */
function Process() {
  const { Overline, PhaseList } = window.EstudioCimientoDesignSystem_c4cdd4;
  return (
    <section id="proceso" style={{ background: 'var(--surface-inverse)', color: 'var(--text-on-inverse)' }}>
      <div style={{
        maxWidth: 'var(--container-max)', margin: '0 auto',
        padding: 'var(--section-y) var(--gutter)',
        display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 'var(--sp-8)', alignItems: 'start',
      }}>
        <div>
          <Overline style={{ color: 'var(--accent)' }}>el proceso</Overline>
          <h2 style={{ margin: '12px 0 16px', fontSize: 'var(--fs-h1)', fontWeight: 500, lineHeight: 1.1, color: 'var(--text-on-inverse)' }}>
            cuatro fases, una base sólida
          </h2>
          <p style={{ maxWidth: 360, color: 'rgba(244,240,232,0.66)', fontSize: 'var(--fs-body-lg)', lineHeight: 1.6 }}>
            cada fase suma una capa. terminás con un sistema a medida y sabiendo sostenerlo solo.
          </p>
        </div>
        <div style={{ '--text-primary': 'var(--text-on-inverse)', '--text-secondary': 'rgba(244,240,232,0.6)', '--text-accent': 'var(--accent)', '--text-muted': 'rgba(244,240,232,0.4)', '--border-hairline': 'rgba(244,240,232,0.14)' }}>
          <PhaseList active={-1} />
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { Process });
