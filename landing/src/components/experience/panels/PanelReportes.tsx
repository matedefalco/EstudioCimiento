"use client";
import { useState } from "react";
import { C } from "../constants";
import { KpiCard, PanelTitle, GhostBtn, SubTabs, MiniBar, ProgressBar, LegendRow, Donut } from "../primitives";
import { SegmentTabs } from "../primitives";

const MESES = ["ene", "feb", "mar", "abr", "may", "jun"];

const DATA_INGRESOS   = [520, 680, 490, 780, 720, 662];
const DATA_TAREAS     = [28, 35, 31, 44, 52, 48];
const DATA_LEADS      = [1, 2, 1, 3, 2, 3];

const PIPELINE_SEGS = [
  { value: 48, color: C.purple },
  { value: 32, color: C.blue   },
  { value: 14, color: C.amber  },
  { value: 6,  color: C.green  },
];

const OCUPACION = [6, 8, 5, 9, 7, 4, 3];
const DIAS = ["l", "m", "x", "j", "v", "s", "d"];

export function PanelReportes() {
  const [tab,    setTab]    = useState("resumen");
  const [periodo, setPeriodo] = useState("este mes");

  return (
    <div>
      {/* ── HEADER ───────────────────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 10 }}>
        <PanelTitle sub="todo lo que pasa en tu negocio, en un solo lugar.">reportes</PanelTitle>
        <GhostBtn>exportar reporte</GhostBtn>
      </div>

      <SubTabs items={["resumen", "evolución"]} active={tab} onChange={setTab} />

      {/* ── TAB RESUMEN ──────────────────────────────────────────────── */}
      {tab === "resumen" && (
        <div>
          {/* selector de período */}
          <div style={{ marginBottom: 20 }}>
            <SegmentTabs
              items={["este mes", "trimestre", "año"]}
              active={periodo}
              onChange={setPeriodo}
            />
          </div>

          {/* KPIs top */}
          <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
            <KpiCard label="ingresos"          value="$662.000"  delta="14% vs anterior"  positive />
            <KpiCard label="tareas completadas" value="48"        delta="22% vs anterior"  positive />
            <KpiCard label="leads cerrados"     value="3"         sub="esta semana" />
            <KpiCard label="turnos realizados"  value="47"        sub="este mes" />
          </div>

          {/* grid 2x2 de mini-widgets */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

            {/* widget 1: finanzas */}
            <div style={{ background: "var(--tc-card)", border: "1px solid var(--tc-border)", borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 12, color: "var(--tc-soft)", marginBottom: 14, fontWeight: 600 }}>finanzas · ingreso vs egreso</div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: "var(--tc-soft)", marginBottom: 6 }}>ingresos</div>
                  <MiniBar data={[520, 680, 490, 780, 720, 662]} color={C.green} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: "var(--tc-soft)", marginBottom: 6 }}>egresos</div>
                  <MiniBar data={[340, 420, 380, 510, 490, 344]} color={C.red} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--tc-soft)" }}>
                  <span style={{ width: 8, height: 8, background: C.green, borderRadius: 2, display: "inline-block" }} /> ingresos
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--tc-soft)" }}>
                  <span style={{ width: 8, height: 8, background: C.red, borderRadius: 2, display: "inline-block" }} /> egresos
                </div>
              </div>
            </div>

            {/* widget 2: operaciones */}
            <div style={{ background: "var(--tc-card)", border: "1px solid var(--tc-border)", borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 12, color: "var(--tc-soft)", marginBottom: 14, fontWeight: 600 }}>operaciones · tareas por estado</div>
              <div style={{ display: "grid", gap: 10 }}>
                {[
                  { label: "por hacer",  value: 18, pct: 15, tone: "amber"  as const },
                  { label: "en curso",   value: 32, pct: 26, tone: "blue"   as const },
                  { label: "en revisión",value: 24, pct: 20, tone: "purple" as const },
                  { label: "completo",   value: 48, pct: 39, tone: "green"  as const },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: "var(--tc-ink)" }}>{item.label}</span>
                      <span style={{ color: "var(--tc-soft)", fontWeight: 600 }}>{item.value}</span>
                    </div>
                    <ProgressBar value={item.pct} tone={item.tone} />
                  </div>
                ))}
              </div>
            </div>

            {/* widget 3: crm / pipeline */}
            <div style={{ background: "var(--tc-card)", border: "1px solid var(--tc-border)", borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 12, color: "var(--tc-soft)", marginBottom: 14, fontWeight: 600 }}>crm · distribución del pipeline</div>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <Donut
                  segments={PIPELINE_SEGS}
                  total={100}
                  label="leads"
                />
                <div style={{ display: "grid", gap: 7, flex: 1 }}>
                  <LegendRow color={C.purple} text="prospecto"  pct="48%" />
                  <LegendRow color={C.blue}   text="contactado" pct="32%" />
                  <LegendRow color={C.amber}  text="propuesta"  pct="14%" />
                  <LegendRow color={C.green}  text="cerrado"    pct="6%"  />
                </div>
              </div>
            </div>

            {/* widget 4: agenda / ocupación semanal */}
            <div style={{ background: "var(--tc-card)", border: "1px solid var(--tc-border)", borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 12, color: "var(--tc-soft)", marginBottom: 14, fontWeight: 600 }}>agenda · ocupación semanal</div>
              <MiniBar data={OCUPACION} color="var(--tc-accent)" />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 10.5, color: "var(--tc-soft)" }}>
                {DIAS.map(d => <span key={d}>{d}</span>)}
              </div>
              <div style={{ marginTop: 10, fontSize: 11, color: "var(--tc-soft)" }}>
                promedio: <span style={{ color: "var(--tc-ink)", fontWeight: 600 }}>6 turnos/día</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── TAB EVOLUCIÓN ────────────────────────────────────────────── */}
      {tab === "evolución" && (
        <div>
          <div style={{ fontSize: 13, color: "var(--tc-soft)", marginBottom: 20 }}>
            evolución de métricas clave · últimos 6 meses
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* chart 1: ingresos */}
            <MiniChart
              label="ingresos mensuales"
              data={DATA_INGRESOS}
              color={C.green}
              unit="$"
              meses={MESES}
            />

            {/* chart 2: tareas completadas */}
            <MiniChart
              label="tareas completadas"
              data={DATA_TAREAS}
              color={C.blue}
              meses={MESES}
            />

            {/* chart 3: leads cerrados */}
            <MiniChart
              label="leads cerrados"
              data={DATA_LEADS}
              color={C.copper}
              meses={MESES}
            />

          </div>

          <div style={{ marginTop: 24, fontSize: 11.5, color: "var(--tc-soft)", borderTop: "1px solid var(--tc-border)", paddingTop: 14 }}>
            datos actualizados automáticamente desde todos tus módulos.
          </div>
        </div>
      )}
    </div>
  );
}

/* ── mini-chart helper ───────────────────────────────────────────────── */
function MiniChart({
  label,
  data,
  color,
  unit = "",
  meses,
}: {
  label: string;
  data: number[];
  color: string;
  unit?: string;
  meses: string[];
}) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const fmt = (n: number) => unit === "$" ? `$${n.toLocaleString("es-AR")}` : `${n}`;

  return (
    <div style={{ background: "var(--tc-card)", border: "1px solid var(--tc-border)", borderRadius: 14, padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 12, color: "var(--tc-soft)", fontWeight: 600 }}>{label}</div>
        <div style={{ display: "flex", gap: 12, fontSize: 11.5 }}>
          <span style={{ color: "var(--tc-soft)" }}>mín <span style={{ color: "var(--tc-ink)", fontWeight: 600 }}>{fmt(min)}</span></span>
          <span style={{ color: "var(--tc-soft)" }}>máx <span style={{ color: "var(--tc-ink)", fontWeight: 600 }}>{fmt(max)}</span></span>
        </div>
      </div>
      <MiniBar data={data} color={color} />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10.5, color: "var(--tc-soft)" }}>
        {meses.map(m => <span key={m}>{m}</span>)}
      </div>
    </div>
  );
}
