import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate input
    const analyticEventSchema = z.object({
      session_id: z.string().uuid(),
      event_type: z.string().max(50),
      event_name: z.string().max(100),
      page_path: z.string().max(500).optional(),
      page_title: z.string().max(200).optional(),
      element_id: z.string().max(100).optional(),
      element_class: z.string().max(100).optional(),
      element_text: z.string().max(200).optional(),
      referrer: z.string().max(500).optional(),
      language: z.string().max(10).optional(),
      screen_width: z.number().int().positive().optional(),
      screen_height: z.number().int().positive().optional(),
      user_agent: z.string().max(500).optional(),
      metadata: z.any().optional()
    });

    const funnelEventSchema = z.object({
      session_id: z.string().uuid(),
      funnel_id: z.string().uuid(),
      current_step: z.number().int().positive(),
      completed: z.boolean().optional(),
      metadata: z.any().optional()
    });

    const requestSchema = z.object({
      analyticEvents: z.array(analyticEventSchema).max(100).optional(),
      funnelEvents: z.array(funnelEventSchema).max(100).optional()
    });

    const body = await req.json();
    const { analyticEvents, funnelEvents } = requestSchema.parse(body);

    // Initialize Supabase client with service role key for database operations
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const promises = [];

    // Insert analytics events
    if (analyticEvents && analyticEvents.length > 0) {
      promises.push(
        supabase.from("analytics_events").insert(analyticEvents)
      );
    }

    // Insert funnel progress events
    if (funnelEvents && funnelEvents.length > 0) {
      promises.push(
        supabase.from("funnel_progress").insert(funnelEvents)
      );
    }

    await Promise.all(promises);

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error tracking analytics:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
