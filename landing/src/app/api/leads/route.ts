import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { QuoteSubmission } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: QuoteSubmission = await request.json();

    if (!body.email || !body.name || !body.modules?.length) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: body.name,
        email: body.email,
        company: body.company ?? null,
        message: body.message ?? null,
        modules: body.modules,
        team_size: body.team_size,
        status: "new",
      })
      .select("id")
      .single();

    if (error) throw error;

    return NextResponse.json({ id: data.id }, { status: 201 });
  } catch (err) {
    console.error("[leads/POST]", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
