import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Verify user is admin
    const anonClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userError } = await anonClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { theme, platform, customPrompt, suggestOnly } = await req.json();

    if (!theme || !platform) {
      return new Response(JSON.stringify({ error: "Theme and platform required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Step 1: Generate Finnish caption text
    const captionPrompt = customPrompt ||
      `Olet sosiaalisen median sisällöntuottaja Bargn-alennussovellukselle. Bargn tarjoaa jäsenilleen 50% alennuksia ravintoloista, aktiviteeteistä ja palveluista Suomessa hintaan 8,80€/kk.

Luo ${platform === "tiktok" ? "TikTok" : platform === "instagram" ? "Instagram" : "TikTok ja Instagram"} -postaus aiheesta: "${theme}"

Vaatimukset:
- Kirjoita suomeksi
- Käytä nuorekasta, energistä ja rentoa tyyliä
- Sisällytä relevantteja hashtageja (#bargn #säästä #tarjoukset)
- TikTok: lyhyt, koukuttava, max 150 merkkiä + hashtagit
- Instagram: kattavampi teksti, max 300 merkkiä + hashtagit  
- Sisällytä toimintakehotus (CTA)
- Mainitse Bargn-sovellus luontevasti

Vastaa JSON-muodossa:
{
  "title": "Lyhyt otsikko materiaalille",
  "caption": "Postauksen teksti hashtageineen"
}`;

    console.log("Generating caption for theme:", theme);

    const captionResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: captionPrompt }],
      }),
    });

    if (!captionResponse.ok) {
      const errText = await captionResponse.text();
      console.error("Caption generation failed:", captionResponse.status, errText);
      throw new Error(`Caption generation failed: ${captionResponse.status}`);
    }

    const captionData = await captionResponse.json();
    const rawCaption = captionData.choices?.[0]?.message?.content || "";
    
    // Parse JSON from response
    let title = theme;
    let caption = rawCaption;
    try {
      const jsonMatch = rawCaption.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        title = parsed.title || theme;
        caption = parsed.caption || rawCaption;
      }
    } catch {
      console.log("Could not parse JSON from caption, using raw text");
    }

    // If suggestOnly, return the suggestion without saving or generating image
    if (suggestOnly) {
      return new Response(JSON.stringify({ success: true, suggestion: { title, caption } }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Step 2: Generate photorealistic image
    console.log("Generating image for theme:", theme);

    const imagePrompt = `Photorealistic high quality social media image for a Finnish discount app called Bargn. Theme: "${theme}". The image should be vibrant, modern, and appealing for ${platform === "tiktok" ? "TikTok" : "Instagram"}. No text overlays. Professional photography style, bright colors, lifestyle imagery. Ultra high resolution.`;

    const imageResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [{ role: "user", content: imagePrompt }],
        modalities: ["image", "text"],
      }),
    });

    if (!imageResponse.ok) {
      const errText = await imageResponse.text();
      console.error("Image generation failed:", imageResponse.status, errText);
      // Save without image
      const { data: material, error: insertError } = await supabase
        .from("content_materials")
        .insert({
          title,
          caption,
          platform,
          theme,
          created_by: user.id,
        })
        .select()
        .single();

      if (insertError) throw insertError;
      return new Response(JSON.stringify({ success: true, material, imageError: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const imageData = await imageResponse.json();
    const imageBase64 = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    let imageUrl = null;

    // Upload to storage if we got an image
    if (imageBase64) {
      try {
        const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
        const imageBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
        const fileName = `${crypto.randomUUID()}.png`;

        const { error: uploadError } = await supabase.storage
          .from("content-materials")
          .upload(fileName, imageBytes, { contentType: "image/png" });

        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from("content-materials")
            .getPublicUrl(fileName);
          imageUrl = urlData.publicUrl;
        } else {
          console.error("Upload error:", uploadError);
        }
      } catch (e) {
        console.error("Image upload error:", e);
      }
    }

    // Save to database
    const { data: material, error: insertError } = await supabase
      .from("content_materials")
      .insert({
        title,
        caption,
        platform,
        theme,
        image_url: imageUrl,
        created_by: user.id,
      })
      .select()
      .single();

    if (insertError) throw insertError;

    console.log("Content material created:", material.id);

    return new Response(JSON.stringify({ success: true, material }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating content material:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
