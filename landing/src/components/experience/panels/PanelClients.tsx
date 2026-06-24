"use client";
import { useState } from "react";
import { C } from "../constants";
import { Chip, KpiCard, PanelTitle, GhostBtn, PrimaryBtn, Pagination } from "../primitives";

const PRODUCTS = [
  { id: "#KMI662266", name: "cotización básica",    sub: "módulo operaciones", date: "01 ene 2024", price: "$480.000", sell: "$504.000", stock: 120, status: "publicada",  sTone: "green", img: "#E2EAF2" },
  { id: "#KMI662211", name: "cotización completa",  sub: "módulo finanzas",    date: "01 ene 2024", price: "$360.000", sell: "$378.000", stock: 10,  status: "inactiva",   sTone: "gray",  img: "#F1E7D3" },
  { id: "#KMI662199", name: "cotización premium",   sub: "todos los módulos",  date: "01 ene 2024", price: "$720.000", sell: "$756.000", stock: 120, status: "publicada",  sTone: "green", img: "#E3EFE6" },
  { id: "#KMI662188", name: "cotización stock",     sub: "módulo stock",       date: "01 ene 2024", price: "$320.000", sell: "$336.000", stock: 50,  status: "sin stock",  sTone: "amber", img: "#F3E3E0" },
  { id: "#KMI662177", name: "cotización starter",   sub: "módulo operaciones", date: "01 ene 2024", price: "$240.000", sell: "$252.000", stock: 80,  status: "borrador",   sTone: "gray",  img: "#E9E5F0" },
];

const STATUS_FILTERS = ["todos", "publicada", "inactiva", "borrador", "sin stock"];

export function PanelClients() {
  const [selRows, setSelRows] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("todos");
  const toggle = (id: string) => setSelRows(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const filtered = PRODUCTS.filter(r => statusFilter === "todos" || r.status === statusFilter);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
        <PanelTitle sub="lo mismo que estuviste usando recién, listo para ofrecerle a tus propios clientes.">cotizador para tus clientes</PanelTitle>
        <div style={{ display: "flex", gap: 8 }}><GhostBtn>exportar</GhostBtn><PrimaryBtn>+ nueva cotización</PrimaryBtn></div>
      </div>

      <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
        <KpiCard label="cotizaciones totales" value="1.248" delta="4.2% vs anterior" positive sub="últimos 7 días" />
        <KpiCard label="monto total"          value="$84.320" delta="12.5% vs anterior" positive sub="últimos 7 días" />
        <KpiCard label="enviadas"             value="142"  delta="1.4% vs anterior" positive={false} sub="últimos 7 días" />
        <KpiCard label="clientes activos"     value="3.240" delta="2.1% vs anterior" positive sub="últimos 7 días" />
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 14, flexWrap: "wrap" }}>
        {STATUS_FILTERS.map(s => (
          <div key={s} onClick={() => setStatusFilter(s)} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, textTransform: "lowercase", background: statusFilter === s ? C.panelInk : C.panelSurface, color: statusFilter === s ? "#fff" : C.gray, border: `1px solid ${statusFilter === s ? C.panelInk : C.panelLine}`, cursor: "pointer" }}>
            {s}
          </div>
        ))}
      </div>

      {selRows.length > 0 && (
        <div style={{ background: C.panelInk, color: "#fff", borderRadius: 10, padding: "10px 18px", display: "flex", alignItems: "center", gap: 16, marginBottom: 12, fontSize: 12.5 }}>
          <span style={{ fontWeight: 600 }}>{selRows.length} seleccionadas</span>
          <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
            {["↓ exportar","✎ editar info"].map(a => <button key={a} style={{ background: "rgba(255,255,255,0.12)", color: "#fff", fontSize: 12, padding: "5px 12px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "inherit" }}>{a}</button>)}
            <button style={{ background: "rgba(181,82,74,0.6)", color: "#fff", fontSize: 12, padding: "5px 12px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "inherit" }}>✕ eliminar</button>
            <button onClick={() => setSelRows([])} style={{ background: "transparent", color: "rgba(255,255,255,0.5)", fontSize: 14, padding: "5px 8px", border: "none", cursor: "pointer", fontFamily: "inherit" }}>✕</button>
          </div>
        </div>
      )}

      <div style={{ background: C.panelSurface, border: `1px solid ${C.panelLine}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "36px 2fr 1.2fr 1fr 1fr 80px 110px 32px", padding: "11px 18px", fontSize: 10.5, color: C.gray, letterSpacing: "0.06em", borderBottom: `1px solid ${C.panelLine}`, textTransform: "lowercase" }}>
          {["","nombre","id y fecha","precio base","precio venta","stock","estado",""].map((h,i) => <span key={i}>{h}</span>)}
        </div>
        {filtered.map((r, i) => {
          const sel = selRows.includes(r.id);
          return (
            <div key={r.id} style={{ display: "grid", gridTemplateColumns: "36px 2fr 1.2fr 1fr 1fr 80px 110px 32px", padding: "12px 18px", alignItems: "center", borderBottom: i < filtered.length - 1 ? `1px solid ${C.panelLine}` : "none", fontSize: 13, background: sel ? "rgba(216,145,73,0.05)" : C.panelSurface, cursor: "pointer" }} onClick={() => toggle(r.id)}>
              <input type="checkbox" readOnly checked={sel} onChange={() => toggle(r.id)} style={{ accentColor: C.copper }} onClick={e => e.stopPropagation()} />
              <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 8, background: r.img, flexShrink: 0 }} />
                <span><div style={{ fontSize: 13.5, fontWeight: 500 }}>{r.name}</div><div style={{ fontSize: 11, color: C.gray, marginTop: 1 }}>{r.sub}</div></span>
              </span>
              <span style={{ fontSize: 11.5, color: C.gray }}><div>{r.id}</div><div style={{ marginTop: 2 }}>{r.date}</div></span>
              <span style={{ fontWeight: 500 }}>{r.price}</span>
              <span style={{ fontSize: 12, color: C.gray }}>{r.sell}</span>
              <span style={{ fontFamily: "monospace", fontSize: 13 }}>{r.stock}</span>
              <Chip text={r.status} tone={r.sTone} />
              <span style={{ fontSize: 14, color: C.gray, textAlign: "center" }}>⋯</span>
            </div>
          );
        })}
        <Pagination page={1} total={filtered.length * 8} perPage={5} />
      </div>
    </div>
  );
}
