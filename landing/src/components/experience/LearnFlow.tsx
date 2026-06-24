"use client";
import { C, FASES } from "./constants";
import { ECSymbol, Overline } from "./primitives";
import { ParticleField } from "./ParticleField";

const h2s: React.CSSProperties = { fontSize: 30, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.15, margin: 0, textTransform: "lowercase" };
const primaryBtn: React.CSSProperties = { background: C.copper, color: C.steel, fontSize: 14, fontWeight: 600, letterSpacing: "0.04em", textTransform: "lowercase", padding: "15px 32px", borderRadius: 4, border: "none", cursor: "pointer", fontFamily: "inherit" };

const CASE = [
  { l: "contexto",  t: "una financiera manejaba toda su base de datos en un excel que le quedó corto al escalar." },
  { l: "problema",  t: "sin un sistema central, cargar y revisar operaciones se volvía cada vez más lento." },
  { l: "solución",  t: "una plataforma de gestión a medida para administrar comitentes, operaciones y bases de datos." },
  { l: "resultado", t: "el sistema está en uso, redujo de forma amplia los tiempos de carga y revisión." },
];

const TOTAL = 6;

interface Props { step: number; setStep: (n: number) => void; onDone: () => void; onReset: () => void; }

export function LearnFlow({ step, setStep, onDone, onReset }: Props) {
  return (
    <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
      <ParticleField active={true} intensity={2} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.line} 1px,transparent 1px),linear-gradient(90deg,${C.line} 1px,transparent 1px)`, backgroundSize: "64px 64px", opacity: 0.5, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 28, left: 32, display: "flex", alignItems: "center", gap: 10, zIndex: 5, cursor: "pointer" }} onClick={onReset}>
        <ECSymbol size={22} /><span style={{ fontSize: 14, opacity: 0.9 }}>estudio <strong style={{ fontWeight: 600 }}>cimiento</strong></span>
      </div>

      <div className="fade-stage" key={step} style={{ position: "relative", zIndex: 4, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
        {step === 0 && (
          <div style={{ maxWidth: 560, textAlign: "center" }}>
            <Overline>nuestro proceso</Overline>
            <h2 style={h2s}>cuatro fases, una base</h2>
            <p style={{ fontSize: 14.5, color: C.grayCold, lineHeight: 1.55, marginTop: 14, maxWidth: 460, margin: "14px auto 0" }}>así trabajamos en cada proyecto, sin atajos y sin dejarte dependiendo de nosotros.</p>
            <button onClick={() => setStep(1)} style={{ ...primaryBtn, marginTop: 32 }}>seguir</button>
          </div>
        )}
        {step >= 1 && step <= 4 && (
          <div style={{ maxWidth: 560, width: "100%" }}>
            <Overline>{`fase ${FASES[step - 1].n}`}</Overline>
            <h2 style={h2s}>{FASES[step - 1].title}</h2>
            <p style={{ fontSize: 14.5, color: C.grayCold, lineHeight: 1.55, marginTop: 14, maxWidth: 460 }}>{FASES[step - 1].desc}</p>
            <button onClick={() => setStep(step + 1)} style={{ ...primaryBtn, marginTop: 32 }}>seguir</button>
          </div>
        )}
        {step === 5 && (
          <div style={{ maxWidth: 600, width: "100%" }}>
            <Overline>caso de uso</Overline>
            <h2 style={h2s}>gryphon</h2>
            <div style={{ display: "grid", gap: 14, marginTop: 24 }}>
              {CASE.map(c => (
                <div key={c.l} style={{ borderLeft: `2px solid ${C.copper}`, paddingLeft: 16 }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.18em", color: C.copper, textTransform: "lowercase", marginBottom: 4 }}>{c.l}</div>
                  <div style={{ fontSize: 14, color: C.cream, lineHeight: 1.5 }}>{c.t}</div>
                </div>
              ))}
            </div>
            <button onClick={onDone} style={{ ...primaryBtn, marginTop: 28 }}>quiero mi cotización</button>
          </div>
        )}
      </div>

      {step > 0 && (
        <div style={{ position: "absolute", bottom: 28, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6, zIndex: 5 }}>
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div key={i} style={{ width: 22, height: 4, background: i <= step ? C.copper : C.lineStrong, transition: "all 300ms ease" }} />
          ))}
        </div>
      )}
    </div>
  );
}
