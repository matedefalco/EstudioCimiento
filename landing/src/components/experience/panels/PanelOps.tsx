"use client";
import { useState, useMemo } from "react";
import { C } from "../constants";
import { Chip, AvatarGroup, ProgressBar, PanelTitle, SubTabs, GhostBtn, PrimaryBtn, Pagination, EmptyState } from "../primitives";
import { TableToolbar } from "../TableToolbar";

const GROUPS = [
  { name: "por hacer",   dot: C.purple, tone: "purple", count: 18, items: [
    { id: "P991254-1", t: "alta de cliente nuevo",    proj: "dodo system upgrade",    progress: 0,   status: "sin iniciar", sTone: "purple", priority: "media", pTone: "amber", who: ["MS","JR"], date: "10 jun" },
    { id: "P552714-2", t: "set up autenticación",     proj: "IT compliance review",   progress: 0,   status: "sin iniciar", sTone: "purple", priority: "alta",  pTone: "red",   who: ["LK"],      date: "02 jun" },
    { id: "P882726-3", t: "test API integración",     proj: "email marketing launch", progress: 0,   status: "sin iniciar", sTone: "purple", priority: "baja",  pTone: "blue",  who: ["LK"],      date: "31 may" },
  ]},
  { name: "en curso",    dot: C.amber,  tone: "amber",  count: 32, items: [
    { id: "P883561-1", t: "distribuir encuestas",     proj: "employee wellness week", progress: 80,  status: "en curso",    sTone: "amber",  priority: "media", pTone: "amber", who: ["TT"],      date: "25 may" },
    { id: "P919712-2", t: "sesiones de yoga",         proj: "go healthy!",           progress: 55,  status: "en revisión", sTone: "blue",   priority: "alta",  pTone: "red",   who: ["NR"],      date: "24 may" },
    { id: "P913762-3", t: "coord. speakers externos", proj: "safe work, safe people",progress: 76,  status: "en curso",    sTone: "amber",  priority: "baja",  pTone: "blue",  who: ["LG"],      date: "30 may" },
  ]},
  { name: "en revisión", dot: C.blue,   tone: "blue",   count: 24, items: [
    { id: "P125773-1", t: "checklist onboarding",     proj: "employee onboarding",   progress: 90,  status: "en revisión", sTone: "blue",   priority: "media", pTone: "amber", who: ["AW"],      date: "26 may" },
    { id: "P927572-2", t: "requerimientos mark.",     proj: "social media rocket",   progress: 86,  status: "en revisión", sTone: "blue",   priority: "alta",  pTone: "red",   who: ["LW"],      date: "28 may" },
  ]},
  { name: "completo",    dot: C.green,  tone: "green",  count: 48, items: [
    { id: "P012263-3", t: "poster wellness week",     proj: "willo system revamp",   progress: 100, status: "completo",    sTone: "green",  priority: "media", pTone: "amber", who: ["JT"],      date: "22 may" },
  ]},
];

const PERSONAS = ["MS","JR","LK","TT","NR","LG","AW","LW","JT"];
const PERSONA_NAMES: Record<string,string> = { MS:"Martín S.", JR:"Julia R.", LK:"Lucas K.", TT:"Timmy T.", NR:"Nina R.", LG:"Leo G.", AW:"Amira W.", LW:"Lala W.", JT:"Jesslyn T." };

const OPS_SORT_OPTS = [
  { id: "name",     label: "nombre"     },
  { id: "date",     label: "vencimiento" },
  { id: "progress", label: "progreso"   },
  { id: "priority", label: "prioridad"  },
];
const OPS_FILTER_OPTS = [
  { id: "por hacer",   label: "por hacer"   },
  { id: "en curso",    label: "en curso"    },
  { id: "en revisión", label: "en revisión" },
  { id: "completo",    label: "completo"    },
];
const OPS_COL_OPTS = [
  { id: "id",          label: "id"           },
  { id: "responsable", label: "responsable"  },
  { id: "proyecto",    label: "proyecto"     },
  { id: "progreso",    label: "progreso"     },
  { id: "vence",       label: "vencimiento"  },
  { id: "prioridad",   label: "prioridad"    },
];

