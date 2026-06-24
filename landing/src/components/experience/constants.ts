export const C = {
  steel: "#1E2530",
  surface: "#2A323F",
  copper: "#D89149",
  grayCold: "#8A93A0",
  cream: "#F2F0EA",
  line: "rgba(242,240,234,0.10)",
  lineStrong: "rgba(242,240,234,0.18)",
  panelBg: "#F4F0E8",
  panelSurface: "#FFFFFF",
  panelInk: "#1C1E22",
  panelLine: "#E7E1D3",
  green: "#3E8460",
  greenBg: "#E3EFE6",
  red: "#B5524A",
  redBg: "#F3E3E0",
  amber: "#B5863C",
  amberBg: "#F1E7D3",
  blue: "#3E6FA8",
  blueBg: "#E2EAF2",
  purple: "#6B5B95",
  purpleBg: "#E9E5F0",
  gray: "#7A7468",
  grayBg: "#EAE5D9",
};

export const COMPONENTS = [
  { id: "ops",     name: "operaciones",           desc: "el día a día organizado: quién hace qué, y para cuándo.", glyph: "▤" },
  { id: "fin",     name: "finanzas",              desc: "ingresos, egresos y números claros, sin pelear con el excel.", glyph: "◆" },
  { id: "stock",   name: "stock",                 desc: "qué tenés, qué falta y qué se mueve, en un solo lugar.", glyph: "▦" },
  { id: "clients", name: "cotizador para tus clientes", desc: "lo mismo que estás viviendo ahora, para ofrecerle a los tuyos.", glyph: "◇" },
];

export const RUBRO_OPTIONS = [
  { id: "freelance",      label: "freelance y consultores",    glyph: "◎" },
  { id: "contenido",      label: "creadores de contenido",     glyph: "◈" },
  { id: "produccion",     label: "producción y eventos",       glyph: "△" },
  { id: "emprendimiento", label: "emprendedores y startups",   glyph: "◉" },
  { id: "agencia",        label: "agencias y estudios",        glyph: "◇" },
  { id: "servicios",      label: "servicios profesionales",    glyph: "◯" },
];

export const MODALIDAD_OPTIONS = [
  { id: "physical", label: "local físico" },
  { id: "online",   label: "100% online" },
  { id: "hybrid",   label: "físico y online" },
];

export const TOOLS_OPTIONS = [
  { id: "paper",    label: "papel o cuaderno" },
  { id: "excel",    label: "excel / google sheets" },
  { id: "whatsapp", label: "whatsapp y grupos" },
  { id: "notion",   label: "notion" },
  { id: "gsuite",   label: "google workspace" },
  { id: "erp",      label: "sistema erp o similar" },
  { id: "none",     label: "nada todavía" },
];

export const URGENCIA_OPTIONS = [
  { id: "starting",  label: "arrancando, quiero hacerlo bien desde el día uno" },
  { id: "growing",   label: "creciendo, el desorden ya me está costando" },
  { id: "crisis",    label: "en crisis, necesito orden ahora" },
  { id: "optimize",  label: "funcionando, quiero subir el nivel" },
];

export const SIZE_OPTIONS = [
  { id: "solo",  label: "solo yo" },
  { id: "small", label: "2 a 5 personas" },
  { id: "mid",   label: "6 a 15 personas" },
];

import { PALETTES, STYLE_CONFIGS } from "@/lib/palettes";

// Palettes re-exported for the QuoteFlow color picker
export const BRAND_COLORS = PALETTES.map(p => ({
  id: p.id,
  label: p.label,
  accent: p.light.accent,
  sidebarBg: p.dark.sidebarBg,
  contentBg: p.light.bg,
  cardBg: p.light.surface,
  borderColor: p.light.border,
}));

// Interface styles re-exported for the QuoteFlow style picker
export const INTERFACE_STYLES = STYLE_CONFIGS;

export const FONT_PRESETS = [
  { id: "inter",   label: "inter",        desc: "técnica · neutral",      var: "var(--font-inter)"   },
  { id: "jakarta", label: "plus jakarta", desc: "moderna · cálida",       var: "var(--font-jakarta)" },
  { id: "sora",    label: "sora",         desc: "geométrica · amigable",  var: "var(--font-sora)"    },
];

