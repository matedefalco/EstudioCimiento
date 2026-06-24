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
      {/* roof */}
      <polygon points="5,50 65,8 125,50"
        fill={activePhase === 3 ? C.copper : "rgba(242,240,234,0.08)"}
        stroke={activePhase === 3 ? C.copper : C.lineStrong} strokeWidth={1}
        style={{ transition: "fill 400ms ease, stroke 400ms ease" }} />
      {/* floor 4 — traspaso */}
      <rect x={5} y={52} width={120} height={30} rx={0}
        fill={floorFill(3)} stroke={C.lineStrong} strokeWidth={1}
        style={{ transition: "fill 400ms ease" }} />
      {[20, 58, 96].map(x => <rect key={x} x={x} y={59} width={14} height={16} rx={1} fill={windowFill(3)} style={{ transition: "fill 400ms ease" }} />)}
      {/* floor 3 — validación */}
      <rect x={5} y={84} width={120} height={30} rx={0}
        fill={floorFill(2)} stroke={C.lineStrong} strokeWidth={1}
        style={{ transition: "fill 400ms ease" }} />
      {[20, 58, 96].map(x => <rect key={x} x={x} y={91} width={14} height={16} rx={1} fill={windowFill(2)} style={{ transition: "fill 400ms ease" }} />)}
      {/* floor 2 — desarrollo */}
      <rect x={5} y={116} width={120} height={30} rx={0}
        fill={floorFill(1)} stroke={C.lineStrong} strokeWidth={1}
        style={{ transition: "fill 400ms ease" }} />
      {[20, 58, 96].map(x => <rect key={x} x={x} y={123} width={14} height={16} rx={1} fill={windowFill(1)} style={{ transition: "fill 400ms ease" }} />)}
      {/* floor 1 — relevamiento */}
      <rect x={5} y={148} width={120} height={30} rx={0}
        fill={floorFill(0)} stroke={C.lineStrong} strokeWidth={1}
        style={{ transition: "fill 400ms ease" }} />
      {[20, 58].map(x => <rect key={x} x={x} y={155} width={14} height={16} rx={1} fill={windowFill(0)} style={{ transition: "fill 400ms ease" }} />)}
      {/* door */}
      <rect x={84} y={160} width={22} height={18} rx={1} fill="rgba(0,0,0,0.4)" />
      {/* ground line */}
      <line x1={0} y1={179} x2={130} y2={179} stroke={C.lineStrong} strokeWidth={1} />
    </svg>
  );
}

interface Props { step: number; setStep: (n: number) => void; onDone: () => void; onReset: () => void; }

export function LearnFlow({ onDone, onReset }: Props) {
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

      {/* main layout */}
      <div className="fade-stage" style={{ position: "relative", zIndex: 4, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 40px 32px", gap: 60, flexWrap: "wrap" }}>

        {/* LEFT: phase tabs */}
        <div style={{ flex: "0 0 220px" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.28em", color: C.grayCold, textTransform: "lowercase", marginBottom: 28 }}>nuestro proceso</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {FASES.map((f, i) => {
              const on = activePhase === i;
              const done = i < activePhase;
              return (
                <div key={f.n} onClick={() => setActivePhase(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14, padding: "13px 16px",
                    borderRadius: 8, cursor: "pointer", transition: "all 200ms ease",
                    background: on ? "rgba(216,145,73,0.10)" : "transparent",
                    border: `1px solid ${on ? C.copper : "transparent"}`,
                  }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 700, letterSpacing: "0.04em",
                    background: on ? C.copper : done ? "rgba(216,145,73,0.25)" : "rgba(242,240,234,0.08)",
                    color: on ? C.steel : done ? C.copper : C.grayCold,
                    transition: "all 300ms ease",
                  }}>{f.n}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: on ? 600 : 400, color: on ? C.cream : C.grayCold, textTransform: "lowercase", transition: "color 200ms ease" }}>{f.title}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: building + phase description */}
        <div style={{ flex: "1 1 320px", maxWidth: 440, display: "flex", flexDirection: "column", gap: 32 }}>
          {/* building + description side by side */}
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <div style={{ flexShrink: 0 }}>
              <BuildingSVG activePhase={activePhase} />
              <div style={{ fontSize: 10, letterSpacing: "0.2em", color: C.grayCold, textAlign: "center", marginTop: 8, textTransform: "lowercase" }}>
                {activePhase < 3 ? `${activePhase + 1} de 4` : "sistema completo"}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.22em", color: C.copper, textTransform: "lowercase", marginBottom: 12 }}>
                fase {FASES[activePhase].n}
              </div>
              <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em", color: C.cream, textTransform: "lowercase", marginBottom: 12, lineHeight: 1.2 }}>
                {FASES[activePhase].title}
              </div>
              <div style={{ fontSize: 14, color: C.grayCold, lineHeight: 1.6 }}>
                {FASES[activePhase].desc}
              </div>
            </div>
          </div>

          <button onClick={onDone} style={primaryBtn}>quiero mi cotización →</button>
        </div>
      </div>
    </div>
  );
}