export function PanelOps() {
  const [tab, setTab] = useState("tablero");
  const [selRows, setSelRows] = useState<string[]>([]);
  const [filterPersona, setFilterPersona] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("date");
  const [filters, setFilters] = useState<string[]>([]);
  const [visibleCols, setVisibleCols] = useState(OPS_COL_OPTS.map(c => c.id));
  const toggleFilter = (id: string) => setFilters(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  const toggleCol = (id: string) => setVisibleCols(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id]);
  const flatRows = GROUPS.flatMap(g => g.items.map(it => ({ ...it, col: g.name, dot: g.dot, colTone: g.tone })));
  const toggle = (id: string) => setSelRows(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const filteredGroups = useMemo(() => {
    return GROUPS.map(g => ({
      ...g,
      items: filters.length > 0 && !filters.includes(g.name) ? [] : g.items,
    })).filter(g => g.items.length > 0 || filters.length === 0);
  }, [filters]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <PanelTitle sub="tu equipo y vos, mirando lo mismo, en tiempo real.">operaciones</PanelTitle>
        <div style={{ display: "flex", gap: 8 }}>
          <GhostBtn>filtrar</GhostBtn>
          <PrimaryBtn>+ nueva tarea</PrimaryBtn>
        </div>
      </div>

      <SubTabs items={["tablero","lista","por perfil","por etapa"]} active={tab} onChange={setTab} />

      {/* ── TABLERO ───────────────────────────────────────────────────── */}
      {tab === "tablero" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
          {GROUPS.map(col => (
            <div key={col.name}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, paddingBottom: 8, borderBottom: `2px solid ${col.dot}` }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: col.dot, display: "inline-block" }} />
                <span style={{ fontSize: 12, fontWeight: 600, textTransform: "lowercase" }}>{col.name}</span>
                <span style={{ fontSize: 10.5, color: "var(--tc-soft)", background: "var(--tc-border)", borderRadius: 10, padding: "1px 6px", marginLeft: "auto" }}>{col.count}</span>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {col.items.map((it, i) => (
                  <div key={i} style={{ background: "var(--tc-card)", border: `1px solid var(--tc-border)`, borderRadius: 12, padding: "13px 14px", borderLeft: `3px solid ${col.dot}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <Chip text={it.status} tone={it.sTone} />
                      <span style={{ fontSize: 10.5, color: "var(--tc-soft)", fontFamily: "monospace" }}>{it.id}</span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 6, lineHeight: 1.35 }}>{it.t}</div>
                    <div style={{ fontSize: 10.5, color: "var(--tc-soft)", marginBottom: 10 }}>{it.proj}</div>
                    {it.progress > 0 && it.progress < 100 && (
                      <div style={{ marginBottom: 10 }}>
                        <ProgressBar value={it.progress} tone={col.tone} />
                        <span style={{ fontSize: 10, color: "var(--tc-soft)" }}>{it.progress}%</span>
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: `1px solid var(--tc-border)` }}>
                      <AvatarGroup people={it.who} size={22} />
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 10.5, color: "var(--tc-soft)" }}>⚑ {it.date}</span>
                        <Chip text={it.priority} tone={it.pTone} />
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ border: `1.5px dashed var(--tc-border)`, borderRadius: 12, padding: "10px 14px", fontSize: 12, color: "var(--tc-soft)", cursor: "pointer", textAlign: "center" }}>+ agregar tarea</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── LISTA ─────────────────────────────────────────────────────── */}
      {tab === "lista" && (
        <div>
          <TableToolbar
            sortOptions={OPS_SORT_OPTS} activeSort={sortBy} onSort={setSortBy}
            filterOptions={OPS_FILTER_OPTS} activeFilters={filters} onFilter={toggleFilter}
            colOptions={OPS_COL_OPTS} visibleCols={visibleCols} onToggleCol={toggleCol}
          />
          {selRows.length > 0 && (
            <div style={{ background: "var(--tc-ink)", color: "#fff", borderRadius: 10, padding: "10px 18px", display: "flex", alignItems: "center", gap: 16, marginBottom: 12, fontSize: 12.5 }}>
              <span style={{ fontWeight: 600 }}>{selRows.length} seleccionadas</span>
              <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
                {["exportar","editar"].map(a => <button key={a} style={{ background: "rgba(255,255,255,0.12)", color: "#fff", fontSize: 12, padding: "5px 12px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "inherit" }}>{a}</button>)}
                <button style={{ background: "rgba(181,82,74,0.6)", color: "#fff", fontSize: 12, padding: "5px 12px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "inherit" }}>eliminar</button>
                <button onClick={() => setSelRows([])} style={{ background: "transparent", color: "rgba(255,255,255,0.5)", fontSize: 14, padding: "5px 8px", border: "none", cursor: "pointer", fontFamily: "inherit" }}>✕</button>
              </div>
            </div>
          )}
          {filteredGroups.map(g => {
            const colDef = `36px ${visibleCols.includes("id") ? "90px" : ""} 1.6fr ${visibleCols.includes("responsable") ? "1fr" : ""} ${visibleCols.includes("proyecto") ? "1fr" : ""} ${visibleCols.includes("progreso") ? "70px" : ""} ${visibleCols.includes("vence") ? "90px" : ""} ${visibleCols.includes("prioridad") ? "90px" : ""} 32px`.replace(/\s+/g," ").trim();
            return (
            <div key={g.name} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "var(--tc-card)", borderRadius: "12px 12px 0 0", border: `1px solid var(--tc-border)`, borderBottom: "none" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: g.dot, display: "inline-block" }} />
                <span style={{ fontSize: 12.5, fontWeight: 600, textTransform: "lowercase" }}>{g.name}</span>
                <span style={{ fontSize: 11, color: "var(--tc-soft)", background: "var(--tc-border)", borderRadius: 10, padding: "1px 7px" }}>{g.count}</span>
              </div>
              <div style={{ background: "var(--tc-card)", border: `1px solid var(--tc-border)`, borderTop: "none", borderRadius: "0 0 12px 12px", overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: colDef, padding: "10px 18px", fontSize: 10.5, color: "var(--tc-soft)", letterSpacing: "0.06em", borderBottom: `1px solid var(--tc-border)`, textTransform: "lowercase" }}>
                  <span/>
                  {visibleCols.includes("id")          && <span>id</span>}
                  <span>nombre</span>
                  {visibleCols.includes("responsable") && <span>responsable</span>}
                  {visibleCols.includes("proyecto")    && <span>proyecto</span>}
                  {visibleCols.includes("progreso")    && <span>progreso</span>}
                  {visibleCols.includes("vence")       && <span>vence</span>}
                  {visibleCols.includes("prioridad")   && <span>prioridad</span>}
                  <span/>
                </div>
                {g.items.map((r, i) => {
                  const sel = selRows.includes(r.id);
                  return (
                    <div key={i} onClick={() => toggle(r.id)} style={{ display: "grid", gridTemplateColumns: colDef, padding: "11px 18px", alignItems: "center", borderBottom: i < g.items.length - 1 ? `1px solid var(--tc-border)` : "none", fontSize: 12.5, background: sel ? "rgba(216,145,73,0.05)" : "transparent", cursor: "pointer" }}>
                      <input type="checkbox" readOnly checked={sel} onClick={e => e.stopPropagation()} style={{ accentColor: C.copper }} />
                      {visibleCols.includes("id")          && <span style={{ fontSize: 11, color: "var(--tc-soft)", fontFamily: "monospace" }}>{r.id}</span>}
                      <span style={{ fontWeight: 500 }}>{r.t}</span>
                      {visibleCols.includes("responsable") && <AvatarGroup people={r.who} size={24} />}
                      {visibleCols.includes("proyecto")    && <span style={{ fontSize: 11.5, color: "var(--tc-soft)" }}>{r.proj}</span>}
                      {visibleCols.includes("progreso")    && <div style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ flex: 1, height: 4, background: "var(--tc-border)", borderRadius: 20, overflow: "hidden", minWidth: 36 }}><div style={{ width: `${r.progress}%`, height: "100%", background: g.dot, borderRadius: 20 }} /></div><span style={{ fontSize: 10, color: "var(--tc-soft)" }}>{r.progress}%</span></div>}
                      {visibleCols.includes("vence")       && <span style={{ fontSize: 12, color: "var(--tc-soft)" }}>{r.date}</span>}
                      {visibleCols.includes("prioridad")   && <Chip text={r.priority} tone={r.pTone} />}
                      <span style={{ fontSize: 14, color: "var(--tc-soft)", textAlign: "center" }}>⋯</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
          })}
        </div>
      )}

      {/* ── POR PERFIL ────────────────────────────────────────────────── */}
      {tab === "por perfil" && (
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            {PERSONAS.map(p => (
              <div key={p} onClick={() => setFilterPersona(filterPersona === p ? null : p)}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 30, border: `1.5px solid ${filterPersona === p ? "var(--tc-ink)" : "var(--tc-border)"}`, background: filterPersona === p ? "var(--tc-ink)" : "var(--tc-card)", cursor: "pointer", fontSize: 12.5, fontWeight: 600, color: filterPersona === p ? "#fff" : "var(--tc-ink)" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: filterPersona === p ? "rgba(255,255,255,0.2)" : "var(--tc-sub)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{p}</div>
                {PERSONA_NAMES[p]}
              </div>
            ))}
          </div>
          {PERSONAS.filter(p => !filterPersona || p === filterPersona).map(persona => {
            const tasks = flatRows.filter(r => r.who.includes(persona));
            if (tasks.length === 0) return null;
            return (
              <div key={persona} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.copper, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{persona}</div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600 }}>{PERSONA_NAMES[persona]}</div>
                    <div style={{ fontSize: 11.5, color: "var(--tc-soft)" }}>{tasks.length} tarea{tasks.length > 1 ? "s" : ""} asignada{tasks.length > 1 ? "s" : ""}</div>
                  </div>
                </div>
                <div style={{ display: "grid", gap: 8 }}>
                  {tasks.map((r, i) => (
                    <div key={i} style={{ background: "var(--tc-card)", border: `1px solid var(--tc-border)`, borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: r.dot, flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{r.t}</div>
                        <div style={{ fontSize: 11, color: "var(--tc-soft)", marginTop: 2 }}>{r.proj}</div>
                      </div>
                      <Chip text={r.status} tone={r.sTone} />
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 60, height: 4, background: "var(--tc-border)", borderRadius: 20, overflow: "hidden" }}><div style={{ width: `${r.progress}%`, height: "100%", background: r.dot, borderRadius: 20 }} /></div>
                        <span style={{ fontSize: 10.5, color: "var(--tc-soft)" }}>{r.progress}%</span>
                      </div>
                      <span style={{ fontSize: 11.5, color: "var(--tc-soft)" }}>⚑ {r.date}</span>
                      <Chip text={r.priority} tone={r.pTone} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── POR ETAPA ─────────────────────────────────────────────────── */}
      {tab === "por etapa" && (
        <div style={{ display: "grid", gap: 0 }}>
          {GROUPS.map(g => (
            <div key={g.name} style={{ borderLeft: `3px solid ${g.dot}`, marginBottom: 24, paddingLeft: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: g.dot }} />
                <span style={{ fontSize: 14, fontWeight: 600, textTransform: "lowercase" }}>{g.name}</span>
                <span style={{ fontSize: 11.5, color: "var(--tc-soft)" }}>· {g.count} tareas en total</span>
                <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                  {g.items.map(it => it.who).flat().filter((v,i,a)=>a.indexOf(v)===i).map((p,i) => (
                    <div key={p} style={{ width: 24, height: 24, borderRadius: "50%", background: [C.copper,C.blue,C.green,C.purple][i%4], color: "#fff", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{p}</div>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 10 }}>
                {g.items.map((it, i) => (
                  <div key={i} style={{ background: "var(--tc-card)", border: `1px solid var(--tc-border)`, borderRadius: 12, padding: "14px 16px" }}>
                    <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>{it.t}</div>
                    <div style={{ fontSize: 11, color: "var(--tc-soft)", marginBottom: 10 }}>{it.proj}</div>
                    {it.progress > 0 && (
                      <div style={{ marginBottom: 10 }}>
                        <ProgressBar value={it.progress} tone={g.tone} />
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                          <span style={{ fontSize: 10, color: "var(--tc-soft)" }}>progreso</span>
                          <span style={{ fontSize: 10, fontWeight: 600, color: "var(--tc-ink)" }}>{it.progress}%</span>
                        </div>
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <AvatarGroup people={it.who} size={22} />
                      <span style={{ fontSize: 11.5, color: "var(--tc-soft)" }}>⚑ {it.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
