/**
 * Database migration runner.
 * Reads schema.sql and executes it against the database.
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { exec, isConfigured } from './client';

export async function runMigrations(): Promise<{ success: boolean; message: string }> {
  if (!isConfigured()) {
    return { success: false, message: 'Database not configured (no POSTGRES_URL)' };
  }

  try {
    const schemaPath = join(process.cwd(), 'src/lib/db/schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');

    // Split by semicolons and execute each statement
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    let executed = 0;
    for (const statement of statements) {
      const ok = await exec(statement + ';');
      if (!ok) {
        return { success: false, message: `Failed at statement ${executed + 1}` };
      }
      executed++;
    }

    return { success: true, message: `Executed ${executed} statements` };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return { success: false, message: `Migration error: ${msg}` };
  }
}
