#!/usr/bin/env python3
"""
Funnel Fighters — Google Ads Data Refresh
==========================================
Pulls fresh campaign, ad, and keyword data from Google Ads API.
Saves to ./data/google_ads_*.json for dashboard consumption.

Requires: google-ads Python library
"""

import json
import os
import sys
from pathlib import Path
from datetime import datetime

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR.parent / "data"
SECRETS_DIR = Path("/opt/ocana/openclaw/.secrets")

# Google Ads config
MCC_ID = "7645779471"
ACCOUNT_ID = "3746504118"

def load_credentials():
    """Load OAuth + developer token."""
    oauth_path = SECRETS_DIR / "google_ads_oauth.json"
    tokens_path = SECRETS_DIR / "google_ads_tokens.json"
    
    with open(oauth_path) as f:
        oauth = json.load(f)
    with open(tokens_path) as f:
        tokens = json.load(f)
    
    # OAuth file has nested 'installed' key from GCP console download
    installed = oauth.get("installed", oauth)
    
    return {
        "client_id": installed.get("client_id"),
        "client_secret": installed.get("client_secret"),
        "developer_token": oauth.get("developer_token"),
        "refresh_token": tokens.get("refresh_token"),
        "login_customer_id": MCC_ID,
    }


def get_google_ads_client(creds):
    """Create Google Ads API client."""
    from google.ads.googleads.client import GoogleAdsClient
    
    config = {
        "client_id": creds["client_id"],
        "client_secret": creds["client_secret"],
        "developer_token": creds["developer_token"],
        "refresh_token": creds["refresh_token"],
        "login_customer_id": creds["login_customer_id"],
        "use_proto_plus": False,
    }
    
    return GoogleAdsClient.load_from_dict(config)


def query_ads(client, customer_id, query):
    """Run a GAQL query and return results."""
    service = client.get_service("GoogleAdsService")
    results = []
    try:
        response = service.search_stream(customer_id=customer_id, query=query)
        for batch in response:
            for row in batch.results:
                results.append(row)
    except Exception as e:
        print(f"  ⚠️  Query failed: {e}")
    return results


def pull_campaigns(client):
    """Pull campaign-level metrics (last 30 days)."""
    print("📊 Pulling campaigns...")
    query = """
        SELECT campaign.id, campaign.name, campaign.status,
               campaign.advertising_channel_type, campaign.bidding_strategy_type,
               metrics.impressions, metrics.clicks, metrics.cost_micros,
               metrics.conversions, metrics.ctr, metrics.average_cpc,
               metrics.search_impression_share
        FROM campaign
        WHERE segments.date DURING LAST_30_DAYS
          AND campaign.status != 'REMOVED'
          AND campaign.advertising_channel_type = 'SEARCH'
        ORDER BY metrics.cost_micros DESC
        LIMIT 100
    """
    rows = query_ads(client, ACCOUNT_ID, query)
    campaigns = []
    for r in rows:
        campaigns.append({
            "id": str(r.campaign.id),
            "name": r.campaign.name,
            "status": str(r.campaign.status).split(".")[-1],
            "channel_type": str(r.campaign.advertising_channel_type).split(".")[-1],
            "bidding_strategy": str(r.campaign.bidding_strategy_type).split(".")[-1],
            "impressions": r.metrics.impressions,
            "clicks": r.metrics.clicks,
            "cost": round(r.metrics.cost_micros / 1_000_000, 2),
            "conversions": round(r.metrics.conversions, 1),
            "ctr": round(r.metrics.ctr * 100, 2),
            "avg_cpc": round(r.metrics.average_cpc / 1_000_000, 2),
            "search_impression_share": round((r.metrics.search_impression_share or 0) * 100, 1),
        })
    print(f"   Got {len(campaigns)} campaigns")
    return campaigns


