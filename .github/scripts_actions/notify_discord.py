#!/usr/bin/env python3
"""
Unified Discord Notification Script for CI/CD Deployments
Sends a rich Discord embed for both Frontend (Vercel) and Backend (GCP Cloud Run).
"""

import os
import sys
import json
import urllib.request
import urllib.error
from datetime import datetime

# Ensure safe UTF-8 output across Windows and Linux terminals
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

def send_discord_notification():
    webhook_url = os.getenv("DISCORD_DEPLOY_WEBHOOK_URL") or os.getenv("DISCORD_WEBHOOK_URL")
    if not webhook_url:
        print("ℹ️ DISCORD_DEPLOY_WEBHOOK_URL not set; skipping Discord deployment notification.")
        return

    status = os.getenv("DEPLOY_STATUS", "SUCCESS").upper()
    target = os.getenv("DEPLOY_TARGET", "Deployment")
    env = os.getenv("DEPLOY_ENV", "production")
    live_url = os.getenv("DEPLOY_URL", "")
    commit_sha = os.getenv("GITHUB_SHA", "unknown")[:7]
    branch = os.getenv("GITHUB_REF_NAME", os.getenv("GITHUB_REF", "main").replace("refs/heads/", ""))
    actor = os.getenv("GITHUB_ACTOR", "github-actions")
    repo = os.getenv("GITHUB_REPOSITORY", "Froillan123/Portfolio")
    commit_msg = os.getenv("COMMIT_MESSAGE", "CI/CD automated trigger")

    is_success = status == "SUCCESS"
    color = 0x22C55E if is_success else 0xEF4444  # Emerald green vs Crimson red
    status_icon = "✅ SUCCESS" if is_success else "❌ FAILED"

    fields = [
        {"name": "🎯 Target", "value": f"`{target}`", "inline": True},
        {"name": "🌍 Environment", "value": f"`{env}`", "inline": True},
        {"name": "🌿 Branch", "value": f"`{branch}`", "inline": True},
        {"name": "📦 Commit", "value": f"[{commit_sha}](https://github.com/{repo}/commit/{os.getenv('GITHUB_SHA', '')})", "inline": True},
        {"name": "👤 Author", "value": f"`{actor}`", "inline": True},
        {"name": "📊 Status", "value": f"**{status_icon}**", "inline": True},
    ]

    if live_url:
        fields.append({"name": "🔗 Live URL", "value": f"[Visit Service]({live_url})", "inline": False})

    fields.append({"name": "💬 Commit Message", "value": f"```{commit_msg[:150]}```", "inline": False})

    payload = {
        "username": "GitOps Deployment Control",
        "avatar_url": "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/google-cloud/google-cloud.png",
        "embeds": [
            {
                "title": f"🚀 Deployment Update: {target}",
                "description": f"Continuous Delivery pipeline execution completed with status **{status_icon}**.",
                "color": color,
                "fields": fields,
                "footer": {
                    "text": f"FaceOfMind GitOps Engine • {repo}",
                },
                "timestamp": datetime.utcnow().isoformat() + "Z"
            }
        ]
    }

    try:
        req = urllib.request.Request(
            webhook_url,
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "Content-Type": "application/json",
                "User-Agent": "GitOps-Notifier/1.0"
            },
            method="POST"
        )
        with urllib.request.urlopen(req) as resp:
            print(f"📡 Discord notification sent successfully! HTTP Status: {resp.status}")
    except urllib.error.HTTPError as e:
        print(f"⚠️ Discord notification failed: HTTP {e.code} - {e.read().decode('utf-8')}")
    except Exception as e:
        print(f"⚠️ Failed to send Discord notification: {e}")

if __name__ == "__main__":
    send_discord_notification()
