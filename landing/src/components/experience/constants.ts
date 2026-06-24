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
  { id: "ops",     name: "tareas y operaciones", desc: "el día a día ordenado: qué hay que hacer, quién y cuándo.", glyph: "▤" },
  { id: "fin",     name: "finanzas",              desc: "ingresos, gastos y números claros sin pelear con el excel.", glyph: "◆" },
  { id: "stock",   name: "stock",                 desc: "qué tenés, qué falta y qué se mueve, en un solo lugar.", glyph: "▦" },
  { id: "clients", name: "cotizador para tus clientes", desc: "lo mismo que estás viviendo ahora, para ofrecerle a los tuyos.", glyph: "◇" },
];

export const RUBRO_OPTIONS = [
  { id: "gastronomy",    label: "gastronomía y alimentos",   glyph: "◈" },
  { id: "services",      label: "servicios profesionales",   glyph: "◉" },
  { id: "retail",        label: "comercio y retail",         glyph: "◇" },
  { id: "construction",  label: "construcción y oficios",    glyph: "△" },
  { id: "health",        label: "salud y bienestar",         glyph: "◯" },
  { id: "other",         label: "otro rubro",                glyph: "▷" },
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
  { id: "starting",  label: "recién arrancando, quiero ordenarme desde el principio" },
  { id: "growing",   label: "estoy creciendo y el desorden me empieza a costar" },
  { id: "crisis",    label: "necesito resolver esto urgente" },
  { id: "optimize",  label: "ya tengo algo pero quiero mejorar lo que funciona" },
];

export const SIZE_OPTIONS = [
  { id: "solo",  label: "solo yo" },
  { id: "small", label: "2 a 5 personas" },
  { id: "mid",   label: "6 a 15 personas" },
];

export const BRAND_COLORS = [
  { id: "copper",  label: "cobre",   hex: "#D89149" },
  { id: "blue",    label: "azul",    hex: "#3E6FA8" },
  { id: "green",   label: "verde",   hex: "#3E8460" },
  { id: "purple",  label: "violeta", hex: "#6B5B95" },
  { id: "red",     label: "rojo",    hex: "#B5524A" },
  { id: "slate",   label: "pizarra", hex: "#607080" },
];

export interface InterfaceStyle {
  id: string;
  label: string;
  desc: string;
  sidebarBg: string;
  sidebarText: string;
  sidebarTextSoft: string;
  contentBg: string;
  cardBg: string;
  cardSubBg: string;
  borderColor: string;
  ink: string;
  inkSoft: string;
  shadow: string;
}

export const INTERFACE_STYLES: InterfaceStyle[] = [
  {
    id: "elegante",
    label: "elegante",
    desc: "sidebar oscuro, paneles cálidos",
    sidebarBg: "#1E2530",
    sidebarText: "#F2F0EA",
    sidebarTextSoft: "#8A93A0",
    contentBg: "#F4F0E8",
    cardBg: "#FFFFFF",
    cardSubBg: "#F4F0E8",
    borderColor: "#E7E1D3",
    ink: "#1C1E22",
    inkSoft: "#7A7468",
    shadow: "0 2px 12px rgba(180,140,80,0.06)",
  },
  {
    id: "sofisticado",
    label: "sofisticado",
    desc: "dark full, denso, sin distracciones",
    sidebarBg: "#0F1419",
    sidebarText: "#E8E8E8",
    sidebarTextSoft: "#6B7280",
    contentBg: "#1A2130",
    cardBg: "#232D3A",
    cardSubBg: "#1A2130",
    borderColor: "rgba(255,255,255,0.08)",
    ink: "#E8E8E8",
    inkSoft: "#8A93A0",
    shadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
  {
    id: "simple",
    label: "simple",
    desc: "todo claro, minimalista, sin sombras",
    sidebarBg: "#F0EEE9",
    sidebarText: "#1C1E22",
    sidebarTextSoft: "#8A8276",
    contentBg: "#F7F6F3",
    cardBg: "#FFFFFF",
    cardSubBg: "#F0EEE9",
    borderColor: "#E2E0D9",
    ink: "#1C1E22",
    inkSoft: "#7A7468",
    shadow: "none",
  },
  {
    id: "profesional",
    label: "profesional",
    desc: "sidebar slate, bordes definidos",
    sidebarBg: "#2D3748",
    sidebarText: "#F7FAFC",
    sidebarTextSoft: "#A0AEC0",
    contentBg: "#F0F2F5",
    cardBg: "#FFFFFF",
    cardSubBg: "#F0F2F5",
    borderColor: "#CBD5E0",
    ink: "#1A202C",
    inkSoft: "#718096",
    shadow: "none",
  },
];

export function getInterfaceStyle(id: string): InterfaceStyle {
  return INTERFACE_STYLES.find(s => s.id === id) ?? INTERFACE_STYLES[0];
}

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
  { n: "04", title: "traspaso",     desc: "te dejamos manejándolo solo. ese es el verdadero diferencial." },
];

export const SECTION_META: Record<string, { label: string; glyph: string }> = {
  resumen: { label: "resumen",            glyph: "◆" },
  ops:     { label: "tareas y ops",       glyph: "▤" },
  fin:     { label: "finanzas",           glyph: "◆" },
  stock:   { label: "stock",              glyph: "▦" },
  clients: { label: "cotizador clientes", glyph: "◇" },
};

export const STOCK_ITEMS = [
  { id: "KMI-1001", name: "insumo A", cat: "materia prima", price: "$4.200", qty: 240, status: "activo",      tone: "green",  depots: [{ d: "depósito A", q: 140 }, { d: "depósito B", q: 80 }, { d: "depósito C", q: 20 }],  critical: 50,  supplier: "proveedor norte", date: "03/05/2024", color: "#E2EAF2" },
  { id: "KMI-1002", name: "insumo B", cat: "repuesto",      price: "$1.850", qty: 12,  status: "bajo mínimo", tone: "red",    depots: [{ d: "depósito A", q: 8  }, { d: "depósito B", q: 4  }],                               critical: 30,  supplier: "proveedor sur",   date: "11/02/2024", color: "#F3E3E0" },
  { id: "KMI-1003", name: "insumo C", cat: "materia prima", price: "$2.600", qty: 86,  status: "activo",      tone: "green",  depots: [{ d: "depósito A", q: 50 }, { d: "depósito B", q: 36 }],                               critical: 25,  supplier: "proveedor norte", date: "22/01/2024", color: "#E3EFE6" },
  { id: "KMI-1004", name: "insumo D", cat: "repuesto",      price: "$3.100", qty: 4,   status: "bajo mínimo", tone: "red",    depots: [{ d: "depósito A", q: 4  }],                                                           critical: 15,  supplier: "proveedor este",  date: "30/03/2024", color: "#F1E7D3" },
  { id: "KMI-1005", name: "insumo E", cat: "empaque",       price: "$640",   qty: 58,  status: "atención",    tone: "amber",  depots: [{ d: "depósito A", q: 30 }, { d: "depósito B", q: 28 }],                               critical: 60,  supplier: "proveedor sur",   date: "14/04/2024", color: "#E9E5F0" },
];
