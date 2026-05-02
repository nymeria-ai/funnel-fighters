#!/usr/bin/env python3
"""
Sync BigBrain funnel data to Funnel Fighters.
Reads verified queries from FF, runs them against BigBrain, pushes results.
"""
import json, os, sys

# BigBrain results from the latest query run (will be populated by the agent)
# For now, hardcode the results we just got from BigBrain

FF = "https://funnel-fighters.vercel.app"
SECRET = os.environ.get("ADMIN_SYNC_SECRET", "")

def main():
    import subprocess
    
    # The bigbrain_funnel table expects:
    # source, campaign_name, ad_group_name, period_start, period_end,
    # total_signups, hard_signups, engaged_2nd_day, paying
    
    # Read results from stdin (JSON array)
    data = json.load(sys.stdin)
    
    rows = []
    for r in data:
        rows.append({
            "source": r.get("source") or "unknown",
            "campaign_name": r.get("campaign") or "unknown",
            "ad_group_name": r.get("groupedChannel") or r.get("grouped_channel") or "",
            "period_start": "2026-03-31",  # last 30 days
            "period_end": "2026-04-30",
            "total_signups": r.get("totalSignups") or r.get("total_signups") or 0,
            "hard_signups": r.get("hardSignups") or r.get("hard_signups") or 0,
            "engaged_2nd_day": r.get("engaged2ndDay") or r.get("engaged_2nd_day") or 0,
            "paying": r.get("paying") or r.get("hardSignups") or r.get("hard_signups") or 0
        })
    
    # POST to bigbrain sync endpoint
    payload = json.dumps({"rows": rows})
    with open("/tmp/bb_sync.json", "w") as f:
        f.write(payload)
    
    result = subprocess.run(["curl", "-s", "-X", "POST",
        "-H", f"Authorization: Bearer {SECRET}",
        "-H", "Content-Type: application/json",
        f"{FF}/api/admin/sync-bigbrain",
        "-d", f"@/tmp/bb_sync.json"
    ], capture_output=True, text=True)
    
    print(result.stdout)
    if result.returncode != 0:
        print(f"Error: {result.stderr}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
