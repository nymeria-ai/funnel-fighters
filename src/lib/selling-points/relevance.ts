/**
 * Relevance scoring between ad selling points and landing page selling points.
 * Uses LLM to score alignment on 0-100 scale with aggressive scoring.
 */

import Anthropic from '@anthropic-ai/sdk';
import { getRelevanceScore, setRelevanceScore } from './cache';

const anthropic = new Anthropic();

// Shares the same rate limiter concept — but relevance calls are typically
// made after selling points are already extracted, so contention is lower.
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

export async function scoreRelevance(
  adSellingPoint: string,
  lpSellingPoint: string,
): Promise<number> {
  if (!adSellingPoint || !lpSellingPoint) return 0;

  const cached = getRelevanceScore(adSellingPoint, lpSellingPoint);
  if (cached !== null) return cached;

  await acquireSlot();
  try {
    const rechecked = getRelevanceScore(adSellingPoint, lpSellingPoint);
    if (rechecked !== null) return rechecked;

    const prompt = `Rate the alignment between this ad message and this landing page message on a scale of 0-100.

Ad selling point: "${adSellingPoint}"
Landing page selling point: "${lpSellingPoint}"

Be AGGRESSIVE with your scoring:
- If the messages don't clearly reinforce each other, score LOW
- Partial keyword overlap is NOT alignment
- The ad must set expectations that the LP delivers on
- Same company/brand is NOT enough — the SPECIFIC value proposition must match
- Generic platitudes on either side = low score
- If the ad says "project management" and the LP talks about "CRM", that's a LOW score even if same company

Scoring guide:
- 90-100: Near-perfect match. Ad promise = LP delivery, specific and clear
- 70-89: Strong match. Core message aligns, minor differences in framing
- 50-69: Partial match. Related topic but different emphasis or angle
- 30-49: Weak match. Same general area but different value propositions
- 10-29: Poor match. Tangentially related at best
- 0-9: No match. Completely different messages

Reply with ONLY a number 0-100, nothing else.`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 10,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text.trim() : '0';
    const score = Math.max(0, Math.min(100, parseInt(text) || 0));
    setRelevanceScore(adSellingPoint, lpSellingPoint, score);
    return score;
  } finally {
    releaseSlot();
  }
}

export function getRelevanceColor(score: number): string {
  if (score >= 91) return '#059669';
  if (score >= 81) return '#16A34A';
  if (score >= 71) return '#22C55E';
  if (score >= 61) return '#84CC16';
  if (score >= 51) return '#A3E635';
  if (score >= 41) return '#EAB308';
  if (score >= 31) return '#FB923C';
  if (score >= 21) return '#F97316';
  if (score >= 11) return '#EF4444';
  return '#DC2626';
}
