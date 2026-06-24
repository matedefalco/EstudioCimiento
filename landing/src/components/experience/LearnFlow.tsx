"use client";
import { useState } from "react";
import { C, FASES } from "./constants";
import { ECSymbol } from "./primitives";
import { ParticleField } from "./ParticleField";

const primaryBtn: React.CSSProperties = {
  background: C.copper, color: C.steel, fontSize: 14, fontWeight: 600,
  letterSpacing: "0.04em", textTransform: "lowercase", padding: "14px 28px",
  borderRadius: 4, border: "none", cursor: "pointer", fontFamily: "inherit",
};

/* ─── building SVG ──────────────────────────────────────────────────────── */

function BuildingSVG({ activePhase }: { activePhase: number }) {
  const floorFill = (i: number) => {
    if (i === activePhase) return C.copper;
    if (i < activePhase) return "rgba(216,145,73,0.35)";
    return "rgba(242,240,234,0.06)";
  };
  const windowFill = (i: number) =>
    activePhase >= i ? "rgba(0,0,0,0.28)" : "rgba(242,240,234,0.04)";

  return (
    <svg width={130} height={190} viewBox="0 0 130 190" style={{ overflow: "visible" }}>
      <polygon points="5,50 65,8 125,50"
        fill={activePhase === 3 ? C.copper : "rgba(242,240,234,0.08)"}
        stroke={activePhase === 3 ? C.copper : C.lineStrong} strokeWidth={1}
        style={{ transition: "fill 400ms ease, stroke 400ms ease" }} />
      <rect x={5} y={52} width={120} height={30} rx={0} fill={floorFill(3)} stroke={C.lineStrong} strokeWidth={1} style={{ transition: "fill 400ms ease" }} />
      {[20, 58, 96].map(x => <rect key={x} x={x} y={59} width={14} height={16} rx={1} fill={windowFill(3)} style={{ transition: "fill 400ms ease" }} />)}
      <rect x={5} y={84} width={120} height={30} rx={0} fill={floorFill(2)} stroke={C.lineStrong} strokeWidth={1} style={{ transition: "fill 400ms ease" }} />
      {[20, 58, 96].map(x => <rect key={x} x={x} y={91} width={14} height={16} rx={1} fill={windowFill(2)} style={{ transition: "fill 400ms ease" }} />)}
      <rect x={5} y={116} width={120} height={30} rx={0} fill={floorFill(1)} stroke={C.lineStrong} strokeWidth={1} style={{ transition: "fill 400ms ease" }} />
      {[20, 58, 96].map(x => <rect key={x} x={x} y={123} width={14} height={16} rx={1} fill={windowFill(1)} style={{ transition: "fill 400ms ease" }} />)}
      <rect x={5} y={148} width={120} height={30} rx={0} fill={floorFill(0)} stroke={C.lineStrong} strokeWidth={1} style={{ transition: "fill 400ms ease" }} />
      {[20, 58].map(x => <rect key={x} x={x} y={155} width={14} height={16} rx={1} fill={windowFill(0)} style={{ transition: "fill 400ms ease" }} />)}
      <rect x={84} y={160} width={22} height={18} rx={1} fill="rgba(0,0,0,0.4)" />
      <line x1={0} y1={179} x2={130} y2={179} stroke={C.lineStrong} strokeWidth={1} />
    </svg>
  );
}

/* ─── visión SVG: órbita ────────────────────────────────────────────────── */

function VisionSVG() {
  return (
    <svg width={130} height={130} viewBox="0 0 130 130">
      {/* orbit rings */}
      <ellipse cx={65} cy={65} rx={56} ry={56} fill="none" stroke={C.lineStrong} strokeWidth={1} strokeDasharray="3 5" />
      <ellipse cx={65} cy={65} rx={38} ry={38} fill="none" stroke={C.lineStrong} strokeWidth={1} strokeDasharray="2 4" />
      {/* center: person */}
      <circle cx={65} cy={65} r={14} fill={C.copper} opacity={0.9} />
      <circle cx={65} cy={55} r={5} fill={C.steel} opacity={0.8} />
      <path d="M54 74 Q65 67 76 74" stroke={C.steel} strokeWidth={1.8} fill="none" strokeLinecap="round" opacity={0.8} />
      {/* orbit nodes */}
      <circle cx={65} cy={9} r={5} fill={C.copper} opacity={0.4} />
      <circle cx={121} cy={65} r={4} fill={C.copper} opacity={0.3} />
      <circle cx={65} cy={121} r={5} fill={C.copper} opacity={0.4} />
      <circle cx={9} cy={65} r={4} fill={C.copper} opacity={0.3} />
      {/* inner ring nodes */}
      <circle cx={65} cy={27} r={3} fill={C.cream} opacity={0.25} />
      <circle cx={103} cy={65} r={3} fill={C.cream} opacity={0.25} />
      <circle cx={65} cy={103} r={3} fill={C.cream} opacity={0.25} />
      <circle cx={27} cy={65} r={3} fill={C.cream} opacity={0.25} />
    </svg>
  );
}

