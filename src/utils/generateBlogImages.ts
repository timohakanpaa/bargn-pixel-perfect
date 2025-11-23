import { supabase } from "@/integrations/supabase/client";

// Generate blog images using AI and upload to storage
export async function generateAndUploadBlogImage(
  prompt: string,
  filename: string
): Promise<string | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      console.error("No active session");
      return null;
    }

    // Call edge function to generate image
    const { data, error } = await supabase.functions.invoke('generate-blog-image', {
      body: { prompt, filename }
    });

    if (error) {
      console.error("Error generating image:", error);
      return null;
    }

    return data.publicUrl;
  } catch (error) {
    console.error("Error in generateAndUploadBlogImage:", error);
    return null;
  }
}

// Get public URL for a blog image
export function getBlogImageUrl(filename: string): string {
  const { data } = supabase.storage
    .from('blog-images')
    .getPublicUrl(filename);
  
  return data.publicUrl;
}
