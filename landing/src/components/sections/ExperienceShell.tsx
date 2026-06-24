"use client";

import { useState } from "react";
import { C } from "@/components/experience/constants";
import { FONT_PRESETS } from "@/components/experience/constants";
import { Intro } from "@/components/experience/Intro";
import { QuoteFlow } from "@/components/experience/QuoteFlow";
import { Dashboard } from "@/components/experience/Dashboard";
import { LearnFlow } from "@/components/experience/LearnFlow";
import { useLeadSubmit } from "@/hooks/useLeadSubmit";
import { resolveThemeVars } from "@/lib/palettes";
import type { QuoteState } from "@/types";

type Mode = "intro" | "quote" | "learn";

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
  const themeVars = resolveThemeVars(quoteState.palette, quoteState.interfaceStyle, fontVar);

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: C.steel, color: C.cream,
      fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
      overflow: "hidden", display: "flex", flexDirection: "column",
    }}>
      <style>{`
        .fade-stage { animation: fadeUp .55s cubic-bezier(.22,1,.36,1) both; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .animate-pulse-slow { animation: pulseSlow 3s ease-in-out infinite; }
        @keyframes pulseSlow { 0%,100% { transform:scale(1); opacity:1; } 50% { transform:scale(1.04); opacity:.85; } }
      `}</style>

      {mode === "intro" && (
        <Intro
          onQuote={() => { setMode("quote"); setStep(0); }}
          onLearn={() => { setMode("learn"); setLearnStep(0); }}
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
          />
        </div>
      )}

      {mode === "learn" && (
        <LearnFlow
          step={learnStep} setStep={setLearnStep}
          onDone={() => { setMode("quote"); setStep(0); }}
          onReset={reset}
        />
      )}
    </div>
  );
}
