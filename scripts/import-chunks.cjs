#!/usr/bin/env node
// Import pre-chunked JSON files into campaign_metrics
const { readFileSync, readdirSync } = require("fs");
const { resolve } = require("path");
const { neon } = require(resolve(__dirname, "../node_modules/@neondatabase/serverless"));

// Load .env.local
const envPath = resolve(process.cwd(), ".env.local");
try {
  const envContent = readFileSync(envPath, "utf8");
  for (const line of envContent.split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) { const k=m[1].trim(), v=m[2].trim().replace(/^"|"$/g,""); if(!process.env[k]) process.env[k]=v; }
  }
} catch(e){}

const sql = neon(process.env.DATABASE_URL);
const BATCH = 100;

const COL_MAP = {
  day:"day",channel:"channel",country:"country",campaign:"campaign",
  adGroup:"ad_group",adName:"ad_name",keyword:"keyword",matchType:"match_type",
  spend:"spend",impressions:"impressions",clicks:"clicks",
  hardSignupsN:"hard_signups_n",qualifiedSignupsN:"qualified_signups_n",
  gmailSignupsN:"gmail_signups_n",workManagerN:"work_manager_n",
  twodayActiveN:"twoday_active_n",mktTwodayActiveN:"mkt_twoday_active_n",
  invitedOthersN:"invited_others_n",setup24HCrmN:"setup_24h_crm_n",
  contactSalesN:"contact_sales_n",distributedLeadsN:"distributed_leads_n",
  distributedSignupLeadsN:"distributed_signup_leads_n",
  distributedCsLeadsN:"distributed_cs_leads_n",
  sqlN:"sql_n",oppN:"opp_n",dealN:"deal_n",
  paying7DN:"paying_7d_n",paying14DN:"paying_14d_n",paying21DN:"paying_21d_n",
  paying28DN:"paying_28d_n",paying35DN:"paying_35d_n",paying60DN:"paying_60d_n",
  paying90DN:"paying_90d_n",paying120DN:"paying_120d_n",payingLifetimeN:"paying_lifetime_n",
  collection7D:"collection_7d",collection14D:"collection_14d",collection21D:"collection_21d",
  collection28D:"collection_28d",collection35D:"collection_35d",collection60D:"collection_60d",
  collection90D:"collection_90d",collection120D:"collection_120d",collection365D:"collection_365d",
  mrr7D:"mrr_7d",mrr14D:"mrr_14d",mrr21D:"mrr_21d",mrr28D:"mrr_28d",
  mrr35D:"mrr_35d",mrr60D:"mrr_60d",mrr90D:"mrr_90d",mrr120D:"mrr_120d",
  mrrLifetime:"mrr_lifetime",
  claimedArr:"claimed_arr",pipelineArr28D:"pipeline_arr_28d",
  pipelineArrRatio:"pipeline_arr_ratio",
  arr7D:"arr_7d",arr14D:"arr_14d",arr21D:"arr_21d",arr28D:"arr_28d",
  arr35D:"arr_35d",arr60D:"arr_60d",arr90D:"arr_90d",arrLifetime:"arr_lifetime",
  avgQeScore:"avg_qe_score",avgPayerProbability:"avg_payer_probability",
  avgPredictedFirstArr:"avg_predicted_first_arr",
  avgCalibratedPrediction:"avg_calibrated_prediction",
  avgCompanySize:"avg_company_size",avgTeamSize:"avg_team_size",
  companySizeGroup:"company_size_group",
  qualityScore:"quality_score",landingPageExperience:"landing_page_experience",
  adRelevance:"ad_relevance",predictedCtr:"predicted_ctr_label",
  bidStrategyType:"bid_strategy_type",searchImprShare:"search_impr_share",
  headroomPct:"headroom_pct",absTopImprShare:"abs_top_impr_share",
  ctr:"ctr",cpc:"cpc",cvrSignup:"cvr_signup",cvrContactSales:"cvr_contact_sales",
  workManagerPct:"work_manager_pct",twodayActivePct:"twoday_active_pct",
  dealPct:"deal_pct",
  costPerSignup:"cost_per_signup",costPerContactSales:"cost_per_contact_sales",
  costPerDeal:"cost_per_deal",
  arrProxyPerSpend:"arr_proxy_per_spend",wasteScore:"waste_score",
  scaleScore:"scale_score",predictedValueScore:"predicted_value_score",
  priorityTier:"priority_tier",
};
const DB_COLS = Object.values(COL_MAP);
const JSON_KEYS = Object.keys(COL_MAP);

function buildSQL(rows) {
  const vals=[]; let idx=1; const phs=[];
  for (const row of rows) {
    const rv = JSON_KEYS.map(k => { const v=row[k]; return v==null?null:v; });
    phs.push(`(${rv.map(()=>`$${idx++}`).join(",")})`);
    vals.push(...rv);
  }
  const upd = DB_COLS.filter(c=>!["day","channel","country","campaign","ad_group","ad_name","keyword"].includes(c)).map(c=>`${c}=EXCLUDED.${c}`).join(",");
  return {
    text: `INSERT INTO campaign_metrics (${DB_COLS.join(",")}) VALUES ${phs.join(",")} ON CONFLICT (day,channel,country,campaign,COALESCE(ad_group,''),COALESCE(ad_name,''),COALESCE(keyword,'')) DO UPDATE SET ${upd}`,
    values: vals,
  };
}

async function main() {
  const dir = "data/mart-import";
  const chunks = readdirSync(dir).filter(f=>f.startsWith("chunk_")).sort();
  console.log(`Found ${chunks.length} chunk files`);
  
  let total = 0, errors = 0;
  const start = Date.now();
  
  for (const chunk of chunks) {
    const rows = JSON.parse(readFileSync(`${dir}/${chunk}`, "utf8"));
    let chunkImported = 0;
    
    for (let i = 0; i < rows.length; i += BATCH) {
      const batch = rows.slice(i, i + BATCH);
      try {
        const { text, values } = buildSQL(batch);
        await sql.query(text, values);
        chunkImported += batch.length;
      } catch(e) {
        errors++;
        if (errors <= 5) console.error(`  Error in ${chunk} at ${i}: ${e.message?.slice(0,120)}`);
      }
    }
    total += chunkImported;
    const elapsed = ((Date.now()-start)/1000).toFixed(0);
    console.log(`  ${chunk}: ${chunkImported} rows (total: ${total}, ${elapsed}s)`);
  }
  
  console.log(`\n✅ Imported ${total} rows in ${((Date.now()-start)/1000).toFixed(0)}s (${errors} errors)`);
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
