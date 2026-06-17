/* Estudio Cimiento — operations system: workspace sidebar */
function OpsSidebar({ active, onNav }) {
  const { Logo, Badge } = window.EstudioCimientoDesignSystem_c4cdd4;
  const items = [
    { id: 'hoy', label: 'hoy', glyph: '◆' },
    { id: 'operaciones', label: 'operaciones', glyph: '▤' },
    { id: 'tareas', label: 'tareas', glyph: '☰' },
    { id: 'comitentes', label: 'comitentes', glyph: '◇' },
    { id: 'bases', label: 'bases de datos', glyph: '▦' },
  ];
  const row = (it) => {
    const on = active === it.id;
    return (
      <button key={it.id} onClick={() => onNav(it.id)} style={{
        display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left',
        padding: '9px 12px', border: 0, borderRadius: 'var(--radius-sm)', cursor: 'pointer',
        background: on ? 'var(--surface-accent-wash)' : 'transparent',
        color: on ? 'var(--text-accent)' : 'var(--text-secondary)',
        fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-sm)', fontWeight: on ? 600 : 500,
        transition: 'var(--transition-base)',
      }}>
        <span style={{ width: 16, textAlign: 'center', opacity: on ? 1 : 0.7 }}>{it.glyph}</span>
        {it.label}
      </button>
    );
  };
  return (
    <aside style={{
      width: 248, flex: '0 0 248px', height: '100%', boxSizing: 'border-box',
      background: 'var(--surface-raised)', borderRight: '1px solid var(--border-hairline)',
      padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: 22,
    }}>
      <div style={{ padding: '0 6px' }}><Logo size={20} /></div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
        borderRadius: 'var(--radius-md)', border: '1px solid var(--border-hairline)', background: 'var(--surface-page)',
      }}>
        <span style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--surface-inverse)', color: 'var(--text-on-inverse)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>A</span>
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>negocio de ana</div>
          <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>workspace</div>
        </div>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ fontSize: 'var(--fs-overline)', letterSpacing: '0.2em', color: 'var(--text-muted)', padding: '4px 12px 6px' }}>operación</div>
        {items.map(row)}
      </nav>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 'auto' }}>
        <div style={{ fontSize: 'var(--fs-overline)', letterSpacing: '0.2em', color: 'var(--text-muted)', padding: '4px 12px 6px' }}>más adelante</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 12px', color: 'var(--text-muted)', fontSize: 'var(--fs-body-sm)' }}>
          <span style={{ width: 16, textAlign: 'center' }}>$</span> finanzas
          <span style={{ marginLeft: 'auto' }}><Badge tone="neutral">próximo</Badge></span>
        </div>
      </nav>
    </aside>
  );
}
Object.assign(window, { OpsSidebar });