def pull_ads(client):
    """Pull ad-level data with headlines, descriptions, final URLs."""
    print("📊 Pulling ads...")
    query = """
        SELECT ad_group_ad.ad.id, ad_group_ad.ad.type, ad_group_ad.ad.final_urls,
               ad_group_ad.ad.responsive_search_ad.headlines,
               ad_group_ad.ad.responsive_search_ad.descriptions,
               ad_group_ad.status, ad_group.name, ad_group.id,
               campaign.name, campaign.id,
               metrics.impressions, metrics.clicks, metrics.cost_micros,
               metrics.conversions
        FROM ad_group_ad
        WHERE segments.date DURING LAST_30_DAYS
          AND ad_group_ad.status != 'REMOVED'
          AND campaign.status = 'ENABLED'
          AND campaign.advertising_channel_type = 'SEARCH'
        ORDER BY metrics.cost_micros DESC
        LIMIT 300
    """
    rows = query_ads(client, ACCOUNT_ID, query)
    ads = []
    for r in rows:
        rsa = r.ad_group_ad.ad.responsive_search_ad
        headlines = [h.text for h in (rsa.headlines if rsa else [])]
        descriptions = [d.text for d in (rsa.descriptions if rsa else [])]
        final_urls = list(r.ad_group_ad.ad.final_urls)
        
        ads.append({
            "ad_id": str(r.ad_group_ad.ad.id),
            "ad_type": str(getattr(r.ad_group_ad.ad, 'type_', 'UNKNOWN')).split(".")[-1],
            "status": str(r.ad_group_ad.status).split(".")[-1],
            "campaign_id": str(r.campaign.id),
            "campaign_name": r.campaign.name,
            "ad_group_id": str(r.ad_group.id),
            "ad_group_name": r.ad_group.name,
            "headlines": headlines,
            "descriptions": descriptions,
            "final_urls": final_urls,
            "impressions": r.metrics.impressions,
            "clicks": r.metrics.clicks,
            "cost": round(r.metrics.cost_micros / 1_000_000, 2),
            "conversions": round(r.metrics.conversions, 1),
        })
    print(f"   Got {len(ads)} ads")
    return ads


def pull_keywords(client):
    """Pull keyword-level metrics via keyword_view."""
    print("📊 Pulling keywords...")
    query = """
        SELECT ad_group_criterion.criterion_id, ad_group_criterion.keyword.text,
               ad_group_criterion.keyword.match_type, ad_group_criterion.status,
               ad_group.id, ad_group.name, campaign.id, campaign.name,
               metrics.impressions, metrics.clicks, metrics.cost_micros,
               metrics.conversions
        FROM keyword_view
        WHERE segments.date DURING LAST_30_DAYS
          AND campaign.status = 'ENABLED'
          AND campaign.advertising_channel_type = 'SEARCH'
        ORDER BY metrics.cost_micros DESC
        LIMIT 500
    """
    rows = query_ads(client, ACCOUNT_ID, query)
    keywords = []
    for r in rows:
        keywords.append({
            "criterion_id": str(r.ad_group_criterion.criterion_id),
            "keyword": r.ad_group_criterion.keyword.text,
            "match_type": str(r.ad_group_criterion.keyword.match_type).split(".")[-1],
            "status": str(r.ad_group_criterion.status).split(".")[-1],
            "campaign_id": str(r.campaign.id),
            "campaign_name": r.campaign.name,
            "ad_group_id": str(r.ad_group.id),
            "ad_group_name": r.ad_group.name,
            "impressions": r.metrics.impressions,
            "clicks": r.metrics.clicks,
            "cost": round(r.metrics.cost_micros / 1_000_000, 2),
            "conversions": round(r.metrics.conversions, 1),
        })
    print(f"   Got {len(keywords)} keywords")
    return keywords


def main():
    print("=" * 60)
    print("FUNNEL FIGHTERS — Google Ads Data Refresh")
    print("=" * 60)
    print(f"Account: {ACCOUNT_ID} (MCC: {MCC_ID})")
    print(f"Timestamp: {datetime.utcnow().isoformat()}Z")
    print()
    
    creds = load_credentials()
    client = get_google_ads_client(creds)
    
    # Pull data
    campaigns = pull_campaigns(client)
    ads = pull_ads(client)
    keywords = pull_keywords(client)
    
    # Save to data/
    DATA_DIR.mkdir(exist_ok=True)
    
    now = datetime.utcnow().isoformat() + "Z"
    
    with open(DATA_DIR / "google_ads_campaigns.json", "w") as f:
        json.dump({"source": "Google Ads API", "account_id": ACCOUNT_ID, "generated_at": now, "rows": campaigns}, f, indent=2)
    print(f"\n✅ Saved {len(campaigns)} campaigns → data/google_ads_campaigns.json")
    
    with open(DATA_DIR / "google_ads_ads.json", "w") as f:
        json.dump({"source": "Google Ads API", "account_id": ACCOUNT_ID, "generated_at": now, "rows": ads}, f, indent=2)
    print(f"✅ Saved {len(ads)} ads → data/google_ads_ads.json")
    
    with open(DATA_DIR / "google_ads_keywords.json", "w") as f:
        json.dump({"source": "Google Ads API", "account_id": ACCOUNT_ID, "generated_at": now, "rows": keywords}, f, indent=2)
    print(f"✅ Saved {len(keywords)} keywords → data/google_ads_keywords.json")
    
    print(f"\n{'='*60}")
    print(f"TOTAL: {len(campaigns)} campaigns, {len(ads)} ads, {len(keywords)} keywords")
    print(f"{'='*60}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
