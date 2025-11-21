/**
 * Secure contact form submission API route
 * Handles form validation, rate limiting, and Web3Forms submission
 */

import { NextRequest, NextResponse } from "next/server";

/**
 * Rate limiting store (in-memory)
 * In production, use Redis or similar for distributed caching
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Clean up old rate limit entries (runs every 5 minutes)
 */
function cleanupRateLimit() {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Check rate limit for a client
 * Max 5 submissions per hour per IP
 */
function checkRateLimit(clientIp: string): boolean {
  cleanupRateLimit();

  const now = Date.now();
  const record = rateLimitStore.get(clientIp);

  if (!record || record.resetTime < now) {
    // New window or expired
    rateLimitStore.set(clientIp, {
      count: 1,
      resetTime: now + 3600000, // 1 hour
    });
    return true;
  }

  if (record.count >= 5) {
    return false; // Rate limit exceeded
  }

  record.count++;
  return true;
}

/**
 * Get client IP from request
 */
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown";
  return ip.trim();
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  // RFC 5322 compliant regex (simplified but practical)
  const emailRegex = /^[^\s@]{1,64}@[^\s@]{1,255}\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Sanitize string input (remove/escape HTML)
 */
function sanitizeInput(input: string, maxLength: number = 1000): string {
  if (typeof input !== "string") {
    return "";
  }

  // Trim and limit length
  let sanitized = input.trim().substring(0, maxLength);

  // Remove control characters and dangerous HTML entities
  sanitized = sanitized
    .replace(/[<>]/g, "") // Remove angle brackets
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, ""); // Remove event handlers

  return sanitized;
}

/**
 * Validate form data
 */
function validateFormData(data: unknown): {
  valid: boolean;
  errors: Record<string, string>;
  data?: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
} {
  const errors: Record<string, string> = {};

  if (typeof data !== "object" || data === null) {
    return {
      valid: false,
      errors: { form: "Invalid form data" },
    };
  }

  const formData = data as Record<string, unknown>;

  // Validate name
  const name = formData.name as string;
  if (!name || typeof name !== "string") {
    errors.name = "Name is required";
  } else if (name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  } else if (name.trim().length > 100) {
    errors.name = "Name must not exceed 100 characters";
  }

  // Validate email
  const email = formData.email as string;
  if (!email || typeof email !== "string") {
    errors.email = "Email is required";
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address";
  }

  // Validate subject
  const subject = formData.subject as string;
  if (!subject || typeof subject !== "string") {
    errors.subject = "Subject is required";
  } else if (!["New Project", "Collaboration", "Question", "Other"].includes(subject)) {
    errors.subject = "Invalid subject selected";
  }

  // Validate message
  const message = formData.message as string;
  if (!message || typeof message !== "string") {
    errors.message = "Message is required";
  } else if (message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  } else if (message.trim().length > 5000) {
    errors.message = "Message must not exceed 5000 characters";
  }

  if (Object.keys(errors).length > 0) {
    return {
      valid: false,
      errors,
    };
  }

  // Sanitize inputs
  return {
    valid: true,
    errors: {},
    data: {
      name: sanitizeInput(name, 100),
      email: sanitizeInput(email, 255),
      subject: sanitizeInput(subject, 100),
      message: sanitizeInput(message, 5000),
    },
  };
}

/**
 * POST /api/contact
 * Handle contact form submissions securely
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Check rate limit
    const clientIp = getClientIp(request);
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    // Validate form data
    const validation = validateFormData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: "Validation failed", errors: validation.errors },
        { status: 400 }
      );
    }

    const formData = validation.data!;

    // Get Web3Forms API key from environment
    const web3FormsKey = process.env.WEB3FORMS_API_KEY;
    if (!web3FormsKey) {
      console.error("WEB3FORMS_API_KEY not configured");
      return NextResponse.json(
        { error: "Form submission temporarily unavailable" },
        { status: 500 }
      );
    }

    // Submit to Web3Forms
    const web3FormsResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: web3FormsKey,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        from_name: "Portfolio Contact Form",
      }),
    });

    // Check Web3Forms response
    if (!web3FormsResponse.ok) {
      console.error("Web3Forms error:", web3FormsResponse.status);
      return NextResponse.json(
        { error: "Failed to submit form. Please try again." },
        { status: 500 }
      );
    }

    const web3FormsData = (await web3FormsResponse.json()) as Record<string, unknown>;

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been sent successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/contact
 * Handle CORS preflight requests
 */
export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_APP_URL || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
