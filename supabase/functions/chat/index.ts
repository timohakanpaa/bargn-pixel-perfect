import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple in-memory rate limiting
const rateLimits = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

function checkRateLimit(sessionId: string): boolean {
  const now = Date.now();
  const limit = rateLimits.get(sessionId);
  
  if (!limit || now > limit.resetTime) {
    rateLimits.set(sessionId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (limit.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  
  limit.count++;
  return true;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  let sessionId = "";
  let language = "en";
  let userMessage = "";

  try {
    // Validate input
    const requestSchema = z.object({
      messages: z.array(z.object({
        role: z.enum(['user', 'assistant', 'system']),
        content: z.string().min(1).max(2000)
      })).min(1).max(50),
      sessionId: z.string().uuid().optional(),
      language: z.string().max(10).optional()
    });

    const body = await req.json();
    const validatedBody = requestSchema.parse(body);
    
    const messages = validatedBody.messages;
    sessionId = validatedBody.sessionId || crypto.randomUUID();
    language = validatedBody.language || "en";

    // Check rate limit
    if (!checkRateLimit(sessionId)) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please wait before sending more messages." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Initialize Supabase client for analytics
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Extract the user's message (last message in the array)
    userMessage = messages[messages.length - 1]?.content || "";

    const systemPrompt = `You are Bargn AI, a helpful assistant for the Bargn discount platform. 

About Bargn:
- Bargn offers 50% discounts at 500+ partner locations
- Members pay either €8.80/month or €52.60/year (annual saves 2 months free)
- AI-powered personalized discount recommendations
- No hidden fees, zero commission for partners
- Available in Helsinki, Finland
- Partners include restaurants, shops, and services

Key Features:
- Flash membership at checkout for instant 50% off
- AI learns user preferences for better recommendations
- VIP treatment and early access to new partners
- Priority customer support
- Member-exclusive events and offers

How It Works:
1. Download the app and choose a plan
2. Browse 500+ partner locations nearby
3. Activate deals with a swipe
4. Show your phone to staff for verification
5. Pay 50% of the original price

Partnership Benefits:
- Zero commission (unlike traditional platforms that charge 25-45%)
- No application required - instant setup
- Direct customer connection
- Access to quality, engaged members

Keep responses helpful, friendly, and concise. Focus on the value Bargn provides to both members and partners.`;

    console.log("Calling Lovable AI with", messages.length, "messages for session", sessionId);

    let aiResponse = "";

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      const errorMessage = `AI gateway error: ${response.status}`;
      
      // Log error to analytics before returning
      const responseTime = Date.now() - startTime;
      await supabase.from("chat_analytics").insert({
        session_id: sessionId,
        user_message: userMessage,
        ai_response: null,
        language,
        response_time_ms: responseTime,
        error_occurred: true,
        error_message: errorMessage,
      });
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), 
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service temporarily unavailable. Please try again later." }), 
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    // Create a transform stream to capture the AI response while streaming
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();

    // Stream and capture response in background
    (async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          // Capture response content
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ") && line !== "data: [DONE]") {
              try {
                const json = JSON.parse(line.slice(6));
                const content = json.choices?.[0]?.delta?.content;
                if (content) aiResponse += content;
              } catch (e) {
                // Ignore parse errors for partial chunks
              }
            }
          }
          
          await writer.write(value);
        }
        
        // Log successful interaction to analytics
        const responseTime = Date.now() - startTime;
        await supabase.from("chat_analytics").insert({
          session_id: sessionId,
          user_message: userMessage,
          ai_response: aiResponse || "Stream completed",
          language,
          response_time_ms: responseTime,
          error_occurred: false,
        });
        
        await writer.close();
      } catch (error) {
        console.error("Stream error:", error);
        await writer.abort(error);
      }
    })();

    return new Response(readable, {
      headers: { 
        ...corsHeaders, 
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    
    // Log error to analytics
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      const responseTime = Date.now() - startTime;
      
      await supabase.from("chat_analytics").insert({
        session_id: sessionId || crypto.randomUUID(),
        user_message: userMessage || "Error before message capture",
        ai_response: null,
        language,
        response_time_ms: responseTime,
        error_occurred: true,
        error_message: error instanceof Error ? error.message : "Unknown error",
      });
    } catch (logError) {
      console.error("Failed to log error to analytics:", logError);
    }
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "An unexpected error occurred" 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
