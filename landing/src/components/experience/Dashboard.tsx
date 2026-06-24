"use client";
import { C, SECTION_META } from "./constants";
import { ECSymbol } from "./primitives";
import { PanelResumen } from "./panels/PanelResumen";
import { PanelOps } from "./panels/PanelOps";
import { PanelFin } from "./panels/PanelFin";
import { PanelStock } from "./panels/PanelStock";
import { PanelClients } from "./panels/PanelClients";

interface Props {
  selected: string[];
  activeSection: string;
  setActiveSection: (id: string) => void;
  onReset: () => void;
}

export function Dashboard({ selected, activeSection, setActiveSection, onReset }: Props) {
  const navItems = ["resumen", ...selected];

  return (
    <div className="fade-stage" style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      {/* sidebar */}
      <div style={{ width: 220, background: C.steel, borderRight: `1px solid ${C.line}`, display: "flex", flexDirection: "column", padding: "24px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 18px", marginBottom: 28 }}>
          <ECSymbol size={18} />
          <span style={{ fontSize: 13 }}>estudio <strong style={{ fontWeight: 600 }}>cimiento</strong></span>
        </div>
        <div style={{ padding: "0 18px", marginBottom: 6 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.22em", color: C.grayCold, textTransform: "lowercase" }}>tu sistema</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: "0 10px" }}>
          {navItems.map(id => {
            const meta = SECTION_META[id];
            const on = activeSection === id;
            return (
              <div key={id} onClick={() => setActiveSection(id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 6, background: on ? "rgba(216,145,73,0.14)" : "transparent", color: on ? C.copper : C.cream, cursor: "pointer", transition: "all 160ms ease" }}
                onMouseEnter={e => { if (!on) (e.currentTarget as HTMLDivElement).style.background = "rgba(216,145,73,0.10)"; }}
                onMouseLeave={e => { if (!on) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}>
                <span style={{ fontSize: 13, width: 16 }}>{meta?.glyph}</span>
                <span style={{ fontSize: 12.5, textTransform: "lowercase" }}>{meta?.label}</span>
              </div>
            );
          })}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ padding: "0 18px" }}>
          <button onClick={onReset} style={{ width: "100%", background: "transparent", color: C.grayCold, fontSize: 11.5, letterSpacing: "0.04em", padding: "9px 0", border: `1px solid ${C.lineStrong}`, borderRadius: 4, textTransform: "lowercase", cursor: "pointer", fontFamily: "inherit" }}>
            volver a empezar
          </button>
        </div>
      </div>

      {/* contenido */}
      <div style={{ flex: 1, background: C.panelBg, color: C.panelInk, overflowY: "auto", padding: "32px 40px" }}>
        {activeSection === "resumen"  && <PanelResumen selected={selected} />}
        {activeSection === "ops"      && <PanelOps />}
        {activeSection === "fin"      && <PanelFin />}
        {activeSection === "stock"    && <PanelStock />}
        {activeSection === "clients"  && <PanelClients />}
      </div>
    </div>
  );
}
