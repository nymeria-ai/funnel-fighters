import { query } from "@/lib/db";
import { NextResponse } from "next/server";

// Vercel Cron calls this daily.
// Retention: read actions older than 7 days are purged. Write actions are kept forever.

const READ_ACTIONS = [
  "get_insights",
  "get_campaigns",
  "get_adsets",
  "get_ads",
  "get_account",
  "list_campaigns",
  "list_accessible_customers",
  "search",
  "get_report",
  "get_video_stats",
  "get_channel_stats",
];

export async function GET(request: Request) {
  // Verify Vercel cron secret if configured
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Delete read-only actions older than 7 days
    const placeholders = READ_ACTIONS.map((_, i) => `$${i + 1}`).join(", ");
    const result = await query<{ deleted: string }>(
      `WITH deleted AS (
        DELETE FROM execution_audit
        WHERE action IN (${placeholders})
          AND created_at < NOW() - INTERVAL '7 days'
        RETURNING id
      )
      SELECT COUNT(*) as deleted FROM deleted`,
      READ_ACTIONS
    );

    const deletedCount = Number(result[0]?.deleted || 0);

    return NextResponse.json({
      ok: true,
      deleted: deletedCount,
      policy: "read actions > 7 days purged, write actions kept forever",
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Audit cleanup error:", err);
    return NextResponse.json(
      { error: "Cleanup failed", details: String(err) },
      { status: 500 }
    );
  }
}
