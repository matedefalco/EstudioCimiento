export interface PaletteTokens {
  bg: string;
  surface: string;
  sub: string;
  border: string;
  ink: string;
  soft: string;
  accent: string;
  accentFg: string;
  sidebarBg: string;
  sidebarText: string;
  sidebarSoft: string;
  shadow: string;
}

export interface Palette {
  id: string;
  label: string;
  light: PaletteTokens;
  dark: PaletteTokens;
}

export interface StyleConfig {
  id: string;
  label: string;
  desc: string;
  contentMode: "light" | "dark";
  sidebarDark: boolean;
  radius: string;
  useShadow: boolean;
}

export const PALETTES: Palette[] = [
  {
    id: "copper", label: "cobre",
    light: {
      bg: "#F9F5EF", surface: "#FFFFFF", sub: "#F4F0E8", border: "#E8E0D0",
      ink: "#1C1A15", soft: "#8A7A65", accent: "#C87A35", accentFg: "#FFFFFF",
      sidebarBg: "#1E1710", sidebarText: "#F2EDE5", sidebarSoft: "#8A7A65",
      shadow: "0 2px 12px rgba(180,120,50,0.10)",
    },
    dark: {
      bg: "#18120A", surface: "#22180E", sub: "#18120A", border: "rgba(200,122,53,0.16)",
      ink: "#F2EDE5", soft: "#9A8A75", accent: "#D89149", accentFg: "#1C1A15",
      sidebarBg: "#0E0C08", sidebarText: "#F2EDE5", sidebarSoft: "#8A7A65",
      shadow: "0 2px 12px rgba(0,0,0,0.45)",
    },
  },
  {
    id: "blue", label: "azul",
    light: {
      bg: "#F0F5FB", surface: "#FFFFFF", sub: "#E8EFF8", border: "#C8D8EE",
      ink: "#0F1E35", soft: "#5A7090", accent: "#3E6FA8", accentFg: "#FFFFFF",
      sidebarBg: "#0F1E35", sidebarText: "#E8EFF8", sidebarSoft: "#7A95B0",
      shadow: "0 2px 12px rgba(30,80,150,0.10)",
    },
    dark: {
      bg: "#0A1220", surface: "#0F1E35", sub: "#0A1220", border: "rgba(62,111,168,0.2)",
      ink: "#E8EFF8", soft: "#7A95B0", accent: "#5B8CC8", accentFg: "#0F1E35",
      sidebarBg: "#070D18", sidebarText: "#E8EFF8", sidebarSoft: "#7A95B0",
      shadow: "0 2px 12px rgba(0,0,0,0.45)",
    },
  },
  {
    id: "green", label: "verde",
    light: {
      bg: "#F0F8F3", surface: "#FFFFFF", sub: "#E5F2EB", border: "#C0E0CE",
      ink: "#0A2018", soft: "#4A7560", accent: "#3E8460", accentFg: "#FFFFFF",
      sidebarBg: "#0A2018", sidebarText: "#E5F2EB", sidebarSoft: "#6A9A78",
      shadow: "0 2px 12px rgba(30,100,60,0.10)",
    },
    dark: {
      bg: "#081510", surface: "#0A2018", sub: "#081510", border: "rgba(62,132,96,0.2)",
      ink: "#E5F2EB", soft: "#6A9A78", accent: "#52A478", accentFg: "#081510",
      sidebarBg: "#060E0A", sidebarText: "#E5F2EB", sidebarSoft: "#6A9A78",
      shadow: "0 2px 12px rgba(0,0,0,0.45)",
    },
  },
  {
    id: "purple", label: "violeta",
    light: {
      bg: "#F5F3FB", surface: "#FFFFFF", sub: "#EDE8F8", border: "#D5CCF0",
      ink: "#1A1435", soft: "#6A5A90", accent: "#6B5B95", accentFg: "#FFFFFF",
      sidebarBg: "#1A1435", sidebarText: "#EDE8F8", sidebarSoft: "#8A78C0",
      shadow: "0 2px 12px rgba(80,60,130,0.10)",
    },
    dark: {
      bg: "#110E20", surface: "#1A1435", sub: "#110E20", border: "rgba(107,91,149,0.2)",
      ink: "#EDE8F8", soft: "#9A88C0", accent: "#8B7BB5", accentFg: "#110E20",
      sidebarBg: "#0C0A18", sidebarText: "#EDE8F8", sidebarSoft: "#8A78C0",
      shadow: "0 2px 12px rgba(0,0,0,0.45)",
    },
  },
  {
    id: "red", label: "rojo",
    light: {
      bg: "#FBF2F1", surface: "#FFFFFF", sub: "#F5E8E6", border: "#EECCC8",
      ink: "#280E0C", soft: "#8A5A55", accent: "#B5524A", accentFg: "#FFFFFF",
      sidebarBg: "#280E0C", sidebarText: "#F5E8E6", sidebarSoft: "#B08880",
      shadow: "0 2px 12px rgba(130,40,35,0.10)",
    },
    dark: {
      bg: "#1E0A08", surface: "#280E0C", sub: "#1E0A08", border: "rgba(181,82,74,0.2)",
      ink: "#F5E8E6", soft: "#C08878", accent: "#D56A62", accentFg: "#1E0A08",
      sidebarBg: "#140806", sidebarText: "#F5E8E6", sidebarSoft: "#B08880",
      shadow: "0 2px 12px rgba(0,0,0,0.45)",
    },
  },
  {
    id: "slate", label: "pizarra",
    light: {
      bg: "#F2F4F6", surface: "#FFFFFF", sub: "#E8EDF2", border: "#D0D8E0",
      ink: "#1A2230", soft: "#5A6878", accent: "#607080", accentFg: "#FFFFFF",
      sidebarBg: "#2D3748", sidebarText: "#F0F4F8", sidebarSoft: "#9AB0C0",
      shadow: "none",
    },
    dark: {
      bg: "#0F1520", surface: "#1A2230", sub: "#0F1520", border: "rgba(96,112,128,0.2)",
      ink: "#F0F4F8", soft: "#8A98A8", accent: "#8098B0", accentFg: "#0F1520",
      sidebarBg: "#0A1018", sidebarText: "#F0F4F8", sidebarSoft: "#8A98A8",
      shadow: "0 2px 12px rgba(0,0,0,0.45)",
    },
  },
];

