-- Drop existing overly permissive storage policies
DROP POLICY IF EXISTS "Authenticated users can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update their blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete their blog images" ON storage.objects;

-- Create admin-only policies for blog-images bucket
CREATE POLICY "Admins can upload blog images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'blog-images' AND
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update blog images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blog images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));