"use client";
import { useState } from "react";
import { C } from "../constants";
import { Chip, Avatar, KpiCard, PanelTitle, SubTabs, PrimaryBtn, ProgressBar } from "../primitives";
import { useIsMobile } from "@/hooks/useIsMobile";

// ── datos de muestra ──────────────────────────────────────────────────────────

const TURNOS = [
  { dia: "lun 23", hora: "09:00", cliente: "Valeria Ruiz",    tipo: "consultoría inicial",   duracion: "1h",    estado: "confirmado" },
  { dia: "lun 23", hora: "11:00", cliente: "Marcos Altieri",  tipo: "sesión de seguimiento", duracion: "45min", estado: "confirmado" },
  { dia: "mar 24", hora: "10:00", cliente: "Sofía Mendoza",   tipo: "reunión de cierre",     duracion: "1.5h",  estado: "pendiente"  },
  { dia: "mar 24", hora: "14:30", cliente: "Julián Ferraro",  tipo: "consultoría inicial",   duracion: "1h",    estado: "confirmado" },
  { dia: "mié 25", hora: "09:30", cliente: "Laura Bernal",    tipo: "sesión de seguimiento", duracion: "30min", estado: "confirmado" },
  { dia: "mié 25", hora: "16:00", cliente: "Diego Ríos",      tipo: "consultoría inicial",   duracion: "1h",    estado: "cancelado"  },
  { dia: "jue 26", hora: "10:00", cliente: "Ana Villanueva",  tipo: "sesión de seguimiento", duracion: "45min", estado: "pendiente"  },
  { dia: "vie 27", hora: "11:30", cliente: "Pablo Castillo",  tipo: "reunión de cierre",     duracion: "1h",    estado: "confirmado" },
];

type FranjaEstado = "disponible" | "ocupada" | "bloqueada";

interface Franja {
  estado: FranjaEstado;
  turnos?: number;
}

interface DiaDispo {
  dia: string;
  manana: Franja;
  tarde: Franja;
}

const DISPONIBILIDAD: DiaDispo[] = [
  { dia: "lun", manana: { estado: "ocupada",    turnos: 2 }, tarde: { estado: "disponible"             } },
  { dia: "mar", manana: { estado: "disponible"             }, tarde: { estado: "ocupada",    turnos: 2 } },
  { dia: "mié", manana: { estado: "ocupada",    turnos: 1 }, tarde: { estado: "bloqueada"              } },
  { dia: "jue", manana: { estado: "disponible"             }, tarde: { estado: "disponible"             } },
  { dia: "vie", manana: { estado: "disponible"             }, tarde: { estado: "bloqueada"              } },
];

const SERVICIOS = [
  { nombre: "consultoría inicial",    pct: 78, tone: "blue"   },
  { nombre: "sesión de seguimiento",  pct: 62, tone: "green"  },
  { nombre: "reunión de cierre",      pct: 38, tone: "amber"  },
];

const BARS_DATA = [4, 7, 5, 8, 3];
const DIAS_SEMANA = ["lun", "mar", "mié", "jue", "vie"];

// ── helpers ───────────────────────────────────────────────────────────────────

const ESTADO_TONE: Record<string, "green" | "amber" | "red"> = {
  confirmado: "green",
  pendiente:  "amber",
  cancelado:  "red",
};

function initials(nombre: string) {
  return nombre.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase();
}

// ── sub-componentes ───────────────────────────────────────────────────────────

function TurnoRow({ t, idx }: { t: typeof TURNOS[0]; idx: number }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      background: "var(--tc-card)",
      border: "1px solid var(--tc-border)",
      borderRadius: 10,
      padding: "12px 16px",
      flexWrap: "wrap",
    }}>
      {/* hora + día */}
      <div style={{ minWidth: 90 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--tc-ink)", letterSpacing: "-0.01em" }}>{t.hora}</div>
        <div style={{ fontSize: 11, color: "var(--tc-soft)", marginTop: 1 }}>{t.dia}</div>
      </div>

      {/* avatar + cliente */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "1 1 140px", minWidth: 140 }}>
        <Avatar initials={initials(t.cliente)} idx={idx} size={28} />
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--tc-ink)" }}>{t.cliente}</div>
          <div style={{ fontSize: 11, color: "var(--tc-soft)", marginTop: 1 }}>{t.tipo}</div>
        </div>
      </div>

      {/* duración */}
      <div style={{ fontSize: 11.5, color: "var(--tc-soft)", minWidth: 40, textAlign: "center" }}>
        {t.duracion}
      </div>

      {/* estado */}
      <div style={{ marginLeft: "auto" }}>
        <Chip text={t.estado} tone={ESTADO_TONE[t.estado] ?? "gray"} />
      </div>
    </div>
  );
}

