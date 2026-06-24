"use client";
import { SECTION_META } from "./constants";
import { ECSymbol } from "./primitives";
import { Icon } from "./icons";
import { PanelResumen } from "./panels/PanelResumen";
import { PanelOps } from "./panels/PanelOps";
import { PanelFin } from "./panels/PanelFin";
import { PanelStock } from "./panels/PanelStock";
import { PanelClients } from "./panels/PanelClients";
import { PanelCRM } from "./panels/PanelCRM";
import { PanelAgenda } from "./panels/PanelAgenda";
import { PanelReportes } from "./panels/PanelReportes";

interface Props {
  selected: string[];
  brandName: string;
  activeSection: string;
  setActiveSection: (id: string) => void;
  onReset: () => void;
  isDark?: boolean;
  onToggleDark?: () => void;
}

export function Dashboard({ selected, brandName, activeSection, setActiveSection, onReset, isDark, onToggleDark }: Props) {
  const navItems = ["resumen", ...selected];

  return (
    <div className="fade-stage" style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      {/* sidebar — uses --tc-sidebar* vars */}
      <div style={{
        width: 220, flexShrink: 0, display: "flex", flexDirection: "column",
        padding: "24px 0", background: "var(--tc-sidebar)",
        borderRight: "1px solid rgba(128,128,128,0.12)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 18px", marginBottom: 28 }}>
          <ECSymbol size={18} color="var(--tc-accent)" />
          <span style={{ fontSize: 13, color: "var(--tc-sidebar-text)" }}>
            estudio <strong style={{ fontWeight: 600 }}>cimiento</strong>
          </span>
        </div>
        <div style={{ padding: "0 18px", marginBottom: 6 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--tc-sidebar-soft)", textTransform: "lowercase" }}>
            {brandName ? `sistema · ${brandName}` : "tu sistema"}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: "0 10px" }}>
          {navItems.map(id => {
            const meta = SECTION_META[id];
            const on = activeSection === id;
            return (
              <div key={id} onClick={() => setActiveSection(id)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 10px", borderRadius: "var(--tc-r, 6px)",
                  background: on ? "color-mix(in srgb, var(--tc-accent) 15%, transparent)" : "transparent",
                  color: on ? "var(--tc-accent)" : "var(--tc-sidebar-text)",
                  cursor: "pointer", transition: "all 160ms ease",
                }}>
                <Icon name={id} size={14} color={on ? "var(--tc-accent)" : "var(--tc-sidebar-soft)"} />
                <span style={{ fontSize: 12.5, textTransform: "lowercase" }}>{meta?.label}</span>
              </div>
            );
          })}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 8 }}>
          {onToggleDark && (
            <button onClick={onToggleDark} title={isDark ? "cambiar a modo claro" : "cambiar a modo oscuro"} style={{
              width: "100%", background: "transparent", color: "var(--tc-sidebar-soft)",
              fontSize: 11.5, letterSpacing: "0.04em", padding: "9px 0",
              border: "1px solid rgba(128,128,128,0.2)", borderRadius: 4,
              textTransform: "lowercase", cursor: "pointer", fontFamily: "inherit",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              {isDark ? "☀ modo claro" : "☾ modo oscuro"}
            </button>
          )}
          <button onClick={onReset} style={{
            width: "100%", background: "transparent", color: "var(--tc-sidebar-soft)",
            fontSize: 11.5, letterSpacing: "0.04em", padding: "9px 0",
            border: "1px solid rgba(128,128,128,0.2)", borderRadius: 4,
            textTransform: "lowercase", cursor: "pointer", fontFamily: "inherit",
          }}>
            volver a empezar
          </button>
        </div>
      </div>

      {/* content — uses --tc-bg / --tc-ink and all other tc vars via primitives */}
      <div style={{
        flex: 1, background: "var(--tc-bg)", color: "var(--tc-ink)",
        overflowY: "auto", padding: "32px 40px",
      }}>
        {activeSection === "resumen"  && <PanelResumen selected={selected} brandName={brandName} />}
        {activeSection === "ops"      && <PanelOps />}
        {activeSection === "fin"      && <PanelFin />}
        {activeSection === "stock"    && <PanelStock />}
        {activeSection === "clients"  && <PanelClients />}
        {activeSection === "crm"      && <PanelCRM />}
        {activeSection === "agenda"   && <PanelAgenda />}
        {activeSection === "reportes" && <PanelReportes />}
      </div>
    </div>
  );
}
