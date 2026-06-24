"use client";
import { useState } from "react";
import { C } from "../constants";
import { Chip, KpiCard, PanelTitle, GhostBtn, PrimaryBtn, Pagination, SubTabs, InfoRow } from "../primitives";

const PRODUCTS = [
  { id: "#KMI662266", name: "cotización básica",   sub: "módulo operaciones", date: "01 ene 2024", price: 480000,  sell: 504000,  stock: 120, status: "publicada", sTone: "green" as const, img: "#E2EAF2" },
  { id: "#KMI662211", name: "cotización completa", sub: "módulo finanzas",    date: "01 ene 2024", price: 360000,  sell: 378000,  stock: 10,  status: "inactiva",  sTone: "gray"  as const, img: "#F1E7D3" },
  { id: "#KMI662199", name: "cotización premium",  sub: "todos los módulos",  date: "01 ene 2024", price: 720000,  sell: 756000,  stock: 120, status: "publicada", sTone: "green" as const, img: "#E3EFE6" },
  { id: "#KMI662188", name: "cotización stock",    sub: "módulo stock",       date: "01 ene 2024", price: 320000,  sell: 336000,  stock: 50,  status: "sin stock", sTone: "amber" as const, img: "#F3E3E0" },
  { id: "#KMI662177", name: "cotización starter",  sub: "módulo operaciones", date: "01 ene 2024", price: 240000,  sell: 252000,  stock: 80,  status: "borrador",  sTone: "gray"  as const, img: "#E9E5F0" },
];

const STATUS_FILTERS = ["todos","publicada","inactiva","borrador","sin stock"];

const PLAN_PUBLISHED = PRODUCTS.filter(p => p.status === "publicada");

