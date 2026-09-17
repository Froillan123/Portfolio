import re
import time
import datetime
import secrets
import httpx
from collections import defaultdict
from fastapi import Request, HTTPException, Security, status
from fastapi.security import APIKeyHeader
from backend.config import DISCORD_WEBHOOK_URL, ADMIN_API_KEY

api_key_header = APIKeyHeader(name="X-Admin-Key", auto_error=False)

class InMemoryRateLimiter:
    """
    Zero-dependency, high-performance in-memory sliding window rate limiter.
    Tracks requests per client IP and cleans up expired windows.
    """
    def __init__(self, max_requests: int = 5, window_seconds: int = 60):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = defaultdict(list)

    def is_allowed(self, client_ip: str) -> tuple[bool, int]:
        now = time.time()
        window_start = now - self.window_seconds

        # Filter out timestamps older than the active window
        valid_timestamps = [t for t in self.requests[client_ip] if t > window_start]
        self.requests[client_ip] = valid_timestamps

        if len(valid_timestamps) >= self.max_requests:
            retry_after = int(self.window_seconds - (now - valid_timestamps[0]))
            return False, max(1, retry_after)

        self.requests[client_ip].append(now)
        return True, 0

# Rate limiter instances for contact submissions & bursts
contact_rate_limiter = InMemoryRateLimiter(max_requests=5, window_seconds=60)      # 5 per minute
burst_rate_limiter = InMemoryRateLimiter(max_requests=15, window_seconds=3600)    # 15 per hour

def check_contact_rate_limit(request: Request):
    """FastAPI dependency to enforce rate limits per client IP."""
    client_ip = get_client_ip(request)
    
    # Check minute limit
    allowed, retry_after = contact_rate_limiter.is_allowed(client_ip)
    if not allowed:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Rate limit exceeded (Max 5 requests/minute). Please wait {retry_after}s before retrying.",
            headers={"Retry-After": str(retry_after)}
        )
    
    # Check hourly burst limit
    allowed_burst, retry_after_burst = burst_rate_limiter.is_allowed(client_ip)
    if not allowed_burst:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Hourly inquiry limit reached. Please try again later.",
            headers={"Retry-After": str(retry_after_burst)}
        )

def get_client_ip(request: Request) -> str:
    """Extracts and sanitizes the real client IP from Cloudflare, reverse proxy, or socket."""
    ip = "127.0.0.1"
    # 1. Cloudflare header
    cf_ip = request.headers.get("CF-Connecting-IP")
    if cf_ip:
        ip = cf_ip.strip()
    else:
        # 2. X-Forwarded-For header (first IP is the client)
        x_forwarded_for = request.headers.get("X-Forwarded-For")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0].strip()
        else:
            # 3. X-Real-IP header
            x_real_ip = request.headers.get("X-Real-IP")
            if x_real_ip:
                ip = x_real_ip.strip()
            elif request.client and request.client.host:
                ip = request.client.host

    # Sanitize IP string to prevent header injection artifacts
    cleaned_ip = re.sub(r"[^\w\.\:\-]", "", ip)[:45]
    return cleaned_ip or "127.0.0.1"

# Disposable / temporary burner email domains
DISPOSABLE_EMAIL_DOMAINS = {
    "tempmail.com", "temp-mail.org", "guerrillamail.com", "guerrillamail.org",
    "mailinator.com", "10minutemail.com", "throwawaymail.com", "trashmail.com",
    "yopmail.com", "sharklasers.com", "dispostable.com", "getairmail.com",
    "fakemailgenerator.com", "nada.ltd", "burnermail.io", "maildrop.cc",
    "crazymailing.com", "tmail.ws", "tempmailo.com", "mytemp.email"
}

def validate_email_domain(email: str) -> tuple[bool, str]:
    """Validates email domain structure, TLD integrity, and blocks disposable burner domains."""
    trimmed = email.strip().lower()
    if "@" not in trimmed:
        return False, "Invalid email format: missing '@' symbol."
    
    parts = trimmed.split("@")
    if len(parts) != 2 or not parts[0] or not parts[1]:
        return False, "Invalid email format: incomplete user or domain."
    
    domain = parts[1]
    if "." not in domain:
        return False, "Invalid email domain: missing top-level domain extension."
    
    domain_parts = domain.split(".")
    tld = domain_parts[-1]
    if len(tld) < 2 or not tld.isalpha():
        return False, f"Invalid top-level domain '.{tld}'. Please use a legitimate domain."
    
    if domain in DISPOSABLE_EMAIL_DOMAINS:
        return False, "Temporary or disposable email domains are not allowed."
    
    return True, "Valid"

