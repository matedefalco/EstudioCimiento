"use client";
import { C } from "./constants";

// CSS var shortcuts — these are set by Dashboard on the content wrapper
const tc = {
  card:   "var(--tc-card)",
  border: "var(--tc-border)",
  sub:    "var(--tc-sub)",
  ink:    "var(--tc-ink)",
  soft:   "var(--tc-soft)",
  shadow: "var(--tc-shadow)",
};

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
    <div style={{ width: size, height: size, borderRadius: "50%", background: AVATAR_COLORS[idx % AVATAR_COLORS.length], color: "#fff", fontSize: size * 0.38, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${tc.card}`, flexShrink: 0 }}>
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
    <div style={{ width: "100%", height: 6, background: tc.border, borderRadius: 20, overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: map[tone] ?? C.amber, borderRadius: 20 }} />
    </div>
  );
}

export function KpiCard({ label, value, delta, positive, sub }: { label: string; value: string; delta?: string; positive?: boolean; sub?: string }) {
  return (
    <div style={{ background: tc.card, border: `1px solid ${tc.border}`, borderRadius: 14, padding: "18px 20px", minWidth: 160, flex: "1 1 160px", boxShadow: tc.shadow }}>
      <div style={{ fontSize: 12, color: tc.soft, marginBottom: 10 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.01em", color: tc.ink }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: tc.soft, marginTop: 3 }}>{sub}</div>}
      {delta && <div style={{ fontSize: 11.5, marginTop: 6, color: positive ? C.green : C.red, fontWeight: 500 }}>{positive ? "↑" : "↓"} {delta}</div>}
    </div>
  );
}

export function PanelTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", margin: 0, textTransform: "lowercase", color: tc.ink }}>{children}</h2>
      {sub && <p style={{ fontSize: 13, color: tc.soft, marginTop: 5 }}>{sub}</p>}
    </div>
  );
}

export function SearchBar({ placeholder, right }: { placeholder: string; right?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
      <div style={{ flex: "1 1 200px", display: "flex", alignItems: "center", gap: 8, background: tc.card, border: `1px solid ${tc.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 12.5, color: tc.soft }}>
        <span>⌕</span> {placeholder}
      </div>
      {right}
    </div>
  );
}

export function SubTabs({ items, active, onChange }: { items: string[]; active: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${tc.border}`, marginBottom: 24 }}>
      {items.map(it => (
        <div key={it} onClick={() => onChange(it)} style={{ padding: "10px 18px", fontSize: 13, fontWeight: 600, textTransform: "lowercase", color: active === it ? tc.ink : tc.soft, borderBottom: active === it ? `2px solid ${tc.ink}` : "2px solid transparent", cursor: "pointer", transition: "all 160ms", whiteSpace: "nowrap" }}>
          {it}
        </div>
      ))}
    </div>
  );
}

export function MiniBar({ data, color = C.copper }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 40 }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, height: `${(v / max) * 100}%`, background: color, borderRadius: "2px 2px 0 0", opacity: i === data.length - 1 ? 1 : 0.45 }} />
      ))}
    </div>
  );
}

export function EmptyState({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 24px", color: tc.soft, gap: 12 }}>
      <span style={{ fontSize: 32, opacity: 0.4 }}>{icon}</span>
      <span style={{ fontSize: 13 }}>{text}</span>
    </div>
  );
}

export function SegmentTabs({ items, active, onChange }: { items: string[]; active: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "flex", gap: 3, background: tc.card, border: `1px solid ${tc.border}`, borderRadius: 8, padding: 3, width: "fit-content" }}>
      {items.map(it => (
        <div key={it} onClick={() => onChange(it)} style={{ padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, textTransform: "lowercase", background: active === it ? tc.sub : "transparent", color: active === it ? tc.ink : tc.soft, cursor: "pointer" }}>
          {it}
        </div>
      ))}
    </div>
  );
}

export function GhostBtn({ children, onClick, danger }: { children: React.ReactNode; onClick?: () => void; danger?: boolean }) {
  return (
    <button onClick={onClick} style={{ background: danger ? C.redBg : "transparent", border: `1px solid ${danger ? C.red : tc.border}`, color: danger ? C.red : tc.ink, fontSize: 12, fontWeight: 600, padding: "7px 14px", borderRadius: 8, textTransform: "lowercase", cursor: "pointer", fontFamily: "inherit" }}>
      {children}
    </button>
  );
}

export function PrimaryBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ background: tc.ink, color: "var(--tc-card, #fff)", fontSize: 12, fontWeight: 600, padding: "7px 16px", borderRadius: 8, textTransform: "lowercase", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
      {children}
    </button>
  );
}

export function InfoRow({ k, v }: { k: string; v: string | number }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 12.5, borderBottom: `1px solid ${tc.border}` }}>
      <span style={{ color: tc.soft, textTransform: "lowercase" }}>{k}</span>
      <span style={{ fontWeight: 500, color: tc.ink }}>{v}</span>
    </div>
  );
}

export function Donut({ segments, total, label }: { segments: { value: number; color: string }[]; total: number; label: string }) {
  let acc = 0;
  const stops = segments.map(s => { const start = (acc / total) * 360; acc += s.value; const end = (acc / total) * 360; return `${s.color} ${start}deg ${end}deg`; });
  return (
    <div style={{ width: 100, height: 100, borderRadius: "50%", background: `conic-gradient(${stops.join(",")})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: tc.card, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: tc.ink }}>{label}</div>
        <div style={{ fontSize: 9, color: tc.soft }}>total</div>
      </div>
    </div>
  );
}

export function LegendRow({ color, text, pct }: { color: string; text: string; pct: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12 }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block" }} />
      <span style={{ color: tc.ink }}>{text}</span>
      <span style={{ color: tc.soft, marginLeft: "auto" }}>{pct}</span>
    </div>
  );
}

export function Pagination({ page = 1, total = 30, perPage = 6 }: { page?: number; total?: number; perPage?: number }) {
  const pages = Math.min(Math.ceil(total / perPage), 5);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px", fontSize: 12, color: tc.soft }}>
      <span>mostrando {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} de {total}</span>
      <div style={{ display: "flex", gap: 3 }}>
        {Array.from({ length: pages }).map((_, i) => (
          <div key={i} style={{ width: 26, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11.5, fontWeight: 600, cursor: "pointer", background: i + 1 === page ? C.copper : "transparent", color: i + 1 === page ? "#fff" : tc.ink, border: i + 1 === page ? "none" : `1px solid ${tc.border}` }}>
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
