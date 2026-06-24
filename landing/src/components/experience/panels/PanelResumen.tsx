"use client";
import { C } from "../constants";
import { Chip, KpiCard, PanelTitle, ProgressBar, MiniBar, Avatar } from "../primitives";

function WidgetTareas() {
  const tasks = [
    { title: "actualizar propuesta para cliente", persona: "AM", etapa: "en revisión", tone: "amber" as const },
    { title: "cerrar presupuesto de campaña",     persona: "LR", etapa: "por hacer",   tone: "gray"  as const },
    { title: "enviar informe semanal",             persona: "MA", etapa: "en progreso", tone: "blue"  as const },
    { title: "revisar contrato proveedor",         persona: "GF", etapa: "bloqueada",   tone: "red"   as const },
  ];
  return (
    <div style={{ background: "var(--tc-card)", border: `1px solid var(--tc-border)`, borderRadius: 14, padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>tareas pendientes</div>
        <span style={{ fontSize: 11, color: C.copper, fontWeight: 600, cursor: "pointer" }}>ver todas →</span>
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {tasks.map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < tasks.length - 1 ? `1px solid var(--tc-border)` : "none" }}>
            <div style={{ width: 18, height: 18, borderRadius: 4, border: `1.5px solid var(--tc-border)`, flexShrink: 0 }} />
            <span style={{ fontSize: 12.5, flex: 1 }}>{t.title}</span>
            <Avatar initials={t.persona} idx={i} size={22} />
            <Chip text={t.etapa} tone={t.tone} />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, paddingTop: 10, borderTop: `1px solid var(--tc-border)`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, fontSize: 12, color: "var(--tc-soft)" }}>
        <span style={{ flexShrink: 0 }}>4 de 11 pendientes</span>
        <div style={{ flex: 1 }}><ProgressBar value={64} tone="amber" /></div>
      </div>
    </div>
  );
}

function WidgetFinanzas() {
  const movs = [
    { name: "transferencia recibida", amount: 420000,  positive: true  },
    { name: "venta mostrador",        amount: 85000,   positive: true  },
    { name: "pago a proveedor",       amount: -84500,  positive: false },
    { name: "alquiler",               amount: -210000, positive: false },
  ];
  const fmt = (n: number) => `${n < 0 ? "-" : "+"}$${Math.abs(n).toLocaleString("es-AR")}`;
  return (
    <div style={{ background: "var(--tc-card)", border: `1px solid var(--tc-border)`, borderRadius: 14, padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>últimos movimientos</div>
        <span style={{ fontSize: 11, color: C.copper, fontWeight: 600, cursor: "pointer" }}>ver finanzas →</span>
      </div>
      <div style={{ display: "grid", gap: 6, marginBottom: 16 }}>
        {movs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5, padding: "6px 0", borderBottom: i < movs.length - 1 ? `1px solid var(--tc-border)` : "none" }}>
            <span>{m.name}</span>
            <span style={{ fontWeight: 600, color: m.positive ? C.green : C.red }}>{fmt(m.amount)}</span>
          </div>
        ))}
      </div>
      <div style={{ background: "var(--tc-sub)", borderRadius: 10, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--tc-soft)" }}>balance del mes</div>
          <div style={{ fontSize: 20, fontWeight: 700, marginTop: 2 }}>$1.173.510</div>
        </div>
        <div style={{ width: 80 }}>
          <MiniBar data={[620,780,540,920,850,1174]} color={C.green} />
        </div>
      </div>
    </div>
  );
}

function WidgetStock() {
  const alerts = [
    { name: "tornillos 4mm",       stock: 2, min: 10, depot: "depósito A" },
    { name: "cable UTP cat6",      stock: 5, min: 20, depot: "depósito B" },
    { name: "soporte pared doble", stock: 0, min: 5,  depot: "depósito A" },
  ];
  return (
    <div style={{ background: "var(--tc-card)", border: `1px solid var(--tc-border)`, borderRadius: 14, padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>alertas de stock</div>
        <span style={{ fontSize: 11, color: C.copper, fontWeight: 600, cursor: "pointer" }}>ver stock →</span>
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {alerts.map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: a.stock === 0 ? "rgba(181,82,74,0.14)" : "rgba(181,134,60,0.12)", borderRadius: 10, border: `1px solid ${a.stock === 0 ? "rgba(181,82,74,0.25)" : "rgba(181,134,60,0.22)"}` }}>
            <span style={{ fontSize: 18 }}>{a.stock === 0 ? "⛔" : "⚠️"}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600 }}>{a.name}</div>
              <div style={{ fontSize: 11, color: "var(--tc-soft)", marginTop: 1 }}>{a.depot} · mínimo: {a.min}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: a.stock === 0 ? C.red : C.amber }}>{a.stock}</div>
              <div style={{ fontSize: 10, color: "var(--tc-soft)" }}>unidades</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WidgetCotizaciones() {
  return (
    <div style={{ background: "var(--tc-card)", border: `1px solid var(--tc-border)`, borderRadius: 14, padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>última cotización enviada</div>
        <span style={{ fontSize: 11, color: C.copper, fontWeight: 600, cursor: "pointer" }}>ver cotizaciones →</span>
      </div>
      <div style={{ background: "var(--tc-sub)", borderRadius: 12, padding: 16, marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 12, color: "var(--tc-soft)", marginBottom: 4 }}>cotización premium · todos los módulos</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>$756.000</div>
          </div>
          <Chip text="publicada" tone="green" />
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["ops","finanzas","stock","cotizador"].map(m => (
            <div key={m} style={{ fontSize: 11, background: "var(--tc-card)", border: `1px solid var(--tc-border)`, borderRadius: 6, padding: "3px 10px", color: "var(--tc-soft)", fontWeight: 600 }}>{m}</div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        {[
          { n: "142", label: "enviadas", bg: "var(--tc-sub)", color: "var(--tc-ink)" },
          { n: "38",  label: "cerradas", bg: C.greenBg, color: C.green   },
          { n: "67",  label: "en espera",bg: C.amberBg, color: C.amber   },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, textAlign: "center", padding: "10px 0", background: s.bg, borderRadius: 10 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.n}</div>
            <div style={{ fontSize: 11, color: s.color, marginTop: 2, opacity: 0.8 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PanelResumen({ selected, brandName }: { selected: string[]; brandName?: string }) {
  const showFin    = selected.includes("fin");
  const showStock  = selected.includes("stock");
  const showClient = selected.includes("clients");

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <PanelTitle sub="todo lo que importa, en un solo lugar.">{brandName ? `sistema ${brandName}` : "resumen del sistema"}</PanelTitle>
      </div>

      <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
        <KpiCard label="tareas activas"   value="11"         delta="3 sin asignar"    positive={false} />
        {showFin    && <KpiCard label="balance del mes"  value="$1.173.510" delta="9.4% vs anterior" positive />}
        {showStock  && <KpiCard label="alertas de stock" value="3"          delta="1 en cero"        positive={false} />}
        {showClient && <KpiCard label="cotizaciones"     value="142"        delta="38 cerradas"      positive />}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <WidgetTareas />
        {showFin    ? <WidgetFinanzas />      : <WidgetCotizaciones />}
        {showStock  ? <WidgetStock />         : <WidgetTareas />}
        {showClient ? <WidgetCotizaciones />  : <WidgetFinanzas />}
      </div>
    </div>
  );
}