export const STYLE_CONFIGS: StyleConfig[] = [
  { id: "elegante",    label: "elegante",    desc: "sidebar oscuro, paneles cálidos", contentMode: "light", sidebarDark: true,  radius: "12px", useShadow: true  },
  { id: "sofisticado", label: "sofisticado", desc: "dark completo, sin distracciones", contentMode: "dark",  sidebarDark: true,  radius: "4px",  useShadow: true  },
  { id: "simple",      label: "simple",      desc: "todo claro, sin sombras",          contentMode: "light", sidebarDark: false, radius: "8px",  useShadow: false },
  { id: "profesional", label: "profesional", desc: "bordes definidos, compacto",       contentMode: "light", sidebarDark: true,  radius: "6px",  useShadow: false },
];

export function getPalette(id: string): Palette {
  return PALETTES.find(p => p.id === id) ?? PALETTES[0];
}

export function getStyleConfig(id: string): StyleConfig {
  return STYLE_CONFIGS.find(s => s.id === id) ?? STYLE_CONFIGS[0];
}

export function resolveThemeVars(
  paletteId: string,
  styleId: string,
  fontVar: string
): Record<string, string> {
  const palette = getPalette(paletteId);
  const style = getStyleConfig(styleId);

  const content = style.contentMode === "dark" ? palette.dark : palette.light;
  const sidebar = style.sidebarDark ? palette.dark : palette.light;

  return {
    "--tc-bg":           content.bg,
    "--tc-card":         content.surface,
    "--tc-sub":          content.sub,
    "--tc-border":       content.border,
    "--tc-ink":          content.ink,
    "--tc-soft":         content.soft,
    "--tc-accent":       content.accent,
    "--tc-accent-fg":    content.accentFg,
    "--tc-shadow":       style.useShadow ? content.shadow : "none",
    "--tc-r":            style.radius,
    "--tc-sidebar":      sidebar.sidebarBg,
    "--tc-sidebar-text": sidebar.sidebarText,
    "--tc-sidebar-soft": sidebar.sidebarSoft,
    "--font-sans":       fontVar,
  };
}
