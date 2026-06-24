"use client";
import { C } from "./constants";

export function ECSymbol({ size = 28, color = C.copper, stroke = 1.5 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M4 27 H28 M9 27 V21 H15 M15 21 V15 H21 M21 15 V9 H27" stroke={color} strokeWidth={stroke} strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

export function Overline({ children, color = C.copper }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ fontSize: 11, letterSpacing: "0.32em", textTransform: "lowercase", color, fontWeight: 500, marginBottom: 18 }}>
      {children}
    </div>
  );
}

export function Chip({ text, tone = "amber" }: { text: string; tone?: string }) {
  const map: Record<string, [string, string]> = {
    green:  [C.green,  C.greenBg],
    red:    [C.red,    C.redBg],
    amber:  [C.amber,  C.amberBg],
    blue:   [C.blue,   C.blueBg],
    purple: [C.purple, C.purpleBg],
    gray:   [C.gray,   C.grayBg],
  };
  const [fg, bg] = map[tone] ?? map.gray;
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color: fg, background: bg, borderRadius: 20, padding: "3px 10px", whiteSpace: "nowrap" }}>
      {text}
    </span>
  );
}

const AVATAR_COLORS = [C.copper, C.blue, C.green, C.purple, C.amber];

export function Avatar({ initials, idx = 0, size = 28 }: { initials: string; idx?: number; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: AVATAR_COLORS[idx % AVATAR_COLORS.length], color: "#fff", fontSize: size * 0.38, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid " + C.panelSurface, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

export function AvatarGroup({ people, size = 26 }: { people: string[]; size?: number }) {
  return (
    <div style={{ display: "flex" }}>
      {people.map((p, i) => (
        <div key={p} style={{ marginLeft: i === 0 ? 0 : -8 }}>
          <Avatar initials={p} idx={i} size={size} />
        </div>
      ))}
    </div>
  );
}

export function ProgressBar({ value, tone = "amber" }: { value: number; tone?: string }) {
  const map: Record<string, string> = { green: C.green, red: C.red, amber: C.amber, blue: C.blue };
  return (
    <div style={{ width: "100%", height: 6, background: C.panelLine, borderRadius: 20, overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: map[tone] ?? C.amber, borderRadius: 20 }} />
    </div>
  );
}

export function KpiCard({ label, value, delta, positive, sub }: { label: string; value: string; delta?: string; positive?: boolean; sub?: string }) {
  return (
    <div style={{ background: C.panelSurface, border: `1px solid ${C.panelLine}`, borderRadius: 14, padding: "18px 20px", minWidth: 160, flex: "1 1 160px" }}>
      <div style={{ fontSize: 12, color: C.gray, marginBottom: 10 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.01em" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: C.gray, marginTop: 3 }}>{sub}</div>}
      {delta && <div style={{ fontSize: 11.5, marginTop: 6, color: positive ? C.green : C.red, fontWeight: 500 }}>{positive ? "↑" : "↓"} {delta}</div>}
    </div>
  );
}

export function PanelTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", margin: 0, textTransform: "lowercase" }}>{children}</h2>
      {sub && <p style={{ fontSize: 13, color: C.gray, marginTop: 5 }}>{sub}</p>}
    </div>
  );
}

export function SearchBar({ placeholder, right }: { placeholder: string; right?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
      <div style={{ flex: "1 1 200px", display: "flex", alignItems: "center", gap: 8, background: C.panelSurface, border: `1px solid ${C.panelLine}`, borderRadius: 8, padding: "8px 12px", fontSize: 12.5, color: C.gray }}>
        <span>⌕</span> {placeholder}
      </div>
      {right}
    </div>
  );
}

export function SegmentTabs({ items, active, onChange }: { items: string[]; active: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "flex", gap: 3, background: C.panelSurface, border: `1px solid ${C.panelLine}`, borderRadius: 8, padding: 3, width: "fit-content" }}>
      {items.map(it => (
        <div key={it} onClick={() => onChange(it)} style={{ padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, textTransform: "lowercase", background: active === it ? C.panelBg : "transparent", color: active === it ? C.panelInk : C.gray, cursor: "pointer" }}>
          {it}
        </div>
      ))}
    </div>
  );
}

export function GhostBtn({ children, onClick, danger }: { children: React.ReactNode; onClick?: () => void; danger?: boolean }) {
  return (
    <button onClick={onClick} style={{ background: danger ? C.redBg : "transparent", border: `1px solid ${danger ? C.red : C.panelLine}`, color: danger ? C.red : C.panelInk, fontSize: 12, fontWeight: 600, padding: "7px 14px", borderRadius: 8, textTransform: "lowercase", cursor: "pointer", fontFamily: "inherit" }}>
      {children}
    </button>
  );
}

export function PrimaryBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ background: C.panelInk, color: "#fff", fontSize: 12, fontWeight: 600, padding: "7px 16px", borderRadius: 8, textTransform: "lowercase", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
      {children}
    </button>
  );
}

export function InfoRow({ k, v }: { k: string; v: string | number }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 12.5, borderBottom: `1px solid ${C.panelLine}` }}>
      <span style={{ color: C.gray, textTransform: "lowercase" }}>{k}</span>
      <span style={{ fontWeight: 500 }}>{v}</span>
    </div>
  );
}

export function Donut({ segments, total, label }: { segments: { value: number; color: string }[]; total: number; label: string }) {
  let acc = 0;
  const stops = segments.map(s => { const start = (acc / total) * 360; acc += s.value; const end = (acc / total) * 360; return `${s.color} ${start}deg ${end}deg`; });
  return (
    <div style={{ width: 100, height: 100, borderRadius: "50%", background: `conic-gradient(${stops.join(",")})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.panelSurface, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700 }}>{label}</div>
        <div style={{ fontSize: 9, color: C.gray }}>total</div>
      </div>
    </div>
  );
}

export function LegendRow({ color, text, pct }: { color: string; text: string; pct: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12 }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block" }} />
      <span>{text}</span>
      <span style={{ color: C.gray, marginLeft: "auto" }}>{pct}</span>
    </div>
  );
}

export function Pagination({ page = 1, total = 30, perPage = 6 }: { page?: number; total?: number; perPage?: number }) {
  const pages = Math.min(Math.ceil(total / perPage), 5);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px", fontSize: 12, color: C.gray }}>
      <span>mostrando {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} de {total}</span>
      <div style={{ display: "flex", gap: 3 }}>
        {Array.from({ length: pages }).map((_, i) => (
          <div key={i} style={{ width: 26, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11.5, fontWeight: 600, cursor: "pointer", background: i + 1 === page ? C.copper : "transparent", color: i + 1 === page ? "#fff" : C.panelInk, border: i + 1 === page ? "none" : `1px solid ${C.panelLine}` }}>
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
