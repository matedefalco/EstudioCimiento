/* Estudio Cimiento — operations system: main work surface */
function OpsBoard() {
  const { Button, Badge, Tag, Card } = window.EstudioCimientoDesignSystem_c4cdd4;
  const [tab, setTab] = React.useState('tabla');

  const kpis = [
    { n: '6', l: 'tareas para hoy' },
    { n: '12', l: 'operaciones en curso' },
    { n: '38', l: 'entregadas este mes' },
    { n: '~9 hs', l: 'ahorradas / semana' },
  ];

  const rows = [
    { op: 'alta de comitente · m. ríos', estado: 'en curso', tone: 'warning', resp: 'ana', tag: 'comitentes', venc: 'hoy' },
    { op: 'conciliar operaciones merval', estado: 'pendiente', tone: 'neutral', resp: 'leo', tag: 'operaciones', venc: 'mañana' },
    { op: 'cierre de caja semanal', estado: 'entregado', tone: 'positive', resp: 'ana', tag: 'finanzas', venc: 'lun' },
    { op: 'actualizar base de clientes', estado: 'en curso', tone: 'warning', resp: 'sol', tag: 'bases', venc: 'mié' },
    { op: 'revisar tareas vencidas', estado: 'bloqueado', tone: 'danger', resp: 'leo', tag: 'tareas', venc: 'hoy' },
  ];

  const th = { textAlign: 'left', padding: '12px 16px', fontSize: 'var(--fs-caption)', letterSpacing: '0.04em', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'lowercase' };
  const td = { padding: '14px 16px', fontSize: 'var(--fs-body-sm)', color: 'var(--text-primary)', borderTop: '1px solid var(--border-hairline)' };

  return (
    <div style={{ flex: 1, minWidth: 0, overflow: 'auto', background: 'var(--surface-page)' }}>
      {/* topbar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 28px', borderBottom: '1px solid var(--border-hairline)',
        position: 'sticky', top: 0, background: 'var(--surface-page)', zIndex: 5,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 'var(--fs-h3)', fontWeight: 500 }}>operaciones</h1>
          <Badge tone="accent">sistema notion</Badge>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="outline" size="sm">filtrar</Button>
          <Button variant="primary" size="sm">nueva tarea</Button>
        </div>
      </div>

      <div style={{ padding: '28px' }}>
        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {kpis.map((k, i) => (
            <Card key={i} elevation="flat" padding="18px 20px">
              <div style={{ fontSize: '30px', fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{k.n}</div>
              <div style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-secondary)', marginTop: 4 }}>{k.l}</div>
            </Card>
          ))}
        </div>

        {/* tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {['tabla', 'tablero'].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '7px 16px', borderRadius: 'var(--radius-pill)', cursor: 'pointer',
              border: '1px solid ' + (tab === t ? 'transparent' : 'var(--border-hairline)'),
              background: tab === t ? 'var(--surface-inverse)' : 'transparent',
              color: tab === t ? 'var(--text-on-inverse)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-sm)', fontWeight: 500,
            }}>{t}</button>
          ))}
        </div>

        {tab === 'tabla' ? (
          <Card elevation="raised" padding="0">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-sans)' }}>
              <thead><tr>
                <th style={th}>tarea</th><th style={th}>estado</th><th style={th}>responsable</th><th style={th}>área</th><th style={th}>vence</th>
              </tr></thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td style={{ ...td, fontWeight: 500 }}>{r.op}</td>
                    <td style={td}><Badge tone={r.tone}>{r.estado}</Badge></td>
                    <td style={td}>{r.resp}</td>
                    <td style={td}><Tag>{r.tag}</Tag></td>
                    <td style={{ ...td, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{r.venc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[['pendiente', 'neutral'], ['en curso', 'warning'], ['entregado', 'positive']].map(([col, tone]) => (
              <div key={col}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <Badge tone={tone}>{col}</Badge>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {rows.filter((r) => r.estado === col).map((r, i) => (
                    <Card key={i} elevation="flat" padding="14px 16px">
                      <div style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 500, marginBottom: 10 }}>{r.op}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Tag>{r.tag}</Tag>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>{r.resp} · {r.venc}</span>
                      </div>
                    </Card>
                  ))}
                  {rows.filter((r) => r.estado === col).length === 0 && (
                    <div style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', padding: '8px 4px' }}>sin tareas</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
Object.assign(window, { OpsBoard });
