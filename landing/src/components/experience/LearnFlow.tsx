"use client";
import { useState } from "react";
import { C, FASES } from "./constants";
import { ECSymbol } from "./primitives";
import { ParticleField } from "./ParticleField";
import { PrincipiosIso } from "./PrincipiosIso";

const LIGHT = {
  text:    "#1C1E22",
  muted:   "#8A8276",
  accent:  "#B5863C",
  border:  "rgba(28,30,34,0.12)",
  gridLine:"rgba(28,30,34,0.06)",
  cardBg:  "rgba(28,30,34,0.03)",
};

function primaryBtn(isDark: boolean): React.CSSProperties {
  return {
    background: isDark ? C.copper : "#B5863C",
    color: isDark ? C.steel : "#FFFFFF",
    fontSize: 14, fontWeight: 600,
    letterSpacing: "0.04em", textTransform: "lowercase",
    padding: "14px 28px", borderRadius: 4,
    border: "none", cursor: "pointer", fontFamily: "inherit",
  };
}

/* ─── building SVG (metodología) ─────────────────────────────────────────── */

function BuildingSVG({ activePhase, isDark }: { activePhase: number; isDark: boolean }) {
  const accent = isDark ? C.copper : "#B5863C";
  const lineColor = isDark ? C.lineStrong : "rgba(28,30,34,0.18)";

  const floorFill = (i: number) => {
    if (i === activePhase) return accent;
    if (i < activePhase) return isDark ? "rgba(216,145,73,0.35)" : "rgba(181,134,60,0.2)";
    return isDark ? "rgba(242,240,234,0.06)" : "rgba(28,30,34,0.04)";
  };
  const windowFill = (i: number) =>
    activePhase >= i
      ? isDark ? "rgba(0,0,0,0.28)" : "rgba(28,30,34,0.12)"
      : isDark ? "rgba(242,240,234,0.04)" : "rgba(28,30,34,0.03)";

  return (
    <svg width={130} height={190} viewBox="0 0 130 190" style={{ overflow: "visible" }}>
      <polygon points="5,50 65,8 125,50"
        fill={activePhase === 3 ? accent : isDark ? "rgba(242,240,234,0.08)" : "rgba(28,30,34,0.05)"}
        stroke={activePhase === 3 ? accent : lineColor} strokeWidth={1}
        style={{ transition: "fill 400ms ease, stroke 400ms ease" }} />
      <rect x={5} y={52} width={120} height={30} rx={0} fill={floorFill(3)} stroke={lineColor} strokeWidth={1} style={{ transition: "fill 400ms ease" }} />
      {[20, 58, 96].map(x => <rect key={x} x={x} y={59} width={14} height={16} rx={1} fill={windowFill(3)} style={{ transition: "fill 400ms ease" }} />)}
      <rect x={5} y={84} width={120} height={30} rx={0} fill={floorFill(2)} stroke={lineColor} strokeWidth={1} style={{ transition: "fill 400ms ease" }} />
      {[20, 58, 96].map(x => <rect key={x} x={x} y={91} width={14} height={16} rx={1} fill={windowFill(2)} style={{ transition: "fill 400ms ease" }} />)}
      <rect x={5} y={116} width={120} height={30} rx={0} fill={floorFill(1)} stroke={lineColor} strokeWidth={1} style={{ transition: "fill 400ms ease" }} />
      {[20, 58, 96].map(x => <rect key={x} x={x} y={123} width={14} height={16} rx={1} fill={windowFill(1)} style={{ transition: "fill 400ms ease" }} />)}
      <rect x={5} y={148} width={120} height={30} rx={0} fill={floorFill(0)} stroke={lineColor} strokeWidth={1} style={{ transition: "fill 400ms ease" }} />
      {[20, 58].map(x => <rect key={x} x={x} y={155} width={14} height={16} rx={1} fill={windowFill(0)} style={{ transition: "fill 400ms ease" }} />)}
      <rect x={84} y={160} width={22} height={18} rx={1} fill={isDark ? "rgba(0,0,0,0.4)" : "rgba(28,30,34,0.1)"} />
      <line x1={0} y1={179} x2={130} y2={179} stroke={lineColor} strokeWidth={1} />
    </svg>
  );
}

/* ─── visión SVG ─────────────────────────────────────────────────────────── */

