import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { getCorsHeaders, handleCorsPreflightRequest } from "../_shared/cors.ts";

// Simple in-memory rate limiting
const rateLimits = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 100;

// Blocked patterns for bot detection
const BOT_PATTERNS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /curl/i,
  /wget/i,
  /python-requests/i,
];

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return BOT_PATTERNS.some(pattern => pattern.test(userAgent));
}

function checkRateLimit(sessionId: string): boolean {
  const now = Date.now();
  const limit = rateLimits.get(sessionId);
  
  if (!limit || now > limit.resetTime) {
    rateLimits.set(sessionId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (limit.count >= MAX_REQUESTS_PER_WINDOW) {
    console.warn(`Rate limit exceeded for session: ${sessionId}`);
    return false;
  }
  
  limit.count++;
  return true;
}

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimits.entries()) {
    if (now > value.resetTime) {
      rateLimits.delete(key);
    }
  }
}, RATE_LIMIT_WINDOW);

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  
  const corsResponse = handleCorsPreflightRequest(req);
  if (corsResponse) return corsResponse;

  try {
    // Get user agent for bot detection
    const userAgent = req.headers.get("user-agent");
    if (isBot(userAgent)) {
      console.log("Bot detected, ignoring request");
      return new Response(
        JSON.stringify({ success: true, message: "OK" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Sanitize text to remove potential XSS/script tags
    const sanitizeText = (text: string | null | undefined): string | null => {
      if (!text) return null;
      // Remove script tags, HTML tags, and control characters
      return text
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]+>/g, '')
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
        .trim()
        .slice(0, 500); // Extra safety limit
    };

    // Strict metadata schema - only allow safe primitive values
    const metadataValueSchema = z.union([
      z.string().max(200),
      z.number(),
      z.boolean(),
      z.null()
    ]);
    
    const safeMetadataSchema = z.record(
      z.string().max(50).regex(/^[a-zA-Z0-9_-]+$/), // Only alphanumeric keys
      metadataValueSchema
    ).optional().nullable();

    // Validate input with strict schemas
    const analyticEventSchema = z.object({
      session_id: z.string().uuid(),
      event_type: z.string().min(1).max(50).regex(/^[a-zA-Z0-9_-]+$/),
      event_name: z.string().min(1).max(100).regex(/^[a-zA-Z0-9_\s\-\/]+$/),
      page_path: z.string().max(500).optional().nullable(),
      page_title: z.string().max(200).optional().nullable(),
      element_id: z.string().max(100).regex(/^[a-zA-Z0-9_-]*$/).optional().nullable(),
      element_class: z.string().max(200).optional().nullable(),
      element_text: z.string().max(200).optional().nullable(),
      referrer: z.string().max(500).optional().nullable(), // Reduced from 2000
      language: z.string().max(10).regex(/^[a-zA-Z-]*$/).optional().nullable(),
      screen_width: z.number().int().min(1).max(10000).optional().nullable(),
      screen_height: z.number().int().min(1).max(10000).optional().nullable(),
      user_agent: z.string().max(500).optional().nullable(),
      metadata: safeMetadataSchema
    });

    const funnelEventSchema = z.object({
      session_id: z.string().uuid(),
      funnel_id: z.string().uuid(),
      current_step: z.number().int().min(1).max(100),
      completed: z.boolean().optional(),
      metadata: safeMetadataSchema
    });

    const requestSchema = z.object({
      analyticEvents: z.array(analyticEventSchema).max(50).optional(),
      funnelEvents: z.array(funnelEventSchema).max(50).optional()
    });

    const body = await req.json();
    const parsed = requestSchema.safeParse(body);
    
    if (!parsed.success) {
      console.error("Validation error:", parsed.error.issues);
      return new Response(
        JSON.stringify({ error: "Invalid request data", details: parsed.error.issues }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { analyticEvents, funnelEvents } = parsed.data;

    // Check rate limit using the first event's session_id
    const sessionId = analyticEvents?.[0]?.session_id || funnelEvents?.[0]?.session_id;
    if (sessionId && !checkRateLimit(sessionId)) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please slow down." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "60" },
        }
      );
    }

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const results = { analytics: 0, funnels: 0, errors: [] as string[] };

    // Insert analytics events using secure function
    if (analyticEvents && analyticEvents.length > 0) {
      for (const event of analyticEvents) {
        try {
          const { error } = await supabase.rpc('insert_analytics_event', {
            p_session_id: event.session_id,
            p_event_type: event.event_type,
            p_event_name: event.event_name,
            p_page_path: sanitizeText(event.page_path),
            p_page_title: sanitizeText(event.page_title),
            p_element_id: event.element_id || null,
            p_element_class: sanitizeText(event.element_class),
            p_element_text: sanitizeText(event.element_text),
            p_referrer: sanitizeText(event.referrer),
            p_language: event.language || null,
            p_screen_width: event.screen_width || null,
            p_screen_height: event.screen_height || null,
            p_user_agent: sanitizeText(event.user_agent),
            p_metadata: event.metadata || {}
          });
          
          if (error) {
            console.error("Error inserting analytics event:", error);
            results.errors.push(`Analytics: ${error.message}`);
          } else {
            results.analytics++;
          }
        } catch (err) {
          console.error("Exception inserting analytics event:", err);
          results.errors.push(`Analytics: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
      }
    }

    // Insert funnel progress events using secure function
    if (funnelEvents && funnelEvents.length > 0) {
      for (const event of funnelEvents) {
        try {
          const { error } = await supabase.rpc('insert_funnel_progress', {
            p_session_id: event.session_id,
            p_funnel_id: event.funnel_id,
            p_current_step: event.current_step,
            p_completed: event.completed || false,
            p_metadata: event.metadata || {}
          });
          
          if (error) {
            console.error("Error inserting funnel progress:", error);
            results.errors.push(`Funnel: ${error.message}`);
          } else {
            results.funnels++;
          }
        } catch (err) {
          console.error("Exception inserting funnel progress:", err);
          results.errors.push(`Funnel: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
      }
    }

    console.log(`Tracked ${results.analytics} analytics events, ${results.funnels} funnel events`);

    return new Response(
      JSON.stringify({ 
        success: true,
        tracked: {
          analytics: results.analytics,
          funnels: results.funnels
        }
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error tracking analytics:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
