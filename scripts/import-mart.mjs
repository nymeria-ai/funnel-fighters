#!/usr/bin/env node
/**
 * Import mart JSON data into Neon Postgres campaign_metrics table.
 * Streams the JSON to handle files >500MB.
 * Usage: node scripts/import-mart.mjs [path-to-json]
 */

import { createReadStream, readFileSync } from "fs";
import { resolve } from "path";
import { neon } from "@neondatabase/serverless";
import { parser } from "stream-json/parser";
import { streamArray } from "stream-json/streamers/stream-array";
import { chain } from "stream-chain";

// Load .env.local manually
const envPath = resolve(process.cwd(), ".env.local");
try {
  const envContent = readFileSync(envPath, "utf8");
  for (const line of envContent.split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim().replace(/^"|"$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  }
} catch { /* no .env.local */ }

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) { console.error("DATABASE_URL not set"); process.exit(1); }
const sql = neon(DB_URL);

const BATCH = 200;

// Map JSON camelCase keys to DB snake_case columns
const COL_MAP = {
  day: "day", channel: "channel", country: "country", campaign: "campaign",
  adGroup: "ad_group", adName: "ad_name", keyword: "keyword", matchType: "match_type",
  spend: "spend", impressions: "impressions", clicks: "clicks",
  hardSignupsN: "hard_signups_n", qualifiedSignupsN: "qualified_signups_n",
  gmailSignupsN: "gmail_signups_n", workManagerN: "work_manager_n",
  twodayActiveN: "twoday_active_n", mktTwodayActiveN: "mkt_twoday_active_n",
  invitedOthersN: "invited_others_n", setup24HCrmN: "setup_24h_crm_n",
  contactSalesN: "contact_sales_n", distributedLeadsN: "distributed_leads_n",
  distributedSignupLeadsN: "distributed_signup_leads_n",
  distributedCsLeadsN: "distributed_cs_leads_n",
  sqlN: "sql_n", oppN: "opp_n", dealN: "deal_n",
  paying7DN: "paying_7d_n", paying14DN: "paying_14d_n", paying21DN: "paying_21d_n",
  paying28DN: "paying_28d_n", paying35DN: "paying_35d_n", paying60DN: "paying_60d_n",
  paying90DN: "paying_90d_n", paying120DN: "paying_120d_n", payingLifetimeN: "paying_lifetime_n",
  collection7D: "collection_7d", collection14D: "collection_14d", collection21D: "collection_21d",
  collection28D: "collection_28d", collection35D: "collection_35d", collection60D: "collection_60d",
  collection90D: "collection_90d", collection120D: "collection_120d", collection365D: "collection_365d",
  mrr7D: "mrr_7d", mrr14D: "mrr_14d", mrr21D: "mrr_21d", mrr28D: "mrr_28d",
  mrr35D: "mrr_35d", mrr60D: "mrr_60d", mrr90D: "mrr_90d", mrr120D: "mrr_120d",
  mrrLifetime: "mrr_lifetime",
  claimedArr: "claimed_arr", pipelineArr28D: "pipeline_arr_28d",
  pipelineArrRatio: "pipeline_arr_ratio",
  arr7D: "arr_7d", arr14D: "arr_14d", arr21D: "arr_21d", arr28D: "arr_28d",
  arr35D: "arr_35d", arr60D: "arr_60d", arr90D: "arr_90d", arrLifetime: "arr_lifetime",
  avgQeScore: "avg_qe_score", avgPayerProbability: "avg_payer_probability",
  avgPredictedFirstArr: "avg_predicted_first_arr",
  avgCalibratedPrediction: "avg_calibrated_prediction",
  avgCompanySize: "avg_company_size", avgTeamSize: "avg_team_size",
  companySizeGroup: "company_size_group",
  qualityScore: "quality_score", landingPageExperience: "landing_page_experience",
  adRelevance: "ad_relevance", predictedCtr: "predicted_ctr_label",
  bidStrategyType: "bid_strategy_type", searchImprShare: "search_impr_share",
  headroomPct: "headroom_pct", absTopImprShare: "abs_top_impr_share",
  ctr: "ctr", cpc: "cpc", cvrSignup: "cvr_signup", cvrContactSales: "cvr_contact_sales",
  workManagerPct: "work_manager_pct", twodayActivePct: "twoday_active_pct",
  dealPct: "deal_pct",
  costPerSignup: "cost_per_signup", costPerContactSales: "cost_per_contact_sales",
  costPerDeal: "cost_per_deal",
  arrProxyPerSpend: "arr_proxy_per_spend", wasteScore: "waste_score",
  scaleScore: "scale_score", predictedValueScore: "predicted_value_score",
  priorityTier: "priority_tier",
};

const DB_COLS = Object.values(COL_MAP);
const JSON_KEYS = Object.keys(COL_MAP);

function rowToValues(row) {
  return JSON_KEYS.map((k) => {
    const v = row[k];
    return v === undefined || v === null ? null : v;
  });
}

function buildInsertSQL(rows) {
  const placeholders = [];
  const values = [];
  let idx = 1;
  for (const row of rows) {
    const vals = rowToValues(row);
    const ph = vals.map(() => `$${idx++}`);
    placeholders.push(`(${ph.join(",")})`);
    values.push(...vals);
  }
  const colList = DB_COLS.join(",");
  const conflictCols = "day,channel,country,campaign,ad_group,ad_name,keyword";
  const updateSet = DB_COLS
    .filter((c) => !["day","channel","country","campaign","ad_group","ad_name","keyword"].includes(c))
    .map((c) => `${c}=EXCLUDED.${c}`)
    .join(",");
  return {
    text: `INSERT INTO campaign_metrics (${colList}) VALUES ${placeholders.join(",")} ON CONFLICT (${conflictCols}) DO UPDATE SET ${updateSet}`,
    values,
  };
}

async function main() {
  const filePath = process.argv[2] || "data/mart-import/gb_90d_v3_merged.json";
  console.log(`Streaming ${filePath}...`);

  // Run migration first
  console.log("Running migration...");
  const migrationSQL = readFileSync("scripts/mart-migrate.sql", "utf8");
  const statements = migrationSQL.split(";").map(s => s.trim()).filter(s => s.length > 0);
  for (const stmt of statements) {
    await sql(stmt);
  }
  console.log("Migration done ✅");

  // Stream parse the JSON array at $.data[*]
  let imported = 0;
  let batch = [];
  let errors = 0;

  const pipeline = chain([
    createReadStream(filePath),
    parser(),
    streamArray(),
  ]);

  // The JSON is { "data": [ ... ] }, streamArray picks up $.data items
  for await (const { value } of pipeline) {
    batch.push(value);
    if (batch.length >= BATCH) {
      try {
        const { text, values } = buildInsertSQL(batch);
        await sql(text, values);
        imported += batch.length;
      } catch (e) {
        errors++;
        if (errors <= 3) console.error(`  Batch error at row ${imported}: ${e.message?.slice(0, 200)}`);
      }
      batch = [];
      if (imported % 5000 === 0) {
        console.log(`  ${imported} rows imported...`);
      }
    }
  }

  // Final batch
  if (batch.length > 0) {
    try {
      const { text, values } = buildInsertSQL(batch);
      await sql(text, values);
      imported += batch.length;
    } catch (e) {
      errors++;
      console.error(`  Final batch error: ${e.message?.slice(0, 200)}`);
    }
  }

  console.log(`\n✅ Imported ${imported} rows into campaign_metrics (${errors} batch errors)`);
}

main().catch((e) => { console.error("Fatal:", e); process.exit(1); });
