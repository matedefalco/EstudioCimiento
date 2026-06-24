"use client";
import { C } from "../constants";
import { KpiCard, PanelTitle } from "../primitives";

const kpis: Record<string, { label: string; value: string; delta: string; positive: boolean }> = {
  ops:     { label: "tareas abiertas",        value: "12",    delta: "3 esta semana",   positive: false },
  fin:     { label: "balance del mes",         value: "$842k", delta: "12% vs anterior", positive: true  },
  stock:   { label: "ítems bajo mínimo",       value: "4",     delta: "atención",        positive: false },
  clients: { label: "cotizaciones generadas",  value: "27",    delta: "8 esta semana",   positive: true  },
};

export function PanelResumen({ selected }: { selected: string[] }) {
  return (
    <div>
      <PanelTitle sub="así arranca tu sistema cada vez que entrás.">resumen</PanelTitle>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
        {selected.map(id => <KpiCard key={id} {...kpis[id]} />)}
      </div>
      <div style={{ background: C.panelSurface, border: `1px solid ${C.panelLine}`, borderRadius: 14, padding: 20 }}>
        <div style={{ fontSize: 13, color: C.gray, lineHeight: 1.6 }}>
          esto es exactamente lo que ves apenas entrás: tu negocio, ordenado, sin abrir cinco pestañas distintas. elegí una sección del costado para explorarla.
        </div>
      </div>
    </div>
  );
}
