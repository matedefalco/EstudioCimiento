"use client";

import { useState } from "react";
import { C } from "@/components/experience/constants";
import { FONT_PRESETS } from "@/components/experience/constants";
import { Intro } from "@/components/experience/Intro";
import { QuoteFlow } from "@/components/experience/QuoteFlow";
import { Dashboard } from "@/components/experience/Dashboard";
import { LearnFlow } from "@/components/experience/LearnFlow";
import { useLeadSubmit } from "@/hooks/useLeadSubmit";
import { resolveThemeVars, getStyleConfig } from "@/lib/palettes";
import type { QuoteState } from "@/types";

type Mode = "intro" | "quote" | "learn";

// Light palette for app-level dark/light toggle
export const LIGHT = {
  bg:      "#F4F0E8",
  surface: "#FFFFFF",
  text:    "#1C1E22",
  muted:   "#8A8276",
  accent:  "#B5863C",
  border:  "rgba(28,30,34,0.10)",
  gridLine:"rgba(28,30,34,0.06)",
};

const DEFAULT_QUOTE_STATE: QuoteState = {
  rubro: null,
  modalidad: null,
  tools: [],
  urgencia: null,
  selected: [],
  size: null,
  brandName: "",
  palette: "copper",
  interfaceStyle: "elegante",
  fontPreset: "inter",
  contactName: "",
  contactEmail: "",
  contactCompany: "",
};

export function ExperienceShell() {
  const [mode, setMode] = useState<Mode>("intro");
  const [step, setStep] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [learnStep, setLearnStep] = useState(0);
  const [quoteState, setQuoteState] = useState<QuoteState>(DEFAULT_QUOTE_STATE);
  const [darkOverride, setDarkOverride] = useState<boolean | null>(null);
  const [appDark, setAppDark] = useState(true);
  const { submit, status: submitStatus, error: submitError } = useLeadSubmit();

  const setQuoteField = <K extends keyof QuoteState>(key: K, val: QuoteState[K]) =>
    setQuoteState(s => ({ ...s, [key]: val }));

  const toggleTool = (id: string) =>
    setQuoteState(s => ({
      ...s,
      tools: s.tools.includes(id) ? s.tools.filter(x => x !== id) : [...s.tools, id],
    }));

  const toggleComp = (id: string) =>
    setQuoteState(s => ({
      ...s,
      selected: s.selected.includes(id) ? s.selected.filter(x => x !== id) : [...s.selected, id],
    }));

  const go = (next: number) => {
    setTransitioning(true);
    setTimeout(() => { setStep(next); setTransitioning(false); }, 480);
  };

  const handleSubmit = async () => {
    await submit({
      name: quoteState.contactName,
      email: quoteState.contactEmail,
      company: quoteState.contactCompany || quoteState.brandName || undefined,
      modules: quoteState.selected,
      team_size: (quoteState.size as "solo" | "small" | "mid") ?? "solo",
      rubro: quoteState.rubro ?? undefined,
      modalidad: quoteState.modalidad ?? undefined,
      tools: quoteState.tools,
      urgencia: quoteState.urgencia ?? undefined,
      brand_name: quoteState.brandName || undefined,
      brand_palette: quoteState.palette,
      brand_style: quoteState.interfaceStyle,
      brand_font: quoteState.fontPreset,
    });
    go(6);
  };

  const reset = () => {
    setMode("intro");
    setStep(0);
    setQuoteState(DEFAULT_QUOTE_STATE);
    setActiveSection(null);
    setLearnStep(0);
  };

  const fontVar = FONT_PRESETS.find(f => f.id === quoteState.fontPreset)?.var ?? "var(--font-inter)";
  const themeVars = resolveThemeVars(quoteState.palette, quoteState.interfaceStyle, fontVar, darkOverride ?? undefined);

  const isDashboard = mode === "quote" && step === 6;

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: appDark ? C.steel : LIGHT.bg,
      color: appDark ? C.cream : LIGHT.text,
      fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
      overflow: "hidden", display: "flex", flexDirection: "column",
      transition: "background 300ms ease, color 300ms ease",
    }}>
      <style>{`
        .fade-stage { animation: fadeUp .55s cubic-bezier(.22,1,.36,1) both; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .animate-pulse-slow { animation: pulseSlow 3s ease-in-out infinite; }
        @keyframes pulseSlow { 0%,100% { transform:scale(1); opacity:1; } 50% { transform:scale(1.04); opacity:.85; } }
        @media (max-width: 768px) {
          .qf-content-scroll {
            overflow-y: auto !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
            padding: 80px 16px 32px !important;
            min-height: 0 !important;
          }
          .qf-3d-preview { display: none !important; }
        }
      `}</style>

      {/* Dark/light toggle — hidden inside dashboard (has its own toggle) */}
      {!isDashboard && (
        <button
          onClick={() => setAppDark(d => !d)}
          title={appDark ? "modo claro" : "modo oscuro"}
          style={{
            position: "absolute", bottom: 24, right: 24, zIndex: 10,
            background: "transparent",
            border: `1px solid ${appDark ? C.lineStrong : LIGHT.border}`,
            borderRadius: 20, padding: "6px 12px",
            color: appDark ? C.grayCold : LIGHT.muted,
            fontSize: 12, letterSpacing: "0.08em",
            cursor: "pointer", fontFamily: "inherit",
            display: "flex", alignItems: "center", gap: 6,
            transition: "all 200ms ease",
          }}
        >
          <span style={{ fontSize: 14 }}>{appDark ? "☀" : "☾"}</span>
          <span style={{ textTransform: "lowercase" }}>{appDark ? "claro" : "oscuro"}</span>
        </button>
      )}

      {mode === "intro" && (
        <Intro
          onQuote={() => { setMode("quote"); setStep(0); }}
          onLearn={() => { setMode("learn"); setLearnStep(0); }}
          isDark={appDark}
        />
      )}

      {mode === "quote" && step < 6 && (
        <QuoteFlow
          step={step}
          go={go}
          transitioning={transitioning}
          quoteState={quoteState}
          setQuoteField={setQuoteField}
          toggleTool={toggleTool}
          toggleComp={toggleComp}
          onSubmit={handleSubmit}
          submitStatus={submitStatus}
          submitError={submitError}
        />
      )}

      {mode === "quote" && step === 6 && (
        <div style={{ flex: 1, display: "flex", overflow: "hidden", ...themeVars } as React.CSSProperties}>
          <Dashboard
            selected={quoteState.selected}
            brandName={quoteState.brandName}
            activeSection={activeSection ?? (quoteState.selected[0] ?? "resumen")}
            setActiveSection={setActiveSection}
            onReset={reset}
            isDark={darkOverride ?? (getStyleConfig(quoteState.interfaceStyle).contentMode === "dark")}
            onToggleDark={() => setDarkOverride(prev => {
              const current = prev ?? (getStyleConfig(quoteState.interfaceStyle).contentMode === "dark");
              return !current;
            })}
          />
        </div>
      )}

      {mode === "learn" && (
        <LearnFlow
          step={learnStep} setStep={setLearnStep}
          onDone={() => { setMode("quote"); setStep(0); }}
          onReset={reset}
          isDark={appDark}
        />
      )}
    </div>
  );
}
