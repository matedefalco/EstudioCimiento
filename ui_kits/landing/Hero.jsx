/* Estudio Cimiento — landing hero */
function Hero() {
  const { Button, Overline } = window.EstudioCimientoDesignSystem_c4cdd4;
  return (
    <section style={{
      maxWidth: 'var(--container-max)', margin: '0 auto',
      padding: 'clamp(56px, 9vw, 120px) var(--gutter) var(--section-y)',
      display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 'var(--sp-8)', alignItems: 'center',
    }}>
      <div>
        <Overline style={{ marginBottom: 18 }}>sistemas operativos digitales</Overline>
        <h1 style={{
          margin: 0, fontSize: 'var(--fs-display)', fontWeight: 500,
          lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--text-primary)', textWrap: 'balance',
        }}>
          construimos la base digital de tu negocio y te dejamos al mando.
        </h1>
        <p style={{
          maxWidth: 520, marginTop: 22, fontSize: 'var(--fs-body-lg)',
          lineHeight: 1.6, color: 'var(--text-secondary)',
        }}>
          captamos cómo trabajás y lo bajamos a estructura. recuperás tiempo, dejás de pelear con el excel y quedás manejando tu propia operación.
        </p>
        <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
          <Button variant="primary" size="lg">agendar una charla</Button>
          <Button variant="outline" size="lg">ver el proceso</Button>
        </div>
      </div>

      <div style={{
        position: 'relative', aspectRatio: '1 / 1', borderRadius: 'var(--radius-xl)',
        background: 'var(--surface-raised)', border: '1px solid var(--border-hairline)',
        boxShadow: 'var(--shadow-md)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(var(--border-hairline) 1px, transparent 1px), linear-gradient(90deg, var(--border-hairline) 1px, transparent 1px)',
          backgroundSize: '36px 36px', opacity: 0.6,
        }} />
        <svg width="58%" viewBox="0 0 62 46" aria-hidden="true" style={{ position: 'relative' }}>
          <path d="M3 42 H59" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M7 40 V27 H25 V14 H43 V3 H59" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
Object.assign(window, { Hero });
