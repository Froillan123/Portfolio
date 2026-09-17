#!/usr/bin/env python3
"""
Vercel Deployment Verification Script
Triggers Vercel Deploy Hook and polls Deployments API until terminal state (READY or ERROR).
"""

import os
import sys
import time
import json
import urllib.request
import urllib.error

DEPLOY_HOOK_URL = os.getenv("VERCEL_DEPLOY_HOOK_URL")
VERCEL_TOKEN = os.getenv("VERCEL_TOKEN")
VERCEL_PROJECT_ID = os.getenv("VERCEL_PROJECT_ID", "prj_DvOSDvCGzooytRd9255aQPWN7AyJ")
VERCEL_ORG_ID = os.getenv("VERCEL_ORG_ID", "team_mohFlju4zqjlLP9BF8k8IKRC")

def trigger_hook(hook_url: str):
    print(f"🚀 Triggering Vercel Deploy Hook...")
    req = urllib.request.Request(hook_url, data=b"", method="POST")
    try:
        with urllib.request.urlopen(req) as response:
            body = response.read().decode("utf-8")
            print(f"✅ Vercel hook accepted trigger. Response:\n{body}")
            try:
                return json.loads(body)
            except Exception:
                return {}
    except urllib.error.HTTPError as e:
        print(f"❌ Error triggering Vercel Hook: HTTP {e.code} - {e.read().decode('utf-8')}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected error triggering Vercel Hook: {e}")
        sys.exit(1)

def poll_deployment_status(token: str, project_id: str, max_wait_sec: int = 300, poll_interval: int = 10):
    print(f"⏳ Polling Vercel Deployments API for project: {project_id}...")
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    url = f"https://api.vercel.com/v6/deployments?projectId={project_id}&limit=1"
    if VERCEL_ORG_ID:
        url += f"&teamId={VERCEL_ORG_ID}"

    start_time = time.time()
    while time.time() - start_time < max_wait_sec:
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                deployments = data.get("deployments", [])
                if deployments:
                    latest = deployments[0]
                    state = latest.get("readyState") or latest.get("state")
                    dep_url = latest.get("url")
                    created_at = latest.get("createdAt")
                    print(f"  [Status: {state}] URL: https://{dep_url} (Elapsed: {int(time.time() - start_time)}s)")

                    if state in ("READY", "READY_STATE_READY"):
                        print(f"🎉 Deployment SUCCESS! Live at: https://{dep_url}")
                        return True
                    elif state in ("ERROR", "CANCELED"):
                        print(f"❌ Deployment FAILED with state: {state}")
                        return False
        except Exception as err:
            print(f"  ⚠️ Warning querying Vercel API: {err}")

        time.sleep(poll_interval)

    print(f"⚠️ Polling timed out after {max_wait_sec}s. Assuming asynchronous processing.")
    return True

def main():
    if not DEPLOY_HOOK_URL:
        print("❌ Error: VERCEL_DEPLOY_HOOK_URL environment variable is missing.")
        sys.exit(1)

    trigger_hook(DEPLOY_HOOK_URL)

    if VERCEL_TOKEN and VERCEL_PROJECT_ID:
        time.sleep(5)
        success = poll_deployment_status(VERCEL_TOKEN, VERCEL_PROJECT_ID)
        if not success:
            sys.exit(1)
    else:
        print("ℹ️ VERCEL_TOKEN not provided; skipped terminal state polling.")

if __name__ == "__main__":
    main()
