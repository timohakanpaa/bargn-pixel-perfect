
-- Create content_materials table for social media content bank
CREATE TABLE public.content_materials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  caption TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('tiktok', 'instagram', 'both')),
  theme TEXT NOT NULL,
  image_url TEXT,
  image_base64 TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.content_materials ENABLE ROW LEVEL SECURITY;

-- Admin-only policies
CREATE POLICY "Admins can view all content materials"
  ON public.content_materials FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create content materials"
  ON public.content_materials FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update content materials"
  ON public.content_materials FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete content materials"
  ON public.content_materials FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Timestamp trigger
CREATE TRIGGER update_content_materials_updated_at
  BEFORE UPDATE ON public.content_materials
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for material images
INSERT INTO storage.buckets (id, name, public) VALUES ('content-materials', 'content-materials', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can view content material images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'content-materials');

CREATE POLICY "Admins can upload content material images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'content-materials');

CREATE POLICY "Admins can delete content material images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'content-materials');
