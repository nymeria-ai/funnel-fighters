/**
 * Ahrefs MCP client — uses Streamable HTTP (MCP protocol) to get URL ratings.
 * The Ahrefs API key we have is MCP-only, not REST API.
 */

interface AhrefsBatchResult extends Record<string, unknown> {
  url_rating: number | null;
}

let sessionId: string | null = null;
let messageId = 0;

const MCP_BASE = 'https://api.ahrefs.com/mcp/mcp';

function getHeaders(): Record<string, string> {
  const apiKey = process.env.AHREFS_API_KEY;
  const h: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
    Accept: 'application/json, text/event-stream',
  };
  if (sessionId) h['Mcp-Session-Id'] = sessionId;
  return h;
}

async function ensureSession(): Promise<void> {
  if (sessionId) return;

  const res = await fetch(MCP_BASE, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: ++messageId,
      method: 'initialize',
      params: {
        protocolVersion: '2025-03-26',
        capabilities: {},
        clientInfo: { name: 'funnel-fighters', version: '1.0' },
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`Ahrefs MCP init failed: ${res.status}`);
  }

  sessionId = res.headers.get('mcp-session-id');
}

/**
 * Fetch URL ratings for multiple URLs in a single batch call.
 * Returns a map of url -> url_rating (0-100).
 */
export async function fetchAhrefsURLRatings(
  urls: string[]
): Promise<Map<string, number | null>> {
  const result = new Map<string, number | null>();

  if (!process.env.AHREFS_API_KEY || urls.length === 0) {
    return result;
  }

  try {
    await ensureSession();

    // Ahrefs batch-analysis accepts up to 100 targets
    const BATCH_SIZE = 100;
    for (let i = 0; i < urls.length; i += BATCH_SIZE) {
      const batch = urls.slice(i, i + BATCH_SIZE);
      const targets = batch.map((url) => ({
        url,
        mode: 'exact' as const,
        protocol: 'https' as const,
      }));

      const res = await fetch(MCP_BASE, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: ++messageId,
          method: 'tools/call',
          params: {
            name: 'batch-analysis',
            arguments: {
              select: ['url_rating'],
              targets,
            },
          },
        }),
      });

      if (!res.ok) {
        console.error(`Ahrefs MCP batch call failed: ${res.status}`);
        for (const url of batch) result.set(url, null);
        continue;
      }

      const body = await res.json();
      const text = body.result?.content?.[0]?.text;
      if (text) {
        try {
          const parsed = typeof text === 'string' ? JSON.parse(text) : text;
          const ratings: AhrefsBatchResult[] = parsed.targets || [];
          for (let j = 0; j < batch.length; j++) {
            result.set(batch[j], ratings[j]?.url_rating ?? null);
          }
        } catch {
          console.error('Failed to parse Ahrefs response');
          for (const url of batch) result.set(url, null);
        }
      } else {
        console.error('Ahrefs MCP: no content in response', JSON.stringify(body).substring(0, 200));
        for (const url of batch) result.set(url, null);
      }
    }
  } catch (err) {
    console.error('Ahrefs MCP error:', err);
    // Reset session on error
    sessionId = null;
    for (const url of urls) {
      if (!result.has(url)) result.set(url, null);
    }
  }

  return result;
}
