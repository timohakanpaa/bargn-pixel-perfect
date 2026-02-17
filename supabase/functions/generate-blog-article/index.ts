import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { keywords, promptTemplate, language, articleId } = await req.json();

    const keywordsStr = Array.isArray(keywords) ? keywords.join(", ") : keywords;
    const finalPrompt = (promptTemplate || "Write a professional blog article about {{keywords}}.").replace("{{keywords}}", keywordsStr);

    const languages = language === "both" ? ["fi", "en"] : [language];
    const results: Record<string, { title: string; content: string; excerpt: string }> = {};

    for (const lang of languages) {
      const langInstruction = lang === "fi"
        ? "Kirjoita artikkeli SUOMEKSI. Käytä luonnollista ja ammattimaista suomen kieltä."
        : "Write the article in ENGLISH. Use natural and professional English.";

      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `You are a professional blog writer for Bargn, a savings and deals app. ${langInstruction}
              
Return a JSON object with:
- "title": A compelling SEO-friendly title (max 70 chars)
- "content": Full article in markdown format with headers (##), paragraphs, and bullet points
- "excerpt": A 1-2 sentence summary (max 160 chars)

Return ONLY valid JSON, no markdown code blocks.`,
            },
            { role: "user", content: finalPrompt },
          ],
        }),
      });

      if (!response.ok) {
        const status = response.status;
        if (status === 429) throw new Error("Rate limit exceeded, please try again later");
        if (status === 402) throw new Error("Payment required, please add credits");
        throw new Error(`AI gateway error: ${status}`);
      }

      const data = await response.json();
      const raw = data.choices?.[0]?.message?.content || "";
      
      let parsed;
      try {
        const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        parsed = JSON.parse(cleaned);
      } catch {
        parsed = { title: `Article: ${keywordsStr}`, content: raw, excerpt: raw.slice(0, 155) + "..." };
      }

      results[lang] = parsed;
    }

    // Generate slug from English title or Finnish title
    const titleForSlug = results.en?.title || results.fi?.title || keywordsStr;
    const slug = titleForSlug
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 80) + "-" + Date.now().toString(36);

    // Generate AI image for the article
    let imageUrl: string | null = null;
    try {
      const imageTitle = results.en?.title || results.fi?.title || keywordsStr;
      const imagePrompt = `Create a modern, vibrant blog header image for an article titled "${imageTitle}". The image should be colorful, professional, and related to savings, deals, and lifestyle in Helsinki. No text in the image. Wide 16:9 aspect ratio.`;
      
      console.log("Generating blog image...");
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

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        const base64Url = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
        
        if (base64Url) {
          const base64Data = base64Url.split(",")[1];
          const imageBuffer = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
          const filename = `${slug}.png`;

          const { error: uploadError } = await supabase.storage
            .from("blog-images")
            .upload(filename, imageBuffer, { contentType: "image/png", upsert: true });

          if (!uploadError) {
            const { data: urlData } = supabase.storage.from("blog-images").getPublicUrl(filename);
            imageUrl = urlData.publicUrl;
            console.log("Blog image generated and uploaded:", imageUrl);
          } else {
            console.error("Image upload error:", uploadError);
          }
        }
      } else {
        console.error("Image generation failed:", imageResponse.status);
      }
    } catch (imgErr) {
      console.error("Image generation error (non-fatal):", imgErr);
    }

    const articleData: Record<string, unknown> = {
      slug,
      title_fi: results.fi?.title || "",
      title_en: results.en?.title || "",
      content_fi: results.fi?.content || "",
      content_en: results.en?.content || "",
      excerpt_fi: results.fi?.excerpt || "",
      excerpt_en: results.en?.excerpt || "",
      keywords: Array.isArray(keywords) ? keywords : keywords.split(",").map((k: string) => k.trim()),
      status: "draft",
      ...(imageUrl && { image_url: imageUrl }),
    };

    if (articleId) {
      const { data, error } = await supabase
        .from("blog_articles")
        .update(articleData)
        .eq("id", articleId)
        .select()
        .single();
      if (error) throw error;
      return new Response(JSON.stringify(data), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    } else {
      const { data, error } = await supabase
        .from("blog_articles")
        .insert(articleData)
        .select()
        .single();
      if (error) throw error;
      return new Response(JSON.stringify(data), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
  } catch (e) {
    console.error("generate-blog-article error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
