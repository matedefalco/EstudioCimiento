"use client";
import { C } from "./constants";

export function Cimiento3D({ layers, size = 220 }: { layers: string[]; size?: number }) {
  return (
    <div style={{ perspective: 900, width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ transformStyle: "preserve-3d", transform: "rotateX(58deg) rotateZ(-42deg)", width: 120, height: 120, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, border: `1.5px solid ${C.lineStrong}`, background: "rgba(216,145,73,0.04)" }} />
        {layers.map((l, i) => {
          const z = (i + 1) * 26, inset = i * 9;
          return (
            <div key={l} style={{ position: "absolute", top: inset, left: inset, right: inset, bottom: inset, border: `1.5px solid ${C.copper}`, background: "rgba(216,145,73,0.08)", transform: `translateZ(${z}px)`, boxShadow: "0 0 24px rgba(216,145,73,0.10)" }} />
          );
        })}
      </div>
    </div>
  );
}
