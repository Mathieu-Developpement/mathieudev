import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Client admin créé ici (et non au niveau du module) pour éviter que
    // Next.js tente de l'instancier pendant l'étape de build, avant que les
    // variables d'environnement de production ne soient garanties disponibles.
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

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