-- Allow public access to published content materials
CREATE POLICY "Published materials are public"
ON public.content_materials
AS PERMISSIVE
FOR SELECT
TO anon, authenticated
USING (status = 'published');
