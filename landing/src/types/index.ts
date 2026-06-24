export type LeadStatus = "new" | "contacted" | "qualified" | "closed";

export interface QuoteState {
  rubro: string | null;
  modalidad: string | null;
  tools: string[];
  urgencia: string | null;
  selected: string[];
  size: string | null;
  brandName: string;
  palette: string;        // palette id: "copper" | "blue" | "green" | "purple" | "red" | "slate"
  interfaceStyle: string; // "elegante" | "sofisticado" | "simple" | "profesional"
  fontPreset: string;     // "inter" | "jakarta" | "sora"
  contactName: string;
  contactEmail: string;
  contactCompany: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  message?: string;
  modules: string[];
  team_size: "solo" | "small" | "mid";
  status: LeadStatus;
  created_at: string;
  metadata?: {
    rubro?: string;
    modalidad?: string;
    tools?: string[];
    urgencia?: string;
    brand_name?: string;
    brand_palette?: string;
    brand_style?: string;
    brand_font?: string;
  };
}

export interface QuoteSubmission {
  name: string;
  email: string;
  company?: string;
  message?: string;
  modules: string[];
  team_size: Lead["team_size"];
  rubro?: string;
  modalidad?: string;
  tools?: string[];
  urgencia?: string;
  brand_name?: string;
  brand_palette?: string;
  brand_style?: string;
  brand_font?: string;
}

export type ModuleId = "ops" | "fin" | "stock" | "clients";

export interface Module {
  id: ModuleId;
  name: string;
  description: string;
  glyph: string;
}
