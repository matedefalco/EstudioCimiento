"use client";
import { useState, useMemo } from "react";
import { C } from "../constants";
import { Chip, Avatar, AvatarGroup, KpiCard, PanelTitle, SubTabs, PrimaryBtn, Pagination } from "../primitives";
import { TableToolbar } from "../TableToolbar";
import { useIsMobile } from "@/hooks/useIsMobile";

// ── datos de pipeline ──────────────────────────────────────────────────────────

const PIPELINE = [
  {
    name: "prospecto",
    dot: C.purple,
    tone: "purple",
    count: 12,
    cards: [
      { lead: "Florencia Ríos",     origen: "instagram", valor: 180000,  asignado: "GV", status: "sin contacto", sTone: "purple" },
      { lead: "Agencia Naranja",    origen: "referido",  valor: 420000,  asignado: "MJ", status: "sin contacto", sTone: "purple" },
      { lead: "Tomás Garmendia",    origen: "web",       valor: 95000,   asignado: "GV", status: "sin contacto", sTone: "purple" },
    ],
  },
  {
    name: "contactado",
    dot: C.blue,
    tone: "blue",
    count: 8,
    cards: [
      { lead: "Estudio Bruna",      origen: "linkedin",  valor: 350000,  asignado: "MJ", status: "en diálogo",   sTone: "blue"   },
      { lead: "Luciana Pereyra",    origen: "referido",  valor: 210000,  asignado: "GV", status: "en diálogo",   sTone: "blue"   },
      { lead: "Dev Coworking",      origen: "instagram", valor: 580000,  asignado: "SC", status: "en diálogo",   sTone: "blue"   },
    ],
  },
  {
    name: "propuesta enviada",
    dot: C.amber,
    tone: "amber",
    count: 5,
    cards: [
      { lead: "Marcos Villalba",    origen: "referido",  valor: 270000,  asignado: "SC", status: "esperando",    sTone: "amber"  },
      { lead: "Canela Studio",      origen: "web",       valor: 460000,  asignado: "MJ", status: "esperando",    sTone: "amber"  },
    ],
  },
  {
    name: "cerrado",
    dot: C.green,
    tone: "green",
    count: 3,
    cards: [
      { lead: "Julián Acosta",      origen: "referido",  valor: 320000,  asignado: "GV", status: "ganado",       sTone: "green"  },
      { lead: "Diseñadora Paula",   origen: "instagram", valor: 155000,  asignado: "SC", status: "ganado",       sTone: "green"  },
      { lead: "Colectivo Kite",     origen: "linkedin",  valor: 490000,  asignado: "MJ", status: "ganado",       sTone: "green"  },
    ],
  },
];

// ── datos de contactos ─────────────────────────────────────────────────────────

const CONTACTOS = [
  { nombre: "Florencia Ríos",   empresa: "freelance",          ultimo: "20 jun 2025", canal: "whatsapp", estado: "activo",     eTone: "green"  },
  { nombre: "Agencia Naranja",  empresa: "agencia de diseño",  ultimo: "18 jun 2025", canal: "email",    estado: "sin respuesta", eTone: "amber" },
  { nombre: "Tomás Garmendia",  empresa: "consultor ind.",     ultimo: "15 jun 2025", canal: "whatsapp", estado: "nuevo",      eTone: "blue"   },
  { nombre: "Estudio Bruna",    empresa: "estudio de marca",   ultimo: "22 jun 2025", canal: "email",    estado: "activo",     eTone: "green"  },
  { nombre: "Luciana Pereyra",  empresa: "freelance",          ultimo: "19 jun 2025", canal: "linkedin", estado: "activo",     eTone: "green"  },
  { nombre: "Dev Coworking",    empresa: "espacio cowork",     ultimo: "17 jun 2025", canal: "email",    estado: "en proceso", eTone: "blue"   },
  { nombre: "Marcos Villalba",  empresa: "emprendedor",        ultimo: "21 jun 2025", canal: "whatsapp", estado: "esperando",  eTone: "amber"  },
  { nombre: "Canela Studio",    empresa: "agencia creativa",   ultimo: "23 jun 2025", canal: "email",    estado: "esperando",  eTone: "amber"  },
];

const CANAL_ICON: Record<string, string> = {
  whatsapp: "💬",
  email:    "✉",
  linkedin: "in",
};

function fmtPeso(n: number) {
  return "$" + n.toLocaleString("es-AR");
}

// ── panel principal ────────────────────────────────────────────────────────────

