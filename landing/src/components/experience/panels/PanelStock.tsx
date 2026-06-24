"use client";
import { useState } from "react";
import { C, STOCK_ITEMS } from "../constants";
import { Chip, KpiCard, PanelTitle, GhostBtn, PrimaryBtn, InfoRow, ProgressBar, Pagination, SubTabs, EmptyState } from "../primitives";

type Item = typeof STOCK_ITEMS[0];

export function PanelStock() {
  const [tab, setTab] = useState("inventario");
  const [openId, setOpenId] = useState<string | null>(null);
  const open = STOCK_ITEMS.find(r => r.id === openId);

  if (open) return <StockDetail item={open} onBack={() => setOpenId(null)} />;

  const alertItems = STOCK_ITEMS.filter(r => r.status !== "activo");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <PanelTitle sub="qué tenés y qué se está terminando, antes de que falte.">stock</PanelTitle>
        <div style={{ display: "flex", gap: 8 }}><GhostBtn>exportar</GhostBtn><PrimaryBtn>+ agregar ítem</PrimaryBtn></div>
      </div>

      <div style={{ display: "flex", gap: 14, marginBottom: 8, flexWrap: "wrap" }}>
        <KpiCard label="ítems totales"  value="5"     delta="2 esta semana" positive />
        <KpiCard label="valor en stock" value="$1.1M" delta="4% vs anterior" positive />
        <KpiCard label="bajo mínimo"    value="2"     delta="atención" positive={false} />
        <KpiCard label="depósitos"      value="3"     sub="activos" />
      </div>

      <SubTabs items={["inventario","por depósito","alertas"]} active={tab} onChange={setTab} />

      {/* ── INVENTARIO ────────────────────────────────────────────────── */}
      {tab === "inventario" && (
        <div style={{ background: C.panelSurface, border: `1px solid ${C.panelLine}`, borderRadius: 14, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "36px 2fr 1fr 90px 90px 120px", padding: "11px 18px", fontSize: 10.5, color: C.gray, letterSpacing: "0.06em", borderBottom: `1px solid ${C.panelLine}`, textTransform: "lowercase" }}>
            {["","ítem","id y fecha","precio","stock","estado"].map((h,i) => <span key={i}>{h}</span>)}
          </div>
          {STOCK_ITEMS.map((r, i) => (
            <div key={r.id} onClick={() => setOpenId(r.id)}
              style={{ display: "grid", gridTemplateColumns: "36px 2fr 1fr 90px 90px 120px", padding: "12px 18px", alignItems: "center", borderBottom: i < STOCK_ITEMS.length - 1 ? `1px solid ${C.panelLine}` : "none", fontSize: 13, cursor: "pointer", background: C.panelSurface, transition: "background 150ms" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = C.panelBg; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = C.panelSurface; }}>
              <input type="checkbox" readOnly onClick={e => e.stopPropagation()} />
              <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 8, background: r.color, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "rgba(0,0,0,0.25)" }}>{r.name[0]}</div>
                <span><div style={{ fontSize: 13.5, fontWeight: 500 }}>{r.name}</div><div style={{ fontSize: 11, color: C.gray, marginTop: 1 }}>{r.cat}</div></span>
              </span>
              <span style={{ color: C.gray, fontSize: 11.5 }}><div>{r.id}</div><div style={{ marginTop: 2 }}>{r.date}</div></span>
              <span style={{ fontWeight: 500 }}>{r.price}</span>
              <span style={{ fontWeight: 600, fontFamily: "monospace", fontSize: 14, color: r.tone === "red" ? C.red : C.panelInk }}>{r.qty}</span>
              <Chip text={r.status} tone={r.tone} />
            </div>
          ))}
          <Pagination page={1} total={32} perPage={5} />
        </div>
      )}

      {/* ── POR DEPÓSITO ──────────────────────────────────────────────── */}
      {tab === "por depósito" && (
        <div style={{ display: "grid", gap: 16 }}>
          {["depósito A","depósito B","depósito C"].map(dep => {
            const items = STOCK_ITEMS.map(item => ({
              ...item,
              depQty: item.depots.find(d => d.d === dep)?.q ?? 0,
            })).filter(it => it.depQty > 0);
            const total = items.reduce((s, it) => s + it.depQty, 0);
            return (
              <div key={dep} style={{ background: C.panelSurface, border: `1px solid ${C.panelLine}`, borderRadius: 14, overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: `1px solid ${C.panelLine}` }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, textTransform: "lowercase" }}>{dep}</div>
                    <div style={{ fontSize: 11.5, color: C.gray, marginTop: 2 }}>{items.length} ítem{items.length !== 1 ? "s" : ""} · {total} unidades totales</div>
                  </div>
                  <Chip text="activo" tone="green" />
                </div>
                {items.map((it, i) => (
                  <div key={it.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 100px", padding: "12px 20px", alignItems: "center", borderBottom: i < items.length - 1 ? `1px solid ${C.panelLine}` : "none", fontSize: 13 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 6, background: it.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "rgba(0,0,0,0.25)" }}>{it.name[0]}</div>
                      <span>
                        <div style={{ fontWeight: 500 }}>{it.name}</div>
                        <div style={{ fontSize: 11, color: C.gray }}>{it.cat}</div>
                      </span>
                    </span>
                    <span style={{ color: C.gray, fontSize: 12 }}>{it.id}</span>
                    <span>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontWeight: 700, fontSize: 16 }}>{it.depQty}</span>
                        <span style={{ fontSize: 11, color: C.gray }}>unid.</span>
                      </div>
                      <ProgressBar value={Math.round((it.depQty / it.qty) * 100)} tone={it.tone} />
                    </span>
                    <Chip text={it.status} tone={it.tone} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {/* ── ALERTAS ───────────────────────────────────────────────────── */}
      {tab === "alertas" && (
        <div>
          {alertItems.length === 0
            ? <EmptyState icon="✓" text="todo el stock está en niveles normales" />
            : (
              <div style={{ display: "grid", gap: 12 }}>
                <div style={{ background: C.redBg, border: `1px solid ${C.red}20`, borderRadius: 12, padding: "14px 18px", fontSize: 13, color: C.red }}>
                  ⚠ {alertItems.filter(r => r.status === "bajo mínimo").length} ítem{alertItems.filter(r => r.status === "bajo mínimo").length !== 1 ? "s" : ""} por debajo del mínimo · revisá antes de hacer el próximo pedido.
                </div>
                {alertItems.map(item => {
                  const lowDepot = item.depots.reduce((min, d) => d.q < min.q ? d : min, item.depots[0]);
                  return (
                    <div key={item.id} style={{ background: C.panelSurface, border: `1px solid ${item.tone === "red" ? C.red + "40" : C.amber + "60"}`, borderRadius: 14, padding: 20 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 40, height: 40, borderRadius: 10, background: item.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "rgba(0,0,0,0.25)" }}>{item.name[0]}</div>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</div>
                            <div style={{ fontSize: 11.5, color: C.gray }}>{item.id} · {item.cat}</div>
                          </div>
                        </div>
                        <Chip text={item.status} tone={item.tone} />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                        <div>
                          <div style={{ fontSize: 11, color: C.gray, marginBottom: 4 }}>stock actual</div>
                          <div style={{ fontSize: 22, fontWeight: 700, color: item.tone === "red" ? C.red : C.amber }}>{item.qty}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: C.gray, marginBottom: 4 }}>nivel crítico</div>
                          <div style={{ fontSize: 22, fontWeight: 700 }}>{item.critical}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: C.gray, marginBottom: 4 }}>depósito más bajo</div>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>{lowDepot.d} <span style={{ color: C.red }}>({lowDepot.q})</span></div>
                        </div>
                      </div>
                      <div style={{ marginTop: 14 }}>
                        <ProgressBar value={Math.min(Math.round((item.qty / item.critical) * 100), 100)} tone={item.tone} />
                        <div style={{ fontSize: 11, color: C.gray, marginTop: 4 }}>{item.qty} de {item.critical} unidades mínimas · proveedor: {item.supplier}</div>
                      </div>
                      <div style={{ marginTop: 14 }}>
                        <button style={{ background: C.panelInk, color: "#fff", fontSize: 12, fontWeight: 600, padding: "7px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit", textTransform: "lowercase" }}>contactar proveedor</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          }
        </div>
      )}
    </div>
  );
}

function StockDetail({ item, onBack }: { item: Item; onBack: () => void }) {
  const [tab, setTab] = useState("general");
  const lowDepot = item.depots.reduce((min, d) => d.q < min.q ? d : min, item.depots[0]);
  const historial = [
    { fecha: "10 jun", evento: "entrada de stock",     cant: "+50", usuario: "MS" },
    { fecha: "28 may", evento: "salida por uso",        cant: "-12", usuario: "JR" },
    { fecha: "15 may", evento: "entrada de stock",     cant: "+80", usuario: "MS" },
    { fecha: "03 may", evento: "ajuste de inventario", cant: "-5",  usuario: "LF" },
  ];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.gray, marginBottom: 18, textTransform: "lowercase" }}>
        <span style={{ cursor: "pointer", color: C.blue, textDecoration: "underline" }} onClick={onBack}>stock</span>
        <span>›</span><span>{item.cat}</span><span>›</span><span style={{ color: C.panelInk, fontWeight: 500 }}>{item.name}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, textTransform: "lowercase" }}>{item.name}</h2>
          <div style={{ fontSize: 12.5, color: C.gray, marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>{item.id} · {item.cat} · <Chip text={item.status} tone={item.tone} /></div>
        </div>
        <div style={{ display: "flex", gap: 8 }}><GhostBtn>editar</GhostBtn><GhostBtn danger>eliminar</GhostBtn></div>
      </div>
      <SubTabs items={["general","historial","notas"]} active={tab} onChange={setTab} />
      {tab === "general" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 18, marginBottom: 18 }}>
            <div style={{ background: C.panelSurface, border: `1px solid ${C.panelLine}`, borderRadius: 14, height: 200, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
              <div style={{ width: 72, height: 72, borderRadius: 16, background: item.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 700, color: "rgba(0,0,0,0.25)" }}>{item.name[0]}</div>
              <div style={{ fontSize: 12, color: C.gray }}>imagen del ítem</div>
            </div>
            <div style={{ background: C.panelSurface, border: `1px solid ${C.panelLine}`, borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 11.5, color: C.gray, marginBottom: 6 }}>stock total</div>
              <div style={{ fontSize: 34, fontWeight: 700, marginBottom: 6 }}>{item.qty}</div>
              <Chip text={item.status} tone={item.tone} />
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.panelLine}`, display: "grid", gap: 10 }}>
                {item.depots.map(d => (
                  <div key={d.d} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5 }}>
                    <span style={{ color: C.gray }}>{d.d}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontWeight: 600, color: d.d === lowDepot.d && item.tone !== "green" ? C.red : C.panelInk }}>{d.q}</span>
                      {d.d === lowDepot.d && item.tone !== "green" && <Chip text="bajo" tone="red" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: C.panelSurface, border: `1px solid ${C.panelLine}`, borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14, textTransform: "lowercase" }}>información del proveedor</div>
              <InfoRow k="proveedor" v={item.supplier} /><InfoRow k="fecha de ingreso" v={item.date} /><InfoRow k="precio unitario" v={item.price} />
            </div>
            <div style={{ background: C.panelSurface, border: `1px solid ${C.panelLine}`, borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14, textTransform: "lowercase" }}>nivel crítico</div>
              <InfoRow k="tipo" v="unidades" /><InfoRow k="nivel crítico" v={item.critical} />
              <div style={{ marginTop: 14 }}>
                <ProgressBar value={Math.min(Math.round((item.qty / item.critical / 2) * 100), 100)} tone={item.tone} />
                <div style={{ fontSize: 11, color: C.gray, marginTop: 4 }}>{item.qty} / {item.critical} unidades</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {tab === "historial" && (
        <div style={{ background: C.panelSurface, border: `1px solid ${C.panelLine}`, borderRadius: 14, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "100px 1.4fr 80px 80px", padding: "11px 18px", fontSize: 10.5, color: C.gray, letterSpacing: "0.06em", borderBottom: `1px solid ${C.panelLine}`, textTransform: "lowercase" }}>
            {["fecha","evento","cantidad","usuario"].map((h,i) => <span key={i}>{h}</span>)}
          </div>
          {historial.map((h, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 1.4fr 80px 80px", padding: "12px 18px", alignItems: "center", borderBottom: i < historial.length - 1 ? `1px solid ${C.panelLine}` : "none", fontSize: 13 }}>
              <span style={{ fontSize: 12, color: C.gray }}>{h.fecha}</span>
              <span>{h.evento}</span>
              <span style={{ fontWeight: 600, color: h.cant.startsWith("+") ? C.green : C.red }}>{h.cant}</span>
              <span style={{ fontSize: 11.5 }}>{h.usuario}</span>
            </div>
          ))}
        </div>
      )}
      {tab === "notas" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { fecha: "12 jun", autor: "MS", tone: C.amber, bg: C.amberBg, text: "proveedor confirmó retraso en próxima entrega. revisar stock de respaldo antes del 20." },
            { fecha: "28 may", autor: "JR", tone: C.gray,  bg: C.panelBg, text: "verificado con depósito B: cantidad real es 4 unidades menos que en sistema." },
          ].map((n, i) => (
            <div key={i} style={{ background: n.bg, borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 11.5, color: n.tone, fontWeight: 600, marginBottom: 6 }}>nota · {n.fecha} · {n.autor}</div>
              <div style={{ fontSize: 13, color: C.panelInk, lineHeight: 1.5 }}>{n.text}</div>
            </div>
          ))}
          <button style={{ background: "transparent", border: `1.5px dashed ${C.panelLine}`, borderRadius: 10, padding: "12px 18px", fontSize: 12.5, color: C.gray, cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>+ agregar nota</button>
        </div>
      )}
    </div>
  );
}
