import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, hero_headline, subheadline, cta_label, value_props, selling_points } = body;

    if (!hero_headline) {
      return NextResponse.json({ error: "hero_headline is required" }, { status: 400 });
    }

    const id = `lp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    await query(
      `INSERT INTO lp_variants (id, url, utm_params, hero_headline, subheadline, cta_label, value_props, selling_points)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        id,
        url || null,
        JSON.stringify({}),
        hero_headline,
        subheadline || "",
        cta_label || "",
        JSON.stringify(value_props || []),
        JSON.stringify(selling_points || []),
      ]
    );

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("save-lp error:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
