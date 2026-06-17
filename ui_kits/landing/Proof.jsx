/* Estudio Cimiento — proof: caso Gryphon (contexto + problema + solución + resultado) */
function Proof() {
  const { Overline, Badge, Card } = window.EstudioCimientoDesignSystem_c4cdd4;
  const blocks = [
    { k: 'contexto', t: 'una financiera con toda su base en un excel que le quedó corto al querer escalar.' },
    { k: 'problema', t: 'comitentes, operaciones en distintos mercados y tareas, todo a mano y sin orden.' },
    { k: 'solución', t: 'una plataforma de gestión online a medida: administración de comitentes, visualización de operaciones, bases ordenadas y sistema de tareas.' },
    { k: 'resultado', t: 'reducción amplia de tiempos operativos. el cliente usa el sistema y está conforme.' },
  ];
  return (
    <section id="caso" style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--section-y) var(--gutter)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}>
        <div>
          <Overline>la prueba</Overline>
          <h2 style={{ margin: '12px 0 0', fontSize: 'var(--fs-h1)', fontWeight: 500, lineHeight: 1.1, color: 'var(--text-primary)' }}>
            caso gryphon
          </h2>
        </div>
        <Badge tone="neutral">métricas exactas: a confirmar</Badge>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {blocks.map((b, i) => (
          <Card key={i} elevation="flat" accentEdge={b.k === 'resultado'} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-caption)', color: 'var(--text-accent)' }}>
              {String(i + 1).padStart(2, '0')} · {b.k}
            </span>
            <p style={{ margin: 0, fontSize: 'var(--fs-body)', lineHeight: 1.55, color: 'var(--text-secondary)' }}>{b.t}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
Object.assign(window, { Proof });
