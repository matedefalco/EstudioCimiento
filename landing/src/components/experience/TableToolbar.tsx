"use client";
import { useState } from "react";

export interface SortOpt  { id: string; label: string; }
export interface FilterOpt { id: string; label: string; }
export interface ColOpt   { id: string; label: string; }

interface Props {
  sortOptions?:    SortOpt[];
  activeSort?:     string;
  onSort?:         (id: string) => void;
  filterOptions?:  FilterOpt[];
  activeFilters?:  string[];
  onFilter?:       (id: string) => void;
  colOptions?:     ColOpt[];
  visibleCols?:    string[];
  onToggleCol?:    (id: string) => void;
}

export function TableToolbar({ sortOptions, activeSort, onSort, filterOptions, activeFilters = [], onFilter, colOptions, visibleCols = [], onToggleCol }: Props) {
  const [colOpen, setColOpen] = useState(false);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", padding: "10px 0", marginBottom: 8 }}>

      {/* sort */}
      {sortOptions && onSort && (
        <select
          value={activeSort ?? ""}
          onChange={e => onSort(e.target.value)}
          style={{
            background: "var(--tc-card)", border: "1px solid var(--tc-border)", color: "var(--tc-soft)",
            borderRadius: 6, fontSize: 12, padding: "6px 10px", cursor: "pointer",
            fontFamily: "inherit", textTransform: "lowercase", outline: "none",
          }}
        >
          <option value="" disabled>ordenar por</option>
          {sortOptions.map(s => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
      )}

      {/* filter chips */}
      {filterOptions && onFilter && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {filterOptions.map(f => {
            const on = activeFilters.includes(f.id);
            return (
              <button key={f.id} onClick={() => onFilter(f.id)} style={{
                background: on ? "color-mix(in srgb, var(--tc-accent) 18%, transparent)" : "var(--tc-card)",
                border: `1px solid ${on ? "var(--tc-accent)" : "var(--tc-border)"}`,
                color: on ? "var(--tc-accent)" : "var(--tc-soft)",
                borderRadius: 20, fontSize: 11.5, padding: "4px 12px",
                cursor: "pointer", fontFamily: "inherit", textTransform: "lowercase",
                transition: "all 160ms",
              }}>
                {f.label}
              </button>
            );
          })}
        </div>
      )}

      <div style={{ flex: 1 }} />

      {/* columns selector */}
      {colOptions && onToggleCol && (
        <div style={{ position: "relative" }}>
          <button onClick={() => setColOpen(o => !o)} style={{
            background: "var(--tc-card)", border: "1px solid var(--tc-border)", color: "var(--tc-soft)",
            borderRadius: 6, fontSize: 12, padding: "6px 12px", cursor: "pointer",
            fontFamily: "inherit", textTransform: "lowercase", display: "flex", alignItems: "center", gap: 5,
          }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <rect x="2" y="2" width="5" height="12" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/>
            </svg>
            propiedades
          </button>

          {colOpen && (
            <>
              <div style={{ position: "fixed", inset: 0, zIndex: 9 }} onClick={() => setColOpen(false)} />
              <div style={{
                position: "absolute", right: 0, top: "calc(100% + 4px)", zIndex: 10,
                background: "var(--tc-card)", border: "1px solid var(--tc-border)",
                borderRadius: 10, padding: "8px 0", minWidth: 180,
                boxShadow: "var(--tc-shadow, 0 4px 20px rgba(0,0,0,0.15))",
              }}>
                <div style={{ fontSize: 10.5, color: "var(--tc-soft)", letterSpacing: "0.1em", padding: "4px 14px 8px", textTransform: "lowercase" }}>
                  columnas visibles
                </div>
                {colOptions.map(c => {
                  const visible = visibleCols.includes(c.id);
                  return (
                    <div key={c.id} onClick={() => onToggleCol(c.id)}
                      style={{
                        display: "flex", alignItems: "center", gap: 10, padding: "8px 14px",
                        cursor: "pointer", fontSize: 12.5, color: "var(--tc-ink)",
                        background: "transparent", transition: "background 120ms",
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "var(--tc-sub)"}
                      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "transparent"}
                    >
                      <div style={{
                        width: 16, height: 16, border: `1.5px solid ${visible ? "var(--tc-accent)" : "var(--tc-border)"}`,
                        borderRadius: 4, background: visible ? "var(--tc-accent)" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}>
                        {visible && <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="var(--tc-accent-fg)" strokeWidth="2.2" strokeLinecap="round"><path d="M2 6l3 3 5-5"/></svg>}
                      </div>
                      {c.label}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
