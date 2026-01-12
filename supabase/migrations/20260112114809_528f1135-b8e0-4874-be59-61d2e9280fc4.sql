-- Add ownership-based RLS policies for blog-images storage bucket
-- This ensures only image owners can update/delete their own images

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Authenticated users can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete blog images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view blog images" ON storage.objects;

-- Create new ownership-based policies

-- Public can view all blog images (intentional - public blog)
CREATE POLICY "Public can view blog images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'blog-images');

-- Authenticated users can upload to blog-images with ownership tracking
CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'blog-images' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can only update their own images
CREATE POLICY "Users can update their own blog images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'blog-images' 
  AND owner = auth.uid()
)
WITH CHECK (
  bucket_id = 'blog-images' 
  AND owner = auth.uid()
);

-- Users can only delete their own images
CREATE POLICY "Users can delete their own blog images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'blog-images' 
  AND owner = auth.uid()
);

-- Admins can manage all blog images
CREATE POLICY "Admins can manage all blog images"
ON storage.objects
FOR ALL
TO authenticated
USING (
  bucket_id = 'blog-images' 
  AND public.has_role(auth.uid(), 'admin'::app_role)
)
WITH CHECK (
  bucket_id = 'blog-images' 
  AND public.has_role(auth.uid(), 'admin'::app_role)
);