function VisionSVG({ isDark }: { isDark: boolean }) {
  const accent = isDark ? C.copper : "#B5863C";
  const line = isDark ? C.lineStrong : "rgba(28,30,34,0.15)";

  return (
    <svg width={130} height={130} viewBox="0 0 130 130">
      <ellipse cx={65} cy={65} rx={56} ry={56} fill="none" stroke={line} strokeWidth={1} strokeDasharray="3 5" />
      <ellipse cx={65} cy={65} rx={38} ry={38} fill="none" stroke={line} strokeWidth={1} strokeDasharray="2 4" />
      <circle cx={65} cy={65} r={14} fill={accent} opacity={0.9} />
      <circle cx={65} cy={55} r={5} fill={isDark ? C.steel : "#F4F0E8"} opacity={0.8} />
      <path d="M54 74 Q65 67 76 74" stroke={isDark ? C.steel : "#F4F0E8"} strokeWidth={1.8} fill="none" strokeLinecap="round" opacity={0.8} />
      <circle cx={65} cy={9} r={5} fill={accent} opacity={0.4} />
      <circle cx={121} cy={65} r={4} fill={accent} opacity={0.3} />
      <circle cx={65} cy={121} r={5} fill={accent} opacity={0.4} />
      <circle cx={9} cy={65} r={4} fill={accent} opacity={0.3} />
      <circle cx={65} cy={27} r={3} fill={isDark ? C.cream : "#1C1E22"} opacity={0.25} />
      <circle cx={103} cy={65} r={3} fill={isDark ? C.cream : "#1C1E22"} opacity={0.25} />
      <circle cx={65} cy={103} r={3} fill={isDark ? C.cream : "#1C1E22"} opacity={0.25} />
      <circle cx={27} cy={65} r={3} fill={isDark ? C.cream : "#1C1E22"} opacity={0.25} />
    </svg>
  );
}

/* ─── tabs ──────────────────────────────────────────────────────────────── */

type Camino = "metodología" | "visión" | "principios";

const CAMINOS: { id: Camino; label: string }[] = [
  { id: "metodología", label: "nuestra metodología" },
  { id: "visión",      label: "nuestra visión"      },
  { id: "principios",  label: "nuestros principios" },
];

/* ─── componente principal ──────────────────────────────────────────────── */

interface Props {
  step: number;
  setStep: (n: number) => void;
  onDone: () => void;
  onReset: () => void;
  isDark?: boolean;
}

