import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rotating keyword sets for weekly generation
const KEYWORD_SETS = [
  { keywords: ["alennussovellus", "paras alennussovellus", "tarjoussovellus Suomi"], prompt: "Kirjoita artikkeli alennussovellusten hyödyistä ja vertailusta Suomessa 2026. Mainitse Bargn (50% alennukset, 8,80€/kk) edullisimpana vaihtoehtona." },
  { keywords: ["ravintola tarjoukset Helsinki", "edullinen ruokapaikka", "ravintola alennus"], prompt: "Kirjoita artikkeli Helsingin parhaista ravintolatalennuksista ja edullisista ruokapaikoista. Korosta miten Bargn-sovelluksella saa 50% alennuksen." },
  { keywords: ["kuntosali tarjoukset", "edullinen treeni Helsinki", "liikunta alennus"], prompt: "Kirjoita artikkeli edullisesta treenaamisesta Helsingissä. Kerro miten Bargn-kumppanisaleilla treenaa puoleen hintaan." },
  { keywords: ["säästövinkit", "rahan säästäminen arjessa", "budjetti Helsinki"], prompt: "Kirjoita käytännönläheinen artikkeli arjen säästövinkeistä Helsingissä 2026. Mainitse Bargn tehokkaana säästökeinona." },
  { keywords: ["hyvinvointi Helsinki", "spa tarjoukset", "kylpylä alennus"], prompt: "Kirjoita artikkeli hyvinvointipalveluiden tarjouksista Helsingissä. Kerro miten Bargn-jäsenyydellä säästää kylpylöissä ja hoitoloissa." },
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Pick keyword set based on current week number
    const weekNumber = Math.floor((Date.now() / (7 * 24 * 60 * 60 * 1000)));
    const setIndex = weekNumber % KEYWORD_SETS.length;
    const { keywords, prompt } = KEYWORD_SETS[setIndex];

    console.log(`Scheduled generation: week ${weekNumber}, set ${setIndex}, keywords: ${keywords.join(", ")}`);

    const results: Record<string, { title: string; content: string; excerpt: string }> = {};

    for (const lang of ["fi", "en"] as const) {
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
              content: `You are a professional blog writer for Bargn, a savings and deals app in Helsinki. ${langInstruction}

IMPORTANT formatting rules:
- Use proper markdown headers (## for sections, ### for subsections)
- Use regular bullet lists (- item) for lists, NOT emoji bullets
- Do NOT use emojis like ✅❌🔥 etc. in the content
- For comparison tables, use proper markdown table syntax with alignment
- Write at least 800 words of high-quality, informative content
- Use clear paragraph breaks between sections
- Keep a professional, helpful tone

Return a JSON object with:
- "title": A compelling SEO-friendly title (max 70 chars)
- "content": Full article in clean markdown format
- "excerpt": A 1-2 sentence summary (max 160 chars)

Return ONLY valid JSON, no markdown code blocks.`,
            },
            { role: "user", content: prompt },
          ],
        }),
      });

      if (!response.ok) {
        console.error(`AI error for ${lang}:`, response.status);
        continue;
      }

      const data = await response.json();
      const raw = data.choices?.[0]?.message?.content || "";

      let parsed;
      try {
        const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        parsed = JSON.parse(cleaned);
      } catch {
        parsed = { title: `Article: ${keywords[0]}`, content: raw, excerpt: raw.slice(0, 155) + "..." };
      }

      results[lang] = parsed;
    }

    if (!results.fi && !results.en) {
      throw new Error("Failed to generate any content");
    }

    const titleForSlug = results.en?.title || results.fi?.title || keywords[0];
    const slug = titleForSlug
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 80) + "-" + Date.now().toString(36);

    // Generate AI image
    let imageUrl: string | null = null;
    try {
      const imageTitle = results.en?.title || results.fi?.title || keywords[0];
      const imagePrompt = `Create a modern, vibrant blog header image for an article titled "${imageTitle}". Professional, colorful, related to savings and lifestyle in Helsinki. No text. Wide 16:9.`;
      
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
            console.log("Scheduled blog image uploaded:", imageUrl);
          }
        }
      }
    } catch (imgErr) {
      console.error("Image generation error (non-fatal):", imgErr);
    }

    const { data: article, error } = await supabase
      .from("blog_articles")
      .insert({
        slug,
        title_fi: results.fi?.title || "",
        title_en: results.en?.title || "",
        content_fi: results.fi?.content || "",
        content_en: results.en?.content || "",
        excerpt_fi: results.fi?.excerpt || "",
        excerpt_en: results.en?.excerpt || "",
        keywords,
        status: "published",
        published_at: new Date().toISOString(),
        ...(imageUrl && { image_url: imageUrl }),
      })
      .select()
      .single();

    if (error) throw error;

    console.log("Scheduled article created:", article.id, article.slug);

    return new Response(JSON.stringify({ success: true, article }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Scheduled blog generation error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
