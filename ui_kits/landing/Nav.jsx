/* Estudio Cimiento — landing nav */
function Nav() {
  const { Button, Logo } = window.EstudioCimientoDesignSystem_c4cdd4;
  const link = { color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 'var(--fs-body-sm)', fontWeight: 500 };
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 10,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px var(--gutter)',
      background: 'color-mix(in srgb, var(--surface-page) 86%, transparent)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-hairline)',
    }}>
      <Logo size={26} />
      <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        <a href="#proceso" style={link}>el proceso</a>
        <a href="#caso" style={link}>el caso</a>
        <a href="#wedge" style={link}>por dónde empezar</a>
        <Button variant="primary" size="sm">agendar una charla</Button>
      </nav>
    </header>
  );
}
Object.assign(window, { Nav });
