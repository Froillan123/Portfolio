#!/usr/bin/env python3
"""
Vercel Deployment Verification Script
Triggers Vercel Deploy Hook and polls Deployments API until the newly triggered deployment
reaches a terminal state (READY or ERROR/CANCELED).
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
    print("🚀 Triggering Vercel Deploy Hook...")
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

def poll_deployment_status(token: str, project_id: str, trigger_time_ms: int, max_wait_sec: int = 300, poll_interval: int = 8):
    print(f"⏳ Polling Vercel Deployments API for project: {project_id} (Triggered at: {trigger_time_ms})...")
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    url = f"https://api.vercel.com/v6/deployments?projectId={project_id}&limit=5"
    if VERCEL_ORG_ID:
        url += f"&teamId={VERCEL_ORG_ID}"

    start_time = time.time()
    target_deployment_id = None

    while time.time() - start_time < max_wait_sec:
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                deployments = data.get("deployments", [])

                if deployments:
                    # Find deployment created around or after our trigger time
                    matching_deployment = None
                    for dep in deployments:
                        created_at = dep.get("createdAt", 0)
                        # Created within 30 seconds before trigger or after
                        if created_at >= (trigger_time_ms - 30000):
                            matching_deployment = dep
                            break

                    if matching_deployment:
                        dep_id = matching_deployment.get("uid") or matching_deployment.get("id")
                        state = matching_deployment.get("readyState") or matching_deployment.get("state")
                        dep_url = matching_deployment.get("url")
                        elapsed = int(time.time() - start_time)

                        print(f"  [Deployment: {dep_id}] Status: {state} | URL: https://{dep_url} (Elapsed: {elapsed}s)")

                        if state in ("READY", "READY_STATE_READY"):
                            print(f"🎉 Deployment SUCCESS! Live at: https://{dep_url}")
                            return True
                        elif state in ("ERROR", "CANCELED"):
                            print(f"❌ Vercel Deployment FAILED with state: {state}")
                            return False
                    else:
                        print(f"  ⏳ Waiting for Vercel to queue new build... (Elapsed: {int(time.time() - start_time)}s)")
        except Exception as err:
            print(f"  ⚠️ Warning querying Vercel API: {err}")

        time.sleep(poll_interval)

    print(f"⚠️ Polling timed out after {max_wait_sec}s.")
    return False

def main():
    if not DEPLOY_HOOK_URL:
        print("❌ Error: VERCEL_DEPLOY_HOOK_URL environment variable is missing.")
        sys.exit(1)

    trigger_time_ms = int(time.time() * 1000)
    trigger_hook(DEPLOY_HOOK_URL)

    if VERCEL_TOKEN and VERCEL_PROJECT_ID:
        # Give Vercel 5 seconds to register build in queue
        time.sleep(5)
        success = poll_deployment_status(VERCEL_TOKEN, VERCEL_PROJECT_ID, trigger_time_ms)
        if not success:
            sys.exit(1)
    else:
        print("ℹ️ VERCEL_TOKEN not provided; skipped terminal state polling.")

if __name__ == "__main__":
    main()
