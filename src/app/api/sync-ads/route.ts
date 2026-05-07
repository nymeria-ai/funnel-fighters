import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SELLING_POINT_TAXONOMY = ["Speed", "Price", "Ease of use", "Social proof", "Security"];

// Mock ad data returned when Google Ads credentials are not configured
const MOCK_ADS = [
  {
    id: "mock-ad-001",
    resource_name: "customers/1234567890/ads/001",
    headlines: [
      "Project Management Made Easy",
      "Try Free for 30 Days",
      "#1 Team Collaboration Tool",
    ],
    descriptions: [
      "Manage projects, track progress, and collaborate with your team — all in one place. Start free today.",
      "Join 25,000+ teams that rely on Funnel Fighters to ship faster. No credit card required.",
    ],
    final_urls: ["https://funnelfighters.io/lp/project-management"],
    status: "ENABLED",
    ad_group: "Project Management - Broad",
    campaign: "Non-Brand PM",
    impressions: 34600,
    clicks: 1384,
    ctr: 0.04,
    selling_points: [] as string[],
  },
  {
    id: "mock-ad-002",
    resource_name: "customers/1234567890/ads/002",
    headlines: [
      "monday.com Alternative",
      "50% Cheaper Than monday.com",
      "Switch in Minutes — Free",
    ],
    descriptions: [
      "Everything you love about monday.com at half the price. Import your boards in one click.",
      "Faster, simpler, and more affordable. See why teams are switching to Funnel Fighters.",
    ],
    final_urls: ["https://funnelfighters.io/lp/vs-monday"],
    status: "ENABLED",
    ad_group: "Competitor - monday.com",
    campaign: "Branded vs Competitors",
    impressions: 9800,
    clicks: 637,
    ctr: 0.065,
    selling_points: [] as string[],
  },
  {
    id: "mock-ad-003",
    resource_name: "customers/1234567890/ads/003",
    headlines: [
      "Still Shopping for CRM?",
      "Start Free in 60 Seconds",
      "25,000+ Teams Trust Us",
    ],
    descriptions: [
      "You've seen the alternatives. Now see why teams choose Funnel Fighters. No credit card required.",
      "SOC 2 certified. GDPR compliant. Enterprise-grade security with a free plan for small teams.",
    ],
    final_urls: ["https://funnelfighters.io/lp/crm-retargeting"],
    status: "ENABLED",
    ad_group: "CRM Retargeting",
    campaign: "Retargeting - CRM",
    impressions: 18400,
    clicks: 920,
    ctr: 0.05,
    selling_points: [] as string[],
  },
  {
    id: "mock-ad-004",
    resource_name: "customers/1234567890/ads/004",
    headlines: [
      "Rated #1 for Ease of Use",
      "Free Forever Plan Available",
      "Try Funnel Fighters Today",
    ],
    descriptions: [
      "Ranked #1 on G2 and Capterra for ease of use. Plans starting at $0/month. No pushy upsells.",
      "Real-time collaboration, advanced analytics, and 24/7 support. All in one tool.",
    ],
    final_urls: ["https://funnelfighters.io/lp/project-management"],
    status: "ENABLED",
    ad_group: "PM - Ease & Price",
    campaign: "Non-Brand PM",
    impressions: 22100,
    clicks: 884,
    ctr: 0.04,
    selling_points: [] as string[],
  },
];

type MockAd = (typeof MOCK_ADS)[number];

async function tagSellingPointsWithAI(ads: MockAd[]): Promise<MockAd[]> {
  const client = new Anthropic();

  const adSummaries = ads
    .map(
      (ad, i) =>
        `Ad ${i + 1} (ID: ${ad.id}):\nHeadlines: ${ad.headlines.join(" | ")}\nDescriptions: ${ad.descriptions.join(" ")}`
    )
    .join("\n\n");

  const prompt = `You are an advertising analyst. For each ad below, identify which selling points from the taxonomy are present.

Taxonomy: ${SELLING_POINT_TAXONOMY.join(", ")}

Ads:
${adSummaries}

Return a JSON array where each element has:
{
  "id": "ad ID",
  "selling_points": ["array of matched selling point names from the taxonomy only"]
}

Only include selling points explicitly stated or strongly implied. Return ONLY valid JSON array, no markdown.`;

  const message = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 512,
    messages: [{ role: "user", content: prompt }],
  });

  const responseText =
    message.content[0].type === "text" ? message.content[0].text : "[]";

  const jsonMatch = responseText.match(/\[[\s\S]*\]/);
  if (!jsonMatch) return ads;

  const tagged: { id: string; selling_points: string[] }[] = JSON.parse(jsonMatch[0]);

  return ads.map((ad) => {
    const match = tagged.find((t) => t.id === ad.id);
    if (match) {
      return {
        ...ad,
        selling_points: match.selling_points.filter((sp) =>
          SELLING_POINT_TAXONOMY.includes(sp)
        ),
      };
    }
    return ad;
  });
}

