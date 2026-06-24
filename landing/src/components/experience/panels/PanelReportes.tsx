"use client";
import { useState } from "react";
import { C } from "../constants";
import { KpiCard, PanelTitle, GhostBtn, SubTabs, LegendRow, Donut, SegmentTabs } from "../primitives";

/* ─── datos ───────────────────────────────────────────────────────────────── */

const MESES = ["ene", "feb", "mar", "abr", "may", "jun"];

const INGRESOS = [520, 680, 490, 780, 720, 662];
const EGRESOS  = [340, 420, 380, 510, 490, 344];

const PIPELINE_SEGS = [
  { value: 48, color: C.purple },
  { value: 32, color: C.blue   },
  { value: 14, color: C.amber  },
  { value: 6,  color: C.green  },
];

const RADAR_LABELS  = ["finanzas", "ops", "crm", "agenda", "stock", "clientes"];
const RADAR_VALUES  = [78, 85, 62, 71, 45, 90];

const OCUPACION_DIA = [6, 8, 5, 9, 7, 4, 3];
const DIAS          = ["l", "m", "x", "j", "v", "s", "d"];

/* ─── componente principal ────────────────────────────────────────────────── */

export function PanelReportes() {
  const [tab,     setTab]     = useState("resumen");
  const [periodo, setPeriodo] = useState("6 meses");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 10 }}>
        <PanelTitle sub="todo lo que pasa en tu negocio, en un solo lugar.">reportes</PanelTitle>
        <GhostBtn>exportar</GhostBtn>
      </div>

      <SubTabs items={["resumen", "evolución", "análisis"]} active={tab} onChange={setTab} />

      {/* ── RESUMEN ──────────────────────────────────────────────────────── */}
      {tab === "resumen" && (
        <div>
          <div style={{ marginBottom: 20 }}>
            <SegmentTabs items={["30 días", "3 meses", "6 meses", "año"]} active={periodo} onChange={setPeriodo} />
          </div>

          <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
            <KpiCard label="ingresos"           value="$662.000"  delta="14% vs anterior"  positive />
            <KpiCard label="tareas completadas" value="48"        delta="22% vs anterior"  positive />
            <KpiCard label="leads cerrados"     value="3"         sub="esta semana" />
            <KpiCard label="turnos realizados"  value="47"        sub="este mes" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

            {/* finanzas: area chart */}
            <div style={{ background: "var(--tc-card)", border: "1px solid var(--tc-border)", borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 12, color: "var(--tc-soft)", fontWeight: 600, marginBottom: 14 }}>finanzas · ingreso vs egreso</div>
              <AreaChart data1={INGRESOS} data2={EGRESOS} color1={C.green} color2={C.red} height={80} />
              <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
                <LegendDot color={C.green} label="ingresos" />
                <LegendDot color={C.red}   label="egresos"  />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10.5, color: "var(--tc-soft)" }}>
                {MESES.map(m => <span key={m}>{m}</span>)}
              </div>
            </div>

            {/* crm: donut */}
            <div style={{ background: "var(--tc-card)", border: "1px solid var(--tc-border)", borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 12, color: "var(--tc-soft)", fontWeight: 600, marginBottom: 14 }}>crm · pipeline por etapa</div>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <Donut segments={PIPELINE_SEGS} total={100} label="leads" />
                <div style={{ display: "grid", gap: 7, flex: 1 }}>
                  <LegendRow color={C.purple} text="prospecto"  pct="48%" />
                  <LegendRow color={C.blue}   text="contactado" pct="32%" />
                  <LegendRow color={C.amber}  text="propuesta"  pct="14%" />
                  <LegendRow color={C.green}  text="cerrado"    pct="6%"  />
                </div>
              </div>
            </div>

            {/* agenda: barras por día */}
            <div style={{ background: "var(--tc-card)", border: "1px solid var(--tc-border)", borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 12, color: "var(--tc-soft)", fontWeight: 600, marginBottom: 14 }}>agenda · ocupación semanal</div>
              <BarChart data={OCUPACION_DIA} labels={DIAS} color="var(--tc-accent)" height={70} />
              <div style={{ marginTop: 10, fontSize: 11, color: "var(--tc-soft)" }}>
                promedio: <span style={{ color: "var(--tc-ink)", fontWeight: 600 }}>6 turnos/día</span>
                <span style={{ marginLeft: 12 }}>pico: <span style={{ color: "var(--tc-ink)", fontWeight: 600 }}>jueves</span></span>
              </div>
            </div>

            {/* stock: barras horizontales por estado */}
            <div style={{ background: "var(--tc-card)", border: "1px solid var(--tc-border)", borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 12, color: "var(--tc-soft)", fontWeight: 600, marginBottom: 14 }}>stock · distribución por estado</div>
              <HBarChart
                rows={[
                  { label: "activo",      value: 60, color: C.green  },
                  { label: "atención",    value: 20, color: C.amber  },
                  { label: "bajo mínimo", value: 40, color: C.red    },
                ]}
                max={100}
              />
            </div>

          </div>
        </div>
      )}

      {/* ── EVOLUCIÓN ────────────────────────────────────────────────────── */}
      {tab === "evolución" && (
        <div>
          <div style={{ fontSize: 13, color: "var(--tc-soft)", marginBottom: 20 }}>
            evolución de métricas clave · últimos 6 meses
          </div>

          {/* area stacked grande */}
          <div style={{ background: "var(--tc-card)", border: "1px solid var(--tc-border)", borderRadius: 14, padding: 24, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--tc-soft)" }}>ingresos vs egresos · área apilada</div>
              <div style={{ display: "flex", gap: 14 }}>
                <LegendDot color={C.green} label="ingresos" />
                <LegendDot color={C.red}   label="egresos"  />
              </div>
            </div>
            <AreaChart data1={INGRESOS} data2={EGRESOS} color1={C.green} color2={C.red} height={140} showGrid />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "var(--tc-soft)" }}>
              {MESES.map(m => <span key={m}>{m}</span>)}
            </div>
          </div>

          {/* líneas individuales */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <LineCard label="leads cerrados"     data={[1,2,1,3,2,3]}   color={C.copper} unit=""  />
            <LineCard label="tareas completadas" data={[28,35,31,44,52,48]} color={C.blue}   unit=""  />
            <LineCard label="turnos realizados"  data={[32,40,35,50,47,47]} color={C.purple} unit=""  />
            <LineCard label="ticket promedio"    data={[210,190,220,240,215,230]} color={C.green} unit="$" />
          </div>

          <div style={{ marginTop: 20, fontSize: 11.5, color: "var(--tc-soft)", borderTop: "1px solid var(--tc-border)", paddingTop: 14 }}>
            datos actualizados automáticamente desde todos tus módulos.
          </div>
        </div>
      )}

      {/* ── ANÁLISIS ─────────────────────────────────────────────────────── */}
      {tab === "análisis" && (
        <div>
          <div style={{ fontSize: 13, color: "var(--tc-soft)", marginBottom: 20 }}>
            performance multidimensional · comparación por módulo
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

            {/* radar */}
            <div style={{ background: "var(--tc-card)", border: "1px solid var(--tc-border)", borderRadius: 14, padding: 24 }}>
              <div style={{ fontSize: 12, color: "var(--tc-soft)", fontWeight: 600, marginBottom: 16 }}>radar · performance por módulo</div>
              <RadarChart labels={RADAR_LABELS} values={RADAR_VALUES} />
            </div>

            {/* barras horizontales de performance */}
            <div style={{ background: "var(--tc-card)", border: "1px solid var(--tc-border)", borderRadius: 14, padding: 24 }}>
              <div style={{ fontSize: 12, color: "var(--tc-soft)", fontWeight: 600, marginBottom: 16 }}>score por módulo · escala 0–100</div>
              <div style={{ display: "grid", gap: 14 }}>
                {RADAR_LABELS.map((label, i) => (
                  <div key={label}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                      <span style={{ color: "var(--tc-ink)", textTransform: "lowercase" }}>{label}</span>
                      <span style={{ color: "var(--tc-soft)", fontWeight: 600 }}>{RADAR_VALUES[i]}</span>
                    </div>
                    <div style={{ height: 6, background: "var(--tc-border)", borderRadius: 20, overflow: "hidden" }}>
                      <div style={{
                        width: `${RADAR_VALUES[i]}%`, height: "100%", borderRadius: 20,
                        background: RADAR_VALUES[i] >= 75 ? C.green : RADAR_VALUES[i] >= 55 ? C.amber : C.red,
                        transition: "width 600ms ease",
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* insight cards */}
            <div style={{ background: "var(--tc-card)", border: "1px solid var(--tc-border)", borderRadius: 14, padding: 20, gridColumn: "1 / -1" }}>
              <div style={{ fontSize: 12, color: "var(--tc-soft)", fontWeight: 600, marginBottom: 14 }}>insights del período</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {[
                  { icon: "↑", label: "módulo con mejor performance", value: "clientes", color: C.green },
                  { icon: "↓", label: "módulo con más oportunidad",   value: "stock",    color: C.amber },
                  { icon: "→", label: "tendencia general",             value: "+12% vs. trimestre anterior", color: C.blue },
                ].map((ins, i) => (
                  <div key={i} style={{ background: "var(--tc-sub)", borderRadius: 10, padding: "14px 16px" }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: ins.color, marginBottom: 4 }}>{ins.icon}</div>
                    <div style={{ fontSize: 11, color: "var(--tc-soft)", marginBottom: 4 }}>{ins.label}</div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--tc-ink)" }}>{ins.value}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

/* ─── helpers de visualización ────────────────────────────────────────────── */

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--tc-soft)" }}>
      <span style={{ width: 8, height: 8, background: color, borderRadius: 2, display: "inline-block" }} />
      {label}
    </div>
  );
}

/* ── área (2 series apiladas como líneas rellenas, no apiladas) ── */
function AreaChart({ data1, data2, color1, color2, height = 80, showGrid = false }: {
  data1: number[]; data2: number[]; color1: string; color2: string; height?: number; showGrid?: boolean;
}) {
  const W = 400; const H = height;
  const max = Math.max(...data1, ...data2) * 1.15;
  const pts = (data: number[]) =>
    data.map((v, i) => [i * (W / (data.length - 1)), H - (v / max) * H] as [number, number]);

  const pathStr = (pts: [number, number][]) =>
    pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `C${(pts[i-1][0] + p[0])/2},${pts[i-1][1]} ${(pts[i-1][0] + p[0])/2},${p[1]} ${p[0]},${p[1]}`)).join(" ");

  const areaStr = (pts: [number, number][], color: string, opacity = 0.15) => {
    const line = pathStr(pts);
    const close = `L${W},${H} L0,${H} Z`;
    return (
      <path d={`${line} ${close}`} fill={color} fillOpacity={opacity} />
    );
  };

  const p1 = pts(data1);
  const p2 = pts(data2);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height, display: "block" }} preserveAspectRatio="none">
      {showGrid && [0.25,0.5,0.75].map(f => (
        <line key={f} x1={0} y1={H * f} x2={W} y2={H * f} stroke="var(--tc-border)" strokeWidth={0.8} />
      ))}
      {areaStr(p1, color1, 0.18)}
      {areaStr(p2, color2, 0.18)}
      <path d={pathStr(p1)} fill="none" stroke={color1} strokeWidth={2} strokeLinecap="round" />
      <path d={pathStr(p2)} fill="none" stroke={color2} strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

/* ── barras verticales ── */
function BarChart({ data, labels, color, height = 70 }: { data: number[]; labels: string[]; color: string; height: number }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, height: "100%" }}>
          <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
            <div style={{ width: "100%", height: `${(v / max) * 100}%`, background: color, borderRadius: "3px 3px 0 0", opacity: 0.85 }} />
          </div>
          <span style={{ fontSize: 10, color: "var(--tc-soft)" }}>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

