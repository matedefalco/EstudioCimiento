"use client";
import { C } from "./constants";
import { ECSymbol } from "./primitives";
import { ParticleField } from "./ParticleField";

export function Intro({ onQuote, onLearn, isDark = true }: { onQuote: () => void; onLearn: () => void; isDark?: boolean }) {
  const gridLine = isDark ? C.line : "rgba(28,30,34,0.07)";
  const secondaryText = isDark ? C.cream : "#1C1E22";
  const secondaryBorder = isDark ? C.lineStrong : "rgba(28,30,34,0.15)";

  return (
    <div style={{ position: "relative", flex: 1, display: "flex" }}>
      <ParticleField active={false} intensity={0} isDark={isDark} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${gridLine} 1px,transparent 1px),linear-gradient(90deg,${gridLine} 1px,transparent 1px)`, backgroundSize: "64px 64px", opacity: 0.22, pointerEvents: "none" }} />
      <div className="fade-stage" style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}>
        <div className="animate-pulse-slow">
          <ECSymbol size={56} stroke={1.2} color={isDark ? C.copper : "#B5863C"} />
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={onQuote} style={{ background: isDark ? C.copper : "#B5863C", color: isDark ? C.steel : "#FFFFFF", fontSize: 17, letterSpacing: "0.16em", textTransform: "lowercase", padding: "20px 52px", border: "none", borderRadius: 2, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            comenzar
          </button>
          <button onClick={onLearn} style={{ background: "transparent", color: secondaryText, fontSize: 17, letterSpacing: "0.16em", textTransform: "lowercase", padding: "20px 52px", border: `1.5px solid ${secondaryBorder}`, borderRadius: 2, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "border-color 200ms" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = isDark ? C.copper : "#B5863C"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = secondaryBorder; }}>
            cómo trabajamos
          </button>
        </div>
      </div>
    </div>
  );
}
