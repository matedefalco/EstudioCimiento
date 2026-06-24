"use client";
import { useState } from "react";
import { C } from "../constants";
import { KpiCard, PanelTitle, GhostBtn, PrimaryBtn, Chip, ProgressBar, Donut, LegendRow, Pagination, SubTabs, MiniBar } from "../primitives";

const ALL_ROWS = [
  { name: "transferencia recibida", img: "TF", date: "22 jun · 09:15", type: "transferencia", amount: 420000,  positive: true,  status: "completado", sTone: "green" as const, color: C.blue   },
  { name: "venta mostrador",        img: "VM", date: "21 jun · 11:45", type: "venta",         amount: 85000,   positive: true,  status: "completado", sTone: "green" as const, color: C.green  },
  { name: "cobro cuota #4",         img: "C4", date: "20 jun · 03:30", type: "cuota",         amount: 62000,   positive: true,  status: "completado", sTone: "green" as const, color: C.amber  },
  { name: "pago a proveedor",       img: "PP", date: "19 jun · 06:10", type: "proveedor",     amount: -84500,  positive: false, status: "completado", sTone: "green" as const, color: C.purple },
  { name: "alquiler",               img: "AL", date: "18 jun · 10:00", type: "fijo",          amount: -210000, positive: false, status: "completado", sTone: "green" as const, color: C.gray   },
  { name: "Spotify Premium",        img: "SP", date: "17 jun · 01:42", type: "suscripción",   amount: -9990,   positive: false, status: "completado", sTone: "green" as const, color: "#1DB954"},
  { name: "cobro anticipo",         img: "CA", date: "16 jun · 14:00", type: "anticipo",      amount: 95000,   positive: true,  status: "completado", sTone: "green" as const, color: C.copper },
  { name: "LinkedIn Premium",       img: "Li", date: "15 jun · 09:00", type: "suscripción",   amount: -39990,  positive: false, status: "fallido",    sTone: "red"   as const, color: "#0A66C2"},
];

const fmt = (n: number) => `${n < 0 ? "-" : "+"}$${Math.abs(n).toLocaleString("es-AR")}`;

