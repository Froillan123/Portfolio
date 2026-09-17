import {
  isValidEmail,
  validateEmailDomain,
  recordSubmission,
  sanitizeContactInput,
} from "@/lib/security";

// Pure Server-Side Architecture: The frontend only calls the backend API endpoint.
// Best Practice: VITE_API_BASE_URL contains ONLY the root host (e.g., http://127.0.0.1:8000 or https://api.domain.com).
// The path "/api/contact" is strictly joined in frontend code to prevent double-pathing issues.
const RAW_API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string) ||
  (import.meta.env.VITE_BACKEND_API_URL as string) ||
  "";

const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, "");
const CONTACT_ENDPOINT = API_BASE_URL ? `${API_BASE_URL}/api/contact` : "/api/contact";

export interface ContactSubmissionParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SubmissionResult {
  success: boolean;
  message: string;
  inquiryId?: number | null;
  useFallback?: boolean;
}


export async function sendContactInquiry(
  params: ContactSubmissionParams
): Promise<SubmissionResult> {
  const { name, email, subject, message } = params;

  // 1. Client Required Fields Validation
  if (!name.trim() || !email.trim() || !message.trim()) {
    return {
      success: false,
      message: "Please fill in all required fields (Name, Email, Message).",
    };
  }

  // 2. Email Domain Validation
  const emailCheck = validateEmailDomain(email.trim());
  if (!emailCheck.valid) {
    return {
      success: false,
      message: emailCheck.reason || "Please provide a valid email address.",
    };
  }

  if (message.trim().length < 10) {
    return {
      success: false,
      message: "Message is too short. Please provide at least 10 characters.",
    };
  }

  const sanitizedPayload = sanitizeContactInput(name, email, subject, message);

  // 3. Direct Ingress Candidates (Environment Base URL + Local Dev Fallback)
  const candidateUrls = [
    CONTACT_ENDPOINT,
    "/api/contact",
    "http://127.0.0.1:8000/api/contact",
    "http://localhost:8000/api/contact",
  ].filter(Boolean).filter((val, idx, self) => self.indexOf(val) === idx);

  let lastError: any = null;

  for (const url of candidateUrls) {
    try {
      console.log(`[Contact Service] Dispatching POST request to: ${url}`);
      const backendResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: sanitizedPayload.name,
          email: sanitizedPayload.email,
          subject: sanitizedPayload.subject,
          message: sanitizedPayload.message,
        }),
      });

      console.log(`[Contact Service] Response from ${url}: HTTP ${backendResponse.status}`);

      if (backendResponse.status === 201 || backendResponse.ok) {
        const data = await backendResponse.json().catch(() => ({}));
        recordSubmission();
        return {
          success: true,
          message: data.message || "Inquiry saved to PostgreSQL database and dispatched to Discord Gateway!",
          inquiryId: data.inquiry_id,
        };
      }

      if (backendResponse.status === 429) {
        const errorData = await backendResponse.json().catch(() => ({}));
        return {
          success: false,
          message: errorData.detail || "Server rate limit exceeded. Please wait before retrying.",
          useFallback: false,
        };
      }

      const errorData = await backendResponse.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.detail || `Server error (HTTP ${backendResponse.status}).`,
        useFallback: true,
      };
    } catch (err) {
      console.warn(`[Contact Service] Failed connecting to ${url}:`, err);
      lastError = err;
      continue;
    }
  }

  console.warn("Backend server connection failed on all endpoints:", lastError);
  return {
    success: false,
    message: "Backend server is currently offline. Opening email client as fallback...",
    useFallback: true,
  };
}