export function PanelClients() {
  const [tab, setTab] = useState("mis cotizaciones");
  const [selRows, setSelRows] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("todos");

  // estado del configurador
  const [config, setConfig] = useState({
    brandName: "Mi Empresa",
    primaryColor: C.copper,
    logoText: "ME",
    tagline: "sistemas que ordenan tu operación",
    currency: "ARS",
    showDiscount: true,
  });

  const toggle = (id: string) => setSelRows(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const filtered = PRODUCTS.filter(r => statusFilter === "todos" || r.status === statusFilter);
  const fmt = (n: number) => `$${n.toLocaleString("es-AR")}`;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 8 }}>
        <PanelTitle sub="lo mismo que estuviste usando recién, listo para ofrecerle a tus propios clientes.">cotizador para tus clientes</PanelTitle>
        <div style={{ display: "flex", gap: 8 }}><GhostBtn>exportar</GhostBtn><PrimaryBtn>+ nueva cotización</PrimaryBtn></div>
      </div>

      <SubTabs items={["mis cotizaciones","vista cliente","configurar"]} active={tab} onChange={setTab} />

      {/* ── MIS COTIZACIONES ──────────────────────────────────────────── */}
      {tab === "mis cotizaciones" && (
        <div>
          <div style={{ display: "flex", gap: 14, marginBottom: 16, flexWrap: "wrap" }}>
            <KpiCard label="cotizaciones totales" value="1.248" delta="4.2% vs anterior" positive sub="últimos 7 días" />
            <KpiCard label="monto total"          value="$84.320" delta="12.5% vs anterior" positive sub="últimos 7 días" />
            <KpiCard label="enviadas"             value="142"    delta="1.4% vs anterior" positive={false} sub="últimos 7 días" />
            <KpiCard label="clientes activos"     value="3.240"  delta="2.1% vs anterior" positive sub="últimos 7 días" />
          </div>
          <div style={{ display: "flex", gap: 4, marginBottom: 14, flexWrap: "wrap" }}>
            {STATUS_FILTERS.map(s => (
              <div key={s} onClick={() => setStatusFilter(s)} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, textTransform: "lowercase", background: statusFilter === s ? "var(--tc-ink)" : "var(--tc-card)", color: statusFilter === s ? "#fff" : "var(--tc-soft)", border: `1px solid ${statusFilter === s ? "var(--tc-ink)" : "var(--tc-border)"}`, cursor: "pointer" }}>{s}</div>
            ))}
          </div>
          {selRows.length > 0 && (
            <div style={{ background: "var(--tc-ink)", color: "#fff", borderRadius: 10, padding: "10px 18px", display: "flex", alignItems: "center", gap: 16, marginBottom: 12, fontSize: 12.5 }}>
              <span style={{ fontWeight: 600 }}>{selRows.length} seleccionadas</span>
              <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
                {["↓ exportar","✎ editar"].map(a => <button key={a} style={{ background: "rgba(255,255,255,0.12)", color: "#fff", fontSize: 12, padding: "5px 12px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "inherit" }}>{a}</button>)}
                <button style={{ background: "rgba(181,82,74,0.6)", color: "#fff", fontSize: 12, padding: "5px 12px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "inherit" }}>✕ eliminar</button>
                <button onClick={() => setSelRows([])} style={{ background: "transparent", color: "rgba(255,255,255,0.5)", fontSize: 14, padding: "5px 8px", border: "none", cursor: "pointer", fontFamily: "inherit" }}>✕</button>
              </div>
            </div>
          )}
          <div style={{ background: "var(--tc-card)", border: `1px solid var(--tc-border)`, borderRadius: 14, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "36px 2fr 1.2fr 1fr 1fr 80px 110px 32px", padding: "11px 18px", fontSize: 10.5, color: "var(--tc-soft)", letterSpacing: "0.06em", borderBottom: `1px solid var(--tc-border)`, textTransform: "lowercase" }}>
              {["","nombre","id y fecha","precio base","precio venta","stock","estado",""].map((h,i) => <span key={i}>{h}</span>)}
            </div>
            {filtered.map((r, i) => {
              const sel = selRows.includes(r.id);
              return (
                <div key={r.id} onClick={() => toggle(r.id)} style={{ display: "grid", gridTemplateColumns: "36px 2fr 1.2fr 1fr 1fr 80px 110px 32px", padding: "12px 18px", alignItems: "center", borderBottom: i < filtered.length - 1 ? `1px solid var(--tc-border)` : "none", fontSize: 13, background: sel ? "rgba(216,145,73,0.05)" : "var(--tc-card)", cursor: "pointer" }}>
                  <input type="checkbox" readOnly checked={sel} onChange={() => toggle(r.id)} style={{ accentColor: C.copper }} onClick={e => e.stopPropagation()} />
                  <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 8, background: r.img, flexShrink: 0 }} />
                    <span><div style={{ fontSize: 13.5, fontWeight: 500 }}>{r.name}</div><div style={{ fontSize: 11, color: "var(--tc-soft)", marginTop: 1 }}>{r.sub}</div></span>
                  </span>
                  <span style={{ fontSize: 11.5, color: "var(--tc-soft)" }}><div>{r.id}</div><div style={{ marginTop: 2 }}>{r.date}</div></span>
                  <span style={{ fontWeight: 500 }}>{fmt(r.price)}</span>
                  <span style={{ fontSize: 12, color: "var(--tc-soft)" }}>{fmt(r.sell)}</span>
                  <span style={{ fontFamily: "monospace", fontSize: 13 }}>{r.stock}</span>
                  <Chip text={r.status} tone={r.sTone} />
                  <span style={{ fontSize: 14, color: "var(--tc-soft)", textAlign: "center" }}>⋯</span>
                </div>
              );
            })}
            <Pagination page={1} total={filtered.length * 6} perPage={5} />
          </div>
        </div>
      )}

      {/* ── VISTA CLIENTE ─────────────────────────────────────────────── */}
      {tab === "vista cliente" && (
        <div>
          <div style={{ fontSize: 12.5, color: "var(--tc-soft)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ background: C.amberBg, color: C.amber, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>vista previa</span>
            así ve esta página tu cliente cuando recibe el link de cotización.
          </div>
          {/* simulated client page */}
          <div style={{ background: "#FAFAF8", border: `1px solid var(--tc-border)`, borderRadius: 16, overflow: "hidden" }}>
            {/* header del cliente */}
            <div style={{ background: config.primaryColor, padding: "24px 32px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#fff" }}>{config.logoText}</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{config.brandName}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>{config.tagline}</div>
              </div>
            </div>
            <div style={{ padding: "32px 32px 40px" }}>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <h2 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 8px", color: "var(--tc-ink)" }}>elegí tu plan</h2>
                <p style={{ fontSize: 14, color: "var(--tc-soft)", margin: 0 }}>todos los planes incluyen onboarding y soporte en los primeros 30 días</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${PLAN_PUBLISHED.length},1fr)`, gap: 16 }}>
                {PLAN_PUBLISHED.map((plan, i) => {
                  const featured = i === Math.floor(PLAN_PUBLISHED.length / 2);
                  return (
                    <div key={plan.id} style={{ background: featured ? config.primaryColor : "var(--tc-card)", border: `2px solid ${featured ? config.primaryColor : "var(--tc-border)"}`, borderRadius: 14, padding: "24px 20px", position: "relative" }}>
                      {featured && (
                        <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--tc-ink)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 12px", borderRadius: 20, textTransform: "lowercase", whiteSpace: "nowrap" }}>más popular</div>
                      )}
                      <div style={{ fontSize: 13, fontWeight: 600, textTransform: "lowercase", color: featured ? "rgba(255,255,255,0.8)" : "var(--tc-soft)", marginBottom: 6 }}>{plan.sub}</div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: featured ? "#fff" : "var(--tc-ink)", marginBottom: 4 }}>{fmt(plan.sell)}</div>
                      <div style={{ fontSize: 11, color: featured ? "rgba(255,255,255,0.7)" : "var(--tc-soft)", marginBottom: 20 }}>{config.currency} · pago único</div>
                      {config.showDiscount && (
                        <div style={{ fontSize: 11, color: featured ? "rgba(255,255,255,0.7)" : "var(--tc-soft)", marginBottom: 16, textDecoration: "line-through" }}>{fmt(plan.price)}</div>
                      )}
                      <div style={{ fontSize: 13, fontWeight: 600, color: featured ? "#fff" : "var(--tc-ink)", marginBottom: 12 }}>{plan.name}</div>
                      <button style={{ width: "100%", background: featured ? "rgba(255,255,255,0.2)" : config.primaryColor, color: featured ? "#fff" : C.steel, border: featured ? "1px solid rgba(255,255,255,0.3)" : "none", borderRadius: 8, padding: "10px 0", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", textTransform: "lowercase" }}>
                        quiero este plan
                      </button>
                    </div>
                  );
                })}
              </div>
              <div style={{ textAlign: "center", marginTop: 24, fontSize: 12.5, color: "var(--tc-soft)" }}>
                ¿tenés dudas? <span style={{ color: config.primaryColor, fontWeight: 600, cursor: "pointer" }}>escribinos</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CONFIGURAR ────────────────────────────────────────────────── */}
      {tab === "configurar" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <div style={{ background: "var(--tc-card)", border: `1px solid var(--tc-border)`, borderRadius: 14, padding: 22, marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, textTransform: "lowercase" }}>identidad de marca</div>
              <div style={{ display: "grid", gap: 14 }}>
                {[
                  { label: "nombre de tu empresa", key: "brandName", value: config.brandName },
                  { label: "texto del logo",        key: "logoText",  value: config.logoText  },
                  { label: "tagline / bajada",       key: "tagline",   value: config.tagline   },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ fontSize: 11.5, color: "var(--tc-soft)", display: "block", marginBottom: 5, textTransform: "lowercase" }}>{field.label}</label>
                    <input value={field.value} onChange={e => setConfig(p => ({ ...p, [field.key]: e.target.value }))}
                      style={{ width: "100%", background: "var(--tc-sub)", border: `1px solid var(--tc-border)`, borderRadius: 8, padding: "9px 12px", fontSize: 13, color: "var(--tc-ink)", fontFamily: "inherit", outline: "none" }} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "var(--tc-card)", border: `1px solid var(--tc-border)`, borderRadius: 14, padding: 22 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, textTransform: "lowercase" }}>opciones de visualización</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid var(--tc-border)` }}>
                <div>
                  <div style={{ fontSize: 13 }}>mostrar precio tachado</div>
                  <div style={{ fontSize: 11.5, color: "var(--tc-soft)", marginTop: 2 }}>muestra el precio base comparativo</div>
                </div>
                <div onClick={() => setConfig(p => ({ ...p, showDiscount: !p.showDiscount }))}
                  style={{ width: 40, height: 22, borderRadius: 20, background: config.showDiscount ? C.green : "var(--tc-border)", cursor: "pointer", position: "relative", transition: "background 200ms" }}>
                  <div style={{ position: "absolute", top: 3, left: config.showDiscount ? 21 : 3, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left 200ms" }} />
                </div>
              </div>
              <div style={{ padding: "14px 0 0" }}>
                <div style={{ fontSize: 12, color: "var(--tc-soft)", marginBottom: 8 }}>color principal</div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {[C.copper,"#3E6FA8","#3E8460","#6B5B95","#B5524A","#1C1E22"].map(color => (
                    <div key={color} onClick={() => setConfig(p => ({ ...p, primaryColor: color }))}
                      style={{ width: 28, height: 28, borderRadius: "50%", background: color, cursor: "pointer", border: config.primaryColor === color ? `3px solid var(--tc-ink)` : `2px solid var(--tc-border)`, boxSizing: "border-box" }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* preview lateral */}
          <div style={{ background: "var(--tc-card)", border: `1px solid var(--tc-border)`, borderRadius: 14, overflow: "hidden" }}>
            <div style={{ background: config.primaryColor, padding: "18px 20px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>{config.logoText}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{config.brandName}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", marginTop: 1 }}>{config.tagline}</div>
              </div>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--tc-ink)", marginBottom: 16, textAlign: "center" }}>elegí tu plan</div>
              <div style={{ display: "grid", gap: 10 }}>
                {PLAN_PUBLISHED.map((plan, i) => {
                  const featured = i === Math.floor(PLAN_PUBLISHED.length / 2);
                  return (
                    <div key={plan.id} style={{ background: featured ? config.primaryColor : "var(--tc-sub)", borderRadius: 10, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: featured ? "#fff" : "var(--tc-ink)" }}>{plan.name}</div>
                        <div style={{ fontSize: 11, color: featured ? "rgba(255,255,255,0.7)" : "var(--tc-soft)" }}>{plan.sub}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        {config.showDiscount && <div style={{ fontSize: 10, color: featured ? "rgba(255,255,255,0.6)" : "var(--tc-soft)", textDecoration: "line-through" }}>{fmt(plan.price)}</div>}
                        <div style={{ fontSize: 14, fontWeight: 700, color: featured ? "#fff" : "var(--tc-ink)" }}>{fmt(plan.sell)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button style={{ width: "100%", background: config.primaryColor, color: "#fff", border: "none", borderRadius: 8, padding: "10px 0", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", textTransform: "lowercase", marginTop: 14 }}>
                ver cotización completa →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
