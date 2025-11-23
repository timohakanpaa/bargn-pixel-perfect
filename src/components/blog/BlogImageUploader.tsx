import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Wand2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { generateAndUploadBlogImage } from "@/utils/generateBlogImages";

interface BlogImageUploaderProps {
  articleId: string;
  onImageUploaded?: (url: string) => void;
}

const BlogImageUploader = ({ articleId, onImageUploaded }: BlogImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${articleId}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);

      toast({
        title: "Image uploaded",
        description: "Blog article image uploaded successfully",
      });

      onImageUploaded?.(data.publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a description for the image",
        variant: "destructive",
      });
      return;
    }

    try {
      setGenerating(true);
      
      const url = await generateAndUploadBlogImage(prompt, `${articleId}.png`);
      
      if (url) {
        toast({
          title: "Image generated",
          description: "AI-generated image uploaded successfully",
        });
        onImageUploaded?.(url);
      } else {
        throw new Error("Failed to generate image");
      }
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: "Generation failed",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-4 p-6 bg-glass backdrop-blur-xl border-2 border-glass rounded-3xl">
      <h3 className="text-xl font-bold text-white mb-4">Upload Blog Image</h3>
      
      {/* File Upload */}
      <div>
        <label htmlFor="file-upload" className="block text-sm font-medium text-white/80 mb-2">
          Upload Image File
        </label>
        <div className="flex gap-2">
          <Input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="bg-background/50 border-glass"
          />
          <Button disabled={uploading} variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-glass" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-white/60">Or</span>
        </div>
      </div>

      {/* AI Generation */}
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-white/80 mb-2">
          Generate with AI
        </label>
        <div className="flex gap-2">
          <Input
            id="prompt"
            type="text"
            placeholder="Describe the image you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={generating}
            className="bg-background/50 border-glass"
          />
          <Button 
            onClick={handleGenerateImage}
            disabled={generating || !prompt.trim()}
            className="bg-gradient-to-r from-[#E94B96] to-[#FF9B7D]"
          >
            <Wand2 className="w-4 h-4 mr-2" />
            {generating ? "Generating..." : "Generate"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogImageUploader;
