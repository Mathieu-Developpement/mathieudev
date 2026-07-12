import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Client admin — utilise la clé service_role, jamais exposée au navigateur.
// Cette route est le SEUL endroit du site qui écrit dans project_leads.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Validation minimale — on refuse tout payload qui n'a pas au moins un id et un courriel
    if (!payload?.id || !payload?.courriel) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("project_leads").upsert(payload);

    if (error) {
      console.error("Erreur Supabase (project_leads):", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Erreur route project-lead:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}