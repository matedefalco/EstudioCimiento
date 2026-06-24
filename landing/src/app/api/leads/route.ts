import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { QuoteSubmission } from "@/types";

// API routes usan service role key para bypassear RLS
function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function POST(request: NextRequest) {
  try {
    const body: QuoteSubmission = await request.json();

    if (!body.email || !body.name || !body.modules?.length) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

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
        metadata: {
          rubro: body.rubro ?? null,
          modalidad: body.modalidad ?? null,
          tools: body.tools ?? [],
          urgencia: body.urgencia ?? null,
          brand_name: body.brand_name ?? null,
          brand_palette: body.brand_palette ?? null,
          brand_style: body.brand_style ?? null,
          brand_font: body.brand_font ?? null,
        },
      })
      .select("id")
      .single();

    if (error) {
      console.error("[leads/POST] Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data.id }, { status: 201 });
  } catch (err) {
    console.error("[leads/POST]", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
