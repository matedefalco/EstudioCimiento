/* Estudio Cimiento — wedge offering + closing CTA + footer */
function Wedge() {
  const { Button, Badge, Overline, Card } = window.EstudioCimientoDesignSystem_c4cdd4;
  const includes = ['relevamiento de tu operación', 'sistema de tareas y operaciones en notion', 'bases de datos ordenadas', 'traspaso: quedás al mando'];
  return (
    <section id="wedge" style={{ background: 'var(--surface-sunken)' }}>
      <div style={{
        maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--section-y) var(--gutter)',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-8)', alignItems: 'center',
      }}>
        <div>
          <Overline>por dónde empezar</Overline>
          <h2 style={{ margin: '12px 0 16px', fontSize: 'var(--fs-h1)', fontWeight: 500, lineHeight: 1.1, color: 'var(--text-primary)' }}>
            tu sistema de operaciones, listo
          </h2>
          <p style={{ maxWidth: 440, color: 'var(--text-secondary)', fontSize: 'var(--fs-body-lg)', lineHeight: 1.6 }}>
            precio fijo, alcance claro, entrega rápida. la base sobre la que después sumás lo que necesites.
          </p>
        </div>
        <Card elevation="floating" accentEdge style={{ padding: 'var(--sp-7)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <Badge tone="accent">wedge</Badge>
            <span style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-body-sm)' }}>producto de entrada</span>
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {includes.map((t, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'baseline', color: 'var(--text-primary)', fontSize: 'var(--fs-body)' }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-body-sm)' }}>—</span>
                {t}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 26 }}>
            <Button variant="primary" full size="lg">quiero empezar por acá</Button>
          </div>
        </Card>
      </div>
    </section>
  );
}

function Footer() {
  const { Logo } = window.EstudioCimientoDesignSystem_c4cdd4;
  return (
    <footer style={{ borderTop: '1px solid var(--border-hairline)' }}>
      <div style={{
        maxWidth: 'var(--container-max)', margin: '0 auto', padding: '40px var(--gutter)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20,
      }}>
        <Logo size={22} />
        <span style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-body-sm)' }}>sistemas que ordenan tu operación</span>
      </div>
    </footer>
  );
}
Object.assign(window, { Wedge, Footer });