export function getSuggestedModules(rubro: string | null, urgencia: string | null): string[] {
  const suggestions: string[] = [];
  if (urgencia === "crisis") suggestions.push("ops");
  if (rubro === "gastronomy" || rubro === "retail") {
    if (!suggestions.includes("stock")) suggestions.push("stock");
    if (!suggestions.includes("ops")) suggestions.push("ops");
  } else if (rubro === "services" || rubro === "construction") {
    suggestions.push("clients");
    if (!suggestions.includes("ops")) suggestions.push("ops");
  } else if (rubro === "health") {
    suggestions.push("clients");
    if (!suggestions.includes("fin")) suggestions.push("fin");
  }
  if (suggestions.length === 0) suggestions.push("ops");
  return suggestions;
}

// kept for backward compat
export const TODAY_OPTIONS = [
  { id: "hand",  label: "a mano o en papel" },
  { id: "excel", label: "en un excel que me quedó corto" },
  { id: "mix",   label: "varias herramientas sueltas" },
  { id: "none",  label: "todavía no organizo nada" },
];

export const PAIN_OPTIONS = [
  { id: "ops",     label: "coordinar al equipo y las tareas del día" },
  { id: "fin",     label: "cobrar, pagar y entender los números" },
  { id: "stock",   label: "saber qué tengo y qué se está terminando" },
  { id: "clients", label: "armar cotizaciones para mis propios clientes" },
];

export const FASES = [
  { n: "01", title: "relevamiento", desc: "entendemos cómo funciona hoy tu negocio, sin asumir nada." },
  { n: "02", title: "desarrollo",   desc: "construimos el sistema a tu medida, no una plantilla genérica." },
  { n: "03", title: "validación",   desc: "lo probamos juntos y ajustamos lo que haga falta." },
  { n: "04", title: "traspaso",     desc: "te dejamos manejándolo vos solo, ese es el verdadero diferencial." },
];

export const SECTION_META: Record<string, { label: string; glyph: string }> = {
  resumen: { label: "resumen",       glyph: "◆" },
  ops:     { label: "operaciones",   glyph: "▤" },
  fin:     { label: "finanzas",      glyph: "◆" },
  stock:   { label: "stock",         glyph: "▦" },
  clients: { label: "cotizaciones",  glyph: "◇" },
};

export const STOCK_ITEMS = [
  { id: "KMI-1001", name: "insumo A", cat: "materia prima", price: "$4.200", qty: 240, status: "activo",      tone: "green",  depots: [{ d: "depósito A", q: 140 }, { d: "depósito B", q: 80 }, { d: "depósito C", q: 20 }],  critical: 50,  supplier: "proveedor norte", date: "03/05/2024", color: "#E2EAF2" },
  { id: "KMI-1002", name: "insumo B", cat: "repuesto",      price: "$1.850", qty: 12,  status: "bajo mínimo", tone: "red",    depots: [{ d: "depósito A", q: 8  }, { d: "depósito B", q: 4  }],                               critical: 30,  supplier: "proveedor sur",   date: "11/02/2024", color: "#F3E3E0" },
  { id: "KMI-1003", name: "insumo C", cat: "materia prima", price: "$2.600", qty: 86,  status: "activo",      tone: "green",  depots: [{ d: "depósito A", q: 50 }, { d: "depósito B", q: 36 }],                               critical: 25,  supplier: "proveedor norte", date: "22/01/2024", color: "#E3EFE6" },
  { id: "KMI-1004", name: "insumo D", cat: "repuesto",      price: "$3.100", qty: 4,   status: "bajo mínimo", tone: "red",    depots: [{ d: "depósito A", q: 4  }],                                                           critical: 15,  supplier: "proveedor este",  date: "30/03/2024", color: "#F1E7D3" },
  { id: "KMI-1005", name: "insumo E", cat: "empaque",       price: "$640",   qty: 58,  status: "atención",    tone: "amber",  depots: [{ d: "depósito A", q: 30 }, { d: "depósito B", q: 28 }],                               critical: 60,  supplier: "proveedor sur",   date: "14/04/2024", color: "#E9E5F0" },
];