/* ── barras horizontales ── */
function HBarChart({ rows, max }: { rows: { label: string; value: number; color: string }[]; max: number }) {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {rows.map(r => (
        <div key={r.label}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
            <span style={{ color: "var(--tc-ink)" }}>{r.label}</span>
            <span style={{ color: "var(--tc-soft)", fontWeight: 600 }}>{r.value}%</span>
          </div>
          <div style={{ height: 8, background: "var(--tc-border)", borderRadius: 20, overflow: "hidden" }}>
            <div style={{ width: `${(r.value / max) * 100}%`, height: "100%", background: r.color, borderRadius: 20 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── radar ── */
function RadarChart({ labels, values }: { labels: string[]; values: number[] }) {
  const cx = 120; const cy = 110; const R = 80; const n = labels.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i: number, r: number): [number, number] => [
    cx + r * Math.cos(angle(i)),
    cy + r * Math.sin(angle(i)),
  ];
  const rings = [0.25, 0.5, 0.75, 1];
  const dataPath = values.map((v, i) => pt(i, (v / 100) * R)).map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ") + " Z";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <svg viewBox="0 0 240 220" style={{ width: 200, flexShrink: 0 }}>
        {/* rings */}
        {rings.map(f => (
          <polygon key={f}
            points={labels.map((_, i) => pt(i, R * f).join(",")).join(" ")}
            fill="none" stroke="var(--tc-border)" strokeWidth={0.8}
          />
        ))}
        {/* axes */}
        {labels.map((_, i) => (
          <line key={i} x1={cx} y1={cy} x2={pt(i, R)[0]} y2={pt(i, R)[1]} stroke="var(--tc-border)" strokeWidth={0.8} />
        ))}
        {/* data */}
        <path d={dataPath} fill="var(--tc-accent)" fillOpacity={0.18} stroke="var(--tc-accent)" strokeWidth={1.8} />
        {values.map((v, i) => (
          <circle key={i} cx={pt(i, (v / 100) * R)[0]} cy={pt(i, (v / 100) * R)[1]} r={3} fill="var(--tc-accent)" />
        ))}
        {/* labels */}
        {labels.map((label, i) => {
          const [lx, ly] = pt(i, R + 18);
          return (
            <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
              style={{ fontSize: 9, fill: "var(--tc-soft)", fontFamily: "inherit", textTransform: "lowercase" }}>
              {label}
            </text>
          );
        })}
      </svg>
      <div style={{ display: "grid", gap: 6, fontSize: 11.5 }}>
        {labels.map((l, i) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: "var(--tc-accent)", opacity: 0.6 + (values[i] / 100) * 0.4 }} />
            <span style={{ color: "var(--tc-soft)" }}>{l}</span>
            <span style={{ color: "var(--tc-ink)", fontWeight: 600, marginLeft: "auto" }}>{values[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── line card mini ── */
function LineCard({ label, data, color, unit }: { label: string; data: number[]; color: string; unit: string }) {
  const W = 300; const H = 55;
  const max = Math.max(...data) * 1.1;
  const pts: [number, number][] = data.map((v, i) => [i * (W / (data.length - 1)), H - (v / max) * H]);
  const line = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const area = `${line} L${W},${H} L0,${H} Z`;
  const fmt = (n: number) => unit === "$" ? `$${n.toLocaleString("es-AR")}` : `${n}`;

  return (
    <div style={{ background: "var(--tc-card)", border: "1px solid var(--tc-border)", borderRadius: 14, padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ fontSize: 12, color: "var(--tc-soft)", fontWeight: 600 }}>{label}</div>
        <div style={{ display: "flex", gap: 10, fontSize: 11.5 }}>
          <span style={{ color: "var(--tc-soft)" }}>mín <span style={{ color: "var(--tc-ink)", fontWeight: 600 }}>{fmt(Math.min(...data))}</span></span>
          <span style={{ color: "var(--tc-soft)" }}>máx <span style={{ color: "var(--tc-ink)", fontWeight: 600 }}>{fmt(Math.max(...data))}</span></span>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: H, display: "block" }} preserveAspectRatio="none">
        <path d={area} fill={color} fillOpacity={0.12} />
        <path d={line} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5, fontSize: 10.5, color: "var(--tc-soft)" }}>
        {MESES.map(m => <span key={m}>{m}</span>)}
      </div>
    </div>
  );
}
