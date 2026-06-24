"use client";
import { C } from "../constants";
import { KpiCard, PanelTitle, GhostBtn, PrimaryBtn, Chip, ProgressBar, Donut, LegendRow, Pagination } from "../primitives";

const ROWS = [
  { name: "Dribbble Pro",       img: "D",  date: "22 jun · 09:15", type: "suscripción",  amount: "-$60.000",   positive: false, status: "completado", sTone: "green", color: "#EA4C89" },
  { name: "Jason Walker",       img: "JW", date: "21 jun · 11:45", type: "recibido",     amount: "+$420.000",  positive: true,  status: "completado", sTone: "green", color: C.blue   },
  { name: "Spotify Premium",    img: "S",  date: "20 jun · 03:30", type: "suscripción",  amount: "-$9.990",    positive: false, status: "completado", sTone: "green", color: "#1DB954" },
  { name: "Amanda Bennet",      img: "AB", date: "19 jun · 06:10", type: "transferencia",amount: "-$180.000",  positive: false, status: "completado", sTone: "green", color: C.amber  },
  { name: "Jane Davis",         img: "JD", date: "18 jun · 10:00", type: "transferencia",amount: "+$99.000",   positive: true,  status: "completado", sTone: "green", color: C.purple },
  { name: "LinkedIn Premium",   img: "Li", date: "17 jun · 01:42", type: "suscripción",  amount: "-$39.990",   positive: false, status: "fallido",    sTone: "red",   color: "#0A66C2" },
];

export function PanelFin() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <PanelTitle sub="tus números, claros, sin pelear con planillas.">finanzas</PanelTitle>
        <div style={{ display: "flex", gap: 8 }}>
          <GhostBtn>exportar reporte</GhostBtn>
          <PrimaryBtn>+ agregar movimiento</PrimaryBtn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 20 }}>
        {/* balance */}
        <div style={{ background: C.panelSurface, border: `1px solid ${C.panelLine}`, borderRadius: 14, padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: C.gray }}>balance total</div>
            <div style={{ fontSize: 12, color: C.gray, border: `1px solid ${C.panelLine}`, borderRadius: 6, padding: "4px 10px" }}>20 jun – 27 jun</div>
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 16 }}>$2.046.840</div>
          {[
            { label: "ingresos del mes", value: "$1.850.000", pct: "-0.12%", up: false },
            { label: "gastos del mes",   value: "$676.512",   pct: "+1.4%",  up: true  },
            { label: "ahorro del mes",   value: "$524.095",   pct: "+2.2%",  up: true  },
          ].map(row => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: `1px solid ${C.panelLine}` }}>
              <span style={{ fontSize: 12.5, color: C.gray }}>{row.label}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13.5, fontWeight: 600 }}>{row.value}</span>
                <span style={{ fontSize: 11, color: row.up ? C.green : C.red, background: row.up ? C.greenBg : C.redBg, borderRadius: 4, padding: "2px 6px" }}>{row.pct}</span>
              </div>
            </div>
          ))}
        </div>

        {/* right col */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: "#EFE3CB", border: `1px solid ${C.panelLine}`, borderRadius: 14, padding: 20, flex: 1 }}>
            <div style={{ fontSize: 12, color: "#6B5526", marginBottom: 6 }}>control de presupuesto</div>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>$350.000 <span style={{ fontSize: 12, fontWeight: 400, color: "#6B5526" }}>de $500.000</span></div>
            <ProgressBar value={70} tone="amber" />
            <div style={{ fontSize: 11.5, color: C.amber, marginTop: 10 }}>⚠ te estás acercando al límite mensual.</div>
          </div>
          <div style={{ background: C.panelSurface, border: `1px solid ${C.panelLine}`, borderRadius: 14, padding: 18 }}>
            <div style={{ fontSize: 12, color: C.gray, marginBottom: 10 }}>distribución de gastos</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Donut segments={[{ value: 62, color: C.copper }, { value: 24, color: C.blue }, { value: 14, color: C.amber }]} total={100} label="$676k" />
              <div style={{ display: "grid", gap: 6, flex: 1 }}>
                <LegendRow color={C.copper} text="operaciones" pct="62%" />
                <LegendRow color={C.blue}   text="proveedores"  pct="24%" />
                <LegendRow color={C.amber}  text="impuestos"    pct="14%" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* tabla */}
      <div style={{ background: C.panelSurface, border: `1px solid ${C.panelLine}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "36px 1.8fr 1.2fr 1fr 1fr 110px", padding: "11px 18px", fontSize: 10.5, color: C.gray, letterSpacing: "0.06em", borderBottom: `1px solid ${C.panelLine}`, textTransform: "lowercase" }}>
          {["","movimiento","fecha","tipo","monto","estado"].map((h,i) => <span key={i}>{h}</span>)}
        </div>
        {ROWS.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "36px 1.8fr 1.2fr 1fr 1fr 110px", padding: "12px 18px", alignItems: "center", borderBottom: i < ROWS.length - 1 ? `1px solid ${C.panelLine}` : "none", fontSize: 13 }}>
            <input type="checkbox" readOnly />
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: r.positive ? C.greenBg : C.redBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: r.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 9, fontWeight: 700 }}>{r.img}</div>
              </div>
              <span style={{ fontWeight: 500 }}>{r.name}</span>
            </span>
            <span style={{ color: C.gray, fontSize: 12 }}>{r.date}</span>
            <span style={{ color: C.gray, fontSize: 12, textTransform: "lowercase" }}>{r.type}</span>
            <span style={{ fontWeight: 600, color: r.positive ? C.green : C.red }}>{r.amount}</span>
            <Chip text={r.status} tone={r.sTone} />
          </div>
        ))}
        <Pagination page={1} total={48} perPage={6} />
      </div>
    </div>
  );
}