/* ─── principios SVG: tres formas ──────────────────────────────────────── */

function PrincipioIcon({ type }: { type: "belleza" | "trabajo" | "sabiduría" }) {
  return (
    <svg width={44} height={44} viewBox="0 0 44 44" fill="none">
      {type === "belleza" && (
        <>
          <polygon points="22,4 28,16 42,16 31,25 35,39 22,30 9,39 13,25 2,16 16,16" stroke={C.copper} strokeWidth={1.4} fill="rgba(216,145,73,0.08)" strokeLinejoin="round" />
        </>
      )}
      {type === "trabajo" && (
        <>
          <rect x={7} y={12} width={30} height={22} rx={3} stroke={C.copper} strokeWidth={1.4} fill="rgba(216,145,73,0.08)" />
          <path d="M15 12 V9 Q15 6 22 6 Q29 6 29 9 V12" stroke={C.copper} strokeWidth={1.4} fill="none" />
          <line x1={14} y1={22} x2={30} y2={22} stroke={C.copper} strokeWidth={1} opacity={0.5} />
          <line x1={14} y1={27} x2={24} y2={27} stroke={C.copper} strokeWidth={1} opacity={0.5} />
        </>
      )}
      {type === "sabiduría" && (
        <>
          <circle cx={22} cy={18} r={9} stroke={C.copper} strokeWidth={1.4} fill="rgba(216,145,73,0.08)" />
          <path d="M16 27 Q16 36 22 36 Q28 36 28 27" stroke={C.copper} strokeWidth={1.4} fill="none" />
          <line x1={22} y1={36} x2={22} y2={40} stroke={C.copper} strokeWidth={1.4} />
          <line x1={18} y1={40} x2={26} y2={40} stroke={C.copper} strokeWidth={1} />
        </>
      )}
    </svg>
  );
}

/* ─── TABS SELECTOR ─────────────────────────────────────────────────────── */

type Camino = "metodología" | "visión" | "principios";

const CAMINOS: { id: Camino; label: string }[] = [
  { id: "metodología", label: "nuestra metodología" },
  { id: "visión",      label: "nuestra visión"      },
  { id: "principios",  label: "nuestros principios" },
];

/* ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────── */

interface Props { step: number; setStep: (n: number) => void; onDone: () => void; onReset: () => void; }

