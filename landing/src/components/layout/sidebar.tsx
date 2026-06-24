"use client";

import { cn } from "@/lib/utils";
import type { ModuleId } from "@/types";

interface SectionMeta {
  label: string;
  glyph: string;
}

const SECTION_META: Record<string, SectionMeta> = {
  resumen:  { label: "resumen",           glyph: "◆" },
  ops:      { label: "tareas",            glyph: "▤" },
  fin:      { label: "finanzas",          glyph: "◆" },
  stock:    { label: "stock",             glyph: "▦" },
  clients:  { label: "cotizador",         glyph: "◇" },
};

interface SidebarProps {
  items: string[];
  active: string;
  onSelect: (id: string) => void;
  onReset: () => void;
}

export function Sidebar({ items, active, onSelect, onReset }: SidebarProps) {
  return (
    <aside className="w-[220px] bg-steel border-r border-white/10 flex flex-col py-6 flex-shrink-0">
      <div className="flex items-center gap-2.5 px-[18px] mb-7">
        <span className="text-[13px]">
          estudio <strong className="font-semibold">cimiento</strong>
        </span>
      </div>

      <p className="px-[18px] mb-1.5 text-[10px] tracking-[0.22em] text-grayCold lowercase">
        tu sistema
      </p>

      <nav className="flex flex-col gap-0.5 px-2.5 flex-1">
        {items.map((id) => {
          const meta = SECTION_META[id];
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-2.5 rounded-md text-left transition-colors text-[12.5px] lowercase w-full",
                isActive
                  ? "bg-copper/20 text-copper"
                  : "text-cream hover:bg-copper/10"
              )}
            >
              <span className="w-4 text-[13px]">{meta?.glyph}</span>
              <span>{meta?.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-[18px] mt-4">
        <button
          onClick={onReset}
          className="w-full bg-transparent text-grayCold text-[11.5px] py-2.5 border border-white/20 rounded lowercase tracking-wide hover:border-copper/50 transition-colors"
        >
          volver a empezar
        </button>
      </div>
    </aside>
  );
}
