"use client";

import { useState } from "react";
import { C } from "@/components/experience/constants";
import { Intro } from "@/components/experience/Intro";
import { QuoteFlow } from "@/components/experience/QuoteFlow";
import { Dashboard } from "@/components/experience/Dashboard";
import { LearnFlow } from "@/components/experience/LearnFlow";

type Mode = "intro" | "quote" | "learn";

export function ExperienceShell() {
  const [mode, setMode] = useState<Mode>("intro");
  const [step, setStep] = useState(0);
  const [today, setToday] = useState<string | null>(null);
  const [pain, setPain] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [size, setSize] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [learnStep, setLearnStep] = useState(0);

  const go = (next: number) => {
    setTransitioning(true);
    setTimeout(() => { setStep(next); setTransitioning(false); }, 480);
  };

  const toggleComp = (id: string) =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const reset = () => {
    setMode("intro"); setStep(0); setToday(null); setPain(null);
    setSelected([]); setSize(null); setActiveSection(null); setLearnStep(0);
  };

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

      {mode === "quote" && step < 4 && (
        <QuoteFlow
          step={step} go={go} transitioning={transitioning}
          today={today} setToday={setToday}
          pain={pain} setPain={setPain}
          selected={selected} toggleComp={toggleComp}
          size={size} setSize={setSize}
        />
      )}

      {mode === "quote" && step === 4 && (
        <Dashboard
          selected={selected}
          activeSection={activeSection ?? (selected[0] ?? "resumen")}
          setActiveSection={setActiveSection}
          onReset={reset}
        />
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