export function LearnFlow({ onDone, onReset }: Props) {
  const [camino, setCamino]       = useState<Camino>("metodología");
  const [activePhase, setActivePhase] = useState(0);

  return (
    <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <ParticleField active={true} intensity={2} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.line} 1px,transparent 1px),linear-gradient(90deg,${C.line} 1px,transparent 1px)`, backgroundSize: "64px 64px", opacity: 0.5, pointerEvents: "none" }} />

      {/* header */}
      <div style={{ position: "absolute", top: 28, left: 32, display: "flex", alignItems: "center", gap: 10, zIndex: 5, cursor: "pointer" }} onClick={onReset}>
        <ECSymbol size={22} />
        <span style={{ fontSize: 14, opacity: 0.9 }}>estudio <strong style={{ fontWeight: 600 }}>cimiento</strong></span>
      </div>

      {/* ── contenido por camino ───────────────────────────────────────── */}
      <div className="fade-stage" key={camino} style={{ position: "relative", zIndex: 4, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 40px 32px", gap: 32 }}>

        {/* camino selector — dentro del flujo, encima del contenido */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
          {CAMINOS.map(c => {
            const on = camino === c.id;
            return (
              <button key={c.id} onClick={() => setCamino(c.id)} style={{
                background: on ? C.copper : "transparent",
                color: on ? C.steel : C.grayCold,
                border: `1px solid ${on ? C.copper : C.lineStrong}`,
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
              <div style={{ fontSize: 11, letterSpacing: "0.28em", color: C.grayCold, textTransform: "lowercase", marginBottom: 28 }}>nuestro proceso</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {FASES.map((f, i) => {
                  const on = activePhase === i;
                  const done = i < activePhase;
                  return (
                    <div key={f.n} onClick={() => setActivePhase(i)}
                      style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", borderRadius: 8, cursor: "pointer", transition: "all 200ms ease", background: on ? "rgba(216,145,73,0.10)" : "transparent", border: `1px solid ${on ? C.copper : "transparent"}` }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, letterSpacing: "0.04em", background: on ? C.copper : done ? "rgba(216,145,73,0.25)" : "rgba(242,240,234,0.08)", color: on ? C.steel : done ? C.copper : C.grayCold, transition: "all 300ms ease" }}>{f.n}</div>
                      <div style={{ fontSize: 14, fontWeight: on ? 600 : 400, color: on ? C.cream : C.grayCold, textTransform: "lowercase", transition: "color 200ms ease" }}>{f.title}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ flex: "1 1 320px", maxWidth: 440, display: "flex", flexDirection: "column", gap: 32 }}>
              <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
                <div style={{ flexShrink: 0 }}>
                  <BuildingSVG activePhase={activePhase} />
                  <div style={{ fontSize: 10, letterSpacing: "0.2em", color: C.grayCold, textAlign: "center", marginTop: 8, textTransform: "lowercase" }}>
                    {activePhase < 3 ? `${activePhase + 1} de 4` : "sistema completo"}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: "0.22em", color: C.copper, textTransform: "lowercase", marginBottom: 12 }}>fase {FASES[activePhase].n}</div>
                  <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em", color: C.cream, textTransform: "lowercase", marginBottom: 12, lineHeight: 1.2 }}>{FASES[activePhase].title}</div>
                  <div style={{ fontSize: 14, color: C.grayCold, lineHeight: 1.6 }}>{FASES[activePhase].desc}</div>
                </div>
              </div>
              <button onClick={onDone} style={primaryBtn}>quiero mi cotización →</button>
            </div>
          </>
        )}

        {/* VISIÓN */}
        {camino === "visión" && (
          <div style={{ maxWidth: 680, width: "100%" }}>
            <div style={{ display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ flexShrink: 0, marginTop: 8 }}>
                <VisionSVG />
              </div>
              <div style={{ flex: "1 1 300px" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.28em", color: C.grayCold, textTransform: "lowercase", marginBottom: 20 }}>nuestra visión</div>
                <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-0.02em", color: C.cream, lineHeight: 1.25, marginBottom: 28, textTransform: "lowercase" }}>
                  la tecnología como plataforma para el progreso humano.
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <p style={{ margin: 0, fontSize: 14.5, color: C.grayCold, lineHeight: 1.7 }}>
                    la usamos como medio para liberar tiempo, no para agregar complejidad. cuando alguien deja de pelear con el caos operativo, puede enfocarse en lo que realmente lo mueve.
                  </p>
                  <p style={{ margin: 0, fontSize: 14.5, color: C.grayCold, lineHeight: 1.7 }}>
                    nuestro trabajo termina cuando no nos necesitás para operar. no buscamos dependencia, buscamos autonomía. que el sistema funcione solo, y vos puedas crecer.
                  </p>
                  <div style={{ paddingTop: 18, borderTop: `1px solid ${C.lineStrong}` }}>
                    <div style={{ fontSize: 13, color: C.copper, letterSpacing: "0.04em", marginBottom: 6 }}>
                      el verdadero resultado de nuestro trabajo no es un sistema.
                    </div>
                    <div style={{ fontSize: 13, color: C.grayCold }}>
                      es que no nos necesites para usarlo.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 40 }}>
              <button onClick={onDone} style={primaryBtn}>quiero mi cotización →</button>
            </div>
          </div>
        )}

        {/* PRINCIPIOS */}
        {camino === "principios" && (
          <div style={{ maxWidth: 720, width: "100%" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.28em", color: C.grayCold, textTransform: "lowercase", marginBottom: 28, textAlign: "center" }}>nuestros principios</div>
            <div style={{ fontSize: 15, color: C.grayCold, lineHeight: 1.6, textAlign: "center", maxWidth: 460, margin: "0 auto 36px" }}>
              tres principios, ninguno separado de los otros. sin los tres al mismo tiempo, no es lo que buscamos.
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 40 }}>
              {([
                {
                  type: "belleza" as const,
                  title: "belleza",
                  body: "no es decoración. es forma y función que coinciden. cuando algo está bien hecho, se nota sin que nadie tenga que decirlo.",
                  tag: "la forma importa",
                },
                {
                  type: "trabajo" as const,
                  title: "trabajo",
                  body: "sin ejecución nada existe. preferimos hacer, ajustar y volver a hacer, antes que planificar indefinidamente. los atajos se pagan caro.",
                  tag: "la acción define",
                },
                {
                  type: "sabiduría" as const,
                  title: "sabiduría",
                  body: "actuar sin entender es ruido. primero entendemos profundo, después construimos. cada decisión tiene que tener una razón.",
                  tag: "el criterio es el límite",
                },
              ] as const).map(p => (
                <div key={p.type} style={{
                  background: "rgba(242,240,234,0.04)", border: `1px solid ${C.lineStrong}`,
                  borderRadius: 14, padding: "28px 24px",
                  display: "flex", flexDirection: "column", gap: 16,
                  transition: "border-color 200ms ease",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = C.copper}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = C.lineStrong}
                >
                  <PrincipioIcon type={p.type} />
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 500, color: C.cream, textTransform: "lowercase", marginBottom: 10, letterSpacing: "-0.01em" }}>{p.title}</div>
                    <div style={{ fontSize: 13.5, color: C.grayCold, lineHeight: 1.65 }}>{p.body}</div>
                  </div>
                  <div style={{ marginTop: "auto", fontSize: 11, letterSpacing: "0.1em", color: C.copper, textTransform: "lowercase" }}>
                    {p.tag}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center" }}>
              <button onClick={onDone} style={primaryBtn}>quiero mi cotización →</button>
            </div>
          </div>
        )}

        </div>
      </div>
    </div>
  );
}
