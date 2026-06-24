"use client";
import { C, COMPONENTS, TODAY_OPTIONS, PAIN_OPTIONS, SIZE_OPTIONS } from "./constants";
import { ECSymbol, Overline } from "./primitives";
import { ParticleField } from "./ParticleField";
import { Cimiento3D } from "./Cimiento3D";

const h2s: React.CSSProperties = { fontSize: 30, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.15, margin: 0, textTransform: "lowercase" };
const cardBase: React.CSSProperties = { background: C.surface, border: `1px solid ${C.line}`, borderRadius: 12, padding: "16px 18px", cursor: "pointer", transition: "all 200ms ease" };
const primaryBtn: React.CSSProperties = { background: C.copper, color: C.steel, fontSize: 14, fontWeight: 600, letterSpacing: "0.04em", textTransform: "lowercase", padding: "15px 32px", borderRadius: 4, border: "none", cursor: "pointer", fontFamily: "inherit" };

interface Props {
  step: number;
  go: (n: number) => void;
  transitioning: boolean;
  today: string | null; setToday: (v: string) => void;
  pain: string | null;  setPain:  (v: string) => void;
  selected: string[];   toggleComp: (id: string) => void;
  size: string | null;  setSize:  (v: string) => void;
}

export function QuoteFlow({ step, go, transitioning, today, setToday, pain, setPain, selected, toggleComp, size, setSize }: Props) {
  return (
    <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
      <ParticleField active={true} intensity={selected.length} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.line} 1px,transparent 1px),linear-gradient(90deg,${C.line} 1px,transparent 1px)`, backgroundSize: "64px 64px", opacity: 0.5, pointerEvents: "none" }} />

      {/* header */}
      <div style={{ position: "absolute", top: 28, left: 32, display: "flex", alignItems: "center", gap: 10, zIndex: 5 }}>
        <ECSymbol size={22} />
        <span style={{ fontSize: 14, opacity: 0.9 }}>estudio <strong style={{ fontWeight: 600 }}>cimiento</strong></span>
      </div>
      <div style={{ position: "absolute", top: 30, right: 32, display: "flex", gap: 6, alignItems: "flex-end", zIndex: 5 }}>
        {[1, 2, 3].map(n => <div key={n} style={{ width: 22, height: n <= step + 1 ? 6 + n * 4 : 6, background: n <= step + 1 ? C.copper : C.lineStrong, transition: "all 300ms ease" }} />)}
      </div>

      <div style={{ position: "relative", zIndex: 4, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 32, opacity: transitioning ? 0 : 1, transition: "opacity 480ms ease" }}>

        {step === 0 && (
          <div className="fade-stage" style={{ maxWidth: 560, width: "100%" }}>
            <Overline>relevamiento · 1 de 4</Overline>
            <h2 style={h2s}>¿cómo organizás tu operación hoy?</h2>
            <div style={{ display: "grid", gap: 12, marginTop: 32 }}>
              {TODAY_OPTIONS.map(o => (
                <div key={o.id} onClick={() => { setToday(o.id); go(1); }} style={{ ...cardBase, borderColor: today === o.id ? C.copper : C.line }}>
                  <span style={{ fontSize: 15, color: C.cream }}>{o.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="fade-stage" style={{ maxWidth: 560, width: "100%" }}>
            <Overline>relevamiento · 2 de 4</Overline>
            <h2 style={h2s}>¿qué es lo que más tiempo te quita hoy?</h2>
            <p style={{ fontSize: 14.5, color: C.grayCold, lineHeight: 1.55, marginTop: 14 }}>esto nos ayuda a mostrarte algo a medida, no una lista genérica.</p>
            <div style={{ display: "grid", gap: 12, marginTop: 28 }}>
              {PAIN_OPTIONS.map(o => (
                <div key={o.id} onClick={() => { setPain(o.id); go(2); }} style={{ ...cardBase, borderColor: pain === o.id ? C.copper : C.line }}>
                  <span style={{ fontSize: 15, color: C.cream }}>{o.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="fade-stage" style={{ display: "flex", gap: 64, alignItems: "center", maxWidth: 900, width: "100%", flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ flex: "1 1 420px", maxWidth: 480 }}>
              <Overline>desarrollo · 3 de 4</Overline>
              <h2 style={h2s}>¿qué querés ordenar primero?</h2>
              <p style={{ fontSize: 14.5, color: C.grayCold, lineHeight: 1.55, marginTop: 14 }}>elegí los componentes. mirá cómo se levanta tu sistema a la derecha.</p>
              <div style={{ display: "grid", gap: 10, marginTop: 28 }}>
                {COMPONENTS.map(c => {
                  const on = selected.includes(c.id);
                  const suggested = pain === c.id;
                  return (
                    <div key={c.id} onClick={() => toggleComp(c.id)} style={{ ...cardBase, display: "flex", alignItems: "center", gap: 16, borderColor: on ? C.copper : C.line, background: on ? "rgba(216,145,73,0.08)" : C.surface }}>
                      <span style={{ fontSize: 18, color: on ? C.copper : C.grayCold, width: 22 }}>{c.glyph}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 500, color: C.cream, display: "flex", alignItems: "center", gap: 8 }}>
                          {c.name}
                          {suggested && !on && <span style={{ fontSize: 10, letterSpacing: "0.1em", color: C.copper, border: `1px solid ${C.copper}`, borderRadius: 20, padding: "2px 8px", textTransform: "lowercase" }}>sugerido</span>}
                        </div>
                        <div style={{ fontSize: 12.5, color: C.grayCold, marginTop: 3, lineHeight: 1.4 }}>{c.desc}</div>
                      </div>
                      <span style={{ width: 18, height: 18, border: `1.5px solid ${on ? C.copper : C.lineStrong}`, borderRadius: 3, background: on ? C.copper : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: C.steel, fontSize: 12, flexShrink: 0 }}>{on ? "✓" : ""}</span>
                    </div>
                  );
                })}
              </div>
              <button disabled={selected.length === 0} onClick={() => go(3)} style={{ ...primaryBtn, marginTop: 24, opacity: selected.length === 0 ? 0.35 : 1, cursor: selected.length === 0 ? "not-allowed" : "pointer" }}>
                seguir
              </button>
            </div>
            <div style={{ flex: "0 0 auto", textAlign: "center" }}>
              <Cimiento3D layers={selected} />
              <div style={{ fontSize: 11, letterSpacing: "0.2em", color: C.grayCold, marginTop: 8 }}>
                {selected.length === 0 ? "tu base" : `${selected.length} ${selected.length === 1 ? "componente" : "componentes"}`}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="fade-stage" style={{ maxWidth: 560, width: "100%" }}>
            <Overline>validación · 4 de 4</Overline>
            <h2 style={h2s}>¿quiénes lo van a usar?</h2>
            <div style={{ display: "grid", gap: 12, marginTop: 32 }}>
              {SIZE_OPTIONS.map(o => (
                <div key={o.id} onClick={() => { setSize(o.id); go(4); }} style={{ ...cardBase, borderColor: size === o.id ? C.copper : C.line }}>
                  <span style={{ fontSize: 15, color: C.cream }}>{o.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
