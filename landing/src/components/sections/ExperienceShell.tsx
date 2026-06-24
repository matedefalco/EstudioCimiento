"use client";

import { useState } from "react";

// Punto de entrada de la experiencia interactiva.
// La lógica de la máquina de estados vive aquí; los pasos se cargan como
// componentes hijos para mantener cada archivo manejable.

type Mode = "intro" | "quote" | "learn";

export function ExperienceShell() {
  const [mode, setMode] = useState<Mode>("intro");
  const [step, setStep] = useState(0);

  const reset = () => {
    setMode("intro");
    setStep(0);
  };

  return (
    <div className="fixed inset-0 bg-steel text-cream font-sans overflow-hidden flex flex-col">
      {mode === "intro" && (
        <div className="flex-1 flex items-center justify-center flex-col gap-10">
          <p className="text-sm tracking-[0.32em] lowercase text-copper">
            estudio cimiento
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => { setMode("quote"); setStep(0); }}
              className="bg-copper text-steel text-base font-semibold tracking-widest lowercase px-12 py-5 rounded-sm"
            >
              comenzar
            </button>
            <button
              onClick={() => { setMode("learn"); setStep(0); }}
              className="bg-transparent text-cream text-base font-medium tracking-widest lowercase px-12 py-5 rounded-sm border border-white/20 hover:border-copper transition-colors"
            >
              conocenos
            </button>
          </div>
        </div>
      )}

      {mode === "quote" && (
        <div className="flex-1 flex items-center justify-center p-8">
          <p className="text-cream/60 text-sm">
            flujo de cotización — próximamente
          </p>
        </div>
      )}

      {mode === "learn" && (
        <div className="flex-1 flex items-center justify-center p-8">
          <button onClick={reset} className="text-copper underline text-sm">
            ← volver
          </button>
        </div>
      )}
    </div>
  );
}
