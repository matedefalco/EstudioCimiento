export type LeadStatus = "new" | "contacted" | "qualified" | "closed";

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
}

export interface QuoteSubmission {
  name: string;
  email: string;
  company?: string;
  message?: string;
  modules: string[];
  team_size: Lead["team_size"];
}

export type ModuleId = "ops" | "fin" | "stock" | "clients";

export interface Module {
  id: ModuleId;
  name: string;
  description: string;
  glyph: string;
}