export function LearnFlow({ onDone, onReset, isDark = true }: Props) {
  const [camino, setCamino] = useState<Camino>("metodología");
  const [activePhase, setActivePhase] = useState(0);

  const textColor   = isDark ? C.cream     : LIGHT.text;
  const mutedColor  = isDark ? C.grayCold  : LIGHT.muted;
  const accentColor = isDark ? C.copper    : LIGHT.accent;
  const borderColor = isDark ? C.lineStrong: LIGHT.border;
  const gridLine    = isDark ? C.line      : LIGHT.gridLine;

  return (
    <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <ParticleField active={true} intensity={2} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${gridLine} 1px,transparent 1px),linear-gradient(90deg,${gridLine} 1px,transparent 1px)`, backgroundSize: "64px 64px", opacity: 0.5, pointerEvents: "none" }} />

      {/* header */}
      <div style={{ position: "absolute", top: 28, left: 32, display: "flex", alignItems: "center", gap: 10, zIndex: 5, cursor: "pointer" }} onClick={onReset}>
        <ECSymbol size={22} color={accentColor} />
        <span style={{ fontSize: 14, opacity: 0.9, color: textColor }}>estudio <strong style={{ fontWeight: 600 }}>cimiento</strong></span>
      </div>

      {/* contenido */}
      <div className="fade-stage" key={camino} style={{ position: "relative", zIndex: 4, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 40px 32px", gap: 32 }}>

        {/* tab selector */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
          {CAMINOS.map(c => {
            const on = camino === c.id;
            return (
              <button key={c.id} onClick={() => setCamino(c.id)} style={{
                background: on ? accentColor : "transparent",
                color: on ? (isDark ? C.steel : "#FFFFFF") : mutedColor,
                border: `1px solid ${on ? accentColor : borderColor}`,
                borderRadius: 4, fontSize: 12, fontWeight: on ? 600 : 400,
                letterSpacing: "0.06em", padding: "7px 16px",
                cursor: "pointer", fontFamily: "inherit", textTransform: "lowercase",
                transition: "all 200ms ease",
              }}>
                {c.label}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 60, flexWrap: "wrap", width: "100%" }}>

          {/* METODOLOGÍA */}
          {camino === "metodología" && (
            <>
              <div style={{ flex: "0 0 220px" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.28em", color: mutedColor, textTransform: "lowercase", marginBottom: 28 }}>nuestro proceso</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {FASES.map((f, i) => {
                    const on = activePhase === i;
                    const done = i < activePhase;
                    return (
                      <div key={f.n} onClick={() => setActivePhase(i)}
                        style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", borderRadius: 8, cursor: "pointer", transition: "all 200ms ease", background: on ? (isDark ? "rgba(216,145,73,0.10)" : "rgba(181,134,60,0.08)") : "transparent", border: `1px solid ${on ? accentColor : "transparent"}` }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, letterSpacing: "0.04em", background: on ? accentColor : done ? (isDark ? "rgba(216,145,73,0.25)" : "rgba(181,134,60,0.15)") : (isDark ? "rgba(242,240,234,0.08)" : "rgba(28,30,34,0.06)"), color: on ? (isDark ? C.steel : "#FFFFFF") : done ? accentColor : mutedColor, transition: "all 300ms ease" }}>{f.n}</div>
                        <div style={{ fontSize: 14, fontWeight: on ? 600 : 400, color: on ? textColor : mutedColor, textTransform: "lowercase", transition: "color 200ms ease" }}>{f.title}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ flex: "1 1 320px", maxWidth: 440, display: "flex", flexDirection: "column", gap: 32 }}>
                <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
                  <div style={{ flexShrink: 0 }}>
                    <BuildingSVG activePhase={activePhase} isDark={isDark} />
                    <div style={{ fontSize: 10, letterSpacing: "0.2em", color: mutedColor, textAlign: "center", marginTop: 8, textTransform: "lowercase" }}>
                      {activePhase < 3 ? `${activePhase + 1} de 4` : "sistema completo"}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: "0.22em", color: accentColor, textTransform: "lowercase", marginBottom: 12 }}>fase {FASES[activePhase].n}</div>
                    <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em", color: textColor, textTransform: "lowercase", marginBottom: 12, lineHeight: 1.2 }}>{FASES[activePhase].title}</div>
                    <div style={{ fontSize: 14, color: mutedColor, lineHeight: 1.6 }}>{FASES[activePhase].desc}</div>
                  </div>
                </div>
                <button onClick={onDone} style={primaryBtn(isDark)}>quiero mi cotización →</button>
              </div>
            </>
          )}

          {/* VISIÓN */}
          {camino === "visión" && (
            <div style={{ maxWidth: 680, width: "100%" }}>
              <div style={{ display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ flexShrink: 0, marginTop: 8 }}>
                  <VisionSVG isDark={isDark} />
                </div>
                <div style={{ flex: "1 1 300px" }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.28em", color: mutedColor, textTransform: "lowercase", marginBottom: 20 }}>nuestra visión</div>
                  <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-0.02em", color: textColor, lineHeight: 1.25, marginBottom: 28, textTransform: "lowercase" }}>
                    la tecnología como plataforma para el progreso humano.
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <p style={{ margin: 0, fontSize: 14.5, color: mutedColor, lineHeight: 1.7 }}>
                      la tecnología es el vehículo. el objetivo es que el dueño del negocio tenga tiempo para lo que importa: crecer, decidir, enfocarse.
                    </p>
                    <p style={{ margin: 0, fontSize: 14.5, color: mutedColor, lineHeight: 1.7 }}>
                      construimos el sistema, lo probamos con vos y te lo entregamos listo para operarlo solo. el traspaso no es un bonus: es la parte más importante de lo que hacemos.
                    </p>
                    <div style={{ paddingTop: 18, borderTop: `1px solid ${borderColor}` }}>
                      <div style={{ fontSize: 13, color: accentColor, letterSpacing: "0.04em" }}>
                        cuando el trabajo termina, lo que queda es un negocio ordenado y alguien que sabe cómo sostenerlo.
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: 36 }}>
                    <button onClick={onDone} style={primaryBtn(isDark)}>quiero mi cotización →</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PRINCIPIOS */}
          {camino === "principios" && (
            <PrincipiosIso onDone={onDone} isDark={isDark} />
          )}

        </div>
      </div>
    </div>
  );
}