interface GoogleAdsRSA {
  resourceName: string;
  headlines: { text: string }[];
  descriptions: { text: string }[];
  finalUrls: string[];
  status: string;
}

async function fetchGoogleAds(params: {
  developerToken: string;
  customerId: string;
  accessToken: string;
}): Promise<GoogleAdsRSA[]> {
  const { developerToken, customerId, accessToken } = params;

  const query = `
    SELECT
      ad_group_ad.ad.resource_name,
      ad_group_ad.ad.responsive_search_ad.headlines,
      ad_group_ad.ad.responsive_search_ad.descriptions,
      ad_group_ad.ad.final_urls,
      ad_group_ad.status
    FROM ad_group_ad
    WHERE ad_group_ad.ad.type = 'RESPONSIVE_SEARCH_AD'
      AND ad_group_ad.status = 'ENABLED'
    LIMIT 50
  `;

  const response = await fetch(
    `https://googleads.googleapis.com/v17/customers/${customerId}/googleAds:search`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "developer-token": developerToken,
      },
      body: JSON.stringify({ query }),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Google Ads API error ${response.status}: ${errorBody}`);
  }

  const data = (await response.json()) as {
    results?: {
      adGroupAd: {
        ad: {
          resourceName: string;
          responsiveSearchAd: {
            headlines: { text: string }[];
            descriptions: { text: string }[];
          };
          finalUrls: string[];
        };
        status: string;
      };
    }[];
  };

  return (data.results ?? []).map((r) => ({
    resourceName: r.adGroupAd.ad.resourceName,
    headlines: r.adGroupAd.ad.responsiveSearchAd?.headlines ?? [],
    descriptions: r.adGroupAd.ad.responsiveSearchAd?.descriptions ?? [],
    finalUrls: r.adGroupAd.ad.finalUrls ?? [],
    status: r.adGroupAd.status,
  }));
}

export async function POST(request: NextRequest) {
  // Auth check
  const adminSecret = request.headers.get("x-admin-secret");
  if (!adminSecret || adminSecret !== process.env.ADMIN_SYNC_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;

  // ----------------------------------------------------------------
  // Stub path: credentials not configured
  // ----------------------------------------------------------------
  if (!developerToken) {
    let taggedMockAds = MOCK_ADS;

    // Tag with AI if key is available, otherwise use empty arrays
    if (process.env.ANTHROPIC_API_KEY) {
      try {
        taggedMockAds = await tagSellingPointsWithAI(MOCK_ADS);
      } catch {
        // If AI tagging fails, continue with untagged mock data
      }
    }

    return NextResponse.json({
      synced: false,
      message: "Google Ads credentials not configured",
      mock: true,
      ads: taggedMockAds.map((ad) => ({
        id: ad.id,
        resource_name: ad.resource_name,
        headlines: ad.headlines,
        descriptions: ad.descriptions,
        final_urls: ad.final_urls,
        status: ad.status,
        ad_group: ad.ad_group,
        campaign: ad.campaign,
        metrics: {
          impressions: ad.impressions,
          clicks: ad.clicks,
          ctr: ad.ctr,
        },
        selling_points: ad.selling_points,
      })),
    });
  }

  // ----------------------------------------------------------------
  // Live path: call Google Ads API
  // ----------------------------------------------------------------
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID;
  const accessToken = process.env.GOOGLE_ADS_ACCESS_TOKEN;

  if (!customerId || !accessToken) {
    return NextResponse.json(
      {
        error:
          "GOOGLE_ADS_DEVELOPER_TOKEN is set but GOOGLE_ADS_CUSTOMER_ID or GOOGLE_ADS_ACCESS_TOKEN is missing",
      },
      { status: 500 }
    );
  }

  try {
    const rawAds = await fetchGoogleAds({ developerToken, customerId, accessToken });

    // Tag selling points with Anthropic if key is available
    let processedAds = rawAds.map((ad, i) => ({
      id: `gads-${i}`,
      resource_name: ad.resourceName,
      headlines: ad.headlines.map((h) => h.text),
      descriptions: ad.descriptions.map((d) => d.text),
      final_urls: ad.finalUrls,
      status: ad.status,
      selling_points: [] as string[],
    }));

    if (process.env.ANTHROPIC_API_KEY && processedAds.length > 0) {
      try {
        const adsForTagging = processedAds.map((ad) => ({
          ...ad,
          ad_group: "",
          campaign: "",
          impressions: 0,
          clicks: 0,
          ctr: 0,
        }));
        const tagged = await tagSellingPointsWithAI(adsForTagging);
        processedAds = processedAds.map((ad, i) => ({
          ...ad,
          selling_points: tagged[i]?.selling_points ?? [],
        }));
      } catch {
        // Continue without selling point tags if AI fails
      }
    }

    return NextResponse.json({
      synced: true,
      mock: false,
      total_ads: processedAds.length,
      ads: processedAds,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { synced: false, error: `Google Ads sync failed: ${message}` },
      { status: 502 }
    );
  }
}
