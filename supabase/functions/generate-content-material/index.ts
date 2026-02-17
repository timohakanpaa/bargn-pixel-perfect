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
    if (!authHeader?.startsWith("Bearer ")) {
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

    // Verify user with explicit token
    const token = authHeader.replace("Bearer ", "");
    const anonClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userError } = await anonClient.auth.getUser(token);
    if (userError || !user) {
      console.error("Auth error:", userError);
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

    const { theme, platform, customPrompt, suggestOnly, imageStyle, regenerateImageForId } = await req.json();

    if (!theme || !platform) {
      return new Response(JSON.stringify({ error: "Theme and platform required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // If regenerating image only for existing material
    if (regenerateImageForId) {
      console.log("Regenerating image for material:", regenerateImageForId);
      
      const styleInstruction = imageStyle 
        ? `Style: ${imageStyle}.`
        : "Professional photography style, bright colors, lifestyle imagery.";
      const imagePrompt = `Social media image for a Finnish discount app called Bargn. Theme: "${theme}". ${styleInstruction} The image should be appealing for ${platform === "tiktok" ? "TikTok" : "Instagram"}. No text overlays, no watermarks, no logos. Ultra high resolution.`;

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
        throw new Error(`Image generation failed: ${imageResponse.status}`);
      }

      const imageData = await imageResponse.json();
      const imageBase64 = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

      if (!imageBase64) {
        throw new Error("No image generated");
      }

      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      const imageBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
      const fileName = `${crypto.randomUUID()}.png`;

      const { error: uploadError } = await supabase.storage
        .from("content-materials")
        .upload(fileName, imageBytes, { contentType: "image/png" });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("content-materials")
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from("content_materials")
        .update({ image_url: urlData.publicUrl })
        .eq("id", regenerateImageForId);

      if (updateError) throw updateError;

      return new Response(JSON.stringify({ success: true, image_url: urlData.publicUrl }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Step 1: Generate Finnish caption text
    const systemPrompt = `Olet Bargn-alennussovelluksen sosiaalisen median copywriter. Sinun AINOA tehtäväsi on kirjoittaa VALMIITA mainostekstejä.

EHDOTTOMAT SÄÄNNÖT:
- Kirjoita SUORAAN julkaistavissa oleva some-mainosteksti
- ÄLÄ KOSKAAN kirjoita ohjeita, kommentteja, selityksiä, analyysejä tai ehdotuksia
- ÄLÄ KOSKAAN aloita "Mainoksen huomattavuutta..." tai vastaavilla meta-kommenteilla
- ÄLÄ KOSKAAN selitä mitä provokatiivisuus tarkoittaa
- Tuota VAIN valmis mainoskopio joka voidaan julkaista sellaisenaan
- Suomeksi, nuorekas rento tyyli
- Sisällytä hashtagit: #bargn #säästä #tarjoukset
- Sisällytä toimintakehotus (CTA)

Bargn: jäsenet saavat 50% alennuksia ravintoloista, aktiviteeteistä ja palveluista. Hinta 8,80€/kk.

Vastaa AINA ja AINOASTAAN tässä JSON-muodossa, ei yhtään mitään muuta tekstiä ennen tai jälkeen:
{"title": "Lyhyt otsikko", "caption": "Valmis mainosteksti hashtageineen"}`;

    const userMessage = customPrompt
      ? `Teema: "${theme}". Alusta: ${platform === "tiktok" ? "TikTok" : platform === "instagram" ? "Instagram" : "TikTok ja Instagram"}. Lisäohje: ${customPrompt}`
      : `Teema: "${theme}". Alusta: ${platform === "tiktok" ? "TikTok (max 150 merkkiä + hashtagit)" : platform === "instagram" ? "Instagram (max 300 merkkiä + hashtagit)" : "TikTok (max 150 merkkiä) ja Instagram (max 300 merkkiä) + hashtagit"}. Kirjoita valmis mainosteksti.`;

    console.log("Generating caption for theme:", theme);

    const captionResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
      }),
    });

    if (!captionResponse.ok) {
      const errText = await captionResponse.text();
      console.error("Caption generation failed:", captionResponse.status, errText);
      throw new Error(`Caption generation failed: ${captionResponse.status}`);
    }

    const captionData = await captionResponse.json();
    const rawCaption = captionData.choices?.[0]?.message?.content || "";
    
    // Parse JSON from response - handle all possible AI output formats
    let title = theme;
    let caption = rawCaption;
    try {
      // Remove markdown code blocks if present
      const cleaned = rawCaption.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);

        // Normalize all keys to lowercase
        const norm: Record<string, any> = {};
        for (const [k, v] of Object.entries(parsed)) {
          norm[k.toLowerCase()] = v;
        }

        title = norm.title || theme;

        // Case 1: flat { caption: "..." }
        if (typeof norm.caption === "string") {
          caption = norm.caption;
        }
        // Case 2: { tiktok: "text", instagram: "text" } (string values)
        else if (typeof norm.tiktok === "string" || typeof norm.instagram === "string") {
          const tk = norm.tiktok as string | undefined;
          const ig = norm.instagram as string | undefined;
          if (platform === "tiktok") caption = tk || ig || rawCaption;
          else if (platform === "instagram") caption = ig || tk || rawCaption;
          else {
            const parts: string[] = [];
            if (tk) parts.push(`TikTok:\n${tk}`);
            if (ig) parts.push(`Instagram:\n${ig}`);
            caption = parts.join("\n\n---\n\n");
          }
        }
        // Case 3: { tiktok: { caption: "..." }, instagram: { caption: "..." } }
        else if (typeof norm.tiktok === "object" || typeof norm.instagram === "object") {
          const tk = norm.tiktok?.caption || norm.tiktok?.text;
          const ig = norm.instagram?.caption || norm.instagram?.text;
          if (platform === "tiktok") caption = tk || ig || rawCaption;
          else if (platform === "instagram") caption = ig || tk || rawCaption;
          else {
            const parts: string[] = [];
            if (tk) parts.push(`TikTok:\n${tk}`);
            if (ig) parts.push(`Instagram:\n${ig}`);
            caption = parts.join("\n\n---\n\n");
          }
        }
        // Case 4: array format
        else if (norm.data && Array.isArray(norm.data)) {
          const match = norm.data.find((d: any) =>
            d.platform?.toLowerCase() === platform.toLowerCase()
          );
          caption = match?.caption || norm.data[0]?.caption || rawCaption;
        }
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

    const styleInstruction = imageStyle 
      ? `Style: ${imageStyle}.`
      : "Professional photography style, bright colors, lifestyle imagery.";

    const imagePrompt = `Social media image for a Finnish discount app called Bargn. Theme: "${theme}". ${styleInstruction} The image should be appealing for ${platform === "tiktok" ? "TikTok" : "Instagram"}. No text overlays, no watermarks, no logos. Ultra high resolution.`;

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
