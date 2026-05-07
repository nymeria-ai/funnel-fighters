import { neon } from "@neondatabase/serverless";

function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL not set");
  return neon(url);
}

export async function query<T = Record<string, unknown>>(
  queryText: string,
  params: unknown[] = []
): Promise<T[]> {
  const db = getDb();
  // neon .query() returns an array-like with rows directly (not { rows: [...] })
  const result = await db.query(queryText, params);
  // The result is an array-like object — convert to proper array
  return Array.from(result as Iterable<T>);
}