const CRM_SORT_OPTS = [
  { id: "nombre",  label: "nombre"          },
  { id: "ultimo",  label: "último contacto" },
  { id: "estado",  label: "estado"          },
  { id: "canal",   label: "canal"           },
];
const CRM_FILTER_OPTS = [
  { id: "activo",       label: "activo"       },
  { id: "en proceso",   label: "en proceso"   },
  { id: "esperando",    label: "esperando"    },
  { id: "sin respuesta",label: "sin respuesta"},
  { id: "nuevo",        label: "nuevo"        },
];
const CRM_COL_OPTS = [
  { id: "empresa", label: "empresa"          },
  { id: "ultimo",  label: "último contacto"  },
  { id: "canal",   label: "canal"            },
  { id: "estado",  label: "estado"           },
];

export function PanelCRM() {
  const isMobile = useIsMobile();
  const [tab, setTab] = useState("pipeline");
  const [sortBy, setSortBy] = useState("nombre");
  const [filters, setFilters] = useState<string[]>([]);
  const [visibleCols, setVisibleCols] = useState(CRM_COL_OPTS.map(c => c.id));
  const toggleFilter = (id: string) => setFilters(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  const toggleCol = (id: string) => setVisibleCols(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id]);

  const filteredContacts = useMemo(() => {
    let rows = [...CONTACTOS];
    if (filters.length > 0) rows = rows.filter(r => filters.includes(r.estado));
    rows.sort((a, b) => {
      if (sortBy === "ultimo") return b.ultimo.localeCompare(a.ultimo);
      if (sortBy === "estado") return a.estado.localeCompare(b.estado);
      if (sortBy === "canal")  return a.canal.localeCompare(b.canal);
      return a.nombre.localeCompare(b.nombre);
    });
    return rows;
  }, [sortBy, filters]);

  return (
    <div>
      {/* header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <PanelTitle sub="tu pipeline y tus clientes, en un solo lugar.">crm</PanelTitle>
        <PrimaryBtn>+ nuevo contacto</PrimaryBtn>
      </div>

      {/* kpis */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <KpiCard label="leads activos"      value="25"           sub="en seguimiento activo" />
        <KpiCard label="valor del pipeline" value="$4.850.000"   sub="suma de oportunidades abiertas" />
        <KpiCard label="tasa de cierre"     value="38%"          delta="4% vs. mes anterior" positive />
        <KpiCard label="en seguimiento"     value="8"            sub="requieren acción esta semana" />
      </div>

      {/* tabs */}
      <SubTabs items={["pipeline", "contactos"]} active={tab} onChange={setTab} />

      {/* ── PIPELINE (kanban) ────────────────────────────────────────────── */}
      {tab === "pipeline" && (
        <div style={{ display: isMobile ? "flex" : "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, overflowX: isMobile ? "auto" : "visible", paddingBottom: isMobile ? 8 : 0 }}>
          {PIPELINE.map(col => (
            <div key={col.name} style={isMobile ? { minWidth: 210, flexShrink: 0 } : {}}>
              {/* encabezado de columna */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, paddingBottom: 8, borderBottom: `2px solid ${col.dot}` }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: col.dot, display: "inline-block" }} />
                <span style={{ fontSize: 12, fontWeight: 600, textTransform: "lowercase" }}>{col.name}</span>
                <span style={{ fontSize: 10.5, color: "var(--tc-soft)", background: "var(--tc-border)", borderRadius: 10, padding: "1px 6px", marginLeft: "auto" }}>{col.count}</span>
              </div>

              {/* cards */}
              <div style={{ display: "grid", gap: 10 }}>
                {col.cards.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      background: "var(--tc-card)",
                      border: `1px solid var(--tc-border)`,
                      borderRadius: 12,
                      padding: "13px 14px",
                      borderLeft: `3px solid ${col.dot}`,
                    }}
                  >
                    {/* chip de estado */}
                    <div style={{ marginBottom: 8 }}>
                      <Chip text={c.status} tone={c.sTone} />
                    </div>

                    {/* nombre del lead */}
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3, lineHeight: 1.3 }}>{c.lead}</div>

                    {/* origen */}
                    <div style={{ fontSize: 11, color: "var(--tc-soft)", marginBottom: 10, textTransform: "lowercase" }}>
                      origen: {c.origen}
                    </div>

                    {/* valor + avatar */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: `1px solid var(--tc-border)` }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--tc-ink)" }}>{fmtPeso(c.valor)}</span>
                      <Avatar initials={c.asignado} idx={i} size={24} />
                    </div>
                  </div>
                ))}

                {/* add card ghost */}
                <div style={{ border: `1.5px dashed var(--tc-border)`, borderRadius: 12, padding: "10px 14px", fontSize: 12, color: "var(--tc-soft)", cursor: "pointer", textAlign: "center" }}>
                  + agregar lead
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── CONTACTOS (tabla) ────────────────────────────────────────────── */}
      {tab === "contactos" && (
        <div>
          <TableToolbar
            sortOptions={CRM_SORT_OPTS} activeSort={sortBy} onSort={setSortBy}
            filterOptions={CRM_FILTER_OPTS} activeFilters={filters} onFilter={toggleFilter}
            colOptions={CRM_COL_OPTS} visibleCols={visibleCols} onToggleCol={toggleCol}
          />
          <div style={{ background: "var(--tc-card)", border: `1px solid var(--tc-border)`, borderRadius: 14, overflow: "hidden" }}>
            {!isMobile && (
              <div style={{
                display: "grid",
                gridTemplateColumns: `1.4fr ${visibleCols.includes("empresa") ? "1.4fr" : ""} ${visibleCols.includes("ultimo") ? "130px" : ""} ${visibleCols.includes("canal") ? "100px" : ""} ${visibleCols.includes("estado") ? "110px" : ""}`.trim(),
                padding: "10px 18px", fontSize: 10.5, color: "var(--tc-soft)",
                letterSpacing: "0.06em", textTransform: "lowercase", borderBottom: `1px solid var(--tc-border)`,
              }}>
                <span>nombre</span>
                {visibleCols.includes("empresa") && <span>empresa</span>}
                {visibleCols.includes("ultimo")  && <span>último contacto</span>}
                {visibleCols.includes("canal")   && <span>canal</span>}
                {visibleCols.includes("estado")  && <span>estado</span>}
              </div>
            )}

            {filteredContacts.map((r, i) => {
              const border = i < filteredContacts.length - 1 ? `1px solid var(--tc-border)` : "none";
              if (isMobile) return (
                <div key={i} style={{ padding: "14px 16px", borderBottom: border }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <Avatar initials={r.nombre.slice(0, 2).toUpperCase()} idx={i} size={28} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{r.nombre}</div>
                      {visibleCols.includes("empresa") && <div style={{ fontSize: 11.5, color: "var(--tc-soft)", marginTop: 1 }}>{r.empresa}</div>}
                    </div>
                    {visibleCols.includes("estado") && <Chip text={r.estado} tone={r.eTone} />}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--tc-soft)" }}>
                    {visibleCols.includes("ultimo") && <span>{r.ultimo}</span>}
                    {visibleCols.includes("canal") && <div style={{ display: "flex", alignItems: "center", gap: 4 }}><span>{CANAL_ICON[r.canal]}</span><span>{r.canal}</span></div>}
                  </div>
                </div>
              );
              return (
                <div key={i} style={{
                  display: "grid",
                  gridTemplateColumns: `1.4fr ${visibleCols.includes("empresa") ? "1.4fr" : ""} ${visibleCols.includes("ultimo") ? "130px" : ""} ${visibleCols.includes("canal") ? "100px" : ""} ${visibleCols.includes("estado") ? "110px" : ""}`.trim(),
                  padding: "12px 18px", alignItems: "center", borderBottom: border, fontSize: 12.5, cursor: "pointer", transition: "background 120ms",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--tc-sub)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <Avatar initials={r.nombre.slice(0, 2).toUpperCase()} idx={i} size={26} />
                    <span style={{ fontWeight: 500 }}>{r.nombre}</span>
                  </div>
                  {visibleCols.includes("empresa") && <span style={{ fontSize: 12, color: "var(--tc-soft)" }}>{r.empresa}</span>}
                  {visibleCols.includes("ultimo")  && <span style={{ fontSize: 12, color: "var(--tc-soft)" }}>{r.ultimo}</span>}
                  {visibleCols.includes("canal")   && <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12 }}><span style={{ fontSize: 13 }}>{CANAL_ICON[r.canal]}</span><span style={{ color: "var(--tc-soft)" }}>{r.canal}</span></div>}
                  {visibleCols.includes("estado")  && <Chip text={r.estado} tone={r.eTone} />}
                </div>
              );
            })}
            <Pagination page={1} total={CONTACTOS.length} perPage={8} />
          </div>
        </div>
      )}
    </div>
  );
}
