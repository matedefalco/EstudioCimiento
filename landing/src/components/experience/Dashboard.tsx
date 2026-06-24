"use client";
import { C, SECTION_META, getInterfaceStyle } from "./constants";
import { ECSymbol } from "./primitives";
import { PanelResumen } from "./panels/PanelResumen";
import { PanelOps } from "./panels/PanelOps";
import { PanelFin } from "./panels/PanelFin";
import { PanelStock } from "./panels/PanelStock";
import { PanelClients } from "./panels/PanelClients";

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

interface Props {
  selected: string[];
  brandName: string;
  brandColor: string;
  interfaceStyle: string;
  activeSection: string;
  setActiveSection: (id: string) => void;
  onReset: () => void;
}

export function Dashboard({ selected, brandName, brandColor, interfaceStyle, activeSection, setActiveSection, onReset }: Props) {
  const navItems = ["resumen", ...selected];
  const accent = brandColor || C.copper;
  const theme = getInterfaceStyle(interfaceStyle);

  const cssVars = {
    "--tc-card": theme.cardBg,
    "--tc-border": theme.borderColor,
    "--tc-sub": theme.cardSubBg,
    "--tc-ink": theme.ink,
    "--tc-soft": theme.inkSoft,
    "--tc-shadow": theme.shadow,
  } as React.CSSProperties;

  return (
    <div className="fade-stage" style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      {/* sidebar */}
      <div style={{ width: 220, background: theme.sidebarBg, borderRight: `1px solid rgba(128,128,128,0.12)`, display: "flex", flexDirection: "column", padding: "24px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 18px", marginBottom: 28 }}>
          <ECSymbol size={18} color={accent} />
          <span style={{ fontSize: 13, color: theme.sidebarText }}>estudio <strong style={{ fontWeight: 600 }}>cimiento</strong></span>
        </div>
        <div style={{ padding: "0 18px", marginBottom: 6 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.22em", color: theme.sidebarTextSoft, textTransform: "lowercase" }}>
            {brandName ? `sistema · ${brandName}` : "tu sistema"}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: "0 10px" }}>
          {navItems.map(id => {
            const meta = SECTION_META[id];
            const on = activeSection === id;
            return (
              <div key={id} onClick={() => setActiveSection(id)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 6, background: on ? hexToRgba(accent, 0.14) : "transparent", color: on ? accent : theme.sidebarText, cursor: "pointer", transition: "all 160ms ease" }}
                onMouseEnter={e => { if (!on) (e.currentTarget as HTMLDivElement).style.background = hexToRgba(accent, 0.08); }}
                onMouseLeave={e => { if (!on) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}>
                <span style={{ fontSize: 13, width: 16 }}>{meta?.glyph}</span>
                <span style={{ fontSize: 12.5, textTransform: "lowercase" }}>{meta?.label}</span>
              </div>
            );
          })}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ padding: "0 18px" }}>
          <button onClick={onReset} style={{ width: "100%", background: "transparent", color: theme.sidebarTextSoft, fontSize: 11.5, letterSpacing: "0.04em", padding: "9px 0", border: `1px solid rgba(128,128,128,0.2)`, borderRadius: 4, textTransform: "lowercase", cursor: "pointer", fontFamily: "inherit" }}>
            volver a empezar
          </button>
        </div>
      </div>

      {/* contenido */}
      <div style={{ flex: 1, background: theme.contentBg, color: theme.ink, overflowY: "auto", padding: "32px 40px", ...cssVars }}>
        {activeSection === "resumen"  && <PanelResumen selected={selected} />}
        {activeSection === "ops"      && <PanelOps />}
        {activeSection === "fin"      && <PanelFin />}
        {activeSection === "stock"    && <PanelStock />}
        {activeSection === "clients"  && <PanelClients />}
      </div>
    </div>
  );
}
