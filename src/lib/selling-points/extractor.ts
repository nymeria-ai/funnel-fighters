/**
 * Selling point extraction using Anthropic Claude.
 * Extracts the core value proposition from ad copy or landing page content.
 */

import Anthropic from '@anthropic-ai/sdk';
import { getSellingPointAsync, setSellingPoint } from './cache';

const anthropic = new Anthropic();

// Rate limiter: max 5 concurrent LLM calls
let activeCalls = 0;
const queue: Array<{ resolve: () => void }> = [];

async function acquireSlot(): Promise<void> {
  if (activeCalls < 5) {
    activeCalls++;
    return;
  }
  return new Promise<void>((resolve) => {
    queue.push({ resolve });
  });
}

function releaseSlot(): void {
  activeCalls--;
  const next = queue.shift();
  if (next) {
    activeCalls++;
    next.resolve();
  }
}

export async function extractAdSellingPoint(
  headlines: string[],
  descriptions: string[],
): Promise<string> {
  const cacheKey = `ad:${headlines.join('|')}:${descriptions.join('|')}`;
  const cached = await getSellingPointAsync(cacheKey);
  if (cached) return cached;

  await acquireSlot();
  try {
    // Re-check cache after acquiring slot (another request may have filled it)
    const rechecked = await getSellingPointAsync(cacheKey);
    if (rechecked) return rechecked;

    const prompt = `You are analyzing a Google Ads Responsive Search Ad.

Headlines: ${headlines.join(' | ')}
Descriptions: ${descriptions.join(' | ')}

Extract the SINGLE core selling point of this ad in ONE sentence (max 15 words). Focus on the main value proposition — what is being promised to the user? Be specific, not generic.

Reply with ONLY the selling point sentence, nothing else.`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 100,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text.trim() : '';
    setSellingPoint(cacheKey, text);
    return text;
  } finally {
    releaseSlot();
  }
}

export async function extractLPSellingPoint(
  url: string,
  content: string,
): Promise<string> {
  const cacheKey = `lp:${url}`;
  const cached = await getSellingPointAsync(cacheKey);
  if (cached) return cached;

  await acquireSlot();
  try {
    const rechecked = await getSellingPointAsync(cacheKey);
    if (rechecked) return rechecked;

    const prompt = `You are analyzing a landing page.

URL: ${url}
Page content (extracted):
${content.slice(0, 3000)}

Extract the SINGLE core selling point of this landing page in ONE sentence (max 15 words). Focus on the main value proposition — what does this page promise or offer? Be specific, not generic.

Reply with ONLY the selling point sentence, nothing else.`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 100,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text.trim() : '';
    setSellingPoint(cacheKey, text);
    return text;
  } finally {
    releaseSlot();
  }
}

export async function fetchLPContent(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; FunnelFighters/1.0)',
        'Accept': 'text/html',
      },
    });
    clearTimeout(timeout);

    if (!res.ok) return '';
    const html = await res.text();

    // Extract useful text content from HTML
    // Remove scripts, styles, and HTML tags
    let text = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<nav[\s\S]*?<\/nav>/gi, '')
      .replace(/<footer[\s\S]*?<\/footer>/gi, '');

    // Extract title
    const titleMatch = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    // Extract meta description
    const metaMatch = text.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i);
    const metaDesc = metaMatch ? metaMatch[1].trim() : '';

    // Extract h1
    const h1Match = text.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';

    // Extract h2s
    const h2Matches = text.match(/<h2[^>]*>[\s\S]*?<\/h2>/gi) || [];
    const h2s = h2Matches.slice(0, 3).map(h => h.replace(/<[^>]+>/g, '').trim()).join('. ');

    // Extract first paragraphs from main content area
    const pMatches = text.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [];
    const paragraphs = pMatches.slice(0, 5).map(p => p.replace(/<[^>]+>/g, '').trim()).join(' ');

    const combined = [
      title && `Title: ${title}`,
      metaDesc && `Meta: ${metaDesc}`,
      h1 && `H1: ${h1}`,
      h2s && `H2s: ${h2s}`,
      paragraphs && `Content: ${paragraphs}`,
    ].filter(Boolean).join('\n');

    return combined || 'Unable to extract content';
  } catch {
    return '';
  }
}
