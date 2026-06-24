"use client";

import { useState } from "react";
import type { QuoteSubmission } from "@/types";

type Status = "idle" | "loading" | "success" | "error";

export function useLeadSubmit() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: QuoteSubmission) => {
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? "Error desconocido");
      }

      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar");
      setStatus("error");
    }
  };

  return { submit, status, error };
}
