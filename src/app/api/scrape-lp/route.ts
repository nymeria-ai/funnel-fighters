import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import type { ScrapedLPContent, ValueProp } from "@/lib/types";

const SELLING_POINT_TAXONOMY = ["Speed", "Price", "Ease of use", "Social proof", "Security"];

function stripHtml(html: string): string {
  // Remove script tags and their contents
  let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ");
  // Remove style tags and their contents
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ");
  // Remove HTML comments
  text = text.replace(/<!--[\s\S]*?-->/g, " ");
  // Replace block elements with newlines for readability
  text = text.replace(/<\/(p|div|h[1-6]|li|br|section|article|header|footer|nav|main)[^>]*>/gi, "\n");
  // Strip remaining tags
  text = text.replace(/<[^>]+>/g, " ");
  // Decode common HTML entities
  text = text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");
  // Collapse whitespace
  text = text.replace(/[ \t]+/g, " ");
  text = text.replace(/\n{3,}/g, "\n\n");
  return text.trim();
}

function buildMockResponse(url: string): ScrapedLPContent {
  return {
    url,
    hero_headline: "Mock Hero Headline (ANTHROPIC_API_KEY not set)",
    subheadline: "This is a stubbed response. Set ANTHROPIC_API_KEY to enable real extraction.",
    cta_label: "Get Started",
    value_props: [
      { text: "Fast setup and onboarding", fold_position: "above" },
      { text: "Affordable pricing for all team sizes", fold_position: "above" },
      { text: "Advanced security and compliance", fold_position: "below" },
    ],
    selling_points: ["Speed", "Price"],
    raw_text: undefined,
  };
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== "object" ||
    !("url" in body) ||
    typeof (body as Record<string, unknown>).url !== "string"
  ) {
    return NextResponse.json({ error: "Missing or invalid 'url' field in request body" }, { status: 400 });
  }

  const url = (body as { url: string }).url.trim();

  if (!url) {
    return NextResponse.json({ error: "'url' must not be empty" }, { status: 400 });
  }

  // Basic URL validation
  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
  }

  // If Anthropic API key is not set, return stub
  if (!process.env.ANTHROPIC_API_KEY) {
    const mock = buildMockResponse(url);
    return NextResponse.json({
      ...mock,
      warning: "ANTHROPIC_API_KEY is not set. Returning mock/stub response.",
    });
  }

  // 1. Fetch the URL's HTML
  let html: string;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; FunnelFighters/1.0; +https://funnelfighters.io)",
      },
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: HTTP ${res.status}` },
        { status: 502 }
      );
    }
    html = await res.text();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Failed to fetch URL: ${message}` },
      { status: 502 }
    );
  }

  // 2. Strip scripts/styles and extract text
  const rawText = stripHtml(html);
  // Limit text to ~8000 chars to keep token usage reasonable
  const truncatedText = rawText.substring(0, 8000);

  // 3. Call Anthropic to extract structured content
  const client = new Anthropic();

  const prompt = `You are an expert landing page analyst. Analyze the following text extracted from a landing page and extract structured content.

Landing page URL: ${url}

Page text:
---
${truncatedText}
---

Extract and return a JSON object with these exact fields:
{
  "hero_headline": "the main headline/hero text (usually the largest, most prominent heading)",
  "subheadline": "the subheadline or supporting text beneath the hero headline",
  "cta_label": "the primary call-to-action button text",
  "value_props": [
    {
      "text": "concise description of a value proposition",
      "fold_position": "above" or "below" (above = visible without scrolling, below = requires scrolling)
    }
  ],
  "selling_points": ["array of selling point names from this taxonomy only: ${SELLING_POINT_TAXONOMY.join(", ")}"]
}

Rules:
- Only include selling points that are explicitly or strongly implied on the page
- Value props should be concise (under 15 words each)
- Include 3–6 value props
- Return ONLY valid JSON, no markdown, no explanation`;

  let extracted: {
    hero_headline?: string;
    subheadline?: string;
    cta_label?: string;
    value_props?: ValueProp[];
    selling_points?: string[];
  };

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Parse the JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON object found in Claude response");
    }
    extracted = JSON.parse(jsonMatch[0]);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Failed to extract content with AI: ${message}` },
      { status: 500 }
    );
  }

  // Validate and filter selling points to taxonomy
  const validSellingPoints = (extracted.selling_points ?? []).filter((sp) =>
    SELLING_POINT_TAXONOMY.includes(sp)
  );

  const result: ScrapedLPContent = {
    url,
    hero_headline: extracted.hero_headline ?? "",
    subheadline: extracted.subheadline ?? "",
    cta_label: extracted.cta_label ?? "",
    value_props: (extracted.value_props ?? []).map((vp) => ({
      text: vp.text ?? "",
      fold_position: vp.fold_position === "below" ? "below" : "above",
    })),
    selling_points: validSellingPoints,
    raw_text: truncatedText,
  };

  return NextResponse.json(result);
}
