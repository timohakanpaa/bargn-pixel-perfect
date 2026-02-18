import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, handleCorsPreflightRequest } from "../_shared/cors.ts";

Deno.serve(async (req: Request) => {
  const corsHeaders = getCorsHeaders(req);
  const preflight = handleCorsPreflightRequest(req);
  if (preflight) return preflight;

  try {
    // Manual JWT verification
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: authData, error: authError } = await supabase.auth.getClaims(token);
    if (authError || !authData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = authData.claims.sub;

    // Check admin role using service role client
    const serviceClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: roleData } = await serviceClient
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .single();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Admin role required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse request body
    const { material_id } = await req.json();
    if (!material_id || typeof material_id !== "string") {
      return new Response(JSON.stringify({ error: "material_id is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch Instagram credentials from social_accounts
    const { data: account, error: accountError } = await serviceClient
      .from("social_accounts")
      .select("access_token, account_id, account_name")
      .eq("platform", "instagram")
      .single();

    if (accountError || !account) {
      return new Response(
        JSON.stringify({ error: "Instagram-tiliä ei löydy. Lisää tunnistetiedot Some-asetuksista." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch material
    const { data: material, error: materialError } = await serviceClient
      .from("content_materials")
      .select("id, title, caption, image_url, platform")
      .eq("id", material_id)
      .single();

    if (materialError || !material) {
      return new Response(JSON.stringify({ error: "Materiaalia ei löydy" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!material.image_url) {
      return new Response(JSON.stringify({ error: "Materiaalilla ei ole kuvaa" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const igUserId = account.account_id;
    const accessToken = account.access_token;
    const apiBase = `https://graph.instagram.com/v22.0`;

    // Step 1: Create media container
    const containerRes = await fetch(`${apiBase}/${igUserId}/media`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image_url: material.image_url,
        caption: material.caption,
        access_token: accessToken,
      }),
    });

    const containerData = await containerRes.json();

    if (!containerRes.ok || !containerData.id) {
      console.error("Container creation failed:", containerData);
      return new Response(
        JSON.stringify({
          error: "Instagram-containerin luonti epäonnistui",
          details: containerData?.error?.message || JSON.stringify(containerData),
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const containerId = containerData.id;

    // Step 2: Publish media container
    const publishRes = await fetch(`${apiBase}/${igUserId}/media_publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        creation_id: containerId,
        access_token: accessToken,
      }),
    });

    const publishData = await publishRes.json();

    if (!publishRes.ok || !publishData.id) {
      console.error("Publish failed:", publishData);
      return new Response(
        JSON.stringify({
          error: "Instagram-julkaisu epäonnistui",
          details: publishData?.error?.message || JSON.stringify(publishData),
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const postId = publishData.id;
    const now = new Date().toISOString();

    // Step 3: Save instagram_post_id and timestamp to material
    const { error: updateError } = await serviceClient
      .from("content_materials")
      .update({
        instagram_post_id: postId,
        published_to_instagram_at: now,
      } as any)
      .eq("id", material_id);

    if (updateError) {
      console.error("DB update error:", updateError);
    }

    return new Response(
      JSON.stringify({ success: true, post_id: postId, published_at: now }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "Odottamaton virhe", details: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