function FranjaCell({ franja, label }: { franja: Franja; label: string }) {
  const estilos: Record<FranjaEstado, React.CSSProperties> = {
    disponible: {
      background: "var(--tc-sub)",
      border: `1.5px dashed ${C.green}`,
      color: C.green,
    },
    ocupada: {
      background: "rgba(181,82,74,0.08)",
      border: `1px solid rgba(181,82,74,0.25)`,
      color: C.red,
    },
    bloqueada: {
      background: "var(--tc-border)",
      border: "1px solid transparent",
      color: "var(--tc-soft)",
    },
  };

  const textos: Record<FranjaEstado, string> = {
    disponible: "libre",
    ocupada:    `${franja.turnos} turno${franja.turnos !== 1 ? "s" : ""}`,
    bloqueada:  "no disponible",
  };

  return (
    <div style={{
      borderRadius: 8,
      padding: "10px 10px 8px",
      ...estilos[franja.estado],
      display: "flex",
      flexDirection: "column",
      gap: 4,
    }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", opacity: 0.7 }}>{label}</div>
      <div style={{ fontSize: 12, fontWeight: 600 }}>{textos[franja.estado]}</div>
    </div>
  );
}

function BarChart() {
  const max = Math.max(...BARS_DATA);
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--tc-soft)", marginBottom: 12 }}>
        turnos por día — semana actual
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 90 }}>
        {BARS_DATA.map((v, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%" }}>
            <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
              <div style={{
                width: "100%",
                height: `${(v / max) * 100}%`,
                background: i === 1 || i === 3 ? "var(--tc-accent, " + C.copper + ")" : "var(--tc-border)",
                borderRadius: "4px 4px 0 0",
                position: "relative",
                transition: "height 300ms ease",
              }}>
                <span style={{
                  position: "absolute",
                  top: -18,
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: "var(--tc-ink)",
                  whiteSpace: "nowrap",
                }}>{v}</span>
              </div>
            </div>
            <div style={{ fontSize: 10.5, color: "var(--tc-soft)", textAlign: "center" }}>{DIAS_SEMANA[i]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── panel principal ───────────────────────────────────────────────────────────

export function PanelAgenda() {
  const isMobile = useIsMobile();
  const [tab, setTab] = useState("próximos turnos");

  return (
    <div>
      {/* header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <PanelTitle sub="tus turnos y disponibilidad, sin ir y venir por whatsapp.">
          agenda
        </PanelTitle>
        {tab === "próximos turnos" && (
          <PrimaryBtn>+ agendar turno</PrimaryBtn>
        )}
      </div>

      <SubTabs
        items={["próximos turnos", "disponibilidad", "estadísticas"]}
        active={tab}
        onChange={setTab}
      />

      {/* ── tab: próximos turnos ─────────────────────────────────────────── */}
      {tab === "próximos turnos" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {TURNOS.map((t, i) => (
            <TurnoRow key={i} t={t} idx={i} />
          ))}
        </div>
      )}

      {/* ── tab: disponibilidad ──────────────────────────────────────────── */}
      {tab === "disponibilidad" && (
        <div>
          <div style={{ fontSize: 12, color: "var(--tc-soft)", marginBottom: 16, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, border: `1.5px dashed ${C.green}`, background: "var(--tc-sub)" }} />
              disponible
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: "rgba(181,82,74,0.2)" }} />
              con turnos
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: "var(--tc-border)" }} />
              bloqueada
            </span>
          </div>

          <div style={{ display: isMobile ? "flex" : "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, overflowX: isMobile ? "auto" : "visible" }}>
            {/* minWidth per column on mobile so days don't crush */}

            {DISPONIBILIDAD.map((d) => (
              <div key={d.dia} style={isMobile ? { minWidth: 110, flexShrink: 0 } : {}}>
                <div style={{
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "lowercase",
                  color: "var(--tc-ink)",
                  textAlign: "center",
                  marginBottom: 8,
                  paddingBottom: 6,
                  borderBottom: "1px solid var(--tc-border)",
                }}>
                  {d.dia}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <FranjaCell franja={d.manana} label="9 – 13" />
                  <FranjaCell franja={d.tarde}  label="14 – 18" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── tab: estadísticas ────────────────────────────────────────────── */}
      {tab === "estadísticas" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* kpis */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <KpiCard label="turnos esta semana" value="12"    delta="2 más que la semana pasada" positive />
            <KpiCard label="tasa de asistencia" value="87%"   delta="3% vs mes anterior"         positive />
            <KpiCard label="cancelaciones"       value="2"    sub="últimos 7 días" />
            <KpiCard label="tiempo promedio"     value="45 min" sub="por turno" />
          </div>

          {/* gráfico de barras */}
          <div style={{
            background: "var(--tc-card)",
            border: "1px solid var(--tc-border)",
            borderRadius: 14,
            padding: "20px 22px",
          }}>
            <BarChart />
          </div>

          {/* tipos de servicio */}
          <div style={{
            background: "var(--tc-card)",
            border: "1px solid var(--tc-border)",
            borderRadius: 14,
            padding: "20px 22px",
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--tc-soft)", marginBottom: 16 }}>
              tipos de servicio más agendados
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {SERVICIOS.map((s) => (
                <div key={s.nombre}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 12.5, color: "var(--tc-ink)", fontWeight: 500 }}>{s.nombre}</span>
                    <span style={{ fontSize: 12, color: "var(--tc-soft)" }}>{s.pct}%</span>
                  </div>
                  <ProgressBar value={s.pct} tone={s.tone as "blue" | "green" | "amber"} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
