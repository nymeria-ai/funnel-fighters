#!/usr/bin/env python3
"""
Funnel Fighters — BigBrain Data Sync Script
============================================
Reads JSON data files from ./data/ and pushes them to the Funnel Fighters
dashboard via the /api/admin/sync-funnel endpoint.

Usage:
  # Push to local dev
  python scripts/sync_bigbrain_data.py --url http://localhost:3000 --secret YOUR_SECRET

  # Push to production
  python scripts/sync_bigbrain_data.py --url https://funnel-fighters.vercel.app --secret YOUR_SECRET

  # Dry run (just validate and show what would be sent)
  python scripts/sync_bigbrain_data.py --dry-run

Environment:
  FUNNEL_FIGHTERS_URL     Base URL (default: http://localhost:3000)
  ADMIN_SYNC_SECRET       Auth token for sync endpoint
"""

import json
import os
import sys
import argparse
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.error import HTTPError, URLError

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR.parent / "data"

SYNC_FILES = {
    "weekly_cohorts.json": "weekly",
    "product_funnel.json": "product_funnel",
    "lp_funnel.json": "lp_funnel",
    "duck_scores.json": "duck_scores",
}


def load_data_file(filename: str) -> dict:
    """Load and validate a data JSON file."""
    filepath = DATA_DIR / filename
    if not filepath.exists():
        raise FileNotFoundError(f"Data file not found: {filepath}")
    
    with open(filepath) as f:
        data = json.load(f)
    
    if "rows" not in data or not isinstance(data["rows"], list):
        raise ValueError(f"Invalid data file {filename}: missing 'rows' array")
    
    return data


def push_to_api(base_url: str, secret: str, sync_type: str, rows: list) -> dict:
    """Push rows to the sync-funnel endpoint."""
    url = f"{base_url.rstrip('/')}/api/admin/sync-funnel"
    payload = json.dumps({"type": sync_type, "rows": rows}).encode("utf-8")
    
    req = Request(url, data=payload, method="POST")
    req.add_header("Content-Type", "application/json")
    req.add_header("Authorization", f"Bearer {secret}")
    
    try:
        with urlopen(req, timeout=60) as resp:
            return json.loads(resp.read())
    except HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        return {"error": f"HTTP {e.code}", "details": body}
    except URLError as e:
        return {"error": "Connection failed", "details": str(e.reason)}


def main():
    parser = argparse.ArgumentParser(description="Sync BigBrain data to Funnel Fighters")
    parser.add_argument("--url", default=os.environ.get("FUNNEL_FIGHTERS_URL", "http://localhost:3000"))
    parser.add_argument("--secret", default=os.environ.get("ADMIN_SYNC_SECRET", ""))
    parser.add_argument("--dry-run", action="store_true", help="Validate only, don't push")
    parser.add_argument("--file", help="Sync specific file only (e.g. weekly_cohorts.json)")
    args = parser.parse_args()

    files_to_sync = {args.file: SYNC_FILES[args.file]} if args.file else SYNC_FILES

    print("=" * 60)
    print("FUNNEL FIGHTERS — BigBrain Data Sync")
    print("=" * 60)
    print(f"Target: {args.url}")
    print(f"Mode: {'DRY RUN' if args.dry_run else 'LIVE'}")
    print(f"Files: {len(files_to_sync)}")
    print()

    total_rows = 0
    results = []

    for filename, sync_type in files_to_sync.items():
        try:
            data = load_data_file(filename)
            rows = data["rows"]
            total_rows += len(rows)
            
            print(f"📂 {filename}")
            print(f"   Type: {sync_type}")
            print(f"   Rows: {len(rows)}")
            print(f"   Source: {data.get('source', 'unknown')}")
            print(f"   Generated: {data.get('generated_at', 'unknown')}")
            
            if args.dry_run:
                print(f"   ✅ Validated (dry run)")
                results.append({"file": filename, "status": "validated", "rows": len(rows)})
            else:
                if not args.secret:
                    print(f"   ❌ No ADMIN_SYNC_SECRET provided")
                    results.append({"file": filename, "status": "error", "error": "no secret"})
                    continue
                
                result = push_to_api(args.url, args.secret, sync_type, rows)
                if "error" in result:
                    print(f"   ❌ Failed: {result['error']}")
                    results.append({"file": filename, "status": "error", "error": result["error"]})
                else:
                    print(f"   ✅ Synced: {result.get('upserted', '?')} rows")
                    results.append({"file": filename, "status": "synced", "upserted": result.get("upserted")})
            print()
            
        except (FileNotFoundError, ValueError) as e:
            print(f"❌ {filename}: {e}")
            results.append({"file": filename, "status": "error", "error": str(e)})
            print()

    print("=" * 60)
    print(f"SUMMARY: {total_rows} total rows across {len(files_to_sync)} files")
    success = sum(1 for r in results if r["status"] in ("validated", "synced"))
    print(f"Results: {success}/{len(results)} successful")
    print("=" * 60)

    return 0 if success == len(results) else 1


if __name__ == "__main__":
    sys.exit(main())
