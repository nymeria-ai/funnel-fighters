import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: NextRequest) {
  // Auth check
  const adminSecret = request.headers.get("x-admin-secret");
  if (!adminSecret || adminSecret !== process.env.ADMIN_SYNC_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // ----------------------------------------------------------------
    // 1. Delete existing data in reverse dependency order
    // ----------------------------------------------------------------
    await query("DELETE FROM funnel_paths", []);
    await query("DELETE FROM user_onboarding_events", []);
    await query("DELETE FROM lp_sessions", []);
    await query("DELETE FROM onboarding_variants", []);
    await query("DELETE FROM lp_variants", []);
    await query("DELETE FROM ad_variants", []);
    await query("DELETE FROM audience_segments", []);
    await query("DELETE FROM selling_points", []);

    // ----------------------------------------------------------------
    // 2. Selling points
    // ----------------------------------------------------------------
    const sellingPoints = [
      { id: "sp-speed",    name: "Speed",        description: "Fast setup, quick time-to-value" },
      { id: "sp-price",    name: "Price",         description: "Competitive pricing and free tier" },
      { id: "sp-ease",     name: "Ease of use",   description: "Intuitive UI, no training needed" },
      { id: "sp-social",   name: "Social proof",  description: "Trusted by thousands of teams" },
      { id: "sp-security", name: "Security",      description: "Enterprise-grade security and compliance" },
    ];

    for (const sp of sellingPoints) {
      await query(
        "INSERT INTO selling_points (id, name, description) VALUES ($1, $2, $3)",
        [sp.id, sp.name, sp.description]
      );
    }

    // ----------------------------------------------------------------
    // 3. Audience segments
    // ----------------------------------------------------------------
    const audiences = [
      {
        id: "aud-retargeting-crm",
        name: "Retargeting - CRM Users",
        channel: "search",
        targeting_type: "retargeting",
        keyword: "crm software",
      },
      {
        id: "aud-lookalike-pm",
        name: "Lookalike - PM Enthusiasts",
        channel: "meta",
        targeting_type: "lookalike",
        keyword: null,
      },
      {
        id: "aud-branded-monday",
        name: "Branded KW - monday.com",
        channel: "search",
        targeting_type: "keyword",
        keyword: "monday.com",
      },
      {
        id: "aud-nonbrand-pm",
        name: "Non-brand - Project Management",
        channel: "search",
        targeting_type: "keyword",
        keyword: "project management tool",
      },
    ];

    for (const aud of audiences) {
      await query(
        "INSERT INTO audience_segments (id, name, channel, targeting_type, keyword) VALUES ($1, $2, $3, $4, $5)",
        [aud.id, aud.name, aud.channel, aud.targeting_type, aud.keyword]
      );
    }

    // ----------------------------------------------------------------
    // 4. Ad variants (one per audience)
    // ----------------------------------------------------------------
    const adVariants = [
      {
        id: "ad-retargeting-crm",
        audience_segment_id: "aud-retargeting-crm",
        channel: "search",
        headline: "Still Shopping for CRM? Try Us Free",
        body_copy:
          "You've seen the alternatives. Now see why 25,000+ teams switched to Funnel Fighters. Start free in 60 seconds — no credit card required.",
        cta_label: "Start Free Trial",
        asset_url: null,
        selling_points: ["sp-price", "sp-social", "sp-speed"],
        impressions: 18400,
        clicks: 920,
        ctr: 0.05,
      },
      {
        id: "ad-lookalike-pm",
        audience_segment_id: "aud-lookalike-pm",
        channel: "meta",
        headline: "Your Team Deserves Better Project Management",
        body_copy:
          "Funnel Fighters gives your team a single workspace to plan, track, and ship — without the chaos. Join 25,000+ happy teams today.",
        cta_label: "Get Started Free",
        asset_url: "https://assets.funnelfighters.io/ads/meta-pm-lookalike.png",
        selling_points: ["sp-ease", "sp-social", "sp-price"],
        impressions: 47200,
        clicks: 1180,
        ctr: 0.025,
      },
      {
        id: "ad-branded-monday",
        audience_segment_id: "aud-branded-monday",
        channel: "search",
        headline: "monday.com Alternative — More Powerful, Half the Price",
        body_copy:
          "Everything you love about monday.com, none of what you don't. Funnel Fighters is faster, simpler, and 50% cheaper. Switch in minutes.",
        cta_label: "Switch Today",
        asset_url: null,
        selling_points: ["sp-price", "sp-speed", "sp-ease"],
        impressions: 9800,
        clicks: 637,
        ctr: 0.065,
      },
      {
        id: "ad-nonbrand-pm",
        audience_segment_id: "aud-nonbrand-pm",
        channel: "search",
        headline: "The #1 Project Management Tool Teams Actually Love",
        body_copy:
          "Ranked #1 for ease of use. SOC 2 certified. Free forever plan available. See why teams choose Funnel Fighters over the rest.",
        cta_label: "See Plans & Pricing",
        asset_url: null,
        selling_points: ["sp-ease", "sp-security", "sp-price"],
        impressions: 34600,
        clicks: 1384,
        ctr: 0.04,
      },
    ];

    for (const ad of adVariants) {
      await query(
        `INSERT INTO ad_variants
          (id, audience_segment_id, channel, headline, body_copy, cta_label, asset_url, selling_points, impressions, clicks, ctr)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          ad.id,
          ad.audience_segment_id,
          ad.channel,
          ad.headline,
          ad.body_copy,
          ad.cta_label,
          ad.asset_url,
          JSON.stringify(ad.selling_points),
          ad.impressions,
          ad.clicks,
          ad.ctr,
        ]
      );
    }

    // ----------------------------------------------------------------
    // 5. LP variants (one per audience)
    // ----------------------------------------------------------------
    const lpVariants = [
      {
        id: "lp-retargeting-crm",
        url: "https://funnelfighters.io/lp/crm-retargeting",
        utm_params: { utm_source: "google", utm_medium: "cpc", utm_campaign: "retargeting-crm" },
        hero_headline: "You've Tried the Rest. Now Try the Best CRM Alternative.",
        subheadline:
          "25,000+ teams already made the switch. Get started free — no credit card, no commitment.",
        cta_label: "Start Free Trial",
        value_props: [
          { text: "Switch from any CRM in under 5 minutes", fold_position: "above" },
          { text: "Free forever plan — no credit card needed", fold_position: "above" },
          { text: "Trusted by 25,000+ teams worldwide", fold_position: "above" },
          { text: "SOC 2 Type II certified data security", fold_position: "below" },
          { text: "99.9% uptime SLA", fold_position: "below" },
        ],
        selling_points: ["sp-price", "sp-social", "sp-speed", "sp-security"],
      },
      {
        id: "lp-lookalike-pm",
        url: "https://funnelfighters.io/lp/pm-meta",
        utm_params: { utm_source: "meta", utm_medium: "paid_social", utm_campaign: "lookalike-pm" },
        hero_headline: "One Workspace. Every Project. Zero Chaos.",
        subheadline:
          "Funnel Fighters is the project management tool your team will actually use — simple, fast, and free to start.",
        cta_label: "Get Started Free",
        value_props: [
          { text: "Set up your workspace in 2 minutes flat", fold_position: "above" },
          { text: "Intuitive drag-and-drop interface", fold_position: "above" },
          { text: "Free plan for teams up to 5 members", fold_position: "above" },
          { text: "Integrates with Slack, GitHub, and 100+ tools", fold_position: "below" },
          { text: "Used by teams at Spotify, Stripe, and Figma", fold_position: "below" },
        ],
        selling_points: ["sp-ease", "sp-price", "sp-social"],
      },
      {
        id: "lp-branded-monday",
        url: "https://funnelfighters.io/lp/vs-monday",
        utm_params: { utm_source: "google", utm_medium: "cpc", utm_campaign: "branded-vs-monday" },
        hero_headline: "A Smarter monday.com Alternative — At Half the Price",
        subheadline:
          "All the power of monday.com, none of the complexity. Switch in minutes and save up to 50% on your annual plan.",
        cta_label: "Switch Today — Free",
        value_props: [
          { text: "50% less than monday.com on equivalent plans", fold_position: "above" },
          { text: "Import your monday.com boards in one click", fold_position: "above" },
          { text: "Faster load times — 2x performance benchmark", fold_position: "above" },
          { text: "No per-seat pricing surprises", fold_position: "below" },
          { text: "Dedicated migration support team", fold_position: "below" },
        ],
        selling_points: ["sp-price", "sp-speed", "sp-ease"],
      },
      {
        id: "lp-nonbrand-pm",
        url: "https://funnelfighters.io/lp/project-management",
        utm_params: { utm_source: "google", utm_medium: "cpc", utm_campaign: "nonbrand-pm" },
        hero_headline: "The Project Management Tool Teams Actually Love Using",
        subheadline:
          "Rated #1 for ease of use. Built for security. Priced for everyone. Start free today.",
        cta_label: "See Plans & Pricing",
        value_props: [
          { text: "#1 rated for ease of use on G2 and Capterra", fold_position: "above" },
          { text: "SOC 2 Type II & GDPR compliant", fold_position: "above" },
          { text: "Plans starting at $0/month", fold_position: "above" },
          { text: "Real-time collaboration for distributed teams", fold_position: "below" },
          { text: "Advanced analytics and reporting dashboards", fold_position: "below" },
          { text: "24/7 support with 1-hour response SLA", fold_position: "below" },
        ],
        selling_points: ["sp-ease", "sp-security", "sp-price"],
      },
    ];

    for (const lp of lpVariants) {
      await query(
        `INSERT INTO lp_variants
          (id, url, utm_params, hero_headline, subheadline, cta_label, value_props, selling_points)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          lp.id,
          lp.url,
          JSON.stringify(lp.utm_params),
          lp.hero_headline,
          lp.subheadline,
          lp.cta_label,
          JSON.stringify(lp.value_props),
          JSON.stringify(lp.selling_points),
        ]
      );
    }

    // ----------------------------------------------------------------
    // 6. Onboarding variants (one per audience path)
    // ----------------------------------------------------------------
    const onboardingVariants = [
      {
        id: "ob-retargeting-crm",
        welcome_copy:
          "Welcome back! You've made a great choice. Let's get your CRM data imported and your team up and running in minutes.",
        steps: [
          {
            headline: "Import Your Existing Data",
            copy: "Connect your old CRM or upload a CSV. We'll map your fields automatically — it takes under 60 seconds.",
            selling_points: ["sp-speed"],
          },
          {
            headline: "Invite Your Team",
            copy: "Add teammates by email. They'll get instant access with no setup required on their end.",
            selling_points: ["sp-ease"],
          },
          {
            headline: "You're Covered",
            copy: "Your data is encrypted at rest and in transit. We're SOC 2 Type II certified so your team can work with confidence.",
            selling_points: ["sp-security"],
          },
        ],
        selling_points: ["sp-speed", "sp-ease", "sp-security"],
      },
      {
        id: "ob-lookalike-pm",
        welcome_copy:
          "Great to have you! Let's set up your first project workspace — it'll take less than 2 minutes.",
        steps: [
          {
            headline: "Create Your First Project",
            copy: "Choose a template or start from scratch. Drag-and-drop tasks into any layout you prefer.",
            selling_points: ["sp-ease"],
          },
          {
            headline: "Bring Your Team Along",
            copy: "Invite teammates now — or do it later. The free plan supports up to 5 people at no cost.",
            selling_points: ["sp-price", "sp-social"],
          },
        ],
        selling_points: ["sp-ease", "sp-price", "sp-social"],
      },
      {
        id: "ob-branded-monday",
        welcome_copy:
          "Welcome to your monday.com alternative! Let's import your boards and show you everything you've been missing.",
        steps: [
          {
            headline: "Import from monday.com",
            copy: "Paste your monday.com workspace URL and we'll import all your boards, tasks, and assignments automatically.",
            selling_points: ["sp-speed", "sp-ease"],
          },
          {
            headline: "See the Price Difference",
            copy: "Check your billing summary. Most teams save 40–55% compared to their monday.com plan.",
            selling_points: ["sp-price"],
          },
          {
            headline: "You're All Set",
            copy: "Your workspace is live. Everything feels familiar — just faster and cheaper.",
            selling_points: ["sp-speed", "sp-price"],
          },
        ],
        selling_points: ["sp-speed", "sp-ease", "sp-price"],
      },
      {
        id: "ob-nonbrand-pm",
        welcome_copy:
          "Welcome! Funnel Fighters is trusted by 25,000+ teams. Let's get you set up the right way.",
        steps: [
          {
            headline: "Pick Your Workflow",
            copy: "Choose from Kanban, Gantt, List, or Timeline view. You can switch anytime — no lock-in.",
            selling_points: ["sp-ease"],
          },
          {
            headline: "Set Up Permissions",
            copy: "Control who sees what with role-based access. Your data stays secure with end-to-end encryption.",
            selling_points: ["sp-security"],
          },
          {
            headline: "Start on the Free Plan",
            copy: "You're on our free forever plan. Upgrade only when you're ready — no pushy upsells.",
            selling_points: ["sp-price", "sp-social"],
          },
        ],
        selling_points: ["sp-ease", "sp-security", "sp-price", "sp-social"],
      },
    ];

    for (const ob of onboardingVariants) {
      await query(
        `INSERT INTO onboarding_variants (id, welcome_copy, steps, selling_points)
         VALUES ($1, $2, $3, $4)`,
        [
          ob.id,
          ob.welcome_copy,
          JSON.stringify(ob.steps),
          JSON.stringify(ob.selling_points),
        ]
      );
    }

    // ----------------------------------------------------------------
    // 7. LP sessions (~20 per LP variant)
    // ----------------------------------------------------------------
    function randomBetween(min: number, max: number) {
      return min + Math.random() * (max - min);
    }
    function randomBool(probability: number) {
      return Math.random() < probability;
    }

    // Segment IDs aligned with LP variants
    const lpToAudience: Record<string, string> = {
      "lp-retargeting-crm":  "aud-retargeting-crm",
      "lp-lookalike-pm":     "aud-lookalike-pm",
      "lp-branded-monday":   "aud-branded-monday",
      "lp-nonbrand-pm":      "aud-nonbrand-pm",
    };

    let sessionCounter = 0;
    for (const lp of lpVariants) {
      const audienceId = lpToAudience[lp.id];
      const sessionCount = 20;
      for (let i = 0; i < sessionCount; i++) {
        sessionCounter++;
        const sessionId = `sess-${lp.id}-${String(i).padStart(3, "0")}`;
        const bounced = randomBool(0.35);
        const scrollDepth = bounced
          ? randomBetween(5, 30)
          : randomBetween(40, 100);
        const duration = bounced
          ? randomBetween(5, 30)
          : randomBetween(60, 420);
        const ctaClicked = !bounced && randomBool(0.4);
        const converted = ctaClicked && randomBool(0.3);

        // Spread timestamps over last 30 days
        const daysAgo = Math.floor(Math.random() * 30);
        const ts = new Date(Date.now() - daysAgo * 86400000).toISOString();

        await query(
          `INSERT INTO lp_sessions
            (id, lp_variant_id, audience_segment_id, session_duration_s, scroll_depth_pct, bounced, cta_clicked, converted, timestamp)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [
            sessionId,
            lp.id,
            audienceId,
            Math.round(duration),
            Math.round(scrollDepth),
            bounced,
            ctaClicked,
            converted,
            ts,
          ]
        );
      }
    }

    // ----------------------------------------------------------------
    // 8. User onboarding events (~10 per onboarding variant)
    // ----------------------------------------------------------------
    const lpForOb: Record<string, string> = {
      "ob-retargeting-crm": "lp-retargeting-crm",
      "ob-lookalike-pm":    "lp-lookalike-pm",
      "ob-branded-monday":  "lp-branded-monday",
      "ob-nonbrand-pm":     "lp-nonbrand-pm",
    };
    const adForOb: Record<string, string> = {
      "ob-retargeting-crm": "ad-retargeting-crm",
      "ob-lookalike-pm":    "ad-lookalike-pm",
      "ob-branded-monday":  "ad-branded-monday",
      "ob-nonbrand-pm":     "ad-nonbrand-pm",
    };

    for (const ob of onboardingVariants) {
      const eventCount = 10;
      for (let i = 0; i < eventCount; i++) {
        const eventId = `uoe-${ob.id}-${String(i).padStart(3, "0")}`;
        const userId = `user-${ob.id}-${String(i).padStart(3, "0")}`;
        const daysAgo = Math.floor(Math.random() * 30);
        const signupTs = new Date(Date.now() - daysAgo * 86400000).toISOString();
        const day2Returned = randomBool(0.45);

        await query(
          `INSERT INTO user_onboarding_events
            (id, user_id, ad_variant_id, lp_variant_id, onboarding_variant_id, signup_ts, day2_returned)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            eventId,
            userId,
            adForOb[ob.id],
            lpForOb[ob.id],
            ob.id,
            signupTs,
            day2Returned,
          ]
        );
      }
    }

    // ----------------------------------------------------------------
    // 9. Funnel paths (one per audience, connecting all stages)
    // ----------------------------------------------------------------
    const funnelPaths = [
      {
        id: "fp-retargeting-crm",
        audience_segment_id: "aud-retargeting-crm",
        ad_variant_id: "ad-retargeting-crm",
        lp_variant_id: "lp-retargeting-crm",
        onboarding_variant_id: "ob-retargeting-crm",
        consistency_score: 82,
      },
      {
        id: "fp-lookalike-pm",
        audience_segment_id: "aud-lookalike-pm",
        ad_variant_id: "ad-lookalike-pm",
        lp_variant_id: "lp-lookalike-pm",
        onboarding_variant_id: "ob-lookalike-pm",
        consistency_score: 74,
      },
      {
        id: "fp-branded-monday",
        audience_segment_id: "aud-branded-monday",
        ad_variant_id: "ad-branded-monday",
        lp_variant_id: "lp-branded-monday",
        onboarding_variant_id: "ob-branded-monday",
        consistency_score: 91,
      },
      {
        id: "fp-nonbrand-pm",
        audience_segment_id: "aud-nonbrand-pm",
        ad_variant_id: "ad-nonbrand-pm",
        lp_variant_id: "lp-nonbrand-pm",
        onboarding_variant_id: "ob-nonbrand-pm",
        consistency_score: 67,
      },
    ];

    for (const fp of funnelPaths) {
      await query(
        `INSERT INTO funnel_paths
          (id, audience_segment_id, ad_variant_id, lp_variant_id, onboarding_variant_id, consistency_score)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          fp.id,
          fp.audience_segment_id,
          fp.ad_variant_id,
          fp.lp_variant_id,
          fp.onboarding_variant_id,
          fp.consistency_score,
        ]
      );
    }

    return NextResponse.json({
      success: true,
      seeded: {
        selling_points: sellingPoints.length,
        audience_segments: audiences.length,
        ad_variants: adVariants.length,
        lp_variants: lpVariants.length,
        onboarding_variants: onboardingVariants.length,
        lp_sessions: sessionCounter,
        user_onboarding_events: onboardingVariants.length * 10,
        funnel_paths: funnelPaths.length,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