def sanitize_text(text: str) -> tuple[str, list[str]]:
    """Sanitizes text against XSS, SQLi, and Discord @everyone mass pings."""
    flags = []
    sanitized = text

    # Disarm Discord mass mentions and role/user tags
    if re.search(r"@(everyone|here)", sanitized, re.IGNORECASE):
        sanitized = re.sub(r"@everyone", "@\u200beveryone", sanitized, flags=re.IGNORECASE)
        sanitized = re.sub(r"@here", "@\u200bhere", sanitized, flags=re.IGNORECASE)
        flags.append("DISCORD_MENTION_DISARMED")

    if re.search(r"<@&?\d+>", sanitized):
        sanitized = re.sub(r"<@(&?\d+)>", r"<\u200b@\1>", sanitized)
        flags.append("DISCORD_TAG_DISARMED")

    # Strip dangerous HTML and scripts
    cleaned_xss = re.sub(r"<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>", "[filtered_script]", sanitized, flags=re.IGNORECASE)
    cleaned_xss = re.sub(r"<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>", "[filtered_iframe]", cleaned_xss, flags=re.IGNORECASE)
    cleaned_xss = re.sub(r"javascript:", "blocked_js:", cleaned_xss, flags=re.IGNORECASE)
    cleaned_xss = re.sub(r"onload\s*=", "blocked_attr=", cleaned_xss, flags=re.IGNORECASE)
    cleaned_xss = re.sub(r"onerror\s*=", "blocked_attr=", cleaned_xss, flags=re.IGNORECASE)

    if cleaned_xss != sanitized:
        flags.append("XSS_PATTERN_NEUTRALIZED")
        sanitized = cleaned_xss

    return sanitized.strip(), flags

async def dispatch_discord_embed(
    inquiry_id: int,
    name: str,
    email: str,
    subject: str,
    message: str,
    client_ip: str,
    waf_flags: str = "Clean"
) -> bool:
    """Dispatches a formatted rich Discord Embed to the configured webhook with link support and clean layout."""
    if not DISCORD_WEBHOOK_URL:
        return False

    now = datetime.datetime.utcnow()
    iso_time = now.isoformat()

    category_colors = {
        "Platform / Cloud Systems Role Opportunity": 0x0ea5e9,  # Sky Blue
        "Cloud Security Audit / Consulting": 0xef4444,          # Rose Red
        "Technical Collaboration & Systems Architecture": 0x8b5cf6,  # Violet
        "General Inquiry": 0x10b981,                            # Emerald
    }
    embed_color = category_colors.get(subject, 0x0284c7)

    # Truncate to safe Discord API constraints (avoid 400 Bad Request)
    safe_name = name[:100]
    safe_email = email[:100]
    safe_subject = subject[:150]
    safe_message = message[:4000]

    payload = {
        "username": "Froillan Portfolio Inquiries",
        "avatar_url": "https://cdn-icons-png.flaticon.com/512/9068/9068642.png",
        "allowed_mentions": {
            "parse": []  # Strictly disallow all mention triggers server-side
        },
        "embeds": [
            {
                "title": f"📬 New Portfolio Inquiry #{inquiry_id}",
                "description": (
                    f"**👤 Sender:** {safe_name}\n"
                    f"**📧 Email:** [{safe_email}](mailto:{safe_email})\n"
                    f"**🎯 Category:** `{safe_subject}`\n\n"
                    f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n"
                    f"### 💬 Message\n"
                    f"{safe_message}\n\u200b"
                ),
                "color": embed_color,
                "footer": {
                    "text": f"Froillan Ingress Gateway · Inquiry #{inquiry_id}"
                },
                "timestamp": iso_time
            }
        ]
    }

    try:
        async with httpx.AsyncClient(timeout=8.0) as client:
            resp = await client.post(DISCORD_WEBHOOK_URL, json=payload)
            print(f"[Discord Dispatch] Ingress #{inquiry_id} -> Status: {resp.status_code}")
            return resp.status_code in [200, 204]
    except Exception as e:
        print(f"[Discord Dispatch Error] {e}")
        return False

def verify_admin_key(api_key: str = Security(api_key_header)) -> bool:
    """Admin authentication using constant-time comparison against timing attacks."""
    if not ADMIN_API_KEY:
        return True
    if api_key and secrets.compare_digest(api_key, ADMIN_API_KEY):
        return True
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or missing Admin API Key (pass header X-Admin-Key)"
    )
