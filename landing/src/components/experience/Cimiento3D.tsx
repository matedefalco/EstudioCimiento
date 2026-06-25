"use client";
import { C } from "./constants";

export function Cimiento3D({ layers, size = 220, isDark = true }: { layers: string[]; size?: number; isDark?: boolean }) {
  const baseBorder = isDark ? C.lineStrong : "rgba(28,30,34,0.20)";
  const layerBorder = isDark ? C.copper : "#B5863C";
  const layerBg = isDark ? "rgba(216,145,73,0.08)" : "rgba(181,134,60,0.10)";
  const layerShadow = isDark ? "0 0 24px rgba(216,145,73,0.10)" : "0 0 24px rgba(181,134,60,0.15)";

  return (
    <div style={{ perspective: 900, width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ transformStyle: "preserve-3d", transform: "rotateX(58deg) rotateZ(-42deg)", width: 120, height: 120, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, border: `1.5px solid ${baseBorder}`, background: isDark ? "rgba(216,145,73,0.04)" : "rgba(181,134,60,0.05)" }} />
        {layers.map((l, i) => {
          const z = (i + 1) * 26, inset = i * 9;
          return (
            <div key={l} style={{ position: "absolute", top: inset, left: inset, right: inset, bottom: inset, border: `1.5px solid ${layerBorder}`, background: layerBg, transform: `translateZ(${z}px)`, boxShadow: layerShadow }} />
          );
        })}
      </div>
    </div>
  );
}
