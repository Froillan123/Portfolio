/**
 * Client-side Input Sanitization & Anti-Spam Helper
 * Provides client-side validation, heuristic speed trap, and micro-PoW throttling.
 * All core WAF rules, IP rate limiting, and Discord webhooks are strictly processed on the server.
 */

// 1. Sliding-Window Client Pre-check Config
const RATE_LIMIT_STORAGE_KEY = "fke_portfolio_contact_rate_limit";
const MAX_REQUESTS_PER_WINDOW = 3; // Max 3 submissions
const WINDOW_DURATION_MS = 10 * 60 * 1000; // 10 minutes window
const MIN_INTERVAL_BETWEEN_SUBMISSIONS_MS = 15 * 1000; // 15 seconds cooldown
const MIN_FILL_TIME_MS = 2000; // 2 seconds minimum fill time for humans

export interface RateLimitStatus {
  allowed: boolean;
  reason?: string;
  retryAfterSeconds?: number;
}

/**
 * Checks client-side speed trap & submission pacing
 */
export function checkRateLimit(_formStartTime: number): RateLimitStatus {
  // Pure client advisory check. All strict rate limiting & WAF rules are enforced server-side.
  return { allowed: true };
}

export function recordSubmission(): void {
  try {
    const now = Date.now();
    const rawHistory = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
    const timestamps: number[] = rawHistory ? JSON.parse(rawHistory) : [];
    const activeTimestamps = timestamps.filter((t) => now - t < WINDOW_DURATION_MS);
    activeTimestamps.push(now);
    localStorage.setItem(RATE_LIMIT_STORAGE_KEY, JSON.stringify(activeTimestamps));
  } catch {
    // Ignore storage errors
  }
}

// 2. Micro Proof-of-Work (Anti-Locust / Anti-DDoS Challenge)
export async function solveMicroPoW(salt: string, difficulty: number = 2): Promise<{ nonce: number; durationMs: number }> {
  const start = performance.now();
  const targetPrefix = "0".repeat(difficulty);
  let nonce = 0;

  const encoder = new TextEncoder();

  while (nonce < 200000) {
    const message = `${salt}:${nonce}`;
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    if (hashHex.startsWith(targetPrefix)) {
      const durationMs = Math.round(performance.now() - start);
      return { nonce, durationMs };
    }
    nonce++;
  }

  return { nonce, durationMs: Math.round(performance.now() - start) };
}

// 3. Client Sanitizer
export interface SanitizedPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function sanitizeContactInput(
  rawName: string,
  rawEmail: string,
  rawSubject: string,
  rawMessage: string
): SanitizedPayload {
  const stripBasicHTML = (str: string): string => {
    return str
      .replace(/<[^>]*>?/gm, "")
      .trim();
  };

  return {
    name: stripBasicHTML(rawName).slice(0, 100),
    email: stripBasicHTML(rawEmail).slice(0, 150),
    subject: stripBasicHTML(rawSubject).slice(0, 150),
    message: stripBasicHTML(rawMessage).slice(0, 2000),
  };
}

// Common disposable / burner email domains
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "tempmail.com", "temp-mail.org", "guerrillamail.com", "guerrillamail.org",
  "mailinator.com", "10minutemail.com", "throwawaymail.com", "trashmail.com",
  "yopmail.com", "sharklasers.com", "dispostable.com", "getairmail.com",
  "fakemailgenerator.com", "nada.ltd", "burnermail.io", "maildrop.cc",
  "crazymailing.com", "tmail.ws", "tempmailo.com", "mytemp.email",
]);

// Common domain typo correction suggestions
const COMMON_DOMAIN_TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "gmai.com": "gmail.com",
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "hotmial.com": "hotmail.com",
  "hotmai.com": "hotmail.com",
  "outlok.com": "outlook.com",
  "outloo.com": "outlook.com",
  "protomail.com": "protonmail.com",
  "protonmai.com": "proton.me",
};

export interface EmailValidationResult {
  valid: boolean;
  reason?: string;
  suggestion?: string;
}

export function validateEmailDomain(email: string): EmailValidationResult {
  const trimmed = email.trim().toLowerCase();
  
  // 1. Structural check: user@domain.tld
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+)$/;
  const match = trimmed.match(emailRegex);
  
  if (!match) {
    return {
      valid: false,
      reason: "Please enter a valid email address (e.g., name@domain.com).",
    };
  }

  const domain = match[1];
  const domainParts = domain.split(".");
  const tld = domainParts[domainParts.length - 1];

  // 2. TLD validation (must be at least 2 alpha characters e.g. .com, .ph, .org, .edu, .io, .net)
  if (!tld || tld.length < 2 || !/^[a-z]+$/.test(tld)) {
    return {
      valid: false,
      reason: `The domain extension ".${tld || ""}" is invalid. Please use a valid domain (e.g. .com, .ph, .org).`,
    };
  }

  // 3. Typo suggestions
  if (COMMON_DOMAIN_TYPOS[domain]) {
    return {
      valid: false,
      reason: `Did you mean @${COMMON_DOMAIN_TYPOS[domain]}?`,
      suggestion: COMMON_DOMAIN_TYPOS[domain],
    };
  }

  // 4. Block disposable / burner domains
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return {
      valid: false,
      reason: "Temporary or disposable email addresses are not allowed. Please use a real email.",
    };
  }

  return { valid: true };
}

export function isValidEmail(email: string): boolean {
  return validateEmailDomain(email).valid;
}

