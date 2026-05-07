import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import fs from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  // Auth check
  const adminSecret = request.headers.get("x-admin-secret");
  if (!adminSecret || adminSecret !== process.env.ADMIN_SYNC_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sqlFilePath = path.join(process.cwd(), "scripts", "migrate.sql");
    const sqlContent = await fs.readFile(sqlFilePath, "utf-8");

    // Split by semicolons, strip comment-only blocks, keep SQL
    const statements = sqlContent
      .split(";")
      .map((s) => s.trim())
      .filter((s) => {
        // Remove leading comment lines to get to actual SQL
        const sqlLines = s.split("\n").filter((l) => l.trim() && !l.trim().startsWith("--"));
        return sqlLines.length > 0;
      });

    const executed: string[] = [];
    const errors: string[] = [];

    for (const statement of statements) {
      try {
        await query(statement, []);
        // Extract a short label for reporting
        const firstLine = statement.split("\n").find((l) => l.trim() && !l.trim().startsWith("--"));
        if (firstLine) executed.push(firstLine.trim().substring(0, 80));
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        errors.push(`Statement failed: ${msg}`);
      }
    }

    // Derive table names from CREATE TABLE statements
    const tableNames = statements
      .filter((s) => /CREATE TABLE/i.test(s))
      .map((s) => {
        const match = s.match(/CREATE TABLE(?:\s+IF NOT EXISTS)?\s+(\w+)/i);
        return match ? match[1] : null;
      })
      .filter(Boolean);

    return NextResponse.json({
      success: errors.length === 0,
      tables_created: tableNames,
      statements_executed: executed.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