export function PanelFin() {
  const [tab, setTab] = useState("resumen");

  const ingresos = ALL_ROWS.filter(r => r.positive);
  const egresos  = ALL_ROWS.filter(r => !r.positive);
  const totalIn  = ingresos.reduce((s, r) => s + r.amount, 0);
  const totalEg  = Math.abs(egresos.reduce((s, r) => s + r.amount, 0));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 10 }}>
        <PanelTitle sub="tus números, claros, sin pelear con planillas.">finanzas</PanelTitle>
        <div style={{ display: "flex", gap: 8 }}>
          <GhostBtn>exportar</GhostBtn>
          <PrimaryBtn>+ registrar movimiento</PrimaryBtn>
        </div>
      </div>

      <SubTabs items={["resumen","ingresos","egresos","movimientos"]} active={tab} onChange={setTab} />

      {/* ── RESUMEN ───────────────────────────────────────────────────── */}
      {tab === "resumen" && (
        <div>
          <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
            <KpiCard label="balance del mes"   value="$1.173.510" delta="9.4% vs anterior" positive />
            <KpiCard label="ingresos del mes"  value={`$${totalIn.toLocaleString("es-AR")}`}  delta="14% vs anterior" positive />
            <KpiCard label="egresos del mes"   value={`$${totalEg.toLocaleString("es-AR")}`}  delta="6% vs anterior"  positive={false} />
            <KpiCard label="ahorro proyectado" value="$524.095"   delta="+2.2%"   positive />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
            <div style={{ background: C.panelSurface, border: `1px solid ${C.panelLine}`, borderRadius: 14, padding: 22 }}>
              <div style={{ fontSize: 12, color: C.gray, marginBottom: 14 }}>evolución mensual</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: C.gray, marginBottom: 6 }}>ingresos</div>
                  <MiniBar data={[620,780,540,920,850,1174]} color={C.green} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: C.gray, marginBottom: 6 }}>egresos</div>
                  <MiniBar data={[340,420,380,510,490,344]} color={C.red} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: C.gray }}><span style={{ width: 8, height: 8, background: C.green, borderRadius: 2, display: "inline-block" }}/> ene – jun</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: "#EFE3CB", border: `1px solid ${C.panelLine}`, borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: 12, color: "#6B5526", marginBottom: 6 }}>control de presupuesto mensual</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>$344.480 <span style={{ fontSize: 12, fontWeight: 400, color: "#6B5526" }}>de $500.000</span></div>
                <ProgressBar value={69} tone="amber" />
                <div style={{ fontSize: 11.5, color: C.amber, marginTop: 10 }}>⚠ te estás acercando al límite mensual.</div>
              </div>
              <div style={{ background: C.panelSurface, border: `1px solid ${C.panelLine}`, borderRadius: 14, padding: 18 }}>
                <div style={{ fontSize: 12, color: C.gray, marginBottom: 10 }}>distribución de egresos</div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <Donut segments={[{ value: 61, color: C.purple }, { value: 26, color: C.amber }, { value: 13, color: C.blue }]} total={100} label="$344k" />
                  <div style={{ display: "grid", gap: 6, flex: 1 }}>
                    <LegendRow color={C.purple} text="operaciones" pct="61%" />
                    <LegendRow color={C.amber}  text="fijos"       pct="26%" />
                    <LegendRow color={C.blue}   text="servicios"   pct="13%" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── INGRESOS ──────────────────────────────────────────────────── */}
      {tab === "ingresos" && (
        <div>
          <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
            <KpiCard label="total ingresos" value={`$${totalIn.toLocaleString("es-AR")}`} delta="14% vs anterior" positive />
            <KpiCard label="movimientos"    value={`${ingresos.length}`} sub="este mes" />
            <KpiCard label="promedio"       value={`$${Math.round(totalIn / ingresos.length).toLocaleString("es-AR")}`} sub="por movimiento" />
          </div>
          <div style={{ background: C.panelSurface, border: `1px solid ${C.panelLine}`, borderRadius: 14, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: C.gray, marginBottom: 10 }}>tendencia de ingresos · últimos 6 meses</div>
            <MiniBar data={[620,780,540,920,850,1174]} color={C.green} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10.5, color: C.gray }}>
              {["ene","feb","mar","abr","may","jun"].map(m => <span key={m}>{m}</span>)}
            </div>
          </div>
          <RowTable rows={ingresos} />
        </div>
      )}

      {/* ── EGRESOS ───────────────────────────────────────────────────── */}
      {tab === "egresos" && (
        <div>
          <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
            <KpiCard label="total egresos"  value={`$${totalEg.toLocaleString("es-AR")}`} delta="6% vs anterior" positive={false} />
            <KpiCard label="movimientos"    value={`${egresos.length}`} sub="este mes" />
            <KpiCard label="mayor egreso"   value={`$${Math.max(...egresos.map(r => Math.abs(r.amount))).toLocaleString("es-AR")}`} sub="alquiler" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 16 }}>
            <div style={{ background: C.panelSurface, border: `1px solid ${C.panelLine}`, borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 12, color: C.gray, marginBottom: 10 }}>tendencia de egresos · últimos 6 meses</div>
              <MiniBar data={[340,420,380,510,490,344]} color={C.red} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10.5, color: C.gray }}>
                {["ene","feb","mar","abr","may","jun"].map(m => <span key={m}>{m}</span>)}
              </div>
            </div>
            <div style={{ background: C.panelSurface, border: `1px solid ${C.panelLine}`, borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 12, color: C.gray, marginBottom: 10 }}>por categoría</div>
              <div style={{ display: "grid", gap: 8 }}>
                {[
                  { label: "proveedor",   amount: 84500,  pct: 25 },
                  { label: "fijo",        amount: 210000, pct: 61 },
                  { label: "suscripción", amount: 49980,  pct: 14 },
                ].map(cat => (
                  <div key={cat.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                      <span style={{ textTransform: "lowercase" }}>{cat.label}</span>
                      <span style={{ fontWeight: 600 }}>${cat.amount.toLocaleString("es-AR")}</span>
                    </div>
                    <ProgressBar value={cat.pct} tone="red" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <RowTable rows={egresos} />
        </div>
      )}

      {/* ── MOVIMIENTOS ───────────────────────────────────────────────── */}
      {tab === "movimientos" && (
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            <div style={{ flex: "1 1 200px", display: "flex", alignItems: "center", gap: 8, background: C.panelSurface, border: `1px solid ${C.panelLine}`, borderRadius: 8, padding: "8px 12px", fontSize: 12.5, color: C.gray }}>
              <span>⌕</span> buscar movimiento...
            </div>
            <GhostBtn>↓ exportar</GhostBtn>
            <GhostBtn>⚙ filtrar</GhostBtn>
          </div>
          <RowTable rows={ALL_ROWS} />
        </div>
      )}
    </div>
  );
}

function RowTable({ rows }: { rows: typeof ALL_ROWS }) {
  return (
    <div style={{ background: C.panelSurface, border: `1px solid ${C.panelLine}`, borderRadius: 14, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "36px 1.8fr 1.2fr 1fr 1fr 110px", padding: "11px 18px", fontSize: 10.5, color: C.gray, letterSpacing: "0.06em", borderBottom: `1px solid ${C.panelLine}`, textTransform: "lowercase" }}>
        {["","movimiento","fecha","tipo","monto","estado"].map((h,i) => <span key={i}>{h}</span>)}
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "36px 1.8fr 1.2fr 1fr 1fr 110px", padding: "12px 18px", alignItems: "center", borderBottom: i < rows.length - 1 ? `1px solid ${C.panelLine}` : "none", fontSize: 13 }}>
          <input type="checkbox" readOnly />
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: r.positive ? C.greenBg : C.redBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: r.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 9, fontWeight: 700 }}>{r.img}</div>
            </div>
            <span style={{ fontWeight: 500 }}>{r.name}</span>
          </span>
          <span style={{ color: C.gray, fontSize: 12 }}>{r.date}</span>
          <span style={{ color: C.gray, fontSize: 12, textTransform: "lowercase" }}>{r.type}</span>
          <span style={{ fontWeight: 600, color: r.positive ? C.green : C.red }}>{fmt(r.amount)}</span>
          <Chip text={r.status} tone={r.sTone} />
        </div>
      ))}
      <Pagination page={1} total={rows.length * 6} perPage={rows.length} />
    </div>
  );
}
